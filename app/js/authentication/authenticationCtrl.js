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

			var vm = this;

			vm.register = register;
			vm.login = login;
			vm.loginAsGoogle = loginAsGoogle;
			vm.loginAsGithub = loginAsGithub;
			vm.loginAsTwitter = loginAsTwitter;

			function register () {
				SimpleLoginService.$createUser(
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
				SimpleLoginService
					.$login(
						'password',
						vm.user
					)
					.then(loginSuccess, loginError);
			}

			function loginAsGoogle () {
				SimpleLoginService
					.$login('google')
					.then(loginSuccess, loginError);
			}

			function loginAsGithub () {
				SimpleLoginService
					.$login('github')
					.then(loginSuccess, loginError);
			}

			function loginAsTwitter () {
				SimpleLoginService
					.$login('twitter')
					.then(loginSuccess, loginError);
			}

			function loginSuccess (user) {
				vm.feedback = 'Welcome, ' +
					(user.displayName || user.username || user.email);
				removeFeedbackLater();
				routeToChat();
			}

			function loginError (error) {
				vm.feedback = 'Failed to login, reason ' + error;
				removeFeedbackLater();
			}

			function removeFeedbackLater () {
				if (vm.feedbackId) {
					$timeout.cancel(vm.feedbackId);
				}

				vm.feedbackId = $timeout(function() {
					vm.feedback = undefined;
				}, 3000);
			}

			function routeToChat () {
				$timeout(function() {
					$state.go(
						'chat',
						{
							'roomName': 'default'
						}
					);
				}, 4000);
			}
		}
	}
);