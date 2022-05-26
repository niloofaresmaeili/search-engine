const { By , until, select} = require( 'selenium-webdriver' );


module.exports = {
    subject: async function (driver, sub){
       
        // This is for search subject
        /**
         * @param driver
         * @param sub
         */
        try{
            await driver.findElement( By.xpath( '//*[@id="search-category"]' ) ).click();

            await driver.sleep( 100 );
            // select on subject
            await driver.findElement( By.xpath( `/html/body/div[1]/main/div/div/div[1]/form/select/option[${sub}]` ) ).click();

            await driver.sleep( 100 );
            // click on search btn

            await driver.findElement( By.xpath( '//*[@id="adv-search-btn"]' ) ).click();

            await driver.sleep( 100 );
	        
        } catch ( e ){
            driver.close();
            console.error(e);
        }

    }
};