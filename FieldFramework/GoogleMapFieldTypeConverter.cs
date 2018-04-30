using Litium.FieldFramework.Converters;
using Litium.Runtime.DependencyInjection;
using Newtonsoft.Json.Linq;
using static Litium.AddOns.GoogleMapFieldType.FieldFramework.GoogleMapFieldTypeMetadata;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    [Service(Name = FieldTypeConstants.GoogleMap)]
    internal class GoogleMapFieldTypeConverter : IJsonFieldTypeConverter
    {
        public object ConvertFromJsonValue(JsonFieldTypeConverterArgs args, JToken item) => item?.ToObject<Location>();
        public JToken ConvertToJsonValue(JsonFieldTypeConverterArgs args, object item) => JToken.FromObject(item);
    }
}