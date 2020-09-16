
@ECHO OFF
TITLE MCO v2.4.10
ECHO Copying recently uploaded documents to server
MKDIR G:\CoreData\MCO\public\files
ROBOCOPY C:\MCO\marking-centre\public\files G:\CoreData\MCO\public\files /E
