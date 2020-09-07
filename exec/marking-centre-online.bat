@ECHO OFF
TITLE MCO v2.4.6
CD C:\marking-centre
START "" http://localhost:3000/
CALL node C:\marking-centre\server.js >> C:\marking-centre\logs\server-logs.txt