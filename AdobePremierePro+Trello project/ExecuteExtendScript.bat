@echo off
set EXE=Adobe Premiere Pro.exe
tasklist /fi "imagename eq %EXE%" |find ":" > nul
if errorlevel==1 (goto ProcessFound) else (goto ProcessNotFound)

:ProcessFound
echo Closing %EXE%
taskkill /im "%EXE%" /t /f
echo Opening %EXE% to execute extend script file 
"C:\Program Files\Adobe\Adobe Premiere Pro CC 2018\Adobe Premiere Pro.exe" /C es.processFile %~dp0GenerateTimeline.jsx
goto END

:ProcessNotFound
echo Opening %EXE%
"C:\Program Files\Adobe\Adobe Premiere Pro CC 2018\Adobe Premiere Pro.exe" /C es.processFile %~dp0GenerateTimeline.jsx
goto END

:END
echo Finished!
EXIT
