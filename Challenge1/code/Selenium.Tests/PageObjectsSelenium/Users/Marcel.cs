using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UITests;

namespace Selenium.Tests.PageObjectsSelenium.Users
{
    class Marcel : IUser
    {
        public Marcel()
        {
            Name = "Marcel";
            Password = "Secret";
        }
        public string Name
        {
            get;set;
        }

        public string Password
        {
            get;set;
        }
    }
}
