console.info("Do you like Apple ? ");

console.warn("I hate them");

console.log(2);

console.log("string");

console.log("2", 2, { x : 2});
    console.error("errooor");

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

throw new Error("error thrown from test.js");

