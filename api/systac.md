
### 2. Các nhóm hàm chính làm việc với DbContext

Để trở thành một lập trình viên chuyên nghiệp, bạn cần phân loại các hàm theo mục đích sử dụng:

#### A. Nhóm hàm Truy vấn (Querying)
Dùng để lấy dữ liệu từ Database lên bộ nhớ.
* **`Find(id)` / `FindAsync(id)`**: Tìm theo Khóa chính (Primary Key). Rất nhanh vì nó kiểm tra trong bộ nhớ trước khi truy vấn DB.
* **`First()` / `FirstOrDefault()`**: Lấy bản ghi đầu tiên. `First` sẽ văng lỗi nếu không có dữ liệu, `FirstOrDefault` trả về `null`.
* **`Single()` / `SingleOrDefault()`**: Kỳ vọng chỉ có **duy nhất 1** bản ghi. Nếu DB có 2 bản ghi thỏa mãn, nó sẽ văng lỗi.
* **`ToList()` / `ToListAsync()`**: Thực thi truy vấn và đẩy toàn bộ kết quả vào một List.

#### B. Nhóm hàm Thay đổi dữ liệu (Change Tracking)
Dùng để thông báo cho EF biết bạn muốn làm gì với đối tượng.
* **`Add()` / `AddAsync()`**: Đánh giá đối tượng là `Added`. EF sẽ tạo lệnh `INSERT`.
* **`Update()`**: Đánh giá đối tượng là `Modified`. EF sẽ tạo lệnh `UPDATE` cho tất cả các cột.
* **`Remove()`**: Đánh giá đối tượng là `Deleted`. EF sẽ tạo lệnh `DELETE`.
* **`Attach()`**: Đưa một đối tượng "lạ" (không được tracking) vào tầm kiểm soát của DbContext mà không làm gì cả (thường dùng khi bạn đã có ID và chỉ muốn update một vài cột).

#### C. Nhóm hàm Thực thi (Execution)
* **`SaveChanges()` / `SaveChangesAsync()`**: Đây là lúc mọi thứ "thực sự" xảy ra. EF sẽ gom tất cả các thay đổi ở nhóm (B), tạo thành một **Transaction** và gửi xuống Database.
* **`Database.MigrateAsync()`**: Tự động cập nhật cấu trúc bảng (Table schema) dựa trên các file Migration.



---

### 3. Tư duy xử lý nghiệp vụ tối ưu

Khi làm việc với `DbContext`, một lập trình viên có tư duy phân tích sâu sẽ luôn tự hỏi:

1.  **Tôi có cần Tracking không?** Nếu chỉ đọc để hiển thị, hãy dùng `.AsNoTracking()` để tiết kiệm RAM và CPU.
2.  **Tôi có đang làm thừa không?** Đừng gọi `SaveChangesAsync` quá nhiều lần trong một vòng lặp. Hãy gom tất cả thay đổi lại và gọi một lần duy nhất ở cuối để tối ưu hiệu năng.
3.  **Dữ liệu có nhất quán không?** Nếu thực hiện nhiều lệnh chèn/xóa liên quan đến nhau, hãy bọc chúng trong `IDbContextTransaction`.

**Lời khuyên:** Thay vì dùng dòng code `?? new` của bạn, cách chuyên nghiệp hơn là tách rõ ràng:
1.  Tìm trong DB.
2.  Nếu không thấy -> `Add` bản ghi mới -> `SaveChanges`.
3.  Lúc này bạn chắc chắn có một đối tượng "Sạch" và "Có ID" để thực hiện các bước tiếp theo.

Bạn có muốn tôi ví dụ cách dùng hàm `Attach` để cập nhật dữ liệu mà không cần phải `Select` nó lên trước không? Đây là kỹ thuật cực hay để tăng tốc hệ thống đấy!