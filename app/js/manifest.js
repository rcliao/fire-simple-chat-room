/* global require */

require.config({
	paths: {
		// angularjs official stuff
		'angular': '/app/libs/angular/angular',
		'angular-animate': '/app/libs/angular-animate/angular-animate',

		// angularjs-ui components
		'angular.ui-router': '/app/libs/angular-ui-router/release/angular-ui-router',

		// firebase
		'angular-firebase': '/app/libs/angularfire/angularfire',
		'firebase': '/app/libs/firebase/firebase',
		'firebase-simple-login':
			'/app/libs/firebase-simple-login/firebase-simple-login',

		// jquery for the semantic
		'jquery': '/app/libs/jquery/dist/jquery.min',

		// controllers
		'simpleChat.chatCtrl': 'chat/chatCtrl',

		// authentication
		'simpleChat.authenticationCtrl': 'authentication/authenticationCtrl',
		'simpleChat.authentication.simpleLoginService':
			'authentication/simpleLoginService',

		// main app
		'simpleChat.module': 'simpleChat.module'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ['angular']
		},
		'angular.ui-router': {
			deps: ['angular']
		},
		'angular-firebase': {
			deps: ['angular', 'firebase']
		},
		'firebase': {
			exports: 'Firebase'
		}
	}
});

require(
	[
		'angular', // used for bootstrapping app

		'simpleChat.module', // main app definition
		'simpleChat.routeConfig'
	],
	function(angular) {
		'use strict';

		angular.bootstrap(document, ['SimpleChat']);
	}
);