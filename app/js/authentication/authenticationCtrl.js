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
				'$q',

				'$state',

				'SimpleLoginService'
			];

		return app
			.controller('AuthenticationCtrl', AuthenticationCtrl);

		function AuthenticationCtrl (
				$scope, $log, $timeout, $q,
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
			vm.sendPasswordResetEmail = sendPasswordResetEmail;

			function register () {
				SimpleLoginService.createUser(
					vm.user.email,
					vm.user.password
				)
				.then(registerCallback, registerError);

				function registerCallback (user) {
					login();
				}

				function registerError (error) {
					vm.feedback = 'Failed to register, reason: ' + error;
					removeFeedbackLater(4000);
				}
			}

			function login () {
				vm.loading = true;
				SimpleLoginService
					.emailLogin(vm.user)
					.then(loginSuccess, loginError);
			}

			function sendPasswordResetEmail (user) {
				SimpleLoginService.sendResetPasswordEmail(user)
					.then(emailResetSuccess, emailResetError);

				function emailResetError (error) {
					console.log(error);
					vm.passwordResetFeedback = {
						message: error.message,
						success: false
					};
				}

				function emailResetSuccess () {
					vm.passwordResetFeedback = {
						message: 'You should be receiving the reset ' +
						'password email soon.',
						success: true
					};
				}
			}

			/* Helper methods */

			function loginSuccess (user) {
				vm.feedback = 'Welcome, ' + (user.displayName || user.email) +
					'\n' +
					'Redirecting to the public chatroom...';

				removeFeedbackLater(2000)
					.then(routeToChat);
			}

			function loginError (error) {
				vm.feedback = 'Failed to login, reason ' + error;

				removeFeedbackLater(4000);
			}

			function removeFeedbackLater (removeTimer) {
				var deferred = $q.defer();

				vm.loading = false;

				if (vm.feedbackId) {
					$timeout.cancel(vm.feedbackId);
				}

				vm.feedbackId = $timeout(function() {
					vm.feedback = undefined;
					deferred.resolve();
				}, removeTimer);

				return deferred.promise;
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