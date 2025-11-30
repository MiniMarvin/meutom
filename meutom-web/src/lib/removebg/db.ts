import { openDB, type DBSchema } from 'idb';
import type { WearableInfo } from '../wearable/types';

export type ImageRecord = {
	id: string;
	componentId: string;
	originalImage: File;
	processedImage?: File;
	isProcessed: boolean;
	timestamp: number;
	wearableInfo?: WearableInfo;
};

interface MyDB extends DBSchema {
	images: {
		key: string;
		value: ImageRecord;
		indexes: { 'by-componentId': string };
	};
}

const DB_NAME = 'ImageDatabase';
const STORE_NAME = 'images';
const DB_VERSION = 1;

async function getDb() {
	return await openDB<MyDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			const store = db.createObjectStore(STORE_NAME, {
				keyPath: 'id'
			});
			store.createIndex('by-componentId', 'componentId');
		}
	});
}

export async function addImage(record: ImageRecord) {
	const db = await getDb();
	await db.add(STORE_NAME, record);
}

export async function updateImage(record: ImageRecord) {
	const db = await getDb();
	await db.put(STORE_NAME, record); // put will add or update
}

export async function getImagesByComponentId(componentId: string): Promise<ImageRecord[]> {
	const db = await getDb();
	return await db.getAllFromIndex(STORE_NAME, 'by-componentId', componentId);
}

export async function deleteImage(imageId: string) {
	const db = await getDb();
	return await db.delete(STORE_NAME, imageId);
}
