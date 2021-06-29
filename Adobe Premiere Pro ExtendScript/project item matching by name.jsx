var project = app.project;
var projectItem = project.rootItem;
main();

function main() {
    var tempName, thisName;
    for (var i = 0; i < projectItem.children.numItems; i++) {
        tempName = projectItem.children[i].getMediaPath();
        thisName = tempName.slice(tempName.lastIndexOf("\\") + 1, tempName.length);

        if (thisName == "D8(4).wmv") {
            $.writeln("matched");
        }
    }
}