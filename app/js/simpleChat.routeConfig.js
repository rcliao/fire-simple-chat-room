/*global define*/

define(
	[
		'simpleChat.module',

		'simpleChat.authenticationCtrl',
		'simpleChat.widget.ngEnter'
	],
	function(app) {
		'use strict';

		routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

		return app
			.config(routeConfig);

		function routeConfig ($stateProvider, $urlRouterProvider) {
			getCurrentUser.$inject = ['SimpleLoginService'];

			$urlRouterProvider.otherwise('/login');

			$stateProvider
				.state(
					'login',
					{
						url: '/login',
						templateUrl: 'partials/authentication/login.html',
						controller: 'AuthenticationCtrl as authentication'
					}
				);

			function getCurrentUser (SimpleLoginService) {
				return SimpleLoginService.$getCurrentUser();
			}
		}
	}
);