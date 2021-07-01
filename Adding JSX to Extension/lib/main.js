const myUsers = fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => response.json())
.then((result) => {
  return result;
});

function applyMLFunc() {
    var cs = new CSInterface();

    const sendUsers = async () => {
        result = await myUsers;
        var jsonString=JSON.stringify(result);
        var len=jsonString.length;
        var newJsonString="";
        
        for(var i=0;i<len;i++){
          if(jsonString[i]=='\"'){
            newJsonString=newJsonString+"\\"+jsonString[i];
          }else{
            newJsonString+=jsonString[i];
          }
        }
        var sender=('var jsonData="'+newJsonString+'";');
        cs.evalScript(sender+"$.runScript.test()");
    };
    sendUsers();

}
