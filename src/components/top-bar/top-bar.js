// todo: use ES6 instead of namespace
(function (window, document) {
	'use strict';

	window.SG = window.SG || {};
	SG.Components = SG.Components || {};

	/**
	 * Build top-bar component
	 *
	 * Options are:
	 * 	isImported - whether the HTML template is imported as opposed to inline
	 *
	 * @params {Object} options Configuration options
	 * @type {Function}
	 */
	var TopBar = SG.Components.TopBar = function (options) {
		this.isImported = options.isImported;
		this.elem = null;
		this.createElement();
	};

	TopBar.prototype.createElement = function () {
		var doc = this.getDoc(),
			elemProto = Object.create(HTMLElement.prototype),
			isImported = this.isImported;

		elemProto.createdCallback = function () {
			var shadowRoot = this.createShadowRoot(),
				template = doc.getElementById('SGTopBarTemplate').content,
				clone = isImported ? doc.importNode(template, true) : template;

			shadowRoot.appendChild(clone);
		};

		this.elem = window.document.registerElement('top-bar', {
			prototype: elemProto
		});
	};

	TopBar.prototype.getDoc = function () {
		var doc = window.document;

		if (this.isImported) {
			return (doc._currentScript || doc.currentScript).ownerDocument
		}

		return doc;
	};

	new SG.Components.TopBar({isImported:true});
})(window, document);
