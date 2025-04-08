using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using FluentValidation;

namespace backend.Application.Validators
{
    public class TaskMoveEventValidator : AbstractValidator<TaskMoveEventDTO>
    {
        public TaskMoveEventValidator()
        {
            RuleFor(x => x.TaskId)
                .NotEmpty().WithMessage("TaskId is required");

            RuleFor(x => x.FromPosition)
                .NotEmpty().WithMessage("FromPosition is required");

            RuleFor(x => x.ToPosition)
                .NotEmpty().WithMessage("ToPosition is required");

            RuleFor(x => x.FromColumnId)
                .NotEmpty().WithMessage("FromColumnId is required");

            RuleFor(x => x.ToColumnId)
                .NotEmpty().WithMessage("ToColumnId is required");
        }
    }
}