using System;
using ohheck.help.Controllers;
using Xunit;

namespace ohheck.help.tests {
    public class Basic {
        [Fact]
        public void DoesNotThrow() {
            var controller = new HomeController();
            var result = controller.Index();
            Assert.NotNull(result);
        }
    }
}
