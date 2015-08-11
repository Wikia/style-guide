// todo: use ES6 instead of namespace
(function (window, document) {
	'use strict';

	window.SG = window.SG || {};
	SG.Components = SG.Components || {};

	/**
	 * Build top-bar component
	 *
	 * Options are:
	 * 	importedDoc - if component is included via html import, pass a reference to the imported document object.
	 * 	logoUrl - URL for logo asset
	 *
	 * @params {Object} options Configuration options
	 * @type {Function}
	 */
	var TopBar = SG.Components.TopBar = function (options) {
		this.doc = options.importedDoc || window.document;
		this.logoUrl = options.logoUrl || '';
		this.elem = null;
	};

	TopBar.prototype.createElement = function () {
		var elemProto = Object.create(HTMLElement.prototype),
			self = this;

		elemProto.createdCallback = function () {
			var shadowRoot = this.createShadowRoot(),
				// get template from imported doc
				template = self.doc.getElementById('SGTopBarTemplate').content,
				isImported = self.doc !== window.document,
				clone = isImported ? self.doc.importNode(template, true) : template;

			self.updateLogo(clone);

			shadowRoot.appendChild(clone);
		};

		// register element on parent doc
		this.elem = window.document.registerElement('top-bar', {
			prototype: elemProto
		});
	};

	TopBar.prototype.updateLogo = function (elem) {
		var logo = elem.querySelector('.logo');
		logo.src = this.logoUrl;
	};

})(window, document);
