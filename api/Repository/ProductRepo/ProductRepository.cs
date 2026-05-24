using api.model.Products;
using System.Linq.Expressions;

namespace api.Repository.ProductRepo
{
    public interface IProductRepository : IBaseRepository<Product>
    {
    }
    public class ProductRepository : IProductRepository
    {
        public Task CreateAsync(Product entity, CancellationToken ct = default)
        {
            throw new NotImplementedException();
        }

        public void Delete(Product entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Product> FindAll(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Product> FindByCondition(Expression<Func<Product, bool>> expression, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public void Update(Product entity)
        {
            throw new NotImplementedException();
        }
    }
}
