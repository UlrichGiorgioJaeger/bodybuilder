function writeText(message, pClass){
    var p = document.createElement("p");
    p.setAttribute('class', pClass);
    var text = document.createTextNode(message);
    p.appendChild(text);
    document.getElementById("output").appendChild(p);
}
function clearText(){
    var output = document.getElementById("output");
    while(output.hasChildNodes()){
        output.removeChild(output.firstChild);
    }
}
function writeError(message){
    writeText(message, 'error');
}

var websocket = new WebSocket("ws://" +document.location.host + document.location.pathname + "spende");

websocket.onopen = function(event){
    writeText("Verbunden! Bitte wählen Sie eine Aktion.");
};

websocket.onmessage = function(event){
    writeText(event.data);
};
websocket.onclose = function(event){
    writeText("Die Verbindung wurde geschlossen!");
};

websocket.onerror = function(event){
    writeText(event.data);
};

function setAktionId(id){
    if(id.match(/^\d+$/)!==null){//eingabe ist eine zahl
        clearText();
        websocket.send(id);
        console.log("sende: " +id);
    }
    else{
        writeError("Keine gültige Aktion-ID. Eingabe wiederholen!");
    }
}