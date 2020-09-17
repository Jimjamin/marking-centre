nodeJS Application (Express)<br><br>

# Marking Centre Online v2.4.10 (DMP)<br>
### Distributed Marking Program (DMP) for Queensland State Schools

In facilitating the eased workload for teaching staff, this application intends to create an environment where student exams can easily be accessed, shared, and managed into parts assigned to each teacher to mark. As an extension of this primary goal it will be possible to coordianate large group tasks such as moderation of student examination marking.

Installing the application to your personal computer and installing the database on a central sever accessible by school staff will enable all intended functionality. To install the application, follow the steps as indicated below.

1. Navigate the the online copy of this application, found at https://marking-centre.herokuapp.com/
2. Login using your supplied login details (this may be the default account created for the admin of your school) and ensure you are redirected to the home-page
3. Having logged in, now navigate to https://marking-centre.herokuapp.com/install to find the installation file for you, clicking on the relevant button
> Currently only Windows 7/8/10 is supported. Work is in progress to add more OS's to be able to use this application in.
4. When the file finishes downloading run the installation file.
    1. The installation file will create the new directory C:\MCO\marking-centre on your personal device as well as install node.JS
5. To run the application, navigate to C:\MCO\marking-centre and run the shortcut "Marking Centre Online". To avoid repeating this process in future you can copy the shortcut to your desktop.
    1. Running this application will create the directory G:\CoreData\MCO\public\files on your school server which all staff with access to G:\ will see
    2. All exams uploaded to Marking Centre Online will not only be saved on your computer, but saved on the server (whenever it has access) to G:\CoreData\MCO\public\files
> More detail will be gone into in the following sections.

