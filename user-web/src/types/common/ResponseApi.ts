export interface ResponseError {
	code: string;
	message: string;
	errorType: string;
}

// Mặc định T là object nếu không truyền type cụ thể
export interface ResponseApi<T = object> {
	isSuccess: boolean;
	data: T | null;
	error: ResponseError | null;
}

export interface LoginPayload {
	username?: string;
	password?: string;
}
