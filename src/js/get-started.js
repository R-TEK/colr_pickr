/**
 * Applying Colr Pickr Instances
 */

// Change example background color
const backgroundNode = document.getElementById('background');
let background = new ColorPicker(backgroundNode, '#2e5776');

backgroundNode.addEventListener('colorChange', function () {
	document.getElementById('listener').style.background = event.detail.color.hexa;
});

// Change example border color
const borderNode = document.getElementById('border');
let border = new ColorPicker(borderNode, '#4e4376');

borderNode.addEventListener('colorChange', function () {
	document.getElementById('listener').style.border = '5px solid ' + event.detail.color.hexa;
});

// Change example text color
const textNode = document.getElementById('text');
let text = new ColorPicker(textNode, '#fff');

textNode.addEventListener('colorChange', function () {
	document.getElementById('listener').style.color = event.detail.color.hexa;
});
