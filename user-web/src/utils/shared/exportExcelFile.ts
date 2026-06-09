import ExcelJS, { Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';

export const exportExcelFile = async (
	product: ProductForGoodsReceipt,
	variants: ProductVariantRow[],
): Promise<void> => {
	const workbook: Workbook = new ExcelJS.Workbook();

	// Sheet 1: Thông tin phiếu nhập (Template trống)
	const receiptSheet: Worksheet = workbook.addWorksheet('1. Thông tin phiếu nhập');
	receiptSheet.columns = [
		{ header: 'Mã phiếu (Tự chọn)', key: 'code', width: 20 },
		{ header: 'ID Nhà cung cấp', key: 'supplierID', width: 15 },
		{ header: 'Ngày nhập (YYYY-MM-DD)', key: 'importDate', width: 20 },
		{ header: 'Ghi chú', key: 'note', width: 30 },
	];
	receiptSheet.getRow(1).font = { bold: true };
	receiptSheet.addRow({
		code: 'GR-TEMP',
		supplierID: '',
		importDate: new Date().toISOString().split('T'),
		note: '',
	});

	// Sheet 2: Danh sách lô (Điền sẵn tên SP đã chọn)
	const batchSheet: Worksheet = workbook.addWorksheet('2. Danh sách lô hàng');
	batchSheet.columns = [
		{ header: 'Mã lô *', key: 'batchNumber', width: 20 },
		{ header: 'ID Sản phẩm', key: 'productId', width: 15 },
		{ header: 'Tên sản phẩm', key: 'productName', width: 30 },
		{ header: 'Số lượng', key: 'quantity', width: 15 },
		{ header: 'Đơn giá nhập', key: 'unitPrice', width: 15 },
		{ header: 'Ngày hết hạn', key: 'expiredAt', width: 20 },
	];
	batchSheet.getRow(1).font = { bold: true };
	batchSheet.addRow({
		batchNumber: 'LO-001',
		productId: product.id,
		productName: product.name,
		quantity: variants.length,
		unitPrice: 0,
		expiredAt: '',
	});

	// Sheet 3: Danh sách Serial (Điền sẵn các phân loại đã chọn)
	const serialSheet: Worksheet = workbook.addWorksheet('3. Danh sách Serial chi tiết');
	serialSheet.columns = [
		{ header: 'Mã lô (Khớp với Sheet 2)', key: 'batchNumber', width: 25 },
		{ header: 'Tên phân loại', key: 'productVariantName', width: 35 },
		{ header: 'Tình trạng ngoại quan', key: 'appearanceCondition', width: 25 },
		{ header: 'Trạng thái (in_stock/defective)', key: 'status', width: 20 },
		{ header: 'Ngày nhập', key: 'importDate', width: 20 },
		{ header: 'Ngày hết hạn', key: 'expiredAt', width: 20 },
	];
	serialSheet.getRow(1).font = { bold: true };

	// Map các phân loại đã chọn vào hàng
	variants.forEach((v: ProductVariantRow): void => {
		serialSheet.addRow({
			batchNumber: 'LO-001',
			productVariantName: v.name,
			serialNumber: '',
			// Mặc định
			status: 'in_stock',
			importDate: new Date().toISOString().split('T'),
			expiredAt: '',
		});
	});

	const buffer = await workbook.xlsx.writeBuffer();
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	});

	saveAs(blob, 'mau-don-nhap-kho.xlsx');
};
