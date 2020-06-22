### Features:

-   Drag interactive color picker allowing for easy use of finding colors, including a Saturation and Lightness box, Hue slider and Opacity slider
-   Reads and outputs HEX(with Alpha), RGBA and HSLA color values
-   Save custom colors to re-use on return to the color picker
-   Full Touch Support
-   ~4kb file size, meaning a super fast component of your application
-   Works on all major browsers (tested on Chrome, Firefox, Edge(Legacy and Chromium version), and more)
-   Flat and modern design interface, inspired by google chrome dev-tools color picker

### Examples:

-   https://r-tek.github.io/colr_pickr/getting_started.html
-   https://codepen.io/TEK-Projects/pen/BajWXaN

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
    	src="https://cdn.jsdelivr.net/npm/@r-tek/colr_pickr@1.0.1/build/colr_pickr_min.js"
    ></script>
    ```
    ```html
    <link
    	rel="stylesheet"
    	type="text/css"
    	href="https://cdn.jsdelivr.net/npm/@r-tek/colr_pickr@1.0.1/build/colr_pickr_min.css"
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
	/*
	 * Create a new ColorPicker instance, which takes 2 parameters
	 *
	 * Parameter 1 [HTMLElement]: the button you want to launch the editor
	 * Parameter 2 [String] (Optional): A color
	 */

	const button = document.getElementById('my_picker');
	let picker = new ColorPicker(button, '#ff0000');

	/*
	 * What do you want to do after you have chosen the color?
	 *
	 * You can specify this in an EventListener, assigned to your button
	 */

	button.addEventListener('colorChange', function (event) {
		// This will give you the color you selected
		const color = event.detail.color;

		// Code to do what you want with that color...
	});

	/*
	 * You can also change the color yourself via JavaScript
	 *
	 * If you want to change the selected color for an instance without using the picker
	 * You can call the following function
	 *
	 * Parameter 1 [String]: Color
	 * Parameter 2 [HTMLElement]: The button that holds the instance / picker launch button
	 */

	colorChange('#ff00ff', button);
</script>
```

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

You can also contribute by issuing any bugs you have found or ideas for new features/optimizations to improve the component. You can do this by going to the [issues](https://github.com/R-TEK/colr_pickr/issues) page and posting your bug / feature. Once I have read the issue, I'll add it to a [Trello](https://trello.com/b/cznKuYCL) road map. With the road map you can vote for items I have added if you like that feature too, and you can view what has been accepted/rejected, what I'm working on and what has been completed.

### License:

The MIT License - see the link below for more details:

https://github.com/R-TEK/colr_pickr/blob/master/LICENSE

---

&copy; [R-TEK](https://github.com/R-TEK)
