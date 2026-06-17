export interface ErrorApi {
	Code: string;
	Message: string;
	ErrorType: string;
}

// Mặc định T là object nếu không truyền type cụ thể
export interface ResponseApi<T = object> {
	IsSuccess: boolean;
	Value: T | null;
	Error: ErrorApi | null;
}

export interface LoginPayload {
	username?: string;
	password?: string;
}
