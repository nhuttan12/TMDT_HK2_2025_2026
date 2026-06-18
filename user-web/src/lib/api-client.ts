import { NextResponse } from 'next/server';
import apiServer from '@/lib/api-server';
import { type ResponseApi, type LoginPayload } from '@/types/commom/ResponseApi';
import { type AxiosResponse } from 'axios';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const body = (await request.json()) as LoginPayload;
		const backendUrl = '/auth/login';
		// Vỏ ngoài là AxiosResponse, ruột bên trong là ResponseApi
		const axiosResponse = await apiServer.post<object, AxiosResponse<ResponseApi<object>>>(
			backendUrl,
			body,
		);

		// Bóc vỏ tại đây
		const responseData = axiosResponse.data;

		let httpStatus: number = 200;

		if (!responseData.IsSuccess) {
			if (responseData.Error?.Code === 'UNAUTHORIZED') {
				httpStatus = 401;
			} else {
				httpStatus = 400;
			}
		}

		return NextResponse.json(responseData, { status: httpStatus });
	} catch (error) {
		const errorMessage: string =
			error instanceof Error ? error.message : 'Unknown Next.js Error';

		const fatalError: ResponseApi<null> = {
			IsSuccess: false,
			Value: null,
			Error: {
				Code: 'INTERNAL_API_ERROR',
				Message: errorMessage,
				ErrorType: 'NextJsRuntimeError',
			},
		};

		return NextResponse.json(fatalError, { status: 500 });
	}
}
