let playButton;
let settingsButton;

function startMenu(){
    playButton = {x: width/2, y: 400-30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Play", style:BUTTONSTYLE
    };
    settingsButton = {x: width/2, y: 400+30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Settings", style:BUTTONSTYLE
    };
    background(blackColor());

    textSize(100);
    textAlign(CENTER, CENTER);
    text("Multiplayer Pong!", width/2, 100);
    fill(whiteColor());

    button(playButton);
    button(settingsButton);

    if(playButton.pressed && !mousePressedHistory){
        menuType = "select";
        gameType = "none";
        state = "wait";
        mousePressedHistory = true;
    }
}

let onlineButton;
let localButton;
let AIButton;
function selectMenu() {
    onlineButton = {x: width/2, y: 400-60, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Online", style:BUTTONSTYLE
    }
    localButton = {x: width/2, y: 400, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Local", style:BUTTONSTYLE
    };
    AIButton = {x: width/2, y: 400+60, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"AI", style:BUTTONSTYLE
    };


    background(blackColor());

    textSize(100);
    textAlign(CENTER, CENTER);
    text("Select Game", width/2, 100);
    fill(whiteColor());

    button(onlineButton);
    button(localButton);
    button(AIButton);

    if(onlineButton.pressed && !mousePressedHistory){
        menuType = "online";
        mousePressedHistory = true;
    } else if(localButton.pressed && !mousePressedHistory) {
        start();
        menuType = "game";
        gameType = "local";
        state = "wait";
        startPlay();
        mousePressedHistory = true;
    }
}

let inputValue;

let joinOnlineGame;
let makeOnlineGame;

let inputCreated = false;
let inp;
function onlineMenu() {
    joinOnlineGame = {
        x: width / 2, y: 400 - 60, w: 300, h: 50,
        origin_x: 0.5, origin_y: 0.5,
        text: "Join", style: BUTTONSTYLE
    }
    makeOnlineGame = {
        x: width / 2, y: 400 + 60, w: 300, h: 50,
        origin_x: 0.5, origin_y: 0.5,
        text: "Make Game", style: BUTTONSTYLE
    }

    background(blackColor());

    textSize(100);
    textAlign(CENTER, CENTER);
    text("Join online game", width / 2, 100);

    if (!inputCreated) {
        inp = createInput(inputValue);
        inp.parent("CanvasElement");
        inp.position(width / 2 - 100, height / 2 - 120);
        inp.size(200);
        inputCreated = true;
    }

    textSize(40);
    text(gameConnectionError, width / 2, 400);

    inp.input(myInputEvent);
    button(joinOnlineGame);
    button(makeOnlineGame);
    if(makeOnlineGame.pressed && !mousePressedHistory){
        // inp.position(-100, -100);
        //
        inp.remove();
        inputCreated = false;


        start();
        menuType = "game";
        gameType = "online";
        state = "wait";

        makeNewGame();
        // multiplayerOn();
    }
    if(joinOnlineGame.pressed && !mousePressedHistory){
        inp.remove();
        inputCreated = false;
        joinGame(inputValue);
        mousePressedHistory = true;
    }
}

function myInputEvent() {
    inputValue = this.value();
}