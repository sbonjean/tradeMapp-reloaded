/*
 * Home page.
 */

/*jslint browser:true */
/*global $, jQuery*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */


module.exports = function(app, dbModels, gnFuncs, env, layout) {

    var page = "login";


    // ------------------------------------------------------------------
    app.get('/login', function(req, res) {

        // Goes to dashboard if a session is already set
        if (gnFuncs(req).security.cookies.areSet()) {
            res.redirect('../dashboard');
            return;
        }

        res.render('login', {
            layout: layout.get(page),
            message: '',
            page: page,
            env: env
        });
        return; // return is usefull as res.render will not stop the script

    });

    // ------------------------------------------------------------------
    app.post('/login', function(req, res) {

        // Goes to dashboard if a session is already set

        if (gnFuncs(req).security.cookies.areSet()) {
            res.redirect('../dashboard');
            // console.log("lk")
            return;
        }

        var cookies = {};

        var userPromiseQuery = gnFuncs(req).queries.find.one(dbModels, {
            collection: "user",
            match: {
                login: req.body.login
            }
        });


        // Finding user
        userPromiseQuery.addBack(function(err, user) {

            // Database connection error
            if (err) {
                res.render('login', {
                    layout: layout.get(page),
                    message: layout.connectionPb,
                    page: page,
                    env: env
                });
                return; // return is necessary as res.render will not stop the script
            }

            // User not found
            if (!user) {
                res.render('login', {
                    layout: layout,
                    message: layout.userNotFound,
                    page: page,
                    env: env
                });
                return; // return is necessary as res.render will not stop the script
            }

            // Set session if the password is valid, display message otherwise
            if (req.body.password !== user.password) {
                res.render('login', {
                    layout: layout,
                    message: layout.passwordIncorrect,
                    page: page,
                    env: env
                });
                return; // return is necessary as res.render will not stop the script
            }

            var userGroupPromiseQuery = gnFuncs(req).queries.find.one(dbModels, {
                collection: "userGroup",
                match: {
                    name: user.group
                },
                select: {
                    _id: 0
                }
            });

            var subscriptionPromiseQuery = gnFuncs(req).queries.find.one(dbModels, {
                collection: "subscription",
                match: {
                    '_id': user.subscriptionId
                },
                select: {
                    _id: 0
                }
            });

            // Query user access
            userGroupPromiseQuery.addBack(function(err, userGroup) {
                subscriptionPromiseQuery.addBack(function(err, subscription) {

                    // Check if subscription exists
                    if (!subscription || !gnFuncs(req).security.subscription.isValid(subscription.endDate)) {
                        res.render('login', {
                            layout: layout,
                            message: layout.subscriptionToRenew,
                            page: page,
                            env: env
                        });
                        return; // return is necessary as res.render will not stop the script
                    }

                    // Set cookies
                    cookies = gnFuncs(req).security.cookies.set(userGroup, user, subscription, res);
                    res.redirect('../dashboard');
                });
            });
        });
    });
};