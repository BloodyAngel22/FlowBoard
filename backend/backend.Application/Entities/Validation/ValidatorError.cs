using FluentValidation.Results;

namespace backend.Application.Entities.Validation
{
	public class ValidatorError
	{
		public required string PropertyName { get; set; }
		public required string ErrorMessage { get; set; }

		public static List<ValidatorError> GetErrors(ValidationResult validationResult)
		{
			return validationResult.Errors.Select(x => new ValidatorError
			{
				PropertyName = x.PropertyName,
				ErrorMessage = x.ErrorMessage
			}).ToList();
		}

		public static string GetErrorsString(List<ValidatorError> errors)
		{
			return string.Join(", ", errors.Select(e => $"{e.PropertyName}: {e.ErrorMessage}"));
		}
    }
}