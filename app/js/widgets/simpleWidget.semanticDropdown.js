/*global define*/

define(
	[
		'simpleWidget.module',
		'semantic-ui',
		'jquery'
	],
	function(app, semantic, $) {
		'use strict';

		return app
			.directive('semanticDropdown', semanticDropdown);

		function semanticDropdown () {
			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			// a simple wrapper to use semantic pop up with jquery
			function link (scope, element) {
				$(element)
					.dropdown();
			}
		}
	}
);