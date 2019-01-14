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
            var location = new WithApiKeyLocation(item as GoogleMapFieldTypeMetadata.Location)
            {
                MapApiKey = (args.FieldDefinition.Option as GoogleMapFieldTypeMetadata.Option).MapApiKey
            };
            var value = fieldTypeInstance.ConvertToJsonValue(location);
            if (value == null)
            {
                return JValue.CreateNull();
            }
            return JToken.FromObject(value);
        }

        class WithApiKeyLocation : GoogleMapFieldTypeMetadata.Location
{
            public WithApiKeyLocation(GoogleMapFieldTypeMetadata.Location location)
            {
                if (location == null)
                {
                    return;
                }
                Lat = location.Lat;
                Lng = location.Lng;
            }

            public string MapApiKey { get; set; }
        }

        public string EditControllerName { get; } = null;
        public string EditControllerTemplate { get; } = null;
        public string SettingsControllerName { get; } = null;
        public string SettingsControllerTemplate { get; } = null;

        public string EditComponentName => "GoogleMapAddOn#FieldEditorGoogleMap";
        public string SettingsComponentName => "GoogleMapAddOn#FieldEditorGoogleMapSetting";
    }
}