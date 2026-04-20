# 📘 Hướng dẫn sử dụng PostgreSQL bằng Docker Compose (chỉ Database)

---


## . Chạy database

```bash id="7xtk0c"
docker-compose up -d
```

---

## . Kiểm tra trạng thái

```bash id="o2c0m3"
docker ps
```

---

## 7. Xem log

```bash id="c3sy7h"
docker logs -f postgres-db
```

---

## 8. Kết nối database

```text id="cd4pfu"
Host: localhost
Port: 5432
Database: mydb
User: postgres
Password: 123456
```

---

## 9. Dừng database

```bash id="xxl7nq"
docker-compose down
```

---

## 10. Lưu ý quan trọng

### ✔ Volume (rất quan trọng)

```yaml id="u3b1q5"
postgres_data:/var/lib/postgresql/data
```

→ dữ liệu không bị mất khi restart

---

### ✔ Fix version

```yaml id="z8hhc6"
postgres:15.5
```

→ tránh lỗi khi update version

---

### ✔ Không dùng `latest`

```yaml id="2u2c3w"
postgres:latest   # ❌
```

---

### ✔ Restart policy

```yaml id="m0g0nm"
restart: unless-stopped
```

---


## 11. Workflow sử dụng

1. Tạo `.env`
2. Chạy:

   ```
   docker-compose up -d
   ```
3. Kết nối DB
4. Sử dụng trong ứng dụng

---


"JwtSettings": {
"Issuer": "https:/api/auth", // Định danh của Server tạo ra Token, Khi nhận Token, Server kiểm tra trường iss bên trong. Nếu nó không khớp với giá trị này, Server sẽ từ chối vì Token có thể đến từ một hệ thống lạ.
"Audience": "yourappusers", // Định danh của nơi mà Token này được phép sử dụng, Đảm bảo Token được cấp cho "App A" thì không thể dùng để đăng nhập vào "App B" dù cả hai dùng chung một Secret Key.
 }