const { By , until} = require( 'selenium-webdriver' );


module.exports = {
    /**
     *
     * @param driver
     * @param fieldType
     * @param term
     * @returns {Promise<void>}
     */
    fullSearch: async function (driver,fieldType,term){

        try{

            await driver.sleep( 1000 );
            
            await driver.findElement( By.xpath( '//*[@id="searchtype"]' ) ).click();
            await driver.sleep( 100 );
            await driver.findElement( By.xpath( `/html/body/main/div[2]/form/div[1]/div[2]/select/option[${fieldType}]` ) ).click();


            await driver.sleep( 100 );
            // click on search btn
            await driver.findElement( By.xpath( '//*[@id="query"]' ) ).sendKeys( term );
            await driver.sleep( 100 );

            await driver.findElement( By.xpath( '/html/body/main/div[2]/form/div[1]/div[3]/button' ) ).click();
            await driver.sleep( 100 );

        } catch ( e ){
            driver.close();
            console.error(e);
        }

    }
};