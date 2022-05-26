const { By , until, select} = require( 'selenium-webdriver' );
const fs = require('fs');

module.exports = {
    searchRank: async function (driver,url){
       
        // This is for search rank
        /**
         * @param driver
         * @param url
         */
        try{
            await driver.sleep( 500 );
            await driver.findElement( By.xpath( '//*[@id="gs_hdr_tsi"]' ) ).clear();
            await driver.sleep( 10 );
            await driver.findElement( By.xpath( '//*[@id="gs_hdr_tsi"]' ) ).sendKeys( url );
            await driver.sleep( 10 );
            await driver.sleep( 10 );
            await driver.findElement( By.xpath( '//*[@id="gs_hdr_tsb"]' ) ).click();
            await driver.sleep( 500 );
            try {
                await driver.findElement(By.xpath('/html/body/div[1]/div[10]/div[2]/div[2]/div[2]/div/div[2]/h3'));
            }catch (e) {
                console.error("can not find data for this url!")
            }
	        
        } catch ( e ){
            console.error(e);
        }
    }
};