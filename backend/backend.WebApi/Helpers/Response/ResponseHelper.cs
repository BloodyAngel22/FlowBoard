using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.WebApi.Helpers.Response
{
    public static class ResponseHelper
    {
        public static IActionResult Ok<T>(T data)
        {
            var response = new SuccessResponse<T>
            {
                Data = data
            };
            return new OkObjectResult(response);
        }

        public static IActionResult Error()
        {
            var response = new ErrorResponse
            {
                Success = false,
            };
            return new BadRequestObjectResult(response);
        }
    }
}