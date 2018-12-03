using Litium.FieldFramework;
using Litium.Runtime.DependencyInjection;
using Litium.Web.Administration.FieldFramework;
using Newtonsoft.Json.Linq;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    [Service(Name = FieldTypeConstants.GoogleMap)]
    internal class GoogleMapEditFieldTypeConverter : IEditFieldTypeConverter
    {
        private readonly IFieldTypeMetadata _fieldTypeMetadata;

        public GoogleMapEditFieldTypeConverter(FieldTypeMetadataService fieldTypeMetadataService)
        {
            _fieldTypeMetadata = fieldTypeMetadataService.Get(FieldTypeConstants.GoogleMap);
        }

        public object CreateOptionsModel() => new GoogleMapFieldTypeMetadata.Option();

        public virtual object ConvertFromEditValue(EditFieldTypeConverterArgs args, JToken item)
        {
            var fieldTypeInstance = _fieldTypeMetadata.CreateInstance(args.FieldDefinition);
            return fieldTypeInstance.ConvertFromJsonValue(item.ToObject(_fieldTypeMetadata.JsonType));
        }

        public virtual JToken ConvertToEditValue(EditFieldTypeConverterArgs args, object item)
        {
            var fieldTypeInstance = _fieldTypeMetadata.CreateInstance(args.FieldDefinition);
            var value = fieldTypeInstance.ConvertToJsonValue(item);
            if (value == null)
            {
                return JValue.CreateNull();
            }
            return JToken.FromObject(value);
        }

        public string EditControllerName { get; } = "fieldEditorGoogleMap";
        public string EditControllerTemplate { get; } = "~/Litium/Client/Scripts/dist/fieldEditorGoogleMap.html";
        public string SettingsControllerName { get; } = "fieldEditorGoogleMapSetting";
        public string SettingsControllerTemplate { get; } = "~/Litium/Client/Scripts/dist/fieldEditorGoogleMapSetting.html";

        public string EditComponentName => "GoogleMapAddOn#FieldEditorGoogleMap";
        public string SettingsComponentName => "GoogleMapAddOn#FieldEditorGoogleMapSetting";
    }
}