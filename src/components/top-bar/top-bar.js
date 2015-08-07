// todo: use ES6 instead of namespace
(function () {
	'use strict';

	window.SG = window.SG || {};
	SG.Components = SG.Components || {};

	function createdCallback(doc, isImported) {
		var shadowRoot = this.createShadowRoot(),
			template = doc.getElementById('SGTopBarTemplate'),
			clone = isImported ? doc.importNode(template, true) : template;

		shadowRoot.appendChild(clone);
	}

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
		this.foo = options.foo || 'default foo';
		this.isImported = options.isImported;
		this.elem = null;
		this.createElement();
	};

	TopBar.prototype.createElement = function () {
		var doc = this.getDoc(),
			elemProto = Object.create(HTMLElement.prototype);

		elemProto.createdCallback = createdCallback.bind(elemProto, doc, this.isImported);
		this.elem = doc.registerElement('top-bar', {
			prototype: elemProto
		});
	};

	TopBar.prototype.getDoc = function () {
		var doc = window.document;

		if (this.isImported) {
			return (doc._currentScript || doc.currentScript).ownerDocument
		}

		return doc;
	}
})();
