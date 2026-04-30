/**
 * @description Đối tượng quản lý các Query Keys cho phân hệ Auth.
 * Cấu trúc này giúp quản lý tập trung các key của TanStack Query, hỗ trợ việc caching và invalidate queries chính xác.
 * 
 * @structure
 * - all: Key gốc, đại diện cho toàn bộ dữ liệu thuộc phạm vi 'auth'. Dùng khi muốn xóa toàn bộ cache liên quan đến auth.
 * - profile: Key cụ thể cho thông tin người dùng. Kế thừa từ 'all' để tạo ra một cấu trúc cây (hierarchy).
 */
export const authKeys = {
	/** 
	 * Mục đích: Định danh cấp cao nhất cho tất cả các query liên quan đến xác thực.
	 */
	all: ['auth'] as const,

	/**
	 * Mục đích: Định danh cho dữ liệu thông tin cá nhân của người dùng hiện tại.
	 * Việc sử dụng hàm giúp dễ dàng mở rộng nếu sau này cần truyền thêm ID hoặc params.
	 */
	profile: () => [...authKeys.all, 'profile'] as const,
	login: () => [...authKeys.all, 'login'] as const,
	logout: () => [...authKeys.all, 'logout'] as const,

};
