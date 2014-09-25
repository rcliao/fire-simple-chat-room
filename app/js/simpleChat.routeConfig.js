define(
	[
		'simpleChat.module'
	],
	function(app) {
		'use strict';

		routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

		return app
			.config(routeConfig);

		function routeConfig ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/login');

			$stateProvider
				.state(
					'login',
					{
						url: '/login',
						templateUrl: 'partials/authentication/login.html'
					}
				);
		}
	}
);