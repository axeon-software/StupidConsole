# Stupid Console

1. Insert stupid-console before any other scripts in the ```<head>``` section.
```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/stupidconsole/dist/stupid-console.min.css">
    <script  src="https://unpkg.com/stupidconsole/dist/stupid-console.min.js"></script>
``` 

* Download
* NPM


2. All console outputs will be replicated in a floating window

screenshot.png

3. There's also a console input

screenshot.png

4. StupidConsole.GUI allow you to build custom debug window easily

```js
var gui = new StupidConsole.Gui('myGui');

gui.addButton("yo", function() {
    console.log("yoooo")
});

gui.addInputText("type some text", "my content", function(newText, event) {
   console.log("text changed to " + newText);
});

gui.addCheckbox("uncheck this box", true, function(checked) {
    console.log("checkbox " + checked);
});

gui.addButton("hey", function() {
    console.log("heyyyyy")
});

gui.addSelect("select one value", ["Value1", "Value2", "Value3"], function(index) {
    console.log("select changed " + index);
});

```
