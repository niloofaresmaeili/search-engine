const Elasticsearch = require('elasticsearch');
const Config = require('../config/db.config');

const client = new Elasticsearch.Client( {
    hosts: [
        `${Config.HOST}:${Config.PORT}`,
    ]
});

module.exports = client;

