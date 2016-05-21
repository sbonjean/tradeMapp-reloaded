/*jslint browser:true */
/*global $, jQuery*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */



module.exports = (function() {

    /**
     * Promise query of DB
     * @function
     * @param {} collection - Collection to query
     * @param {} match - Matching criterias
     * @param {} select - Fields to return
     * @param {} sort - Sorting instructions
     * @returns {} Query promise
     */



    var dbModels = require("../connect/dbModels.js");



    var aggregate = function(args) {

        var Model = null,
            query = null,
            promiseQuery = null,
            searchParams = [];

        //        if(args.match){searchParams.push({$match : args.match});} // the criterias to match
        //        if(args.project){searchParams.push({$project : args.project});} // the criterias to match
        //        if(args.group){searchParams.push({$group : args.group});} // the criterias to match


        Model = dbModels[args.collection];
        //        query = Model.aggregate(searchParams[0]);
        query = Model.aggregate({
            $match: args.match // the criterias to match
        }, {
            $project: args.project // The fields to return
        }, {
            $group: args.group // The fields to group by and return
        }, {
            $sort: args.sort || {
                '_id': 1
            } // The fields to group by and return
        }, {
            $limit: args.limit // The fields to group by and return
        });

        promiseQuery = query.exec();

        return promiseQuery;

    };


    var findMulitple = function(args) {
        //console.log(args);
        var Model = null,
            query = null,
            promiseQuery = null;

        Model = dbModels[args.collection];
        query = Model.find(args.match);
        query.limit(args.limit);
        query.select(args.select);
        query.sort(args.sort);
        promiseQuery = query.exec();

        return promiseQuery;

    };



    var findDistinctMulitple = function(args) {

        var Model = null,
            query = null,
            promiseQuery = null;

        Model = dbModels[args.collection];
        query = Model.find(args.match);
        query.distinct(args.distinct);
        promiseQuery = query.exec();

        return promiseQuery;
    };



    var findOne = function(args) {

        // console.log(args);
        var Model = null,
            query = null,
            promiseQuery = null;

        Model = dbModels[args.collection];
        query = Model.findOne(args.match);
        query.select(args.select);
        query.sort(args.sort);
        promiseQuery = query.exec();

        return promiseQuery;
    };



    var findOneAndRemove = function(args) {

        var Model = null,
            query = null,
            promiseQuery = null;

        Model = dbModels[args.collection];
        query = Model.findOneAndRemove(args.match);
        promiseQuery = query.exec();

        return promiseQuery;
    };






    var findMultipleAndUpdate = function(args) {

        var Model = null,
            query = null,
            promiseQuery = null,
            options = {
                multi: true
            };

        Model = dbModels[args.collection];
        query = Model.update(args.match, args.update, options);
        promiseQuery = query.exec();

        return promiseQuery;
    };





    // var updateOne = function(dbModels, args) {

    //     var Model = null,
    //         query = null,
    //         promiseQuery = null,
    //         options = {
    //             multi: false
    //         };

    //     Model = dbModels[args.collection];
    //     query = Model.update(args.match, args.update, options);
    //     promiseQuery = query.exec();

    //     return promiseQuery;
    // };







    var findOneAndUpdate = function(args) {

        var Model = null,
            query = null,
            promiseQuery = null;

        Model = dbModels[args.collection];
        query = Model.findByIdAndUpdate(args.match, args.update);
        promiseQuery = query.exec();

        return promiseQuery;
    };





    return {
        find: {
            one: findOne,
            multiple: findMulitple,
            distinctMultiple: findDistinctMulitple
        },
        aggregatePromise: aggregate,
        // updateOne: updateOne,
        update: {
            one: findOneAndUpdate,
            multiple: findMultipleAndUpdate



        },
        remove: {
            one: findOneAndRemove
        }
    };

})();