using api.Database;
using api.Dtos.SeedDtos;
using api.model.Products;
using api.Models.Category;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace api.Utilities.Seeders
{
    public class ProductSeeder : IDataSeeder
    {
        public int ExecutionOrder => 2; // Chạy SAU CategorySeeder (Order = 1)

        public async Task SeedAsync(MyAppDbContext dbContext, string contentRootPath, ILogger logger, IIdGenerator idGenerator, CancellationToken cancellationToken)
        {
            var filePath = Path.Combine(contentRootPath, "Database", "Seeders", "SeedData", "products.json");
            if (!File.Exists(filePath)) return;

            var jsonString = await File.ReadAllTextAsync(filePath, cancellationToken);

            // Tùy chỉnh Options để không phân biệt hoa thường khi map JSON
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var seedData = JsonSerializer.Deserialize<List<ProductSeedJsonDto>>(jsonString, jsonOptions);

            if (seedData == null || seedData.Count == 0) return;

            // 1. Tối ưu O(1): Lấy danh sách sản phẩm đã tồn tại
            var existingNames = await dbContext.Set<Product>()
                .AsNoTracking()
                .Select(p => p.Name.ToLower().Trim())
                .ToHashSetAsync(cancellationToken);

            // 2. Tối ưu O(1): Load tất cả Categories hiện có để map "Tên Category" -> "CategoryId"
            // Giả định bạn có bảng Category trong DbContext
            var categoryMap = await dbContext.Set<Category>()
                .AsNoTracking()
                .ToDictionaryAsync(
                    c => c.Name.ToLower().Trim(),
                    c => c.Id,
                    cancellationToken);

            var productsToInsert = new List<Product>();
            int globalSkuCounter = 1;
            foreach (var item in seedData)
            {
                var normalizedName = item.Name.ToLower().Trim();
                if (existingNames.Contains(normalizedName)) continue;

                // Xử lý mapping CategoryId
                var categoryKey = item.Category.ToLower().Trim();
                if (!categoryMap.TryGetValue(categoryKey, out var categoryId))
                {
                    logger.LogWarning($"[ProductSeeder] Không tìm thấy danh mục '{item.Category}' cho sản phẩm '{item.Name}'. Bỏ qua.");
                    continue; // Fail fast: Nếu không có category thì không nạp sản phẩm
                }

                // Dùng Guid.Empty cho ShopId tạm thời (nếu hệ thống bạn chưa làm Multi-tenant)
                Guid shopId = Guid.Parse("7513433e-f36b-1410-8dc7-0031a65e736e");
                Guid idProduct = idGenerator.NewId();
                if(item.Images == null || item.Images.Count == 0)
                {
                    logger.LogWarning($"[ProductSeeder] Sản phẩm '{item.Name}' không có ảnh nào. Bỏ qua.");
                    continue; // Fail fast: Sản phẩm phải có ít nhất 1 ảnh
                }
                // 3. Khởi tạo Product qua Factory Method an toàn
                var productSku = createSku(item.brand, item.Category, item.Name, globalSkuCounter++);

                var productResult = Product.Create(idProduct, item.Name, item.Price, item.Images[0], categoryId, shopId, item.Price * 0.7m,
                    productSku, item.DescriptionHTML, item.Summary);

                if (item.Images.Count > 1)
                {
                    for (int i = 1; i < item.Images.Count; i++)
                    {
                        productResult.Value?.AddImage(item.Images[i]);
                    }
                }
                if (productResult.IsFailure)
                {
                    logger.LogWarning($"[ProductSeeder] Lỗi tạo sản phẩm '{item.Name}': {productResult.Error.Message}");
                    continue;
                }

                var product = productResult.Value!;


                // 5. XỬ LÝ LOGIC BIẾN THỂ (VARIANTS)
                var firstImage = item.Images.FirstOrDefault() ?? string.Empty;

                if (item.Variants != null && item.Variants.Count > 0)
                {
                    foreach (var v in item.Variants)
                    {
                        // Tạo mã SKU phụ cho variant (vd: XZ-640-Mau1)
                        var variantSku = string.IsNullOrWhiteSpace(item.Sku)
                            ? $"SKU-{Guid.NewGuid().ToString()[..6]}"
                            : $"{item.Sku}-{v.Name.Replace(" ", "")}";

                        var addVariantResult = product.AddVariant(
                            name: v.Name,
                            sku: variantSku,
                            sellPrice: v.Price,
                            costPrice: v.Price * 0.7m, // Tương tự, giả định giá vốn
                            imageUrl: !string.IsNullOrWhiteSpace(v.Image) ? v.Image : firstImage
                        );

                        if (addVariantResult.IsFailure)
                            logger.LogWarning($"[ProductSeeder] Lỗi tạo Variant '{v.Name}' cho '{item.Name}': {addVariantResult.Error.Message}");
                    }
                }

                productsToInsert.Add(product);
            }

            if (productsToInsert.Count > 0)
            {
                // Bọc lại thành transaction hoặc lợi dụng AddRangeAsync
                await dbContext.Set<Product>().AddRangeAsync(productsToInsert, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
                logger.LogInformation($"[ProductSeeder] Đã nạp thành công {productsToInsert.Count} sản phẩm và các biến thể.");
            }
        }
        
        string createSku(string shopCode,string category,string productName, int variantIndex)
        {
            // Sử dụng C# 8+ Switch Expression: Gọn gàng, dễ đọc và tối ưu hiệu năng hơn switch/case cũ.
            // Dùng ToLowerInvariant() để tránh lỗi liên quan đến ngôn ngữ/vùng miền (Culture).
            string shopPrefix = shopCode.Trim().ToLowerInvariant() switch
            {
                "terrafulness" => "TL",
                "shop2" => "SP2",
                _ => "SPX" // Default case
            };

            // Tái sử dụng hàm GetInitials tối ưu Zero-Allocation của chúng ta
            string categoryPart = category.GetInitials();
            string productPart = productName.GetInitials();

            // Kết hợp C# String Interpolation. 
            // KHÔNG dùng Guid Substring. Dùng index/counter để đảm bảo O(1) hiệu năng và 100% Unique.
            return $"{shopPrefix}-{categoryPart}-{productPart}-{variantIndex}";
        }
       
    }

}
