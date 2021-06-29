var project = app.project;
var sequence = project.activeSequence;
$.writeln("Normal  Track   loop  start");
for (var i = 0; i < sequence.videoTracks[0].clips.numItems; i +
    +) {
    $.writeln("i= " + i);
    $.writeln(sequence.videoTracks[0].clips[i].name);
}
$.writeln("Normal Track  loop end");