using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.DTOs
{
    public class ListTaskDTO
    {
        public required string Name { get; set; }
        public required int Position { get; set; }
        public required bool IsFinished { get; set; } = false;
    }
}