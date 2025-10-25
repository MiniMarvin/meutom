<!-- Reference: https://svelte.dev/playground/b17c13d4f1bb40799ccf09e0841ddd90?version=5.41.4 -->
<script>
	/**
	 * @type {HTMLInputElement}
	 */
	let fileinput;
	let imageData;

	const onFileSelected = (
		/** @type {Event & { currentTarget: EventTarget & HTMLInputElement; }} */ e
	) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imageData = e.target?.result;
		};
		// TODO: Deixar transparente.
		// TODO: Criar componentes para fazer o envio de camera e em lote.
		// TODO: Fazer download da imagem.
		// TODO: Permitir o upload dos dados direto para a base de dados.
		// TODO: Criar um processo que otimize as imagens antes de salvar nos buckets para otimizar o carregamento.
	};
</script>

<h1>Deixar Imagem Transparente</h1>

<img
	class="upload"
	src="https://static.thenounproject.com/png/625182-200.png"
	alt=""
	onclick={() => {
		fileinput.click();
	}}
/>
<div
	class="chan"
	onclick={() => {
		fileinput.click();
	}}
>
	Choose Image
</div>
<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	onchange={(e) => onFileSelected(e)}
	bind:this={fileinput}
/>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.upload {
		display: flex;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
	.avatar {
		display: flex;
		height: 200px;
		width: 200px;
	}
</style>
