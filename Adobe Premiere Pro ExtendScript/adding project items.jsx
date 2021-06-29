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
        videoTrackOne.insertClip(mergeArray[i], time.ticks);
        //~         time.seconds+=mergeArray[i].getOutPoint().seconds;
        time.seconds += videoTrackOne.clips[i].duration.seconds;
    }


}