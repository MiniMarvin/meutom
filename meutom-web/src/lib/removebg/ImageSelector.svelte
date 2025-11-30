<script lang="ts">
	import { browser } from '$app/environment';
	import {
		addImage,
		deleteImage,
		getImagesByComponentId,
		updateImage,
		type ImageRecord
	} from './db';
	import { applyMask } from './process';
	import { workerPool } from './workerPool';
	import { isMobileDevice } from './utils';
	import Camera from './Camera.svelte';
	import Button from '@smui/button';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import { WearType, type WearableInfo } from 'src/lib/wearable/types';
	import FullscreenImage from './FullscreenImage.svelte';

	// Local state for each image managed by the component
	type ManagedImage = {
		id: string;
		objectUrl: string;
		originalObjectUrl: string;
		isProcessing: boolean;
		isProcessed: boolean;
		wearableInfo: WearableInfo;
	};

	let { id: componentId, style }: { id: string; style?: string } = $props();

	let images = $state<ManagedImage[]>([]);
	let isDragging = $state(false);
	let showCamera = $state(false);
	let expandedImage = $state<ManagedImage | null>(null);
	let fileInput: HTMLInputElement;

	const isMobile = $derived(isMobileDevice());
	const wearTypeOptions = $derived(Object.values(WearType));

	// Effect to load persisted images from IndexedDB on component mount
	$effect(() => {
		if (!browser) return;

		const handleProcessingResult = async ({
			recordId,
			processedFile,
			error
		}: {
			recordId: string;
			processedFile?: File;
			error?: string;
		}) => {
			const imageIndex = images.findIndex((img) => img.id === recordId);
			if (imageIndex === -1) return;

			if (error) {
				console.error(`Processing failed for ${recordId}:`, error);
				images[imageIndex].isProcessing = false;
				images = [...images];
				return;
			}

			if (processedFile) {
				const originalRecord = (await getImagesByComponentId(componentId)).find(
					(r) => r.id === recordId
				);

				if (originalRecord) {
					const updatedRecord: ImageRecord = {
						...originalRecord,
						processedImage: processedFile,
						isProcessed: true
					};
					await updateImage(updatedRecord);

					const newObjectUrl = URL.createObjectURL(processedFile);
					URL.revokeObjectURL(images[imageIndex].objectUrl);

					images[imageIndex].objectUrl = newObjectUrl;
					images[imageIndex].isProcessing = false;
					images[imageIndex].isProcessed = true;
					images = [...images];
				}
			}
		};

		const unsubscribe = workerPool.subscribe(handleProcessingResult);

		async function loadInitialImages() {
			const storedRecords = await getImagesByComponentId(componentId);
			const managedImages: ManagedImage[] = [];

			for (const record of storedRecords) {
				const imageFile = record.isProcessed ? record.processedImage! : record.originalImage;
				const objectUrl = URL.createObjectURL(imageFile);
				const originalObjectUrl = URL.createObjectURL(record.originalImage);

				managedImages.push({
					id: record.id,
					objectUrl,
					originalObjectUrl,
					isProcessing: !record.isProcessed,
					isProcessed: record.isProcessed,
					wearableInfo: record.wearableInfo ?? {}
				});

				// If an image wasn't fully processed, restart the process
				if (!record.isProcessed) {
					workerPool.addJob(record);
				}
			}
			images = managedImages;
		}

		loadInitialImages();

		return () => {
			unsubscribe();
			for (const img of images) {
				URL.revokeObjectURL(img.objectUrl);
				URL.revokeObjectURL(img.originalObjectUrl);
			}
		};
	});

	async function addFiles(files: FileList | null) {
		if (!files) return;

		for (const file of Array.from(files)) {
			if (!file.type.startsWith('image/')) continue;

			const timestamp = Date.now();
			const recordId = `${componentId}-${timestamp}`;
			const objectUrl = URL.createObjectURL(file); // This will be the original for a while

			// Add to UI immediately in loading state
			images.push({
				id: recordId,
				objectUrl,
				originalObjectUrl: objectUrl,
				isProcessing: true,
				isProcessed: false,
				wearableInfo: {}
			});

			// Create record for DB
			const record: ImageRecord = {
				id: recordId,
				componentId,
				originalImage: file,
				isProcessed: false,
				timestamp,
				wearableInfo: {}
			};

			// Save to DB before processing
			await addImage(record);

			// Add job to the global pool
			workerPool.addJob(record);
		}
		images = [...images];
	}

	async function handleInfoChange(imageId: string, newInfo: WearableInfo) {
		const imageIndex = images.findIndex((img) => img.id === imageId);
		if (imageIndex > -1) {
			images[imageIndex].wearableInfo = newInfo;
			const record = await (
				await getImagesByComponentId(componentId)
			).find((r) => r.id === imageId);
			if (record) {
				await updateImage({ ...record, wearableInfo: newInfo });
			}
		}
	}

	async function handleRemoveImage(imageId: string) {
		const imageIndex = images.findIndex((img) => img.id === imageId);
		if (imageIndex > -1) {
			const img = images[imageIndex];
			URL.revokeObjectURL(img.objectUrl);
			URL.revokeObjectURL(img.originalObjectUrl);
			images.splice(imageIndex, 1);
			images = [...images];
			await deleteImage(imageId);
			expandedImage = null;
		}
	}

	function onFileSelected(e: Event) {
		const target = e.target as HTMLInputElement;
		addFiles(target.files);
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		addFiles(e.dataTransfer?.files ?? null);
	}
