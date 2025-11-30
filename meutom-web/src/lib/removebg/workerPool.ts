import { applyMask } from './process';
import type { ImageRecord } from './db';

type Job = ImageRecord;

type WorkerResult = {
	recordId: string;
	maskData?: Uint8ClampedArray;
	width?: number;
	height?: number;
	error?: string;
};

type Listener = (result: { recordId: string; processedFile?: File; error?: string }) => void;

const MAX_WORKERS = 2;
const jobQueue: Job[] = [];
const activeWorkers: Worker[] = [];
const listeners = new Set<Listener>();

function processQueue() {
	if (jobQueue.length === 0 || activeWorkers.length >= MAX_WORKERS) {
		return;
	}

	const record = jobQueue.shift();
	if (!record) return;

	const worker = new Worker(new URL('./process.worker.ts', import.meta.url), {
		type: 'module'
	});
	activeWorkers.push(worker);

	worker.postMessage({ imageFile: record.originalImage, recordId: record.id });

	const cleanupWorker = () => {
		worker.terminate();
		const index = activeWorkers.indexOf(worker);
		if (index > -1) {
			activeWorkers.splice(index, 1);
		}
		processQueue(); // Process the next job
	};

	worker.onmessage = async (event: MessageEvent<WorkerResult>) => {
		try {
			const { recordId, maskData, width, height, error } = event.data;

			console.log(`Processing ${recordId}`);

			if (error) {
				console.error(`Failed to process image ${recordId} in worker:`, error);
				notifyListeners({ recordId, error });
				return;
			}

			if (maskData && width && height) {
				// Apply the mask on the main thread
				const processedFile = await applyMask(record.originalImage, maskData, width, height);
				notifyListeners({ recordId, processedFile });
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Unknown error during mask application';
			console.error(`Error applying mask for ${record.id}:`, err);
			notifyListeners({ recordId: record.id, error: errorMsg });
		} finally {
			cleanupWorker();
		}
	};

	worker.onerror = (event) => {
		console.error('Worker error:', event.message);
		notifyListeners({ recordId: record.id, error: event.message });
		cleanupWorker();
	};
}

function notifyListeners(result: { recordId: string; processedFile?: File; error?: string }) {
	for (const listener of listeners) {
		listener(result);
	}
}

export const workerPool = {
	/**
	 * Adds an image processing job to the queue.
	 */
	addJob(record: ImageRecord) {
		jobQueue.push(record);
		processQueue();
	},

	/**
	 * Subscribes to job completion events.
	 * Returns an unsubscribe function.
	 */
	subscribe(listener: Listener): () => void {
		listeners.add(listener);
		return () => listeners.delete(listener);
	}
};
