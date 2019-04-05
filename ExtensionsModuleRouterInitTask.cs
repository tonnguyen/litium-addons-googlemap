using Litium.Owin.Lifecycle;
using Litium.Studio.Packages;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Hosting;
using System.IO;

namespace Litium.AddOns.GoogleMapFieldType
{
    public class ExtensionsModuleRouterInitTask : IInitTask
    {
        public void Init(IEnumerable<Assembly> assemblies)
        {
            var directoryInfo = new DirectoryInfo($"{HostingEnvironment.MapPath("~/")}../{GetType().Assembly.GetName().Name}/dist");
            if (directoryInfo.Exists && directoryInfo.GetFiles("GoogleMapAddOn.js").Length > 0)
            {
                PackageManager.Register("~/Litium/Client/Scripts/dist", directoryInfo.FullName);
                return;
            }
            PackageManager.Register("~/Litium/Client/Scripts", GetType().Assembly);
        }
    }
}