</script>

{#if showCamera}
	<Camera
		onPhoto={(file) => addFiles(new DataTransfer().items.add(file) && new DataTransfer().files)}
		onClose={() => (showCamera = false)}
	/>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="container"
	class:dragging={isDragging}
	ondragover={(e) => {
		e.preventDefault();
		isDragging = true;
	}}
	ondragleave={() => (isDragging = false)}
	ondrop={onDrop}
	{style}
>
	<div class="image-container">
		{#if images.length === 0}
			<p class="placeholder">Arraste as imagens para cá ou clique "Enviar Imagem"</p>
		{/if}
		{#each images as image (image.id)}
			<div class="image-wrapper">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					src={image.objectUrl}
					alt="Selected"
					class:loading={image.isProcessing}
					onclick={() => (expandedImage = image)}
				/>
				<!-- <div class="input-form">
					<Select
						variant="outlined"
						label="Tipo"
						value={image.wearableInfo.type}
						onchange={(e) =>
							handleInfoChange(image.id, {
								...image.wearableInfo,
								type: e.detail.value || WearType.Camisa
							})}
					>
						{#each wearTypeOptions as type}
							<Option value={type}>{type}</Option>
						{/each}
					</Select>
					<Textfield
						variant="outlined"
						label="Marca"
						value={image.wearableInfo.brand || ''}
						oninput={(e) =>
							handleInfoChange(image.id, { ...image.wearableInfo, brand: e.currentTarget.value })}
					/>
					<Textfield
						variant="outlined"
						label="Preço de Venda"
						type="number"
						value={image.wearableInfo.sellPrice || 0}
						oninput={(e) =>
							handleInfoChange(image.id, {
								...image.wearableInfo,
								sellPrice: +e.currentTarget.value
							})}
					/>
				</div> -->
			</div>
		{/each}
	</div>
	<div class="input">
		<Button onclick={() => fileInput.click()}>enviar imagem</Button>
		{#if isMobile}
			<Button onclick={() => (showCamera = true)}>tirar foto</Button>
		{/if}
	</div>
</div>

<!-- Hidden file input -->
<input
	type="file"
	bind:this={fileInput}
	hidden
	multiple
	accept=".png,.jpg,.jpeg,.webp"
	onchange={onFileSelected}
/>

<style>
	.container {
		border: 2px dashed #ccc;
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 200px;
		transition: background-color 0.2s;
	}
	.container.dragging {
		background-color: #f0f8ff;
		border-color: #007bff;
	}
	.image-container {
		flex-grow: 1;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}
	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #888;
		grid-column: 1 / -1;
	}
	.image-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.image-wrapper img {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 4px;
		transition: filter 0.3s ease-in-out;
		cursor: pointer;
	}
	.image-wrapper img.loading {
		filter: grayscale(100%) blur(5px);
	}
	.input-form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.input-form > :global(.smui-select),
	:global(.smui-textfield) {
		width: 100%;
	}
	.input {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
