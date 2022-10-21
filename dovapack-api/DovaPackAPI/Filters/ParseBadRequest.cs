using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace DovaPackAPI.Filters
{
    public class ParseBadRequest : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Result is null)
            {
                return;
            }
            var codeStatus = ((IStatusCodeActionResult)context.Result).StatusCode;
            if (codeStatus == 400)
            {
                var answer = new List<string>();
                var answerCurrent = context.Result as BadRequestObjectResult;

                if (answerCurrent.Value is string)
                {
                    answer.Add(answerCurrent.Value.ToString());
                }
                else if (answerCurrent.Value is IEnumerable<IdentityError> errores)
                {
                    foreach (var error in errores)
                    {
                        answer.Add(error.Description);
                    }
                }
                else
                {
                    foreach (var key in context.ModelState.Keys)
                    {
                        foreach (var error in context.ModelState[key].Errors)
                        {
                            answer.Add($"{key}: {error.ErrorMessage}");
                        }
                    }
                }

                context.Result = new BadRequestObjectResult(answer);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}