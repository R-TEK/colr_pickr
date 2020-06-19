// Applying Color Picker
const myPicker = document.getElementById('mypicker');
let picker = new ColorPicker(myPicker, '#ff0000');

// Listener
myPicker.addEventListener('colorChange', function () {
	document.getElementById('listener').style.background = event.detail.color;
});
