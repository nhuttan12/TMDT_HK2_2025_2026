namespace api.Dtos.Inventory.Response
{
    public class GoodsStockSummaryDto
    {
        public int AvailableProductQuantity { get; set; }
        public int HiddenOrBlockedProductQuantity { get; set; }
        public int OutOfStockProductQuantity { get; set; }
        public int LowStockProductQuantity { get; set; }
        public int OrderedVariant { get; set; }
    }
}
