import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportExcelFile = async (): Promise<void> => {
	const workbook = new ExcelJS.Workbook();

	const sheet = workbook.addWorksheet('Import');

	sheet.columns = [
		{ header: 'Batch Code', key: 'batchCode', width: 20 },
		{ header: 'Product Code', key: 'productCode', width: 20 },
		{ header: 'Variant', key: 'variant', width: 20 },
		{ header: 'Quantity', key: 'quantity', width: 15 },
		{ header: 'Price', key: 'price', width: 15 },
	];

	// header style
	const headerRow = sheet.getRow(1);
	headerRow.font = { bold: true };

	// example
	sheet.addRow({
		batchCode: 'BATCH001',
		productCode: 'SP001',
		variant: 'Red-L',
		quantity: 10,
		price: 20000,
	});

	// dropdown
	const variants = ['Red-L', 'Blue-M'];

	for (let i = 2; i <= 50; i++) {
		sheet.getCell(`C${i}`).dataValidation = {
			type: 'list',
			allowBlank: false,
			formulae: [`"${variants.join(',')}"`],
		};
	}

	// 👉 export file
	const buffer = await workbook.xlsx.writeBuffer();

	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	});

	saveAs(blob, 'import-template.xlsx');
};
