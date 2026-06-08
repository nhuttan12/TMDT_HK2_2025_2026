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

        public async Task SeedAsync(MyAppDbContext dbContext, string contentRootPath, ILogger logger, CancellationToken cancellationToken)
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
                Guid shopId = Guid.Parse("0DBF433E-F36B-1410-8DC2-0031A65E736E");

                // Product id tạm, để có j fix sau
                var productId = Guid.NewGuid();

                // 3. Khởi tạo Product qua Factory Method an toàn
                var productResult = Product.Create(
                    productId,
                    item.Name,
                    item.Price,
                    item.Images[0],
                    categoryId,
                    shopId,
                    // Fix tạm thời, có j mốt chỉnh sau
                    item.Price * 0.6m,
                    $"SKU-{Guid.NewGuid().ToString()[..8].ToUpper()}",
                    "Mô tả sản phẩm đang được cập nhật.",
                    "Tóm tắt sản phẩm đang được cập nhật."
                );

                if (productResult.IsFailure)
                {
                    logger.LogWarning($"[ProductSeeder] Lỗi tạo sản phẩm '{item.Name}': {productResult.Error.Message}");
                    continue;
                }

                var product = productResult.Value!;

                // 4. Set chi tiết sản phẩm
                product.SetDetail(productId, item.Summary, item.DescriptionHTML);

                // 5. XỬ LÝ LOGIC BIẾN THỂ (VARIANTS)
                var firstImage = item.Images.FirstOrDefault() ?? string.Empty;

                if (item.Variants == null || item.Variants.Count == 0)
                {
                    // TRƯỜNG HỢP 1: Không có Variant -> Tự tạo 1 Variant mặc định
                    // Lưu ý: JSON của bạn chỉ có 1 giá (price). Ta tạm dùng nó cho cả CostPrice và SellPrice
                    var addVariantResult = product.AddVariant(
                        name: "Mặc định",
                        sku: string.IsNullOrWhiteSpace(item.Sku) ? $"SKU-{Guid.NewGuid().ToString()[..6]}" : item.Sku,
                        sellPrice: item.Price,
                        costPrice: item.Price * 0.7m, // Giả định giá vốn = 70% giá bán để test
                        imageUrl: firstImage
                    );

                    if (addVariantResult.IsFailure)
                        logger.LogWarning($"[ProductSeeder] Lỗi tạo Variant mặc định cho '{item.Name}': {addVariantResult.Error.Message}");
                }
                else
                {
                    // TRƯỜNG HỢP 2: Có Variants -> Duyệt mảng JSON để tạo
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
    }
}
