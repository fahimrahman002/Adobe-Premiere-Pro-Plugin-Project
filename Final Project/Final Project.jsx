#include "json2.js"

var project = app.project;
var projectItem = project.rootItem;
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
        alert("Json file does not exists");
        return null;
    }
    jsonFile.close();

}
//~ var file=new File();
//~ file = file.openDlg("Open a file", "Acceptable Files:*.json");
//~ readJson(file);

function main() {
    var jsonData = readJson("C:/Users/pc_user_name/Documents/Adobe Scripts/data.json");
    if (jsonData != null) {
        var time = new Time();
        var newSequence = project.createNewSequence("New Sequence", "id1");
        var videoTracks = newSequence.videoTracks;
        var videoTrackOne = videoTracks[0];
        var insertedClip = 0;
        for (var i = 0; i < jsonData.length; i++) {
//~             $.writeln("Name:"+jsonData[i].name);
            var tempName, thisName;
            var fileName = jsonData[i].name;
            for (var j = 0; j < projectItem.children.numItems; j++) {
                tempName = projectItem.children[j].getMediaPath();
                projectItemName = tempName.slice(tempName.lastIndexOf("\\") + 1, tempName.length);

                if (projectItemName == fileName) {
//~                      $.writeln(fileName+" matched");
                    for (var k = 0; k < jsonData[i].cut.length; k++) {
//~                         $.writeln("inPoint:" + jsonData[i].cut[j].inPoint);
//~                         $.writeln("outPoint:" + jsonData[i].cut[j].outPoint);
                        var startTime = new Time();
                        startTime.seconds = parseInt(jsonData[i].cut[k].inPoint) / 30.0;
                        var endTime = new Time();
                        endTime.seconds = parseInt(jsonData[i].cut[k].outPoint) / 30.0;
                        projectItem.children[j].setInPoint(startTime.ticks, 4);
                        projectItem.children[j].clearOutPoint();
                        projectItem.children[j].setOutPoint(endTime.ticks, 4);
                        videoTrackOne.insertClip(projectItem.children[j], time.ticks);
                        time.seconds += videoTrackOne.clips[insertedClip++].duration.seconds;

                    }
                }
            }
        }
    } else {
        return 0;
    }

}