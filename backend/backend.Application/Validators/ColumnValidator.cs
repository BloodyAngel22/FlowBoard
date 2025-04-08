using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using FluentValidation;

namespace backend.Application.Validators
{
    public class ColumnValidator : AbstractValidator<ColumnDTO>
    {
        public ColumnValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MinimumLength(3).WithMessage("Name must be at least 3 characters long")
                .MaximumLength(50).WithMessage("Name must be at most 50 characters long");
        }
    }
}