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
				'$timeout',

				'$state',

				'SimpleLoginService'
			];

		return app
			.controller('AuthenticationCtrl', AuthenticationCtrl);

		function AuthenticationCtrl (
				$scope, $log, $timeout,
				$state,
				SimpleLoginService
			) {

			var user = SimpleLoginService
				.getCurrentUser()

			if (user.displayName) {
				routeToChat();
			}

			var vm = this;

			vm.register = register;
			vm.login = login;

			function register () {
				SimpleLoginService.createUser(
					vm.user.email,
					vm.user.password
				)
				.then(registerCallback, registerError);

				function registerCallback (error) {
					if (error === null) {
						login();
					} else {
						vm.feedback = 'Failed to register: ' + error;
						removeFeedbackLater();
					}
				}

				function registerError (error) {
					vm.feedback = 'Failed to register, reason: ' + error;
					removeFeedbackLater();
				}
			}

			function login () {
				vm.loading = true;
				SimpleLoginService
					.emailLogin(vm.user)
					.then(loginSuccess, loginError);
			}

			/* Helper methods */

			function loginSuccess (user) {
				vm.feedback = 'Welcome, ' + (user.displayName || user.email);

				removeFeedbackLater();

				routeToChat();
			}

			function loginError (error) {
				vm.feedback = 'Failed to login, reason ' + error;

				removeFeedbackLater();
			}

			function removeFeedbackLater () {
				vm.loading = false;

				if (vm.feedbackId) {
					$timeout.cancel(vm.feedbackId);
				}

				vm.feedbackId = $timeout(function() {
					vm.feedback = undefined;
				}, 4000);
			}

			function routeToChat () {
				$state.go(
					'chat',
					{
						'roomName': 'default'
					}
				);
			}
		}
	}
);