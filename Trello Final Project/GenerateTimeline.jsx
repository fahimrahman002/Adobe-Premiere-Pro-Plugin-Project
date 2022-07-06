//json2.js 
this.JSON||(this.JSON={}),function(){function f(t){return t<10?"0"+t:t}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(t){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(t){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,f,o,u,i=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(o=a.length,n=0;n<o;n+=1)u[n]=str(n,a)||"null";return f=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,f}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;n<o;n+=1)"string"==typeof(r=rep[n])&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);else for(r in a)Object.hasOwnProperty.call(a,r)&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);return f=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,f}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var n,r,f=t[e];if(f&&"object"==typeof f)for(n in f)Object.hasOwnProperty.call(f,n)&&(void 0!==(r=walk(f,n))?f[n]=r:delete f[n]);return reviver.call(t,e,f)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
var projectItemList=[];
var sequenceList=[];

function readJsonFile(filePath) {
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
				jsonFile.close();
				return parsedJson;
			} else {
				alert("Json file does not exist")
				jsonFile.close();
				return 0
			}
}

function moveToFolder(){
    var project = app.project;
var projectItem = project.rootItem;
			var projectItemList=[];
			var sequenceFolder=projectItem.createBin("Generated Timeline Sequences");
			for(var i=0;i<projectItem.children.numItems;i++){
				var name =projectItem.children[i].name;
				for(var j=0;j<sequenceList.length;j++){
					if(sequenceList[j]==name){
						projectItemList.push(projectItem.children[i]);
					}
				}
			}
		
			for(var k=0;k<projectItemList.length;k++){
				projectItemList[k].moveBin(sequenceFolder);
			}
}

function generateTimeline(videoTrackOne,videoFileName,cut){
    var project = app.project;
var projectItem = project.rootItem;
			for(var j=0;j<projectItemList.length;j++){
				if(projectItemList[j].name==videoFileName){
					var time = new Time();
					var totalClips=videoTrackOne.clips.numTracks;
					if(totalClips>0)
					time.seconds=videoTrackOne.clips[totalClips-1].end.seconds;
					for(var i=0;i<cut.length;i++){
							var startTime = new Time();
							startTime.seconds = cut[i].inPoint;
							var endTime = new Time();
							endTime.seconds = cut[i].outPoint;
							projectItemList[j].setInPoint(startTime.ticks, 4);
							projectItemList[j].clearOutPoint();
							projectItemList[j].setOutPoint(endTime.ticks, 4);
							videoTrackOne.insertClip(projectItemList[j], time.ticks);
							totalClips=videoTrackOne.clips.numTracks;
							time.seconds = videoTrackOne.clips[totalClips-1].end.seconds;
					}
				}
			}
		}

function videoTimelines() {
		var project = app.project;
        var projectItem = project.rootItem;
		var configFileData=readJsonFile(File($.fileName).path+"/config.json");
		
		var parsedJson =readJsonFile(File($.fileName).path+"/data.json");
		var presetPath=configFileData.preset_file_path;
        
		if (parsedJson != null) {
			try{     
				for(var i=0;i<parsedJson.timelineData.length;i++){
					var thumbName=parsedJson.timelineData[i].thumbName;
					var timelines=parsedJson.timelineData[i].timelines;
					var sequenceName=thumbName;
					qe.project.newSequence(sequenceName,presetPath);
					var newSequence;
					for(var sq=0;sq<project.sequences.numSequences;sq++){
						if(project.sequences[sq].name==sequenceName){
							newSequence = project.sequences[sq];
							break;
						}
					}
					if(newSequence){
						var videoTrackOne = newSequence.videoTracks[0];
						for(var j=0;j<timelines.length;j++){
							generateTimeline(videoTrackOne,timelines[j].videoFileName,timelines[j].cut);
						}
						sequenceList.push(newSequence.name);
					}

				}
				moveToFolder();
				
			}catch(e){
                //$.writeln(e);
				alert(e);
			}
		} else{
			return 0;
		}

	
}

function saveProjectFile(){
    app.project.save();
}

function exitAdobePremierePro(){
	var batFile = new File(File($.fileName).path+"/ExitAdobePremierePro.bat");
	batFile.execute();
}
function validFileType(path) {
			if (path.length < 3) return false;
			var ext = path.substring(path.length - 4, path.length).toLowerCase();
			var validExt = [
				".mp4",
				".wmv",
				".mov",
				".mxf",
				".mts",
				".mkv",
				".avi",
				".cvs",
				".tif",
			];
			for (var i = 0; i < validExt.length; i++) {
				if (ext == validExt[i]) return true;
			}
			return false;
}   
function getImportedVideosV2(bin){
    var project = app.project;
var projectItem = project.rootItem;
			var stack=[];
			stack.push(bin);
			while(stack.length!=0){
				var projectItem=stack[stack.length-1];
				stack.pop();
				for (var i = 0; i < projectItem.children.numItems; i++) {
					if (projectItem.children[i].type == 2 
					&& projectItem.children[i].children.numItems>0  ) {
					stack.push(projectItem.children[i]);
					}else if (projectItem.children[i].type == 1 
					&& validFileType(projectItem.children[i].name)) {
					 projectItemList.push(projectItem.children[i]);
					} 
				 }
			 }
}
function getProjectItems(){
    var project = app.project;
var projectItem = project.rootItem;
		try {
			for (var i = 0; i < projectItem.children.numItems; i++) {
				if (projectItem.children[i].type == 2) {
					var folderName = projectItem.children[i].name;
					if (folderName.toLowerCase() != "bin") continue;
					getImportedVideosV2(projectItem.children[i]);
				}
			}
		} catch (e) {
            //$.writeln(e);
			alert(e);
		}
}

function main() {
        app.enableQE();
        try{
           var projectFilePath=readJsonFile(File($.fileName).path+"/projectFilePath.json");
           app.openDocument(projectFilePath.path,1,1,1);
           getProjectItems();
           videoTimelines();
           saveProjectFile();
           exitAdobePremierePro();
           }catch(err){
                //$.writeln(err);       
                alert(err);
           }
}

main();
