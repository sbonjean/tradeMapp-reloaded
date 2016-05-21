/*jslint browser:true */
/*global $, jQuery*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

module.exports = function(db) {

    var mongoose = require('mongoose'), // Requires Mongoose module
        Schema = mongoose.Schema; // Requires Schema Constructor

    /**
Instanciating Schemas
*/

    var layoutSchema = new Schema({
        lan: String,
        page: String,
        elements: Schema.Types.Mixed
    });

    var logSchema = new Schema({
        time: String
    });

    var userSchema = new Schema({
        login: String,
        email: String,
        lastName: String,
        firstName: String,
        password: String,
        company: String,
        group: String,
        subscriptionId: String,
        lan: String,
        transfered: Boolean
    });


    var testSchema = new Schema({
        name: String,
        transfered: Boolean
    });


    var userGroupSchema = new Schema({
        name: String,
        design: Boolean,
        map: Boolean,
        exportExcel: Boolean,
        admin: Boolean,
        usersAdmin: Boolean,
        dashboard: Boolean,
        reports: Boolean
    });

    var questionSchema = new Schema({
        state: {
            type: Boolean,
            default: true
        },
        company: String,
        name: String,
        text: String,
        answerID: String,
        answerType: String,
        answerSelection: [],
        answerName: String,
        subscriptionID: String,
        mandatoryAnswer: Boolean
    });

    var questionnaireSchema = new Schema({
        state: {
            type: Boolean,
            default: true
        },
        company: String,
        name: String,
        subscriptionID: String,
        questions: []
    });

    var surveySchema = new Schema({
        state: String,
        company: String,
        name: String,
        dateStart: Date,
        dateEnd: Date,
        region: String,
        territory: String,
        distance: Number,
        subscriptionID: String,
        team: String,
        questionnairesList: [],
        pointOfSalesReference: Boolean,
        pointOfSalesReferenceMandatory: Boolean,
        gpsMandatory: Boolean
    });

    var subscriptionSchema = new Schema({
        country: String,
        company: String,
        subCode: String,
        state: String,
        numberOfTransactions: Number,
        gpsLat: Number,
        gpsLong: Number,
        startDate: Date,
        endDate: Date
    });

    var answerSchema = new Schema({
        state: {
            type: Boolean,
            default: false
        },
        name: String,
        comp: String,
        std: {
            type: Boolean,
            default: false
        },
        type: String,
        subscriptionID: String,
        selection: []
    });

    var answerTypeSchema = new Schema({
        name: String,
        lan: String,
        value: String
    });

    var answersLogSchema = new Schema({
        qID: String,
        qTex: String,
        qTit: String,
        subs: String,
        qType: String,
        dStd: Date,
        dE: Date,
        dS: Date,
        dSS: Date,
        dSE: Date,
        ans: Number,
        reg: String,
        cName: String,
        ref: String,
        posRef: String,
        user: String,
        gps: Array,
        selB: String,
        selD: Date,
        selN: Number,
        geoCtrl: String,
        abort: Boolean
    });

    //    var corAnswersLogSchema = new Schema({
    //        settings: String,
    //        status : String,
    //        recordedSurveys: String
    //    });

    var rawAnswersLogSchema = new Schema({
        login: String,
        settings: String,
        status: String,
        recordedSurveys: String,
        countOfTransfers: String,
        countOfSurveys: Number,
        cSub: String
    });


    // var metricsDashboardSchema = new Schema({
    //     subs : String,
    //     cName : String

    // });



    //
    //    var answersLogSchema = new Schema({
    //        qID: String,
    //        qTex : String,
    //        qTit : String,
    //        subs : String,
    //        qType : String,
    //        dE: Date,
    //        dS: Date,
    //        dSS: Date,
    //        dSE: Date,
    //        ans: Number,
    //        reg: String,
    //        cName: String,
    //        ref: String,
    //        posRef : String,
    //        user: String,
    //        gps: Array,
    //        selB: String,
    //        selD: Date,
    //        selN: Number,
    //        geoCtrl : String,
    //        abort : Boolean
    //
    //    });



    var dashboardSchema = new Schema({
        subs: String,
        countRecord: Number,
        countSurvey: Number,
        activeCampaigns: Array,
        metrics: Array,
        percentageOfPlanUsed: Number
    });


    var dataMapSchema = new Schema({
        subs: String,
        campaigns: Array
    });

    var clusterMapSchema = new Schema({
        subs: String,
        company: Number,
        campaigns: Array
    });

    //
    //    //    var dinamycSchema = function(subCode){
    //    var dinamycSchemaAnswersLog = function(subscriptionCode){
    //        //        return mongoose.model(prefix + '.address', answersLogSchema);
    //        return db.model('answerslogs' + subscriptionCode, answersLogSchema);
    //    };

    /**
Defining Models by passing a Schema instance to mongoose models.
*/

    return {
        layout: db.model('layout', layoutSchema),
        test: db.model('test', testSchema),

        user: db.model('user', userSchema),
        userGroup: db.model('usergroup', userGroupSchema),
        question: db.model('question', questionSchema),
        subscription: db.model('subscription', subscriptionSchema),
        answersLog: db.model('answersLog', answersLogSchema),
        dataMap: db.model('dataMap', dataMapSchema),
        clusterMap: db.model('clusterMap', clusterMapSchema),
        dashboard: db.model('dashboard', dashboardSchema),
        rawAnswersLog: db.model('rawAnswersLog', rawAnswersLogSchema),
        questionnaire: db.model('questionnaire', questionnaireSchema),
        survey: db.model('survey', surveySchema),
        answerType: db.model('answertype', answerTypeSchema),
        log: db.model('log', logSchema),
        answer: db.model('answer', answerSchema)
        //        dynamicSchemaAnswersLog : dinamycSchemaAnswersLog
        //        dinamycSchema : dinamycSchemaAnswersLog
    };
};