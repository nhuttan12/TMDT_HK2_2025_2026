using AutoMapper;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Models;

namespace api.Utilities
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            UserMapping();


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
    }
}
