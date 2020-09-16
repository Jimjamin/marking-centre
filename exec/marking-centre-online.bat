@ECHO OFF
TITLE MCO v2.4.10
CD C:\MCO\marking-centre
FOR /f "skip=1" %%x in ('wmic os get localdatetime') do IF NOT defined MyDate SET MYDATE=%%x
SET TODAY=%MYDATE:~0,4%-%MYDATE:~4,2%-%MYDATE:~6,2%
START "" http://localhost:3000/
CALL node C:\marking-centre\server.js >> C:\marking-centre\logs\%TODAY%-server-logs.txt