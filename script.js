// Color Picker Button
const button = document.getElementById('color_picker_starter');

// Creating new Color Picker
let myColorPicker = new ColorPicker(button, '#00b4eb');

// Event Listener to trigger function when color changes
button.addEventListener('colorChange', function (event) {
	document.getElementById('title').style.background = event.detail.color;
});
