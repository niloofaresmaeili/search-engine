const { Builder } = require( 'selenium-webdriver' );
const { options } = require('./options');
const { By , until} = require( 'selenium-webdriver' );
const process = require('process');
require('dotenv').config();

module.exports = {
    /**
     *
     *
     * @returns {Promise<object>} driver
     * driver initialize
     */
    rankDriver: async function (){
        try {

            let driver = await new Builder().forBrowser("chrome")
                .setChromeOptions(options)
                .build(); // create a driver instance.

            await driver.sleep(500); // driver sleep because of complete loading.

            await driver.get("https://scholar.google.com/"); // get url from env file then get the web page.

            await driver.sleep(500); // driver sleep because of complete loading.

            return driver;
        } catch ( e ){
            console.error('error on rank driver : ',e );
        }
    }
};
