var project = app.project;
var projectItem = project.rootItem;
main();

function main() {
    var mergeArray = [];
    var time = new Time();

    for (var i = 0; i < projectItem.children.numItems; i++) {
        mergeArray.push(projectItem.children[i]);

    }

    var newSequence = project.createNewSequence("New Sequence", "id1");
    var videoTracks = newSequence.videoTracks;
    var videoTrackOne = videoTracks[0];

    for (var i = 0; i < mergeArray.length; i++) {
        var startTime = new Time();
        var endTime = new Time();
        var number = 21.0 / 30.0;
        endTime.seconds = number;
        mergeArray[i].setInPoint(startTime.ticks, 4);
        mergeArray[i].clearOutPoint();
        mergeArray[i].setOutPoint(endTime.ticks, 4);

        //~       var subClip=mergeArray[i].createSubClip(mergeArray[i].name, startTime.ticks, endTime.ticks,1, 1, 1);

        videoTrackOne.insertClip(mergeArray[i], time.ticks);
        //~         time.seconds+=mergeArray[i].getOutPoint().seconds;
        time.seconds += videoTrackOne.clips[i].duration.seconds;
    }


}