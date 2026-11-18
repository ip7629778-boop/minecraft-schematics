@echo off
title MineVault Local Server
cd /d "%~dp0"

echo ========================================================
echo           MINEVAULT LOCAL DEVELOPMENT SERVER
echo ========================================================
echo.
echo Starting server on http://localhost:8080 ...
echo.

start http://localhost:8080
node serve.js

pause
