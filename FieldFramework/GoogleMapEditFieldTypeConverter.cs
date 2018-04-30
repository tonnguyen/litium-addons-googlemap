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

        public object CreateOptionsModel() => new GoogleMapFieldTypeMetadata.Option();

        public string EditControllerName { get; } = "fieldEditorGoogleMap";
        public string EditControllerTemplate { get; } = "~/Litium/Client/Scripts/dist/fieldEditorGoogleMap.html";
        public string SettingsControllerName { get; } = "fieldEditorGoogleMapSetting";
        public string SettingsControllerTemplate { get; } = "~/Litium/Client/Scripts/dist/fieldEditorGoogleMapSetting.html";

        public string EditComponentName => "GoogleMapAddOn#FieldEditorGoogleMap";
        public string SettingsComponentName => "GoogleMapAddOn#FieldEditorGoogleMapSetting";
    }
}