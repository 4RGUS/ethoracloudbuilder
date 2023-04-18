const express = require('express');
const app = express();
const archiver = require('archiver');
const fsExtra = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require("nodemailer");

//this is where the ethora app is cloned, renamed and zip file created
const appCreationDirectory = "/Users/vineethnambiar/externalApps";

//function to rename the ethora app to the name provided
async function renameReactNativeApp(newName, bundleIdentifier, cwd) {
  return new Promise((resolve, reject) => {
    const args = ["react-native-rename", newName];

    //react-native-rename appname --bundleID com.appname
    if (bundleIdentifier) {
      args.push("--bundleID", bundleIdentifier);
    }

    const child = spawn("npx", args, { stdio: "inherit", cwd: cwd });

    child.on("exit", (code) => {
      console.log(`react-native-rename exited with code ${code}`);
      if (code === 0) {
        resolve();
      } else {
        reject(`react-native-rename exited with code ${code}`);
      }
    });
  });
};

//function called by the endpoint
async function createApp(appName, bundleId) {
  try {
    // Clone the boilerplate to a new directory with the given app name
    const git = simpleGit();
    await git.clone("https://github.com/4RGUS/ethoraboilerplate.git", appCreationDirectory + appName);

    //get the directory of the cloned app
    const cwd = path.resolve(process.cwd(), appCreationDirectory + appName);

    //rename the package with the bundleID and name provided
    await renameReactNativeApp(appName, bundleId, cwd);

    return cwd;

  } catch (err) {
    console.error(err);
    return err
  }
};


app.use(bodyParser.json());

//endpoint to download the file
app.get('/download', (req, res) => {
  const appName = req.query.appName;
  console.log('download api called with app name:', appName);
  const file = `${appCreationDirectory + appName}.zip`;

  res.download(file, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send({ success: false, message: 'File not found' });
    }
  });
});

//endpoint to create the white labelled app
app.post('/buildapp', async (req, res) => {
  console.log(req.body);
  const { appName, bundleId, email } = req.body;
  const defaultConfig = require('./config');
  // console.log(`build api called with appname:${appName} and bundleId:${bundleId}`);
  if (appName && bundleId) {
    const projectDir = await createApp(appName, bundleId);
    console.log(defaultConfig.appTitle);
    if (projectDir) {
      // Create a zip file of the project directory
      const output = fs.createWriteStream(`${projectDir}.zip`);
      console.log(output, 'zip');
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      archive.on('error', (err) => {
        console.error(`Error creating archive: ${err}`);
        return res.status(500).send('Error creating project');
      });

      archive.on('end', async () => {
        // Delete the project directory
        fsExtra.remove(projectDir, (err) => {
          if (err) {
            console.error(`Error deleting directory: ${err}`);
          }
        });
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // use SSL
          auth: {
            user: 'posterrrr8@gmail.com', // generated ethereal user
            pass: 'ymijijdvszsdlyoa', // generated ethereal password
          },
        });
        const mailOptions = {
          from: 'posterrrr8@gmail.com',
          to: email,
          subject: `Your own ethora based ${appName}`,
          text: `Please click on the link to download your app: http://3.15.12.4:3000/download?appName=${appName}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({ success: true, downloadLink: `http://3.15.12.4:3000/download?appName=${appName}` });
      });

      archive.pipe(output);
      archive.directory(projectDir, false);
      archive.finalize();
    }
  } else {
    res.status(400).json({ success: false, errorMessage: `App name or bundleId is invalid. Data received appName:${appName} bundleId:${bundleId}}` })
  }


});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
