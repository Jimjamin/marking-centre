nodeJS Application (Express)<br><br>

# Marking Centre Online v2.2.1 (DMP)<br>
### Distributed Marking Program (DMP) for Queensland State Schools

In facilitating the eased workload for teaching staff, this application intends to create an environment where student exams can easily be accessed, shared, and managed into parts assigned to each teacher to mark. As an extension of this primary goal it will be possible to coordianate large group tasks such as moderation of student examination marking.

Installing the application to your personal computer and installing the database on a central sever accessible by school staff (most likely G:\Coredata) will enable all intended functionality. Find the installation file for your OS below.

> Windows 7/8/10: *URL to go here*

> MacOS/Linux: *URL to go here*

### Navigating API routes of app
To access the various API's of this application guides can be found in this repository at *insert file URL here*. Keep in mind this file requires further functionality to process it and display it in a visual format. As such, if you are running the application on your computer, you can navigate to http://localhost:3000/docs to view this information.

### App documentation
To understand each function in this application, navigate through to the docs directory (when loaded on your computer this is found at D:\marking-centre\docs). Each folder in this directory contains a file global.html which can be run by any modern browser. These file contain all documentation on the app.

### Uploading CSV files
To commit a mass upload of data (either new exam jobs or new users) a CSV file can be uploaded (keep in mind that uploads are only available to admin users). The format of this CSV file is important to ensure that the intended data is uploaded; however, an error in your upload will not cause any damage to the database. 

CSV files are expected to follow standard RFC 4180 (almost all CSV files will automatically be in this standard). These files can either be created through using [Microsoft Excel and exporting as a .csv file](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba) or through a program such as Notepad or Notepad++. Below are provided some examples of how these files can be formatted for either uploading new exam jobs or new users.

> With all these examples keep in mind that you should not include the first row of headers in your file, as these will automatically be uploaded to the database as if it was any other row, and may cause unintended errors.

##### Uploading new exam jobs
> You cannot leave any fields empty or else the upload will fail; all data must be provided.

```
STUDENT ID,EXAM ID,TEACHER EMAIL ADDRESS,QUESTION NUMBER,FILE LOCATION(S)
782201,0228,jsmit1@eq.edu.au,5,G:\CoreData\example1.png G:\CoreData\example2.png
782201,0228,jsmit1@eq.edu.au,6,G:\CoreData\example3.png
290372,0228,edome52@eq.edu.au,5,G:\CoreData\edome52\Assessment\example1.png
782201,0228,edome52@eq.edu.au,5,G:\CoreData\edome52\Assessment\example2.png
782201,0228,edome52@eq.edu.au,1,G:\CoreData\example4.png
```

##### Uploading new users
> In this case you can leave the name fields empty if it isn't important to have the names of the staff provided.

> If the user is to be an admin user, enter admin in the column ADMIN, otherwise leave it blank

```
GIVEN NAME(S),FAMILY NAME(S),EMAIL ADDRESS,PASSWORD,CONFIRM PASSWORD,ADMIN
John Steven,Smith,jsmit1@eq.edu.au,Password.1,Password.1,admin
Jane Elizabeth,Smith,jsmit2@eq.edu.au,Password.1,Password.1,
,,edome52@eq.edu.au,Password.1,Password.1,
Barry,,brodg79@eq.edu.au,Password.1,Password.1,
```
