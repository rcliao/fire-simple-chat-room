/*global define*/

define(
	[
		'simpleWidget.module',
		'semantic-ui'
	],
	function(app) {
		'use strict';

		return app
			.directive('semanticPopUp', semanticPopUp);

		function semanticPopUp () {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			// a simple wrapper to use semantic pop up with jquery
			function link (scope, element, attrs) {
				$(element)
					.popup();
			}
		}
	}
);