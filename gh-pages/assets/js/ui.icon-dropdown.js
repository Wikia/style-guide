'use strict';

(function(){
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

	var dropdownIcons = document.querySelectorAll('.dropdown-icon');

	Array.prototype.forEach.call(dropdownIcons, function (elem) {
		var list = elem.nextElementSibling;

		if (list.tagName.toLowerCase() === 'ul') {
			var listStyle = list.style;

			elem.addEventListener('mouseover', function () {
				var listStyle = list.style;
				listStyle.top = (elem.offsetTop + elem.offsetHeight + parseInt(list.getAttribute('data-offset-y'))) + 'px';
				listStyle.left = (elem.offsetLeft + parseInt(list.getAttribute('data-offset-x'))) + 'px';
				listStyle.display = 'block';
				list.setAttribute('data-active', 'true');
			}, false);

			elem.addEventListener('mouseout', function () {
				list.removeAttribute('data-active');
				window.setTimeout(function () {
					if (!list.hasAttribute('data-active')) {
						list.style.display = 'none';
					}
				}, 1500);
			});

			var listItems = list.querySelectorAll('li');

			Array.prototype.forEach.call(listItems, function (li) {
				li.addEventListener('mouseout', function (event) {
					var toElement = event.toElement || event.relatedTarget;
					list.setAttribute('data-active', 'true');
					if (isDescendant(toElement, list) === false) {
						listStyle.display = 'none';
						list.removeAttribute('data-active');
					}
				}, false);
			});
		}
	});
})();
