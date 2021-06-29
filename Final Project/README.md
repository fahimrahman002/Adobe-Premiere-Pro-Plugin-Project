## Adobe Premiere Pro Plugin description

This plugin read projectItem name and inPoint,outPoint data from a json file. At first it creates a sequence and a video track and according to the json data, it sets inPoint, outPoint and puts them togather in the track as a clip.

## How to set up this project -
- Open the jsx file in Adobe ExtendScript Toolkit and select Adobe Premiere Pro CC to run the script. Make sure json2.js file is in the same directory.
- Add the json file's correct path in the jsx file
    ```sh
    var jsonData = readJson("C:/Users/pc_user_name/Documents/Adobe Scripts/data.json");
    ```
- Or if you want to open by FileOpenDialog then make changes in the code like this -
    ```sh
    function main() {
    var file=new File();
    file = file.openDlg("Open a file", "Acceptable Files:*.json");
    readJson(file);
    //var jsonData = readJson("C:/Users/pc_user_name/Documents/Adobe Scripts/data.json");
    ...
    }
    ```
- Import Videos in Adobe Premiere Pro and make sure there is no audio files or sequences
![image](https://drive.google.com/uc?export=view&id=1WvvM1FTnDAU-VLMeTEewvacc7M2MA-i-)
- Run the script and ok
![image](https://drive.google.com/uc?export=view&id=1-aLcclyTU5NzSdFnW5ez4yUHXao3EU09)
- Output 
![image](https://drive.google.com/uc?export=view&id=1huy0nALxOh5bCzn-ahtJK5Nngjbf5VpX)