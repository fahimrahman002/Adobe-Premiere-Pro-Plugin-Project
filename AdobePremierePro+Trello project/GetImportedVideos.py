# venv\Scripts\Activate
# py GetImportedVideos.py

import os
import shutil
import subprocess
import json
from pathlib import Path


def getImportedVideos(projectFilePath):
    projectFile=projectFilePath.split(".prproj")[0]
    shutil.copy2(f'{projectFile}.prproj', f'{projectFile}.xml')
    from lxml import etree
    tree = etree.parse(f"{projectFile}.xml")
    root = tree.getroot()
    importedVideoList=root.xpath('//ClipProjectItem/ProjectItem/Name/text()')
    os.remove(f"{projectFile}.xml")
    return importedVideoList

def setProjectFilePath(projectFilePath):
    pathDict={"path":projectFilePath}
    with open('projectFilePath.json', 'w') as fp:
        json.dump(pathDict, fp)

def executeExtendScript():
    subprocess.call([r'ExecuteExtendScript.bat'])

def main():
    projectFileName="Tutorial1"
    projectFilePath=str(Path().absolute())+"\\"+projectFileName+".prproj"
    videos=getImportedVideos(projectFilePath) 
    # ex:videos=['sample_video_1.mp4','sample_video_2.mp4']
    for name in videos:
        print(name)

    # After creating data.json file
    setProjectFilePath(projectFilePath)
    executeExtendScript()


main()



