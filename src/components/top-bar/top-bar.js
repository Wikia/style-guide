// todo: use ES6 instead of namespace
(function (window, document) {
	'use strict';

	window.SG = window.SG || {};
	SG.Components = SG.Components || {};

	/**
	 * Build top-bar component
	 *
	 * Options are:
	 * 	importedDoc - if this component is being included via html import, pass a reference to the imported document object.
	 *
	 * @params {Object} options Configuration options
	 * @type {Function}
	 */
	var TopBar = SG.Components.TopBar = function (options) {
		this.doc = options.importedDoc || window.document;
		this.elem = null;
	};

	TopBar.prototype.createElement = function () {
		var elemProto = Object.create(HTMLElement.prototype),
			thisDoc = this.doc;

		elemProto.createdCallback = function () {
			var shadowRoot = this.createShadowRoot(),
				// get template from imported doc
				template = thisDoc.getElementById('SGTopBarTemplate').content,
				isImported = thisDoc !== window.document,
				clone = isImported ? thisDoc.importNode(template, true) : template;

			shadowRoot.appendChild(clone);
		};

		// register element on parent doc
		this.elem = window.document.registerElement('top-bar', {
			prototype: elemProto
		});
	};
})(window, document);
