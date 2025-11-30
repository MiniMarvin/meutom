<script lang="ts">
	import Button from '@smui/button';

	type ManagedImage = {
		id: string;
		objectUrl: string;
		originalObjectUrl: string;
		isProcessing: boolean;
		isProcessed: boolean;
	};

	let {
		image,
		onClose,
		onRemove
	}: {
		image: ManagedImage;
		onClose: () => void;
		onRemove: () => void;
	} = $props();

	let showOriginal = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-backdrop" onclick={onClose}>
	<div class="modal-content" onclick={(e) => e.stopPropagation()}>
		<img src={showOriginal ? image.originalObjectUrl : image.objectUrl} alt="Expanded" />
		<div class="controls">
			{#if image.isProcessed}
				<Button onclick={() => (showOriginal = !showOriginal)}>
					{showOriginal ? 'Mostrar Processada' : 'Mostrar Original'}
				</Button>
			{/if}
			<Button color="secondary" onclick={onRemove}>Remover</Button>
			<Button variant="unelevated" onclick={onClose}>Fechar</Button>
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 90vw;
		max-height: 90vh;
	}
	.modal-content img {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
	}
	.controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
