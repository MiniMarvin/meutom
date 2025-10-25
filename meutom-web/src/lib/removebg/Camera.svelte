<script lang="ts">
	import { browser } from '$app/environment';

	let {
		onPhoto,
		onClose
	}: {
		onPhoto: (file: File) => void;
		onClose: () => void;
	} = $props();

	// svelte-ignore non_reactive_update: this is a view only element.
	let videoEl: HTMLVideoElement;
	let stream: MediaStream | null = $state(null);
	let photos = $state<string[]>([]);
	let error = $state<string | null>(null);

	$effect(() => {
		if (!browser) return;

		let active = true;

		async function startCamera() {
			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'environment' },
					audio: false
				});
				if (videoEl && active) {
					videoEl.srcObject = stream;
				}
			} catch (err) {
				console.error('Error accessing camera:', err);
				error = 'Could not access the camera. Please check permissions.';
			}
		}

		startCamera();

		return () => {
			active = false;
			stream?.getTracks().forEach((track) => track.stop());
		};
	});

	function takePhoto() {
		if (!videoEl) return;

		const canvas = document.createElement('canvas');
		canvas.width = videoEl.videoWidth;
		canvas.height = videoEl.videoHeight;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
		canvas.toBlob((blob) => {
			if (blob) {
				const fileName = `photo-${Date.now()}.jpg`;
				const file = new File([blob], fileName, { type: 'image/jpeg' });
				const url = URL.createObjectURL(file);
				photos.push(url);
				onPhoto(file);
			}
		}, 'image/jpeg');
	}
</script>

<div class="camera-overlay">
	{#if error}
		<p class="error">{error}</p>
	{:else}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={videoEl} autoplay playsinline class="camera-view"></video>
	{/if}

	<div class="controls">
		<div class="thumbnails">
			{#each photos as photoSrc}
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img src={photoSrc} alt="Thumbnail of a captured photo" class="thumbnail" />
			{/each}
		</div>
		<div class="buttons">
			<button class="capture-btn" onclick={takePhoto} disabled={!stream}>Take Photo</button>
			<button class="close-btn" onclick={onClose}>Done</button>
		</div>
	</div>
</div>

<style>
	.camera-overlay {
		position: fixed;
		inset: 0;
		background: #000;
		z-index: 100;
		display: flex;
		flex-direction: column;
	}
	.camera-view {
		width: 100%;
		flex-grow: 1;
		object-fit: cover;
	}
	.controls {
		background: rgba(0, 0, 0, 0.5);
		padding: 1rem;
	}
	.thumbnails {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		padding-bottom: 1rem;
	}
	.thumbnail {
		height: 60px;
		width: 60px;
		object-fit: cover;
		border-radius: 4px;
	}
	.buttons {
		display: flex;
		justify-content: space-around;
	}
	.capture-btn,
	.close-btn {
		/* Add your button styles */
	}
	.error {
		color: white;
		text-align: center;
		padding: 2rem;
	}
</style>
