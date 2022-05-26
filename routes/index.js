const express = require('express');
const router = express.Router();
const Elastic = require('../app/classes/elastic');

/**
 * @param request
 * @param response
 * @return {object}(
 */
router.post('/search/:field', async function(request, response, next) {

    const searchField = searchFieldSelector(request);
    const term = searchTermSelector(request);
    const authors = searchAuthorSelector(request);

    let pageSize = 10;
    let currentPage = 1;
    let start = 0;

    if(searchField == 'title'){

        let ElasticResponseArticles = await Elastic.searchWithTitle(term,authors);
        let articles = await ElasticResponseArticles.hits.hits;

        if(!articles){
            response.status(404).send({
                message:"Not Found any articles!"
            });
        }

        let notNaNCitationArticles = await articles.filter(function findArticlesWithCitation(article){
            return article._source.citation !== 'NaN'
        }).sort(sortArticles);

        let naNCitationArticles = await articles.filter(function findArticlesWithoutCitation(article) {
            return article._source.citation === 'NaN'
        });

        let allArticles = Array().concat(notNaNCitationArticles, naNCitationArticles);

        let pageCount = allArticles.length/10;

        if (request.query.page) {
            currentPage = request.query.page;
            start = 10*(currentPage - 1);
        }

        let articlesList = allArticles.splice(start, pageSize);

        for (let i=0 ; i < articlesList.length ; i++){
            if(articlesList[i]._source.year.length > 4){
                articlesList[i]._source.year = articlesList[i]._source.year.split(' ')[3];
            }

            if(typeof(articlesList[i]._source.tags) == 'string'){
                articlesList[i]._source.tags = [articlesList[i]._source.tags]
            }
        }

        return response.status(200).send({
            status: true,
            totalArticles: articles.length,
            pageCount: pageCount,
            currentPage: currentPage,
            pageSize: pageSize,
            data: articlesList
        });
    } else if(searchField == 'all'){

        let ElasticResponseArticles = await Elastic.searchWithAllFields(term,authors);
        let articles = await ElasticResponseArticles.hits.hits;

        if(!articles){
            response.status(404).send({
                message:"Not Found any articles!"
            });
        }

        let notNaNCitationArticles = await articles.filter(function findArticlesWithCitation(article){
            return article._source.citation !== 'NaN'
        }).sort(sortArticles);

        let naNCitationArticles = await articles.filter(function findArticlesWithoutCitation(article) {
            return article._source.citation === 'NaN'
        });

        let allArticles = Array().concat(notNaNCitationArticles, naNCitationArticles);

        let pageCount = allArticles.length/10;

        if (request.query.page) {
            currentPage = request.query.page;
            start = 10*(currentPage - 1);
        }

        let articlesList = allArticles.splice(start, pageSize);

        for (let i=0 ; i < articlesList.length ; i++){
            if(articlesList[i]._source.year.length > 4){
                articlesList[i]._source.year = articlesList[i]._source.year.split(' ')[3];
            }

            if(typeof(articlesList[i]._source.tags) == 'string'){
                articlesList[i]._source.tags = [articlesList[i]._source.tags]
            }

        }

        return response.status(200).send({
            status: true,
            totalArticles: articles.length,
            pageCount: pageCount,
            currentPage: currentPage,
            pageSize: pageSize,
            data: articlesList
        });
    }else if(searchField == 'FullText'){
        //To Do
    }
});


function sortArticles(article1, article2) {
    const citation1 = parseInt(article1._source.citation);
    const citation2 = parseInt(article2._source.citation);
    if (citation1 > citation2) {
        return -1
    } else if (citation1 < citation2){
        return 1
    } else {
        return 0
    }
}


function searchFieldSelector(request){
    return request.params.field;
}
function searchTermSelector(request){
    return request.body.term;
}
function searchAuthorSelector(request){
    return request.body.authors;
}

module.exports = router;