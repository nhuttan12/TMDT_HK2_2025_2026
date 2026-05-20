import { HomeBanner } from "@/types/contents/home-banners/HomeBanner";

export async function getHomeBanners(): Promise<HomeBanner[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1BU_vqMGT4mNejv9eIVbwGgEoEJBYix_UOQ&s',
					order: 1,
					isPrimary: true,
				},
				{
					id: 2,
					url: 'https://pos.nvncdn.com/524fc3-178700/bn/20250220_wP2Q5MyX.gif?v=1740046435',
					order: 2,
					isPrimary: false,
				},
				{
					id: 3,
					url: 'https://theplantpoint.co.uk/cdn/shop/files/workshops_banner_1512x.jpg?v=1747680699',
					order: 3,
					isPrimary: false,
				},
				{
					id: 4,
					url: 'https://cdn2.tuoitre.vn/zoom/480_300/2022/11/5/banner-khong-test-1667638154236230205133-crop-16676381631901121146171.jpg',
					order: 4,
					isPrimary: false,
				},
				{
					id: 5,
					url: 'https://cdn.hstatic.net/200000968796/file/demo_banner_2_86d3efa68bad432bbb31582c4d591869.png',
					order: 5,
					isPrimary: false,
				},
			]);
		}, 500);
	});
}
