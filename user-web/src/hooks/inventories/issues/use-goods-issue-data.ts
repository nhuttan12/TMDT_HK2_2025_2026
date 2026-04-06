import { GoodsIssuePartner } from '@/types/inventories/issues/uis/GoodsIssuePartner';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';

export function useGoodsIssueData() {
	const mockPartners: GoodsIssuePartner[] = [
		{ id: 1, name: 'Nguyễn Văn A', type: 'customer', phoneNumber: '0901234567' },
		{ id: 2, name: 'Công ty Samsung Vina', type: 'customer', phoneNumber: '0283824327' },
		{ id: 3, name: 'Nhà cung cấp Apple Inc', type: 'supplier', phoneNumber: '18001122' },
		{ id: 4, name: 'Kho trung chuyển Q7', type: 'internal' },
	];

	const mockProducts: ProductForGoodsIssue[] = [
		{
			id: 1,
			name: 'iPhone 15 Pro Max',
			sku: 'APL-IP15PM-256',
			serialNumber: 'SN-APL-15PM-001A',
			status: true,
		},
		{
			id: 2,
			name: 'Samsung Galaxy S24 Ultra',
			sku: 'SAM-S24U-512',
			serialNumber: 'SN-SAM-S24U-992B',
			status: true,
		},
		{
			id: 3,
			name: 'MacBook Pro 16"',
			sku: 'APL-MBP16-M3',
			serialNumber: 'SN-MAC-M3P-881X',
			status: true,
		},
		{
			id: 4,
			name: 'iPad Air',
			sku: 'APL-IPADA-M1',
			serialNumber: 'SN-IPD-AIR-772Y',
			status: false,
		},
		{
			id: 5,
			name: 'AirPods Pro',
			sku: 'APL-AIRP2',
			serialNumber: 'SN-AIR-PRO2-110Z',
			status: true,
		},
		{
			id: 6,
			name: 'Sony WH-1000XM5',
			sku: 'SNY-WH1000XM5',
			serialNumber: 'SN-SNY-WH5-334K',
			status: true,
		},
		{
			id: 7,
			name: 'Apple Watch Series 9',
			sku: 'APL-AWS9-45',
			serialNumber: 'SN-AW9-45M-556L',
			status: false,
		},
		{
			id: 8,
			name: 'Dell XPS 15',
			sku: 'DELL-XPS15-9530',
			serialNumber: 'SN-DEL-X15-229M',
			status: true,
		},
	];

	return {
		partners: mockPartners,
		products: mockProducts,
	};
}
