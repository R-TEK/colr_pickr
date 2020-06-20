// Defining Color Picker buttons
const bgBtn = document.getElementById('background');
const borderBtn = document.getElementById('border');
const textBtn = document.getElementById('text');

// Defining Color Picker instances
let bg = new ColorPicker(bgBtn, '#2e5776');
let border = new ColorPicker(borderBtn, '#4e4376');
let text = new ColorPicker(textBtn, '#fff');

// Listeners
bgBtn.addEventListener('colorChange', function (event) {
	document.getElementById('listener').style.background = event.detail.color;
});

borderBtn.addEventListener('colorChange', function (event) {
	document.getElementById('listener').style['border-color'] = event.detail.color;
});

textBtn.addEventListener('colorChange', function (event) {
	document.getElementById('listener').style.color = event.detail.color;
});
