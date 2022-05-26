const searchService = require('./Services/searchService');
const rankService = require('./Services/rankService');
const client = require('../app/models/elasticConnection');
const fs = require('fs');

const os = require( 'os' );
const process = require('process');

  /**
     *
     *
     * @param {object} req
     * @param {object} res
     * @param {Function} next
     */
async function startJob(sub,fieldType,term) {

    try{
        let search = await searchService.fullSearch(sub,fieldType,term);

        for(let data of search) {
            await client.index({
                index: 'software',
                type: 'ComputerScience',
                body: {
                    "url": data.url,
                    "title": data.title,
                    "abstract": data.text,
                    "authors": data.authors,
                    "rank": '',
                    "citation": '',
                    "year": data.date,
                    "tags": fieldType,
                    "status": "not have citation."
                }
            }, function (err, resp, status) {
                console.error('error : ', err);
            });
        }



    }catch(e){
        console.log('error : ',e)
    }

}

startJob(4,1,"Node.js");