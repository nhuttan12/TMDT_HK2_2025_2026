using AutoMapper;
using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Models;

namespace demo1.Utilities
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
