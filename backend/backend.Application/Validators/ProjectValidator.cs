using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using FluentValidation;

namespace backend.Application.Validators
{
    public class ProjectValidator : AbstractValidator<ProjectDTO>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MinimumLength(3).WithMessage("Name must be at least 3 characters long")
                .MaximumLength(50).WithMessage("Name must be at most 50 characters long");

            RuleFor(x => x.Description)
                .MinimumLength(2).WithMessage("Description must be at least 2 characters long")
                .MaximumLength(100).WithMessage("Description must be at most 100 characters long");
        }
    }
}