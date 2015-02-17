angular.module('appServices', ['kinvey'])

    .service('KinveyService', ['$kinvey', '$q', 'KINVEY',
        function ($kinvey, $q, KINVEY) {

            KINVEY_DEBUG = true;
            var kinveyInitialized = false;


            return {
                /**
                 *
                 * @returns {Promise}
                 */
                getDevicesData: function () {
                    var promise = $kinvey.DataStore.find('Devices');
                    return promise;
                },
                /**
                 *
                 * @returns {*}
                 */
                init: function () {

                    // if initialized, then return the activeUser
                    if (kinveyInitialized) {
                        return $kinvey.getActiveUser();
                    }
                    var promise = $kinvey.init(KINVEY.APPINFO);

                    promise.then(function (activeUser) {
                        kinveyInitialized = true;
                        return (activeUser);
                    }, function (error) {
                        return {
                            error: "noUser",
                            debug: error.debug
                        }
                    });

                    return promise;
                },
                /**
                 *
                 * @param _userParams
                 */
                createUser : function(_userParams) {

                    var promise = $kinvey.User.signup({
                        username : _userParams.email,
                        email : _userParams.email,
                        password : _userParams.password,
                        first_name : _userParams.first_name,
                        last_name : _userParams.last_name
                    });

                    return promise;
                },
                /**
                 *
                 * @param _kinveyInitUser
                 * @returns {Promise}
                 */
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
                /**
                 *
                 * @param _user
                 * @param _password
                 * @returns {Promise}
                 */
                login: function (_user, _password) {
                    var promise =  this.logout().then(function() {
                        return $kinvey.User.login(_user, _password);
                    }, function(error) {
                        alert("Error Logging In User " +_user)
                    });
                    return promise;
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function () {
                    var user = $kinvey.getActiveUser();
                    if (null !== user) {
                        console.log("logging out user " + user.username);
                        return $kinvey.User.logout();
                    } else {
                        return $q.when({});
                    }
                }

            }
        }]);
