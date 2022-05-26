const components = require( './components' );
const os = require( 'os' );


    /**
     *
     * do search on arxiv.
     * @param sub {enume}
     * @param fildType {enum}
     * @param term {string}
     * 
     * @return {object}
     * 
     */
const fullSearch = async (sub,fildType,term) => {

        let driver = await components.driver(); // call driver intializer.

        await components.subject( driver,sub ); // call search subject page component.

        await driver.sleep( 200 ); // sleep driver.

        await components.fullSearch( driver,fildType,term ); // call seach component

        await driver.sleep( 200 ); // sleep driver.

        let response = await components.getUrls( driver ); // call seach component

        let result = {
            status: 'complete',
            total_memory: os.totalmem(),
            free_memory: os.freemem(),
            uptime: os.uptime(),
            reciept: response
        }

        return result;

}


module.exports = {
    fullSearch
}