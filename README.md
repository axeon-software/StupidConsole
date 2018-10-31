# Stupid Console 
[Demo](https://codepen.io/levavasseur/pen/rqEvVe)

Because we need the console to dev but it's not available everywhere

1. Insert stupid-console scripts before any others in the ```<head>``` section.

```html
    <link rel="stylesheet" href="https://unpkg.com/stupidconsole/dist/stupid-console.min.css">
    <script  src="https://unpkg.com/stupidconsole/dist/stupid-console.min.js"></script>
``` 

* [ZIP](https://github.com/axeon-software/StupidConsole/releases)
* [NPM](https://www.npmjs.com/package/stupidconsole) 
```> npm install stupidconsole```


2. All console outputs will then be replicated in a floating window.
3. There's also a console input.

## StupidConsole.GUI 
[Demo](https://codepen.io/levavasseur/pen/YJoLpL)

Allow you to build custom debug window easily 

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
