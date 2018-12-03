using Litium.ComponentModel;
using Litium.FieldFramework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    public class GoogleMapFieldTypeMetadata : FieldTypeMetadataBase
    {
        public override string Id => FieldTypeConstants.GoogleMap;

        public override Type JsonType => typeof(Location);

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

        public class Location : ObjectBase
        {
            private double _lat;
            public virtual double Lat
            {
                get => _lat;
                set => _lat = this.ThrowIfReadOnly(value);
            }

            private double _lng;
            public virtual double Lng
            {
                get => _lng;
                set => _lng = this.ThrowIfReadOnly(value);
            }
        }

        public class Option : ObjectBase, IFieldTypeOptionChangeDetector
        {
            private string _mapApiKey;
            public virtual string MapApiKey
            {
                get => _mapApiKey;
                set => _mapApiKey = this.ThrowIfReadOnly(value);
            }

            bool IFieldTypeOptionChangeDetector.ShouldEvictCache(object originalItem)
            => MapApiKey != (originalItem as Option)?.MapApiKey;
        }
    }
}
