function whiteColor() {
    if (arguments.length == 0) {
        return color(235, 229, 206);
    } else {
        return color(235, 229, 206, arguments[0]);
    }
}

function blackColor() {
    if (arguments.length == 0) {
        return color(23, 18, 25);
    } else {
        return color(23, 18, 25, arguments[0]);
    }
}

let BUTTONSTYLE = {
    color: "#ebe5ce", hover_color: "#f3efe2", pressed_color: "#fdfcfa",
    text_color: "rgb(23, 18, 25)", border_color: "rgb(23, 18, 25)",
    text_size: 40
};
function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0;i<length;i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}