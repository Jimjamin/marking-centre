
@ECHO OFF
TITLE MCO v2.4.10
ECHO Copying recently uploaded documents to your local folders
MKDIR G:\CoreData\MCO\public\files
ROBOCOPY G:\CoreData\MCO\public\files C:\MCO\marking-centre\public\files /E
