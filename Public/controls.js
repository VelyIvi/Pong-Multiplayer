class Controls{
    constructor(){
        this.rightUp=false;
        this.rightDown=false;
        this.leftUp=false;
        this.leftDown=false;

        this.enter = false;
        this.escape = false;



        this.leftUpKey = "w";
        this.leftDownKey = "s";
        this.rightUpKey = "ArrowUp";
        this.rightDownKey = "ArrowDown";

        this.enterKey = "Enter";
        this.escapeKey = "Escape";


        this.#addKeyboardListeners();
    }
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case this.leftUpKey:
                    this.leftUp=true;
                    break;
                case this.leftDownKey:
                    this.leftDown=true;
                    break;
                case this.rightUpKey:
                    this.rightUp=true;
                    break;
                case this.rightDownKey:
                    this.rightDown=true;
                    break;
                case this.enterKey:
                    this.enter=true;
                    break;
                case this.escapeKey:
                    this.escape=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case this.leftUpKey:
                    this.leftUp=false;
                    break;
                case this.leftDownKey:
                    this.leftDown=false;
                    break;
                case this.rightUpKey:
                    this.rightUp=false;
                    break;
                case this.rightDownKey:
                    this.rightDown=false;
                    break;
                case this.enterKey:
                    this.enter=false;
                    break;
                case this.escapeKey:
                    this.escape=false;
                    break;
            }
        }
    }
}