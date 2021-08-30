//json2.js 
this.JSON||(this.JSON={}),function(){function f(t){return t<10?"0"+t:t}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(t){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(t){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,f,o,u,i=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(o=a.length,n=0;n<o;n+=1)u[n]=str(n,a)||"null";return f=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,f}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;n<o;n+=1)"string"==typeof(r=rep[n])&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);else for(r in a)Object.hasOwnProperty.call(a,r)&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);return f=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,f}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var n,r,f=t[e];if(f&&"object"==typeof f)for(n in f)Object.hasOwnProperty.call(f,n)&&(void 0!==(r=walk(f,n))?f[n]=r:delete f[n]);return reviver.call(t,e,f)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

app.enableQE();
var project=app.project;
var projectItem=project.rootItem;

//main();

//$.writeln(getTimelineByName("sample_video_2.mp4")[0].name);
//getImportedVideos();
var jsonData=readJson ("D:/Github projects/AdobePremierePro/Adobe-Premiere-Pro-Plugin-Project/AdobePremierePro+Trello project/data.json");
var presetPath="C:\\Program Files\\Adobe\\Adobe Premiere Pro CC 2018\\Settings\\SequencePresets\\AVCHD\\1080p\\AVCHD 1080p50.sqpreset";
		
generateTimeline();

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
				jsonFile.close();
				return parsedJson;
			} else {
				alert("Json file does not exist")
				jsonFile.close();
				return 0
			}
}
function getTimelineData(item){
    for(var i=0;i<jsonData.length;i++){
        var fileName=jsonData[i].videoFileName;
        if(item.name==fileName){
            var videoTimelines=jsonData[i].timelines;
            for(var t=0;t<videoTimelines.length;t++){
                var sequenceName=fileName+"_"+videoTimelines[t].name;
                qe.project.newSequence(sequenceName,presetPath);
                var newSequence;
                for(var sq=0;sq<project.sequences.numSequences;sq++){
                    if(project.sequences[sq].name==sequenceName){
                        newSequence = project.sequences[sq];
                        break;
                    }
			    }
                if(newSequence){
                    var videoTracks = newSequence.videoTracks;
                    var insertedClip=0;
                    var videoTrackOne = videoTracks[insertedClip];
                    var time = new Time();
                    for(var i=0;i<videoTimelines[t].cut.length;i++){
                            var startTime = new Time();
                            startTime.seconds = videoTimelines[t].cut[i].inPoint;
                            var endTime = new Time();
                            endTime.seconds = videoTimelines[t].cut[i].outPoint;
                            item.setInPoint(startTime.ticks, 4);
                            item.clearOutPoint();
                            item.setOutPoint(endTime.ticks, 4);
                            videoTrackOne.insertClip(item, time.ticks);
                            time.seconds += videoTrackOne.clips[insertedClip++].duration.seconds;
                    }
                }else{
                    $.writeln("No sequence created");
                 }
                  
            }
             break;
        }
     }
}


function getFileToGenerateTimeline(item,i,j,n){
    if(i==n) return;
    var nextItem=item.children[i]; 
    var type=nextItem.type;
        if(type==2){
             getFileToGenerateTimeline(nextItem, 0,n-1,nextItem.children.numItems);
             getFileToGenerateTimeline(item, i+1,j,n);
           //$.writeln("Name:"+item.name+" i:"+i+" j:"+j+" n:"+n);
        }else if(type==1){
            getTimelineData(nextItem);   
            return getFileToGenerateTimeline(item,i+1,j,n);
        }else{
                return;
         }
 }

function generateTimeline(){
		try{ 
            for(var i=0;i<projectItem.children.numItems;i++){
                if(projectItem.children[i].type==2){
                    var n=projectItem.children[i].children.numItems;
                    getFileToGenerateTimeline(projectItem.children[i],0,n,n);
                  }else if(projectItem.children[i].type==1){
                      getTimelineData(projectItem.children[i]);
                  }
            }            
		}catch(e){
			alert("Can't generate timeline. Please try again restarting the extension.");
		}
}
function getFilePath(item,i,j,n,pathArr){
    if(i!=n){
        pathArr.push(item.name);
        //$.writeln("Name:"+item.name+" i:"+i+" j:"+j+" n:"+n);
    }
    
    if(i==n){
       // $.writeln("Returning:"+i);
        return;
    }
    var nextItem=item.children[i]; 
    var type=nextItem.type;
        if(type==2){
             getFilePath(nextItem, 0,n-1,nextItem.children.numItems,pathArr);
             getFilePath(item, i+1,j,n,pathArr);
           //$.writeln("Name:"+item.name+" i:"+i+" j:"+j+" n:"+n);
        }else if(type==1){
                //$.writeln(nextItem.name);   
                pathArr.push(nextItem.name);
                return getFilePath(item,i+1,j,n,pathArr);
        }else{
                return;
         }

    }

function generatePath(pathArr,finalPaths){
    var path="";
    var n=pathArr.length;
    var pre=[];
    var fn=0;
    pre.push(pathArr[0]);
    for(var i=1;i<n;i++){
        if(path==pathArr[i])continue;
     var name=pathArr[i].split(".");
     if(name.length>1){
            finalPaths[fn]="";
        for(var j=0;j<pre.length;j++){
          finalPaths[fn]+=pre[j]+"/";
               //$.write(pre[j]+"/")            
            }
        finalPaths[fn]+=pathArr[i];
        fn=fn+1;
            //$.writeln(pathArr[i]);    
     }else{
         path=pathArr[i];
          //$.writeln(path); 
         if(pre[0]==path)pre=[];
         pre.push(path);
      }
        
//$.writeln(pathArr[i]);        
        }
 }


function getImportedVideos(){
    var importedVideos=[];
		var importedVideosAsString;
		try{
			var project = app.project;
			var projectItem = project.rootItem;
			
			for(var i=0;i<projectItem.children.numItems;i++){
                if(projectItem.children[i].type==2){
                    var pathArr=[];
                    var finalPaths=[];
                    var n=projectItem.children[i].children.numItems;
                    getFilePath(projectItem.children[i],0,n,n,pathArr);
                    generatePath(pathArr,finalPaths);
                  
                   for(var fn=0;fn<finalPaths.length;fn++){
                       importedVideos.push(finalPaths[fn]);           
                     }
                  }else if(projectItem.children[i].type==1){
                      importedVideos.push(projectItem.children[i].name);    
               }
           }
			importedVideosAsString=JSON.stringify(importedVideos);
		}catch(e){
			importedVideosAsString="";
			alert("Can't get imported videos. Please restart the extension.");
		}
    $.writeln(importedVideosAsString);
		return importedVideosAsString;
}




function main(){
		var importedVideos=[];
		var importedVideosAsString;
		try{ 
            for(var i=0;i<projectItem.children.numItems;i++){
                if(projectItem.children[i].type==2){
                    var pathArr=[];
                    var finalPaths=[];
                    var n=projectItem.children[i].children.numItems;
                    getFilePath(projectItem.children[i],0,n,n,pathArr);
                    generatePath(pathArr,finalPaths);
                    $.writeln(finalPaths.length);
                   
                   for(var fn=0;fn<finalPaths.length;fn++){
                        $.writeln(finalPaths[fn]);                        
                     }
                  }else if(projectItem.children[i].type==1){
                      $.writeln(projectItem.children[i].name); 
                  }
            }            
            
			
			//importedVideosAsString=JSON.stringify(importedVideos);
		}catch(e){
			importedVideosAsString="";
			alert("Can't get imported videos. Please restart the extension.");
		}
		
}