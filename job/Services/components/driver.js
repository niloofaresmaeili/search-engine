const { Builder } = require( 'selenium-webdriver' );
const { options } = require('./options');
const { By , until} = require( 'selenium-webdriver' );
const process = require('process')
require('dotenv').config();

module.exports = {
    /**
     *
     *
     * @returns {Promise<object>} driver
     * driver initialize
     */
    driver: async function (){
        try {
            console.log(process.env.BROWSER_NAME,process.env.ARXIV_URL)
            var driver = await new Builder().forBrowser('chrome')
                //.setFirefoxOptions(options)
                .setChromeOptions(options)
                .build(); // create a driver instance.

            await driver.sleep(500); // driver sleep because of complete loading.
            await driver.get('https://arxiv.org/'); // get url from env file then get the web page.
            await driver.sleep(500); // driver sleep because of complete loading.

            return driver;
        } catch ( e ){
            console.error( e ); // console log for debuging.
        }
    }
};
