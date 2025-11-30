export enum WearType {
	Camisa = 'camisa',
	Calca = 'calça',
	Sapato = 'sapato',
	Bermuda = 'bermuda',
	Saia = 'saia',
	Vestido = 'vestido',
	Meia = 'meia',
	Brinco = 'brinco',
	Chapeu = 'chapéu',
	Relogio = 'relógio',
	Oculos = 'óculos',
	Bolsa = 'bolsa',
	Cinto = 'cinto',
	Jaqueta = 'jaqueta',
	Blusa = 'blusa',
	Short = 'short',
	Tenis = 'tênis',
	Sandalia = 'sandália',
	Bota = 'bota',
	Acessorio = 'acessório',
	Outro = 'outro'
}

export type WearableInfo = {
	type?: WearType;
	paidPrice?: number;
	sellPrice?: number;
	brand?: string;
};
