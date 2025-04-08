using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using FluentValidation;

namespace backend.Application.Validators
{
    public class TaskValidator : AbstractValidator<TaskDTO>
    {
        public TaskValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MinimumLength(3).WithMessage("Name must be at least 3 characters long")
                .MaximumLength(50).WithMessage("Name must be at most 50 characters long");

            RuleFor(x => x.Priority)
                .NotEmpty().WithMessage("Priority is required");

            RuleFor(x => x.Description)
                .MinimumLength(2).WithMessage("Description must be at least 2 characters long")
                .MaximumLength(1000).WithMessage("Description must be at most 1000 characters long");
        }
    }
}