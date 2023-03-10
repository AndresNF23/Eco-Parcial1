const URL = `http://${window.location.hostname}:8080`;
let socket = io(URL, {
    path: '/real-time'
});

let leftButton = 0;
let rightButton = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    leftButton = {
        x: windowWidth / 4,
        y: windowHeight / 2,
        diameter: 150,
        direction: 'LEFT',
        isPressed: false
    }
    rightButton = {
        x: windowWidth / 4 * 3,
        y: windowHeight / 2,
        diameter: 150,
        direction: 'RIGHT',
        isPressed: false
    }
}

function draw() {
    background(0, 50)
    renderButton(leftButton)
    renderButton(rightButton)

}

function renderButton(button) {
    fill(0, 0, 255)
    circle(button.x, button.y, button.diameter)
}

function buttonPressed(button) {
    if (dist(mouseX, mouseY, button.x, button.y) <= button.diameter / 2) {
        button.isPressed = true
        sendDirection(button)
    }
}

function buttonReleased(button) {
    button.isPressed = false
    return button.isPressed
}

function mousePressed() {
    buttonPressed(leftButton)
    buttonPressed(rightButton)
}



function mouseReleased() {
    buttonReleased(leftButton)
    buttonReleased(rightButton)
    if (!buttonReleased(leftButton) && !buttonReleased(rightButton)) {
        
        socket.emit('No-Movement', message)
        console.log("You are not tapping any button.");

        /*___________________________________________
        
        1) Emit a message when the user is not tapping at any button
        
        _____________________________________________ */


    }
}

/*___________________________________________

2) Create a function that includes the socket method to emit the directions
_____________________________________________ */
let playerDirection = "";

function sendDirection(button) {

    if(dist(pmouseX, pmouseY, posX, posY)<25){
    socket.emit('player-movement',{leftButton,rightButton,noneButton})

    }
}