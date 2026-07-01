export interface BackendProductDTO {
    id: string;
    name: string;
    image: string;
    status: string; // Trả về chuỗi PascalCase từ Enum của C# (VD: "Approved", "PendingApproval")
    createdAt: string;
    updatedAt: string;
}