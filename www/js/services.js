angular.module('appServices', ['kinvey'])

    .service('KinveyService', ['$kinvey', '$q', 'KINVEY',
        function ($kinvey, $q, KINVEY) {

            //var KINVEY_DEBUG = true;

            return {
                getDevicesData: function () {
                    var promise = $kinvey.DataStore.find('Devices');
                    return promise;
                },
                init: function () {
                    return $kinvey.init(KINVEY.APPINFO);
                },
                currentUser: function (_kinveyInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _kinveyInitUser = _kinveyInitUser ? _kinveyInitUser : $kinvey.getActiveUser();

                    console.log("_kinveyInitUser " + _kinveyInitUser);
                    if (!_kinveyInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_kinveyInitUser);
                    }
                },
                login: function (_user, _password) {
                    return $kinvey.User.login(_user, _password);
                },
                logout: function () {
                    var user = $kinvey.getActiveUser();
                    if (null !== user) {
                        return $kinvey.User.logout();
                    } else {
                        return $q.when({});
                    }
                }

            }
        }]);
