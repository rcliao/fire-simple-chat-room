/* global define */

define(
	[
		'angular',
		'angular-animate',

		'angular.ui-router',
		'angular.ui-bootstrap',

		'firebase',
		'angular-firebase',
		'firebase-simple-login',

		// custom widgets
		'simpleWidget.module'
	],
	function (angular) {
		'use strict';

		return angular
			.module(
				'SimpleChat',
				[
					'ngAnimate',
					'ui.router',
					'ui.bootstrap',
					'firebase',
					'simpleWidget'
				]
			).run(['$rootScope', '$state', '$log', function($rootScope, $state, $log) {
				$rootScope.$on('$stateChangeError', function (event, current, previous,
					rejection) {

					$state.go('login');

					$rootScope.criticalErrorReason = rejection;
				});

				$rootScope.$on('$stateChangeSuccess', function() {
					$rootScope.criticalErrorReason = '';
				});
			}]);
	}
);