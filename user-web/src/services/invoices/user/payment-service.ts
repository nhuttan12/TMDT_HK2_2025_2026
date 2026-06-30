import axios from 'axios';

export const postCreatePayPalOrder = async (request: CreateOrderRequest): Promise<string> => {
    // Gọi xuống C# .NET API để tạo Order
    const response = await axios.post('/api/payment/create-order', request);
    return response.data.orderId; // Backend trả về ID của PayPal Order
};

export const postCapturePayPalOrder = async (request: CaptureOrderRequest): Promise<void> => {
    // Gọi xuống C# .NET API để Capture và update status = 6
    await axios.post('/api/payment/capture-order', request);
};