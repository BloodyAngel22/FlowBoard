using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using FluentValidation;

namespace backend.Application.Validators
{
    public class ColumnMoveEventValidator : AbstractValidator<ColumnMoveEventDTO>
    {
        public ColumnMoveEventValidator()
        {
            RuleFor(x => x.ColumnId)
                .NotEmpty().WithMessage("ColumnId is required");

            RuleFor(x => x.FromPosition)
                .Must(_ => true).WithMessage("FromPosition is required");

            RuleFor(x => x.ToPosition)
                .Must(_ => true).WithMessage("ToPosition is required");
        }
    }
}