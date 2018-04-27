using Litium.FieldFramework;
using System.Collections.Generic;
using System.Linq;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    public class GoogleMapFieldTypeMetadata : FieldTypeMetadataBase
    {
        public override string Id => FieldTypeConstants.GoogleMap;

        public override IFieldType CreateInstance(IFieldDefinition fieldDefinition)
        {
            var item = new LocationFieldType();
            item.Init(fieldDefinition);
            return item;
        }

        public class LocationFieldType : FieldTypeBase
        {
            public override object GetValue(ICollection<FieldData> fieldDatas) => fieldDatas.FirstOrDefault()?.ObjectValue;
            
            public override ICollection<FieldData> PersistFieldData(object item) => PersistFieldDataInternal(item);

            protected override ICollection<FieldData> PersistFieldDataInternal(object item) => new[] { new FieldData { ObjectValue = (Location)item } };
        }

        public class Location
        {
            public virtual double Lat { get; set; }
            public virtual double Lng { get; set; }
        }
    }
}
