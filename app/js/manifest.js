/* global require */

require.config({
	paths: {
		// angularjs official stuff
		'angular': '../libs/angular/angular',
		'angular-animate': '../libs/angular-animate/angular-animate',

		// angularjs-ui components
		'angular.ui-router': '../libs/angular-ui-router/release/angular-ui-router',
		'angular.ui-bootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls',

		// firebase
		'angular-firebase': '../libs/angularfire/dist/angularfire',
		'firebase': '../libs/firebase/firebase',
		'firebase-simple-login':
			'../libs/firebase-simple-login/firebase-simple-login',

		// jquery for the semantic
		'jquery': '../libs/jquery/dist/jquery.min',

		// semantic-ui
		'semantic-ui': '../libs/semantic/build/packaged/javascript/semantic',

		// chat
		'simpleChat.chatCtrl': 'chat/chatCtrl',

		// admin
		'simpleChat.adminCtrl': 'admin/adminCtrl',

		// widgets
		'simpleWidget.module': 'widgets/simpleWidget.module',
		'simpleWidget.ngEnter': 'widgets/simpleWidget.ngEnter',
		'simpleWidget.semanticPopUp': 'widgets/simpleWidget.semanticPopUp',
		'simpleWidget.semanticDropdown': 'widgets/simpleWidget.semanticDropdown',

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
		'angular.ui-bootstrap': {
			deps: ['angular']
		},
		'angular-firebase': {
			deps: ['angular', 'firebase']
		},
		'firebase': {
			exports: 'Firebase'
		},
		'semantic-ui': {
			deps: ['jquery']
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