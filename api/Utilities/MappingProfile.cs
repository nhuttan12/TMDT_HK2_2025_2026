using AutoMapper;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Models;
using api.Controllers;
using api.Models.Category;
using api.Dtos.Products.Respones;
using api.Dtos.Products.Request;

namespace api.Utilities
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            UserMapping();
            CategoryMapping();


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
    }
}
