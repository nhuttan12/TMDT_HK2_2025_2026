using api.Dtos.Carts.Response;
using api.Dtos.Coupons.Response;
using api.Dtos.Inventory.Response;
using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Dtos.Promotiions.Response;
using api.Dtos.Shops.Response;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Extensions;
using api.model.Products;
using api.Models;
using api.Models.Cards;
using api.Models.Category;
using api.Models.Products;
using api.Models.Shops;
using api.Models.Users;
using AutoMapper;

namespace api.Utilities
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            UserMapping();
            UserDetailMapping();
            CategoryMapping();
            ProductMapping();
            VariantMapping();
            CouponMapping();
            PromotionMapping();
            ShopMapping();
            CartMapping();
            CartItemmapping();
            InventoryMapping();

            CreateMap(typeof(PagedResult<>), typeof(PagedResult<>))
            .ConvertUsing(typeof(PagedResultConverter<,>));
        }

        /**
          * User Mapping
          */
        private void UserMapping()
        {
            // dto to user
            CreateMap<UserCreateDto, Models.User>();
            CreateMap<UserUpdateDto, Models.User>();

            // user to dto
            CreateMap<User, UserInfoDTO>()
                .ForMember(dest => dest.UserExternalLogin, opt => opt.MapFrom(src => src.UserExternalLogin.Provider));
        }
        private void UserDetailMapping()
        {
            CreateMap<UserDetail, UserDetailDto>();
        }
        private void CategoryMapping()
        {
            // dto to category
            CreateMap<CreateCategoryRequest, Category>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            // category to dto
            CreateMap<Category, CategoryResponseDto>();
        }
        private void ProductMapping()
        {
            // dto to product
            CreateMap<ProductCreateDto, model.Products.Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Rating, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.Detail, opt => opt.Ignore())
                .ForMember(dest => dest.Variants, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            CreateMap<ProductUpdateDto, model.Products.Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.BasePrice, opt => opt.Ignore())
                .ForMember(dest => dest.CategoryId, opt => opt.Ignore());
            // product to dto
            CreateMap<Product, ProductResponseDto>();
            CreateMap<Product, ProductDetailResponseDto>()
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Detail!.DescriptionHtml));
        }

        private void VariantMapping()
        {
            // dto to variant
            CreateMap<VariantCreateDto, Variant>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<VariantUpdateDto, Variant>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.ProductId, opt => opt.Ignore());
            // variant to dto
            CreateMap<Variant, VariantResponseDto>()
                .ForCtorParam("QuantityInStock", opt => opt.MapFrom(src => 100));
        }

        private void CouponMapping()
        {
            CreateMap<RawAdminCouponPaging, AdminCoupon>();
            CreateMap<RawUserCouponPaging, UserCoupon>();
        }

        private void PromotionMapping()
        {
            CreateMap<RawShopPromotion, ShopPromotion>();
        }

        private void ShopMapping()
        {
            CreateMap<RawShopAdmin, ShopAdmin>();

            CreateMap<Shop, ShopDto>();
        }

        private void CartMapping()
        {
            CreateMap<Cart,CartResponseDto>()
                .ForMember(d => d.CartItems , o => o.MapFrom(src => src.Items));

            CreateMap<CartResponseDto, Cart>()
                .ForMember(d => d.Items, o => o.MapFrom(src => src.CartItems));
        }
        private void CartItemmapping()
        {
            CreateMap<CartItem, CartItemResponseDto>()
                 .ForMember(d => d.ProductId, o => o.MapFrom(src => src.Variant.Product.Id))
                 .ForMember(d => d.Sku, o => o.MapFrom(src => src.Variant.Sku))
                 .ForMember(d => d.ProductName, o => o.MapFrom(src => src.Variant.Product.Name))
                 .ForMember(d => d.ImageUrl, o => o.MapFrom(src => src.Variant.ImageUrl))
                 .ForMember(d => d.UnitPrice, o => o.MapFrom(src => src.Variant.CostPrice));

            CreateMap<CartItemResponseDto, CartItem>();
        }

        private void InventoryMapping()
        {
            CreateMap<RawGoodsReceiptPagingDto, GoodsReceiptPagingDtoResponse>();
            CreateMap<RawProductBatchPagingDto, ProductBatchPagingDtoResponse>();
            CreateMap<RawProductInStockDto, ProductInStockDtoResponse>();
            CreateMap<RawGoodsSupplierDto, GoodsSupplierResponseDto>();
            CreateMap<RawProductBySupplierId, ProductBySupplierIdResponse>();
            CreateMap<RawSupplierOptionDto, SupplierOptionResponseDto>();
            CreateMap<RawGoodsIssue, GoodsIssueResponse>();
        }
}
}
