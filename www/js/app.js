// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', , 'appServices', 'appControllers'])


    .constant('KINVEY', {
        APPINFO: {
            appKey: '',
            appSecret: ''
        }
    })

    .run(function ($ionicPlatform, $rootScope, $state) {

        // this code handles any error when trying to change state.
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                console.log('$stateChangeError ' + error.error);

                // if the error is "noUser" the go to login state
                if (error && error.error === "noUser") {
                    $state.go('app.login', {});
                }
            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {


        // top level abstract state used to initialize Kinvey before anything
        // else happens.
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                template: "<ion-nav-view/>",
                resolve: {
                    kinveyInit: function (KinveyService) {
                        return KinveyService.init();
                    }
                }
            })
            // the list view which is displayed ONLY if we can get a UserObject from
            // the Kinvey Service, if we cannot, an error is generated on the stateChange
            // and the user is re-directed to the login screen, see app.run
            .state('app.list', {
                url: "/list",
                templateUrl: "views/list.html",
                controller: "ListController",
                resolve: {
                    UserObject: function (KinveyService, kinveyInit) {
                        return KinveyService.currentUser(kinveyInit);
                    }
                }
            })
            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app.login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "LoginController"
            });

        // For any unmatched url, redirect to /list
        $urlRouterProvider.otherwise("app/list");

    });