/* global define */

define(
	[
		'angular',
		'angular-animate',

		'angular.ui-router',

		'firebase',
		'angular-firebase',
		'firebase-simple-login'
	],
	function (angular) {
		'use strict';

		return angular
			.module(
				'SimpleChat',
				[
					'ngAnimate',
					'ui.router',
					'firebase'
				]
			);
	}
);