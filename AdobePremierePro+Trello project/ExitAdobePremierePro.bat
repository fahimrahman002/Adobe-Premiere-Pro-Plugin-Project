@echo off
set EXE=Adobe Premiere Pro.exe
tasklist /fi "imagename eq %EXE%" |find ":" > nul
if errorlevel==1 (goto ProcessFound) else (goto ProcessNotFound)

:ProcessFound
echo Closing %EXE%
taskkill /im "%EXE%" /t /f
goto END

:ProcessNotFound
echo %EXE% is already closed
goto END

:END
echo Finished!
EXIT

