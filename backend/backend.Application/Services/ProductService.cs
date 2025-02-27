using AutoMapper;
using FluentValidation;
using backend.Core.Models;
using backend.Core.IRepositories;

namespace backend.Application.Services
{
    // public class ProductService
    // {
	// 	private readonly IRepository<Product, Guid> _productRepository;
	// 	private readonly IMapper _mapper;
	// 	private readonly IValidator<ProductDTO> _validator;

	// 	public ProductService(IRepository<Product, Guid> productRepository, IValidator<ProductDTO> validator, IMapper mapper)
	// 	{
	// 		_productRepository = productRepository;
	// 		_validator = validator;
	// 		_mapper = mapper;
	// 	}

	// 	public async Task<IEnumerable<Product>> GetProducts()
	// 	{
	// 		try
	// 		{
	// 			return await _productRepository.GetAllAsync();
	// 		}
	// 		catch (Exception)
	// 		{
	// 			throw;
	// 		}
	// 	}

	// 	public async Task<Product?> GetProduct(Guid id)
	// 	{
	// 		try
	// 		{
	// 			return await _productRepository.GetAsync(id) ?? null;
	// 		}
	// 		catch (Exception)
	// 		{
	// 			throw;
	// 		}
	// 	}

	// 	public async Task CreateProduct(ProductDTO product)
	// 	{
	// 		try
	// 		{
	// 			var validationResult = await _validator.ValidateAsync(product);

	// 			if (!validationResult.IsValid)
	// 			{
	// 				throw new ValidateException(ValidatorError.GetErrors(validationResult));
	// 			}

	// 			var mappedProduct = _mapper.Map<Product>(product);
	// 			await _productRepository.AddAsync(mappedProduct);
	// 		}
	// 		catch (Exception)
	// 		{
	// 			throw;
	// 		}
	// 	}

	// 	public async Task UpdateProduct(Guid id, ProductDTO product)
	// 	{
	// 		try
	// 		{
	// 			var mappedProduct = _mapper.Map<Product>(product);
	// 			await _productRepository.UpdateAsync(id, mappedProduct);
	// 		}
	// 		catch (Exception)
	// 		{
	// 			throw;
	// 		}
	// 	}

	// 	public async Task DeleteProduct(Guid id)
	// 	{
	// 		try
	// 		{
	// 			await _productRepository.DeleteAsync(id);
	// 		}
	// 		catch (Exception)
	// 		{
	// 			throw;
	// 		}
	// 	}
    // }
}