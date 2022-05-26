const components = require( './components' );
const os = require( 'os' );



    /**
     *
     * do search on google scholar.
     * @param urls {object}
     * @return {object}
     * 
     */
const rankGeter = async (urls) => {

        let driver = await components.rankDriver(); // call driver intializer.
        let Rank = [];
        let j = 77
        for(let i=0 ;i<urls.length; i++){
            await driver.sleep( 500 );

            await components.searchRank( driver,urls[i].url ); // call search subject page component.

            await driver.sleep( 500 ); // sleep driver.

            let res = await components.getReferral(driver); // call seach component

            await driver.sleep( 100 );

            let result = {
                status: 'complete',
                total_memory: os.totalmem(),
                free_memory: os.freemem(),
                uptime: os.uptime(),
                reciept: res
            }

            let numReferrals ;

            if(typeof(result.reciept) == 'string'){
                numReferrals = parseInt((result.reciept).split(' ')[2])
            }else{
                numReferrals = result.reciept
            }

            let newArticle = {
                "url": `${urls[i].url}`,
                "title": `${urls[i].title}`,
                "date": `${urls[i].date}`,
                "rank": null,
                "numReferrals": `${numReferrals}`
            };

            await Rank.push(newArticle)
        }

        return Rank;

}


module.exports = {
    rankGeter
}