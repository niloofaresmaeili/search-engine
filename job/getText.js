const client = require('../app/models/elasticConnection');
const chrome = require('selenium-webdriver/chrome');
const scholarly = require('scholarly');
const firefox = require('selenium-webdriver/firefox');
const { Builder } = require( 'selenium-webdriver' );
const { By , until} = require( 'selenium-webdriver' );


const screen = {
    width: 1920,
    height: 1080
}; 
//let options = new firefox.Options()
let options = new chrome.Options()
options.addArguments("-window-size=1920,1080");
options.addArguments("-headless");

function delay(t,val){
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(val)
      },t)
    });
};



async function selenium (){
    const count = await client.count({
        index: 'software',
        body: {
            query: {
                match: {
                    Tags: "AllFields"
                }
            }
        }
    });
    console.log(count)

    const body = await client.search({
        index: 'software',
        size: count.count,
        body: {
            query: {
                match: {
                    Tags: "AllFields"
                }
            }
        }
    });
    let j = 1;
    if(body.hits.hits.length){
        console.log(body.hits.hits.length,body.hits.hits[0]._source.Url)
        try{
            var driver = await new Builder().forBrowser('chrome')
                //.setFirefoxOptions(options)
                .setChromeOptions(options)
                .build(); // create a driver instance.
            console.log(driver);
            await driver.sleep(100); // driver sleep because of complete loading.
            for await (let i of await body.hits.hits){
                if(i._score.abstract == undefined){
                    let cited = i._source.NumberOfReference;
                    await driver.sleep(100);
                    console.log('num : ',j,' --> url : ',i._source.Url);
                    await driver.get(i._source.Url); // get url from env file then get the web page.
                    await driver.sleep(100); 
                    //let text = await (await driver.findElement( By.css( '.abstract' ) )).getText();#abs > blockquote
                    let text = await (await driver.findElement( By.css( '#abs > blockquote' ) )).getText()
                    await driver.sleep(200); 
                    let authors = await (await driver.findElement( By.xpath( '//div[@class="authors"]' ) )).getText()
                    await driver.sleep(200); 
                    console.log(text,authors);
                    console.log({
                        "url": i._source.Url,
                        "title": i._source.Title,
                        "abstract": text,
                        "authors":authors,
                        "rank": i._source.Rank,
                        "citation": i._source.NumberOfReference,
                        "year": i._source.DateOfSubmitted,
                        "tags": i._source.Tags,
                        "status": i._source.status
                    });
                    /*if(cited == 'NaN'){
                        let Sc = await scholarly.search(i._source.Url);
                        if(Sc.length){
                            cited = await Sc[0].numCitations;
                            console.log('cited :: ',cited);
                        }
                    }*/
                    await client.index({  
                        index: 'software',
                        type: 'ComputerScience',
                        body: {
                            "url": i._source.Url,
                            "title": i._source.Title,
                            "abstract": text,
                            "authors":authors,
                            "rank": i._source.Rank,
                            "citation": cited,
                            "year": i._source.DateOfSubmitted,
                            "tags": i._source.Tags,
                            "status": i._source.status
                        }
                    },function(err,resp,status) {
                        console.log('error : ',err);
                        console.log(resp);
                    });
                    console.log('Id must deleted ::: ',i._id)
                    let resOfDelete = await client.delete({
                        index: 'software',
                        type: 'ComputerScience',
                        id: i._id
                    })
                
                    console.log(resOfDelete);
                    await delay(5000);
                    j += 1;
                    //if(j == 2){break}
                }else{continue;}

            }
        }catch(e){
            console.error(e)
        }
    }else{
        console.log(body.hits.hits)
    }
}

selenium();
