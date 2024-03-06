const encryptor = require("file-encryptor");
const fs = require("fs");
const path = require("path");

const defaultKey = "123";

// Folder containing the files to be encrypted
const folderPath = "./folders/";

// Automatic encryption of files in the folder with the default key
encryptFilesInFolderWithDefaultKey(folderPath);

function encryptFilesInFolderWithDefaultKey(folderPath) {
  // Read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    // Iterate over each file in the folder
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Check if the file is a regular file
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error checking file stats:", err);
          return;
        }

        if (stats.isFile()) {
          // Encrypt the file
          encryptor.encryptFile(
            filePath,
            ${filePath}.encrypted,
            defaultKey,
            function (err) {
              if (err) {
                console.log("Encryption failed for file:", filePath, err);
              } else {
                // Delete the original file after successful encryption
                fs.unlinkSync(filePath);
                console.log("Encryption successful for file:", filePath);
              }
            }
          );
        }
      });
    });
  });
}
