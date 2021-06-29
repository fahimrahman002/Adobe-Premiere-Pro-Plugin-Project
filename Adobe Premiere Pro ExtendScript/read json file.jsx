#include "json2.js"

main();

function readJson(filePath) {
    var jsonFile = File(filePath);
    jsonFile.open('r');
    if (jsonFile.exists) {
        var currentLine;
        var jsonStuff = [];

        while (!jsonFile.eof) {
            currentLine = jsonFile.readln();
            jsonStuff.push(currentLine);
        }
        jsonStuff = jsonStuff.join("");
        var parsedJson = JSON.parse(jsonStuff);
        //~         $.writeln(parsedJson[1].name);
        return parsedJson;

    } else {
        alert("Json file does not exists")
    }
    jsonFile.close();

}
//~ var file=new File();
//~ file = file.openDlg("Open a file", "Acceptable Files:*.json");
//~ readJson(file);

function main() {

    var jsonData = readJson("C:/Users/fuads/Documents/Adobe Scripts/data.json");
    for (var i = 0; i < jsonData.length; i++) {
        //~             $.writeln("Name:"+jsonData[i].name);
        for (var j = 0; j < jsonData[i].cut.length; j++) {
            //~                 $.writeln("inPoint:"+jsonData[i].cut[j].inPoint);
            //~                  $.writeln("outPoint:"+jsonData[i].cut[j].outPoint);
        }
    }


}