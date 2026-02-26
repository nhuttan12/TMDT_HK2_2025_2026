export interface BaseInputField {
	name: string;
	label: string;
	type: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password';
	errorMessage?: string;
	placeholder?: string;
	required?: boolean;
}
