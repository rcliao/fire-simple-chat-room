/*global define*/

define(
	[
		'simpleChat.module',

		// controllers
		'simpleChat.authenticationCtrl',
		'simpleChat.chatCtrl',
		'simpleChat.adminCtrl',

		// widgets
		'simpleWidget.ngEnter',
		'simpleWidget.semanticPopUp',
		'simpleWidget.semanticDropdown',
		'simpleWidget.semanticAccordion'
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
				)
				.state(
					'admin',
					{
						url: '/admin',
						templateUrl: 'partials/admin/admin.html',
						controller: 'AdminCtrl as admin',
						resolve: {
							currentUser: getCurrentUser
						}
					}
				)
				.state(
					'admin.users',
					{
						url: '/admin/users',
						templateUrl: 'partials/admin/users.html'
					}
				)
				.state(
					'admin.rooms',
					{
						url: '/admin/rooms',
						templateUrl: 'partials/admin/rooms.html'
					}
				);

			function getCurrentUser (SimpleLoginService) {
				return SimpleLoginService.getCurrentUser();
			}
		}
	}
);