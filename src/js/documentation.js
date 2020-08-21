document.addEventListener('DOMContentLoaded', function () {
	const source = document.querySelectorAll('.details');
	for (x in source) {
		try {
			source[x].style.display = 'none';
		} catch (e) {}
	}
});
