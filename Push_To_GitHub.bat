@echo off
title Push MineVault to GitHub
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

echo ========================================================
echo           PUSHING MINEVAULT TO GITHUB
echo ========================================================
echo.
echo Target: https://github.com/ip7629778-boop/minecraft-schematics
echo.
echo If a browser window appears, click "Sign in" / "Authorize".
echo.

git push -u origin main

echo.
echo ========================================================
echo If you see "Branch 'main' set up to track...", it is DONE!
echo ========================================================
echo.
pause