Any errors that occur during the process may be rectified by the following troubleshooting:
1. Restart your computer to clear computer of any cache data stored from your browser
2. Open either an updated version of Google Chrome or Firefox (Edge and Explorer may have some settings that don't work with this application)
    1. When opening this browser, type in "google.com.au" into your searchbar
    2. This will prompt you to enter your proxy details if you haven't been prompted already
    3. Make sure to enter your proxy details here when asked
3. Navigate to the online version of the application found at https://marking-centre.herokuapp.com/ and login using either the default admin account or the account created for you
    1. Press the support button to email your admin if you are having any login troubles
    2. Ensure you do not include any personal details in your emails to the admin to protect your privacy and security
4. Download the installation file at https://marking-centre.herokuapp.com/install and click on the relevant button to download the relevant installation file for you
5. Run the installation file on your computer; upon completion navigate to C:\MCO\marking-centre on your computer and run the shortcut "Marking Centre Online"
    1. If this does not work, navigate to C:\MCO\marking-centre\exec and run the file "marking-centre-online.exe"
    2. If this still does not work, use the hotkey "Win" + "R" to open up Run and enter cmd.exe to open up Command Prompt
        1. From within command prompt, type "CD C:/MCO/marking-centre" to navigate to the correct folder
        2. Upon doing that, run a second command "node server.js" to start running the web application
        3. Once the application is running, head over to your already open Google Chrome or Firefox browser and enter "localhost:3000/"
6. If problems continue to persist, contact your HOD or the school IT admin for any further guidance 

### Accessing files on your computer
When the application has finished installing on your computer all source code will be found at C:\MCO\marking-centre including local copies of uploaded files found at C:\MCO\marking-centre\public\files for access in the application or when offline. If your computer is low on available space you may delete files from the C:\MCO\marking-centre\public\files directory, however, when you are next at school and logging into the application the files will automatically be redownloaded if they still exist in the directory G:\CoreData\MCO\public\files where all server based copies of the files exist.

The directory G:\CoreData\MCO\public\files will automatically detect any files uploaded by admin users and copy those files. If new files have been uploaded to the server every user will automatically download them when they next logon to the application (even if the files are not to be marked by said user). Deleting any files from this directory won't automatically delete the local files on the user's computer, but it will mean that if the user also deletes the same file they won't receive any more copies of said file from the server (as it is deleted from the server). If any accidental deletions have been made, you will need to refer to your school IT admin or other relevant person for the server backup as this application does not make any backups itself (to avoid overloading the server with thousands of pictures everywhere). 

### Navigating API routes of app
To access the various API's of this application, guides can be found in this repository at *insert file URL here*. Keep in mind this file requires further functionality to process it and display it in a visual format. As such, if you are running the application on your computer, you can navigate to http://localhost:3000/docs to view this information. Otherwise you can log in at https://marking-centre.herokuapp.com/docs to find documentation if you have not yet installed the application on your own computer.

### App documentation
To understand each function in this application, navigate through to the docs directory (when loaded on your computer this is found at C:\MCO\marking-centre\docs). Each folder in this directory contains a file global.html which can be run by any modern browser. These file contain all documentation on the app and how it works.

### Uploading CSV files
To commit a mass upload of data (either new exam jobs or new users) a CSV file can be uploaded (keep in mind that uploads are only available to admin users). The format of this CSV file is important to ensure that the intended data is uploaded; however, an error in your upload will not cause any damage to the database. 

CSV files are expected to follow standard RFC 4180 (almost all CSV files will automatically be in this standard). These files can either be created through using [Microsoft Excel and exporting as a .csv file](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba) or through a program such as Notepad or Notepad++. Below are provided some examples of how these files can be formatted for either uploading new exam jobs or new users.

With all these examples keep in mind that you should not include the first row of headers in your file, as these will automatically be uploaded to the database as if it was any other row, and may cause unintended display errors. 

##### Uploading new exam jobs
> You cannot leave any fields empty or else the upload will fail; all data must be provided.

```
STUDENT ID,EXAM ID,TEACHER EMAIL ADDRESS,QUESTION NUMBER,FILE LOCATION(S)
782201,0228,jsmit1@eq.edu.au,5,G:\CoreData\example1.png; G:\CoreData\example2.png
782201,0228,jsmit1@eq.edu.au,6,G:\CoreData\example3.png
290372,0228,edome52@eq.edu.au,5,G:\CoreData\edome52\Assessment\example1.png
782201,0228,edome52@eq.edu.au,5,G:\CoreData\edome52\Assessment\example2.png
782201,0228,edome52@eq.edu.au,1,G:\CoreData\example4.png
```

##### Uploading new users
In this case you can leave the name fields empty if it isn't important to have the names of the staff provided; just remember to include a comma where their name would have been included as forgetting this might lead to the wrong data being put into the wrong column.

If the user is to be an admin user, enter admin in the column ADMIN, otherwise leave it blank (making sure there is still a comma at the end of the column that came just before) and the server will automatically action this.

```
GIVEN NAME(S),FAMILY NAME(S),EMAIL ADDRESS,PASSWORD,CONFIRM PASSWORD,ADMIN
John Steven,Smith,jsmit1@eq.edu.au,Password.1,Password.1,admin
Jane Elizabeth,Smith,jsmit2@eq.edu.au,Password.1,Password.1,
,,edome52@eq.edu.au,Password.1,Password.1,
Barry,,brodg79@eq.edu.au,Password.1,Password.1,
```

### Accessing exams to mark
To access an exam that has been uploaded to the database for you to mark, simply navigate to the homepage of the application and expand the "Active jobs" table (or the "Completed jobs" table if it has already been marked at some point). From here, you can click on the relevant row for the question you wish to mark, and you will be redirected to a page for viewing and marking said question.

### Working in offline mode
> Offline mode includes taking your device home from school, as the application looks to connect to the databae located at school which cannot be connected to remotely

When the application has been opened and you have logged in, all exam data will be saved to your current session. This means that as long as you keep the application open and do not close the browser you will still be able to mark exams and give grades to them (admin users will not be able to delete users or see the list of users in this mode however). When you return to school, the application will automatically sync up with the database and send all cached data there. If you have closed the browser before this instance however, all data will be lost from the time you first entered offline mode for that current session.

### Logging in as admin
If you own an admin account and have logged in with said account, you will have access to additional features that accounts without admin permissions won't have access to. Only the admin users can make any uploads of records, and only the admin users can see a list of all users (as long as they are not in offline mode). With seeing the list of all users, it is also possible to delete users who no longer need access or who no longer work at the school.
