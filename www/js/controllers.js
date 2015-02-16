angular.module('appControllers', [])
/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
    .controller('LoginController', [
        '$state', '$scope', 'KinveyService','kinveyInit',  // <-- controller dependencies
        function ($state, $scope, KinveyService, kinveyInit) {

            // ng-model holding values from view/html
            $scope.creds = {
                username: "adminuser",
                password: "password"
            };

            /**
             *
             */
            $scope.doLogoutAction = function () {
                KinveyService.logout()
                    .then(function (_response) {
                        if (_response.status) {
                            alert(_response.data.description);
                        } else {
                            alert("logout success " + _response);

                            // transition to next state
                            $state.go('app.login');

                        }
                    }).catch(function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            /**
             *
             */
            $scope.doLoginAction = function () {
                KinveyService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {
                        if (_response.status) {
                            alert(_response.data.description);
                        } else {
                            alert("login success " + _response.username);

                            // transition to next state
                            $state.go('app.list');

                        }
                    }).catch(function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };
        }])

/**
 *
 * =================================================================================
 *
 * Old controller for the application using $http directly in the controller
 * and no service. This can work, but is not a good pattern for an application
 *
 * =================================================================================
 */
    .controller('ListController', [
        '$state', '$scope', 'KinveyService', 'UserObject',  // <-- controller dependencies
        function ($state, $scope, KinveyService, UserObject) {
            $scope.response = UserObject;


            KinveyService.getDevicesData().then(function(_data){
                $scope.items = _data;
            }, function(_error){
                alert("Error Getting Data " + _error.debug)
            });


            /**
             *
             */
            $scope.doLogout = function() {
                KinveyService.logout().finally(function(){
                    $state.go('app.login');
                });
            }
        }]);