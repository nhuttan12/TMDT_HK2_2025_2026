using api.Controllers;
using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Models.Category;
using api.Repository;
using api.Repository.Categories;
using api.Utilities;
using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using static api.Controllers.CategoryController;

namespace api.Services.Categorys
{
    public interface ICategoryService
    {
        Task<Result<Category>> Create(CreateCategoryRequest request, CancellationToken cancellationToken = default);
        Task<Result<bool>> UpdateAsync(Guid id, UpdateCategoryRequest request, CancellationToken cancellationToken);
        Task<Result<bool>> DeleteAsync(Guid id, CancellationToken cancellationToken);
        Task<Result<PagedResult<CategoryResponseDto>>> GetAllAsync(PaginationRequestDto pagination, CancellationToken cancellationToken);
        Task<Result<CategoryResponseDto>> GetByName(string name, CancellationToken cancellationToken);
    }
    public class CategoryService(ICategoryRepo _categoryRepo, IMapper _mapper, IUnitOfWork _unitOfWork) : ICategoryService
    {
        public async Task<Result<Category>> Create(CreateCategoryRequest request, CancellationToken cancellationToken = default)
        {
            // Validate request
            if (string.IsNullOrEmpty(request.Name))
            {
                return Result<Category>.Failure(new Error("CategoryNameRequired", "Tên danh mục không được để trống.",ErrorType.Validation));
            }
            if(request.Name.Length > 100)
            {
                return Result<Category>.Failure(new Error("CategoryNameTooLong", "Tên danh mục không được vượt quá 100 ký tự.",ErrorType.Validation));
            }

            if(string.IsNullOrEmpty(request.ImageName))
            {
                return Result<Category>.Failure(new Error("CategoryImageRequired", "hình ảnh danh mục không được để trống.", ErrorType.Validation));
            }

            // validate data in DB
            var existingCategory = await _categoryRepo.GetByName(request.Name, cancellationToken);
            if (existingCategory != null)
            {
                return Result<Category>.Failure(new Error("CategoryNameExists", "Tên danh mục đã tồn tại.", ErrorType.Conflict));
            }
            // Create category
            var category = Category.Create(request.Name,request.Sku, request.ImageName);
            
            await _categoryRepo.CreateAsync(category.Value!, cancellationToken);
            await _unitOfWork.CommitAsync(cancellationToken);
            
            return Result<Category>.Success(category.Value!);
        }

        public async Task<Result<bool>> UpdateAsync(Guid id, UpdateCategoryRequest request, CancellationToken cancellationToken)
        {
            // Validate request
            if (string.IsNullOrEmpty(request.Name))
            {
                return Result<bool>.Failure(new Error("CategoryNameRequired", "Tên danh mục không được để trống.", ErrorType.Validation));
            }
            if (request.Name.Length > 100)
            {
                return Result<bool>.Failure(new Error("CategoryNameTooLong", "Tên danh mục không được vượt quá 100 ký tự.", ErrorType.Validation));
            }

            if (string.IsNullOrEmpty(request.ImageName))
            {
                return Result<bool>.Failure(new Error("CategoryImageRequired", "hình ảnh danh mục không được để trống.", ErrorType.Validation));
            }
            // logic
            var category = await _categoryRepo.GetByIdAsync(id, cancellationToken);
            if( category == null)
            {
                return Result<bool>.Failure(new Error("CategoryNotFound", "Danh mục không tồn tại.", ErrorType.NotFound));
            }
            category.UpdateDetails(request.Name, request.Sku, request.ImageName, DateTimeOffset.UtcNow);
            _categoryRepo.Update(category);
            await _unitOfWork.CommitAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        public async Task<Result<bool>> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var category = await _categoryRepo.GetByIdAsync(id, cancellationToken);

            if (category == null)
            {
                return Result<bool>.Failure(new Error("CategoryNotFound", "Danh mục không tồn tại.", ErrorType.NotFound));
            }
            _categoryRepo.Delete(category);

            // 3. Xả dữ liệu xuống SQL Server
            await _unitOfWork.CommitAsync(cancellationToken);

            return Result<bool>.Success(true);
        }

        public async Task<Result<PagedResult<CategoryResponseDto>>> GetAllAsync(PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var (items, totalCount) = await _categoryRepo.GetPagedAsync(pagination.PageNumber, pagination.PageSize, cancellationToken);

            // Mapping sang DTO để giấu Entity khỏi Presentation Layer
            var dtos = _mapper.Map<IReadOnlyCollection<CategoryResponseDto>>(items);

            var pagedResult = new PagedResult<CategoryResponseDto>(dtos, totalCount, pagination.PageNumber, pagination.PageSize);

            return Result<PagedResult<CategoryResponseDto>>.Success(pagedResult);
        }

        public async Task<Result<CategoryResponseDto>> GetByName(string name, CancellationToken cancellationToken)
        {
            // Validate input
            if (string.IsNullOrEmpty(name)) {
                return Result<CategoryResponseDto>.Failure(new Error("CategoryNameRequired", "Tên danh mục không được để trống.", ErrorType.Validation));
            } if (name.Length > 100)
            {
                return Result<CategoryResponseDto>.Failure(new Error("CategoryNameTooLong", "Tên danh mục không được vượt quá 100 ký tự.", ErrorType.Validation));
            }
            // validate logic
            var category = await _categoryRepo.GetByName(name, cancellationToken);
            if (category == null)
            {
                return Result<CategoryResponseDto>.Failure(new Error("CategoryNotFound", "Danh mục không tồn tại.", ErrorType.NotFound));
            }
            return Result<CategoryResponseDto>.Success(_mapper.Map<CategoryResponseDto>(category));
        }
     
    }
}
