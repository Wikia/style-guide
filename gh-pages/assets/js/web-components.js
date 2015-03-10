(function () {
	'use strict';

	// Create custom element
	var proto = Object.create(HTMLDivElement.prototype);
	proto.name = 'Dropdown Icon';
	proto.createdCallback = function() {
		var template = document.querySelector('#dropdownIconTemplate');
		var clone = document.importNode(template.content, true);
		this.appendChild(clone);
		bindEvents(this.querySelector('.dropdown-icon'));
	};
	document.registerElement('dropdown-icon', {
		prototype: proto
	});

	// Private methods to bind functionality to custom element
	function bindEvents(elem) {
		var list = elem.nextElementSibling;

		if (list.tagName.toLowerCase() === 'ul') {
			var listStyle = list.style;

			elem.addEventListener('mouseover', function () {
				var listStyle = list.style;
				listStyle.top = (elem.offsetTop + elem.offsetHeight + parseInt(list.getAttribute('data-offset-y'))) + 'px';
				listStyle.left = (elem.offsetLeft + parseInt(list.getAttribute('data-offset-x'))) + 'px';
				listStyle.display = 'block';
				list.setAttribute('data-active', 'true');
				elem.setAttribute('data-active', 'true');
			}, false);

			elem.addEventListener('mouseout', function () {
				list.removeAttribute('data-active');
				window.setTimeout(function () {
					if (!list.hasAttribute('data-active')) {
						list.style.display = 'none';
						elem.removeAttribute('data-active');
					}
				}, 1500);
			});

			list.addEventListener('mouseover', function () {
				list.setAttribute('data-active', 'true');
			}, false);

			var listItems = list.querySelectorAll('li');

			Array.prototype.forEach.call(listItems, function (li) {
				li.addEventListener('mouseout', function (event) {
					var toElement = event.toElement || event.relatedTarget;
					if (isDescendant(toElement, list) === false) {
						listStyle.display = 'none';
						list.removeAttribute('data-active');
						elem.removeAttribute('data-active');
					}
				}, false);
			});
		}
	}

	function isDescendant(node, ancestor) {
		var parent = node.parentElement;
		if (parent) {
			if (parent == ancestor) {
				return true;
			} else {
				return isDescendant(parent, ancestor);
			}
		} else {
			return false;
		}
	}
})();