using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.model.Products;
using api.Models;
using api.Models.Category;
using AutoMapper;

namespace api.Utilities
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            UserMapping();
            CategoryMapping();
            ProductMapping();


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
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
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
        }
    }
}
