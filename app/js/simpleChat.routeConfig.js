/*global define*/

define(
	[
		'simpleChat.module',

		// widgets
		'simpleChat.widget.ngEnter',

		// controllers
		'simpleChat.authenticationCtrl',
		'simpleChat.chatCtrl'
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
				)
				.state(
					'chat',
					{
						url: '/chat/:roomName',
						templateUrl:  'partials/chat/chat.html',
						controller: 'ChatCtrl as chat',
						resolve: {
							currentUser: getCurrentUser
						}
					}
				);

			function getCurrentUser (SimpleLoginService) {
				return SimpleLoginService.getCurrentUser();
			}
		}
	}
);