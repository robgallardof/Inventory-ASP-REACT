using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace DovaPackAPI.Utils

{
    public class TypeBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var nameProperty = bindingContext.ModelName;
            var value = bindingContext.ValueProvider.GetValue(nameProperty);

            if (value == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            try
            {
                var valueDeserialize = JsonConvert.DeserializeObject<T>(value.FirstValue);
                bindingContext.Result = ModelBindingResult.Success(valueDeserialize);
            }
            catch
            {
                bindingContext.ModelState.TryAddModelError(nameProperty, "El valor dado no es del tipo adecuado");
            }

            return Task.CompletedTask;
        }
    }
}