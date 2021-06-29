app.enableQE();
$.writeln("QE Track Loop start");
var thisTrack = qe.project.getActiveSequence().getVideoTrackAt(0);
for (var i = 0; i < thisTrack.numItems; i++) {
    $.writeln("i = " + i);
    $.writeln(thisTrack.getItemAt(i).name);
}
$.writeln("QE Track Loop End");