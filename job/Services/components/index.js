const getUrls = require('./getUrls').getUrls;
const fullSearch =require('./search').fullSearch;
const driver = require('./driver').driver;
const subject = require('./subject').subject;
// component of rank
const rankDriver = require('./rankDriver').rankDriver;
const searchRank = require('./searchRank').searchRank;
const getReferral = require('./getReferral').getReferral;

module.exports = {
    getUrls,
    fullSearch,
    driver,
    subject,
    rankDriver,
    searchRank,
    getReferral
};