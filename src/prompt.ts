export let element = document.createElement('div');

let textbox = document.createElement("input")
textbox.type = "text";
textbox.className = "prompt";

let button = document.createElement("button");
button.id = "validate";
button.value ="up";
button.addEventListener('click', function(e) {
    e.preventDefault();
    let res = eval.apply(window, [textbox.value]);
    if(res) {
        console.log(res);
    }
    else {
        console.log("undefined");
    }

});
button.innerHTML = "Enter"

textbox.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("validate").click();
    }
});

element.appendChild(textbox);
element.appendChild(button);