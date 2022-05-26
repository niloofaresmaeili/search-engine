const { By , until} = require( 'selenium-webdriver' );
const fs = require('fs');

async function findNextPage(driver) {
    try {
        await driver.sleep( 100 );
        await driver.findElement(By.xpath('//*[@id="main-container"]/div[2]/nav[1]/a[2]'));
        return true;
    }catch (e) {
        return false;
    }
}

module.exports = {
    getUrls: async function (driver){
        try{
            await driver.sleep( 100 );
            let flag = true;
            let result = []
            let i = 0;
            while(flag) {

                await driver.sleep(500);
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");

                await driver.sleep(100);
                //Find io of every link
                let io = await driver.findElements(By.xpath('//p[@class="list-title is-inline-block"]'));

                let link = await driver.findElements(By.partialLinkText('arXiv:'));
                let title = await driver.findElements(By.xpath('//p[@class="title is-5 mathjax"]'));
                let date = await driver.findElements(By.xpath('//p[@class="is-size-7"]'));
                let text = await (await driver.findElement( By.css( '#abs > blockquote' ) )).getText()
                let authors = await (await driver.findElement( By.xpath( '//div[@class="authors"]' ) )).getText()


                await driver.sleep(200);

                const tempLinkList = link.map(x => (x.getAttribute('href').then(link => link)));
                const tempTitle = title.map(x => (x.getText().then(t => t)));
                const tempDate = date.map(x => (x.getText().then(date => date)));
                const tempText = text.map(x => (x.getText().then(text => text)));
                const tempAuthors = authors.map(x => (x.getText().then(author => author)));

                const linkList = await Promise.all(tempLinkList);
                const titleList = await Promise.all(tempTitle);
                const dateList = await Promise.all(tempDate);
                const textList = await Promise.all(tempText);
                const authorsList = await Promise.all(tempAuthors);


                for (let i = 0; i < linkList.length; i++) {
                    result.push({
                        url: linkList[i],
                        title: titleList[i],
                        date:dateList[i],
                        text:textList[i],
                        authors:authorsList[i]
                    });
                }

                await driver.sleep(100);
                await driver.findElement(By.xpath('//*[@id="main-container"]/div[2]/nav[2]/a[2]')).click();
                await driver.sleep(100);
                flag = await findNextPage(driver);
                await driver.sleep(100);
            }
            await driver.close();

            let response = {
                status: 200,
                msg: 'search done!!!',
                Result: result
            };

            return response;

        }catch(e){
            driver.close();
            console.error(e);
        }
    }
}
