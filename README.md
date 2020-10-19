<h1 align="center">
    <a href="https://r-tek.github.io/colr_pickr/" target="blank" style="color: rgb(75, 0, 130)">
        <img height="340" src="/assets/img/interface_view.png"/>
        <br />
        Colr Pickr
    </a>
</h1>

<p align="center">
    <b>Colr Pickr, a vanilla JavaScript color picking component built with SVGs, with features like saving colors. Similar design to the chrome-dev-tools color picker</b>
</p>

<p align="center">
    <a href="https://github.com/R-TEK/colr_pickr/blob/master/LICENSE">
        <img src="https://badgen.net/github/license/R-TEK/colr_pickr?color=ff0000" alt="license" />
    </a>
    <a href="https://github.com/R-TEK/colr_pickr/graphs/contributors">
        <img src="https://badgen.net/badge/maintained/Yes?color=008c17">
    </a>
    <a href="https://www.npmjs.com/package/@r-tek/colr_pickr">
        <img src="https://badgen.net/npm/v/@r-tek/colr_pickr?color=7000c5" alt="version" />
    </a>
    <a href="https://bundlephobia.com/result?p=@r-tek/colr_pickr@1.2.1">
        <img src="https://badgen.net/bundlephobia/minzip/@r-tek/colr_pickr?color=158fcc" alt="minzip size" />
    </a>
    <a href="https://lgtm.com/projects/g/R-TEK/colr_pickr/context:javascript">
        <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/R-TEK/colr_pickr.svg?logo=lgtm&logoWidth=18"/>
    </a>
	<a href="https://www.jsdelivr.com/package/npm/@r-tek/colr_pickr"><img src="https://data.jsdelivr.com/v1/package/npm/@r-tek/colr_pickr/badge"></a>
</p>

<br/>

---

### Features:

-   Drag interactive color picker allowing for easy use of finding colors, including a Saturation and Lightness box, Hue slider and Opacity slider
-   Reads and outputs HEX, RGB, HSL, HEXA, RGBA and HSLA color values
-   Save custom colors to re-use on return to the color picker
-   Full Touch Support
-   ~4kb file size, meaning a super fast component of your application
-   Works on all major browsers
-   Flat and modern design interface, inspired by google chrome dev-tools color picker

### Examples:

-   https://r-tek.github.io/colr_pickr/get-started.html
-   https://codepen.io/TEK-Projects/pen/ExPmEYK

### Getting Started:

###### Installation

-   Install with NPM:

    ```shell
    $ npm i @r-tek/colr_pickr
    ```

    If you are using a bundler like Webpack, you can import the module:

    ```javascript
    // ES6
    import pickr from '@r-tek/colr_pickr';

    // OR

    // CommonJs
    const pickr = require('@r-tek/colr_pickr');
    ```

    For now, you'll need to bring in the CSS file through one of the methods below.

<br />

-   Using the CDN via jsDelivr:
    ```html
    <script
    	type="text/javascript"
    	src="https://cdn.jsdelivr.net/npm/@r-tek/colr_pickr@1.2.1/build/colr_pickr.min.js"
    ></script>
    ```
    ```html
    <link
    	rel="stylesheet"
    	type="text/css"
    	href="https://cdn.jsdelivr.net/npm/@r-tek/colr_pickr@1.2.1/build/colr_pickr.min.css"
    />
    ```

<br />

-   Alternatively, you could clone/download the repository. Under the /build directory, include the `colr_pickr_min.js` and the `colr_pickr_min.css` in your project.

###### Usage

```html
<!-- Add a button to your HTML document and give it any ID -->

<button id="my_picker"></button>

<!-- The rest is in your JavaScript file, or in this case a script tag -->

<script type="text/javascript">
	/**
	 * Create a new ColorPicker instance, which takes 2 parameters
	 *
	 * Parameter 1 [HTMLElement]: the button you want to launch the editor
	 * Parameter 2 [String] (Optional): A color
	 */

	const button = document.getElementById('my_picker');
	let picker = new ColorPicker(button, '#ff0000');

	/**
	 * What do you want to do after you have chosen the color?
	 *
	 * You can specify this in an EventListener, assigned to your button
	 */

	button.addEventListener('colorChange', function (event) {
		// This will give you the color you selected
		const color = event.detail.color.hexa;

		// Code to do what you want with that color...
	});

	/**
	 * You can also change the color yourself via JavaScript
	 *
	 * If you want to change the selected color for an instance without using the picker
	 * You can call the following function
	 *
	 * Parameter 1 [String]: Color
	 * Parameter 2 [HTMLElement]: The button that holds the instance / picker launch button
	 */

	colorPickerComp.colorChange('#ff00ff', button);
</script>
```

### API Documentation:

For more details on functions shown in the example, and others, check out the API document on the project website:

https://r-tek.github.io/colr_pickr/documentation.html

### Color Value Information:

When you give the Color Picker a color value to read, it has to be a supported value format.
Colr Pickr support all the popular choices, the table below show all supported value formats:

| Format Name | Example Format              |
| :---------- | :-------------------------- |
| `hex`       | `"#ff0000"`                 |
| `hexAlpha`  | `"#ff0000ff"`               |
| `rgb`       | `"rgb(255, 0, 0)"`          |
| `rgba`      | `"rgb(255, 0, 0, 1)"`       |
| `hsl`       | `"hsl(360, 100%, 50%)"`     |
| `hsla`      | `"hsla(360, 100%, 50%, 1)"` |

### Changelog:

You can check out the change log for information on latest updates here:

https://github.com/R-TEK/colr_pickr/blob/master/CHANGELOG.md

### Contribution:

Read the contribution file for details on developing with the project. You can find the file here:

https://github.com/R-TEK/colr_pickr/blob/master/CONTRIBUTION.md

You can also contribute by issuing any bugs you have found or ideas for new features/optimizations to improve the component. You can do this by going to the [issues](https://github.com/R-TEK/colr_pickr/issues) page and posting your bug / feature. Once I have read the issue, I'll add it to a [Trello](https://trello.com/b/ovPg9LEu) road map. With the road map you can vote for items I have added if you like that feature too, and you can view what has been accepted/rejected, what I'm working on and what has been completed.

### License:

The MIT License - see the link below for more details:

https://github.com/R-TEK/colr_pickr/blob/master/LICENSE

---

&copy; [R-TEK](https://github.com/R-TEK)
