using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace UITests
{
    internal class LoginSelenium
    {
        private IWebDriver driver;

        public LoginSelenium(IWebDriver driver)
        {
            this.driver = driver;
        }

        public LoginSelenium Login(IUser user)
        {
            var nameElement = FindNameElement();
            nameElement.SendKeys(user.Name);
            var passwordElement = FindPasswordElement();
            passwordElement.SendKeys(user.Password);
            var loginButton = FindLoginButton();
            loginButton.Click();
            return this;
        }

        private IWebElement FindLoginButton()
        {
            return driver.FindElement(By.LinkText("Log On"));
        }
        
        private IWebElement FindPasswordElement()
        {
            return driver.FindElement(By.Id("Password"));
        }

        private IWebElement FindNameElement()
        {
            return driver.FindElement(By.Id("UserName"));
        }

        internal bool IsCheckoutPageValid()
        {
            
            var element = driver.FindElement(By.CssSelector("#main > form:nth-child(6) > div:nth-child(1) > fieldset:nth-child(1) > p:nth-child(7) > input:nth-child(1)"));
            return element != null;
        }

        internal bool IsLoggedIn()
        {
            return true;
        }
    }
}