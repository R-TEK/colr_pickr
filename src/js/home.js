/**
 * JavaScript for Home page
 */

// Define button
const sampleBtn = document.getElementById('sample');

// Create instance
const sample = new ColorPicker(sampleBtn, '#460082');

sampleBtn.addEventListener('colorChange', function () {
	document.getElementById('basic_sample').style.background = event.detail.color.hexa;
});

// Open navigation menu
document.getElementById('open_nav').addEventListener('click', function () {
	// Define nav
	const openedNav = document.getElementById('opened_nav');

	// If nav is not open...
	if (window.getComputedStyle(openedNav).display == 'none') {
		// Open it
		openedNav.style.display = 'block';
	}
	// If nav is opened...
	else {
		// Close it
		openedNav.style.display = 'none';
	}
});

// Close navigation when anywhere is clicked
document.addEventListener('click', function () {
	// Define nav
	const openedNav = document.getElementById('opened_nav');

	// Define target
	let target = event.target;

	// Loop through target parents
	while (target != document.getElementById('drop_down_nav')) {
		// If HTML element is reached...
		if (target.tagName == 'HTML') {
			// If nav is not open...
			if (window.getComputedStyle(openedNav).display == 'block') {
				// Open it
				openedNav.style.display = 'none';
			}

			break;
		}

		// Move to parent
		target = target.parentNode;
	}
});

// Hide navigation menu if scrolled
document.addEventListener('scroll', function () {
	// Define nav
	const openedNav = document.getElementById('opened_nav');

	// If nav is not open...
	if (window.getComputedStyle(openedNav).display == 'block') {
		// Open it
		openedNav.style.display = 'none';
	}
});
