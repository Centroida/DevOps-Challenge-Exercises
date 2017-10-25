using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.IE;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using Selenium.Tests.PageObjectsSelenium.Users;

namespace UITests
{
    /// <summary>
    /// Summary description for CodedUITest1
    /// </summary>
    [TestClass]
    [DeploymentItem("IEDriverServer.exe")]
    [DeploymentItem("ChromeDriver.exe")]
    [DeploymentItem("MicrosoftWebDriver.exe")]
    public class SmokeTestSelenium
    {
        const string _homePageUrl = "http://localhost:26641/";
        IWebDriver driver;

        public SmokeTestSelenium()
        {
        }

        [TestInitialize]
        public void Initialize()
        {
            driver = new InternetExplorerDriver();
            driver.Url = _homePageUrl;
            driver.Navigate();
        }
        [TestCleanup]
        public void CleanUp()
        {
            driver.Quit();
        }

        [TestMethod]
        public void HomepageContainsProductsSelenium()
        {
            var home = new HomePageSelenium(driver);


            var lastPge = home.
                ClickAdmin().
                Login(new Marcel());

            Assert.IsTrue(lastPge.IsLoggedIn(), "Expected to be logged in");
            Assert.IsTrue( home.PageHasProductsListed(),"Expected to have products on the home page and they are not found");

        }

        [TestMethod]

        public void CanAddProductToShoppingBasketAndCheckOutSelenium()
        {
            var home = new HomePageSelenium(driver);
            
            Assert.IsTrue(
            home.ClickFirstProduct()
                .AddToChart()
                .Checkout()
                .IsCheckoutPageValid(),"Expected checkout page would be valid after adding one item to the basket and click checkout");

        }

        #region Additional test attributes

        // You can use the following additional attributes as you write your tests:

        ////Use TestInitialize to run code before running each test 
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{        
        //    // To generate code for this test, select "Generate Code for Coded UI Test" from the shortcut menu and select one of the menu items.
        //}

        ////Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{        
        //    // To generate code for this test, select "Generate Code for Coded UI Test" from the shortcut menu and select one of the menu items.
        //}

        #endregion

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }
        private TestContext testContextInstance;
    }
}
