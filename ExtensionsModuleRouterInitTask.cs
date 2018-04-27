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
#if DEBUG && !BUILD_PACKAGE
            PackageManager.Register("~/Litium/Client/Scripts/dist", new DirectoryInfo($"{HostingEnvironment.MapPath("~/")}../{GetType().Assembly.GetName().Name}/dist").FullName);
#else
            PackageManager.Register("~/Litium/Client/Scripts", GetType().Assembly);
#endif
        }
    }
}
