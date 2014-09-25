/*global define*/

define(
	[
		'simpleChat.module',
		'simpleChat.authentication.simpleLoginService'
	],
	function (app) {
		'use strict';

		AuthenticationCtrl.$inject =
			[
				'$scope',
				'$log',
				'SimpleLoginService',
				'currentUser'
			];

		return app
			.controller('AuthenticationCtrl', AuthenticationCtrl);

		function AuthenticationCtrl (
			$scope, $log, SimpleLoginService, currentUser
			) {

			var vm = this;

			vm.register = register;
			vm.login = login;
			vm.user = currentUser;

			function register () {
				console.log('registering');

				SimpleLoginService.$createUser(
					vm.user.username,
					vm.user.password
				)
				.then(registerCallback)

				function registerCallback (error) {
					if (error === null) {
						login();
					} else {
						$log.log('login failed: ', error);
					}
				}
			}

			function login () {
				SimpleLoginService.$login(
					'password',
					vm.user
				)
				.then(loginSuccess, loginError);

				function loginSuccess (user) {
					$log.log(user);
				}

				function loginError (error) {
					$log.log(error);
				}
			}
		}
	}
);