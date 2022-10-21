using Microsoft.AspNetCore.Mvc;

namespace DovaPackAPI.ApiBehavior
{
    public class BehaviorBadRequest
    {
        public static void Parsing(ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = actionContext =>
            {
                var answer = new List<string>();
                foreach (var key in actionContext.ModelState.Keys)
                {
                    foreach (var error in actionContext.ModelState[key].Errors)
                    {
                        answer.Add($"{key}: {error.ErrorMessage}");
                    }
                }

                return new BadRequestObjectResult(answer);
            };
        }
    }
}