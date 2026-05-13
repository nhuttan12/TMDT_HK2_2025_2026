import { NextResponse } from 'next/server';
import apiServer from '@/lib/api-server';

export async function POST(request: Request) {
	try {
		// const body = await request.json();
		// const backendUrl = '/auth/login';
		// console.log(request);
		// const data = await apiServer.post(backendUrl, body);
		// Trả về bất cứ thứ gì Backend trả về (any)

		const data = {
			token : "oke"
		}
		console.log(data)
		return NextResponse.json(data);
	} catch (error: any) {
		// Ở đây error bây giờ là Error object do Interceptor reject
		console.error('Backend Error:', error.message);

		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }, // Hoặc giữ status phù hợp nếu bạn tinh chỉnh lại Interceptor
		);
	}
}
