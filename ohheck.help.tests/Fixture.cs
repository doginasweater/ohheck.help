using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore;

namespace ohheck.help.tests
{
    public class Fixture<TStartup> : IDisposable
    {
        private const string SolutionName = "ohheck.help.sln";
        private readonly TestServer _server;

        public Fixture() : this(Path.Combine("")) { }

        protected Fixture(string solutionRelativeTargetProjectParentDir)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;
            var contentRoot = GetProjectPath(solutionRelativeTargetProjectParentDir, startupAssembly);

            var builder = WebHost
                .CreateDefaultBuilder(new string[] { })
                .UseContentRoot(contentRoot)
                .UseStartup<Startup>();

            _server = new TestServer(builder);

            Client = _server.CreateClient();
            Client.BaseAddress = new Uri("https://localhost:43434");
        }

        public HttpClient Client { get; }

        public void Dispose()
        {
            Client.Dispose();
            _server.Dispose();
        }

        private static string GetProjectPath(string solutionRelativePath, Assembly startupAssembly)
        {
            var projectName = startupAssembly.GetName().Name;

            var applicationBasePath = Environment.CurrentDirectory;

            var directoryInfo = new DirectoryInfo(applicationBasePath);

            do
            {
                var solutionFileInfo = new FileInfo(Path.Combine(directoryInfo.FullName, SolutionName));

                if (solutionFileInfo.Exists)
                {
                    return Path.GetFullPath(Path.Combine(directoryInfo.FullName, solutionRelativePath, projectName));
                }

                directoryInfo = directoryInfo.Parent;
            }
            while (directoryInfo.Parent != null);

            throw new Exception($"Solution root could not be located using application root {applicationBasePath}");
        }
    }
}
