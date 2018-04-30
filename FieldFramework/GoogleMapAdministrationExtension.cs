using Litium.Web.Administration;
using System.Collections.Generic;

namespace Litium.AddOns.GoogleMapFieldType.FieldFramework
{
    internal class GoogleMapAdministrationExtension : IAppExtension
    {
        public IEnumerable<string> AngularModules { get; } = null;
        public IEnumerable<string> ScriptFiles { get; } = new[]
        {
            "~/Litium/Client/Scripts/dist/fieldEditorGoogleMap.js",
            "~/Litium/Client/Scripts/dist/fieldEditorGoogleMapSetting.js"
        };
        public IEnumerable<string> StylesheetFiles { get; } = null;
    }
}
