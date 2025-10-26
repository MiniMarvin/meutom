<script lang="ts">
	import { browser } from '$app/environment';
	import { addImage, getImagesByComponentId, updateImage, type ImageRecord } from './db';
	import { FALLBACK_MODEL_ID, processImage, initializeModel } from './process';
	import { isMobileDevice } from './utils';
	import Camera from './Camera.svelte';
	import Button from '@smui/button';

	// Local state for each image managed by the component
	type ManagedImage = {
		id: string;
		objectUrl: string;
		isProcessing: boolean;
		isProcessed: boolean;
	};

	let { id: componentId, style }: { id: string; style?: string } = $props();

	let images = $state<ManagedImage[]>([]);
	let isDragging = $state(false);
	let showCamera = $state(false);
	let fileInput: HTMLInputElement;
	let modelInitPromise: Promise<boolean> | undefined = undefined;

	const isMobile = $derived(isMobileDevice());

	// Effect to load persisted images from IndexedDB on component mount
	$effect(() => {
		if (!browser) return;

		async function loadInitialImages() {
			const storedRecords = await getImagesByComponentId(componentId);
			const managedImages: ManagedImage[] = [];

			for (const record of storedRecords) {
				const imageFile = record.isProcessed ? record.processedImage! : record.originalImage;
				const objectUrl = URL.createObjectURL(imageFile);

				managedImages.push({
					id: record.id,
					objectUrl,
					isProcessing: !record.isProcessed,
					isProcessed: record.isProcessed
				});

				// If an image wasn't fully processed, restart the process
				if (!record.isProcessed) {
					handleImageProcessing(record);
				}
			}
			images = managedImages;
		}

		loadInitialImages();

		// Cleanup object URLs when the component is destroyed
		return () => {
			for (const img of images) {
				URL.revokeObjectURL(img.objectUrl);
			}
		};
	});

	async function handleImageProcessing(record: ImageRecord) {
		if (modelInitPromise === undefined) {
			modelInitPromise = initializeModel(FALLBACK_MODEL_ID);
		}
		try {
			await modelInitPromise;

			// Process the image
			const processedFile = await processImage(record.originalImage);

			// Update the record in IndexedDB
			const updatedRecord: ImageRecord = {
				...record,
				processedImage: processedFile,
				isProcessed: true
			};
			await updateImage(updatedRecord);

			// Update the UI state
			const imageIndex = images.findIndex((img) => img.id === record.id);
			if (imageIndex > -1) {
				// Create a new object URL for the processed image
				const newObjectUrl = URL.createObjectURL(processedFile);
				// Revoke the old one to free memory
				URL.revokeObjectURL(images[imageIndex].objectUrl);

				images[imageIndex] = {
					...images[imageIndex],
					objectUrl: newObjectUrl,
					isProcessing: false,
					isProcessed: true
				};
			}
		} catch (error) {
			console.error('Failed to process image:', error);
			// Optionally update UI to show an error state for this image
			const imageIndex = images.findIndex((img) => img.id === record.id);
			if (imageIndex > -1) {
				images[imageIndex].isProcessing = false; // Stop loading state
			}
		}

		// Force reload
		images = images;
	}

	async function addFiles(files: FileList | null) {
		if (!files) return;

		for (const file of Array.from(files)) {
			if (!file.type.startsWith('image/')) continue;

			const timestamp = Date.now();
			const recordId = `${componentId}-${timestamp}`;
			const objectUrl = URL.createObjectURL(file);

			// Add to UI immediately in loading state
			images.push({
				id: recordId,
				objectUrl,
				isProcessing: true,
				isProcessed: false
			});

			// Create record for DB
			const record: ImageRecord = {
				id: recordId,
				componentId,
				originalImage: file,
				isProcessed: false,
				timestamp
			};

			// Save to DB before processing
			await addImage(record);

			// Start processing
			handleImageProcessing(record);
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
				<img src={image.objectUrl} alt="Selected" class:loading={image.isProcessing} />
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
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
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
		aspect-ratio: 1 / 1;
	}
	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
		transition: filter 0.3s ease-in-out;
	}
	.image-wrapper img.loading {
		filter: grayscale(100%) blur(5px);
	}
	.input {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
