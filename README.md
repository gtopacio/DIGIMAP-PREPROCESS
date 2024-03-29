# DIGIMAP-PREPROCESS

A NodeJS application that verifies user uploaded photos
Checks if JPG/PNG
Converts to JPG
Uploads the converted image to the file bucket
Stores the Job Metadata to the database
Submits the job to the Queue

## Setup Instructions

1. Install **yarn**
2. Run **yarn install**
3. Create a **.env** file containing these variables:
<br> **PORT** - the port number the application will run, do not include if you will deploy it in Heroku
<br> **UPLOAD_PATH** - path of the directory where uploaded files will be stored temporarily
<br> **AWS_ACCESS_KEY_ID** - access key id of the IAM user with SQS credentials for job posting
<br> **AWS_SECRET_ACCESS_KEY** - secret key of the IAM user with SQS credentials for job posting
<br> **SQS_QUEUE_URL** - URL of the SQS queue to be used for job posting
<br> **FIREBASE_BUCKET** - bucket uri provided by Firebase Storage (ex. gs://my-app.appspot.com)
<br> **FIREBASE_PROJECT_ID** - project ID of the firebase instance you are using (ex. my-app-in-firebase)
<br> **FIREBASE_PRIVATE_KEY** - private key of the admin service account, found in the provided JSON file for admin service accounts in Firebase
<br> **FIREBASE_CLIENT_EMAIL** - client email of the firebase admin service account (ex. admin@my-app.iam.gserviceaccount.com)
4. Run **node index.js**

## List of all repositories for this project

Front end - https://github.com/gtopacio/DIGIMAP-FRONT<br>
Preprocessing - https://github.com/gtopacio/DIGIMAP-PREPROCESS<br>
Renderer - https://github.com/gtopacio/DIGIMAP-JOB<br>