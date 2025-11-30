import { FALLBACK_MODEL_ID, initializeModel, predictMask } from './process';

self.onmessage = async (event: MessageEvent<{ imageFile: File; recordId: string }>) => {
	try {
		const { imageFile, recordId } = event.data;

		// This is a one-off initialization, but it's important for the worker's context.
		await initializeModel(FALLBACK_MODEL_ID);

		// The heavy computation happens here.
		const { maskData, width, height } = await predictMask(imageFile);

		// Post the result back to the main thread.
		self.postMessage({
			recordId,
			maskData,
			width,
			height
		});
	} catch (error) {
		const { recordId } = event.data;
		self.postMessage({
			recordId,
			error: error instanceof Error ? error.message : 'Unknown error'
		});
	}
};
