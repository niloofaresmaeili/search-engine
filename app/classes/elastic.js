const client = require('../models/elasticConnection');

const searchWithTitle = async (term,authors) => {

    let query = null;

    if(authors){
        let authorsLocalValue = authors;
        query = {
            bool: {
                must: [
                    {match: {title : `${term}`}}
                ],
                should: [
                    {match_phrase: {authors : `${authorsLocalValue}`}}
                ]
            }
        }
    }

    else{
        query = {
            bool: {
                must: [
                    {match: {title: `${term}`}},
                ]
            }
        }
    }
    const count = await client.count({
        index: 'software',
        body: {
            query: query
        }
    });

    const body = await client.search({
        index: 'software',
        size: count.count,
        body: {
            query: query
        }
    });
    return body;
}

const searchWithAllFields = async (term,authors) => {
    let query = null;

    if(authors){
        let authorsLocalValue = authors;
        query = {
            bool: {
                must: [
                    {match: {abstract: `${term}`}}
                ],
                should: [
                    {match: {title : `${term}`}},
                    {match: {authors : `${authorsLocalValue}`}}
                ]
            }
        }
    }

    else{
        query = {
            bool: {
                must: [
                    {match: {abstract: `${term}`}}
                ],
                should: [
                    {match: {title : `${term}`}},
                    {match: {abstract: `${term}`}}
                ]
            }
        }
    }
    const count = await client.count({
        index: 'software',
        body: {
            query: query
        }
    });

    const body = await client.search({
        index: 'software',
        size: count.count,
        body: {
            query: query
        }
    });

    return body;
}

module.exports = {
    searchWithTitle,
    searchWithAllFields
}