const { By , until, select} = require( 'selenium-webdriver' );

module.exports = {
    getReferral: async function (driver){
        try{
            await driver.sleep( 500 );
            let num = await driver.findElement( By.partialLinkText('Cited by') ).getAttribute("textContent");
            return num
	        
        } catch ( e ){
            let num = 0;
            return num;
            driver.close();
        }

    }
}