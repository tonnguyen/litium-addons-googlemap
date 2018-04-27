using Litium.FieldFramework.Converters;
using Litium.Runtime.DependencyInjection;
using Litium.Web.Administration.FieldFramework;
using Newtonsoft.Json.Linq;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    [Service(Name = FieldTypeConstants.GoogleMap)]
    internal class GoogleMapEditFieldTypeConverter : IEditFieldTypeConverter
    {
        private readonly IJsonFieldTypeConverter _jsonConverter;

        public GoogleMapEditFieldTypeConverter(NamedServiceFactory<IJsonFieldTypeConverter> serviceFactory)
        {
            _jsonConverter = serviceFactory.GetRequiredService(FieldTypeConstants.GoogleMap);
        }

        public object ConvertFromEditValue(EditFieldTypeConverterArgs args, JToken item) =>
            _jsonConverter.ConvertFromJsonValue(new JsonFieldTypeConverterArgs(args.FieldDefinition, args.CultureInfo), item);

        public JToken ConvertToEditValue(EditFieldTypeConverterArgs args, object item) =>
            _jsonConverter.ConvertToJsonValue(new JsonFieldTypeConverterArgs(args.FieldDefinition, args.CultureInfo), item);

        public object CreateOptionsModel() => null;

        public string EditControllerName { get; } = null;
        public string EditControllerTemplate { get; } = null;
        public string SettingsControllerName { get; } = null;
        public string SettingsControllerTemplate { get; } = null;

        public string EditComponentName => "GoogleMapAddOn#FieldEditorGoogleMap";
        public string SettingsComponentName => string.Empty;
    }
}