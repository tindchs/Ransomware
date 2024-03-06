const encryptor = require("file-encryptor");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultKey = "123";
const encryptedFolder = "./folders/";

// Define the minimum payment amount
const minimumPayment = 1000;

processPayment();

function processPayment() {
  rl.question(
    "Enter the payment amount (minimum P1000 pesos): ",
    function (amount) {
      // Check if the payment amount meets the minimum requirement
      if (parseFloat(amount) < minimumPayment) {
        console.log("Payment of at least P1000 pesos is required.");
        processPayment(); // Prompt user to enter payment amount again
      } else {
        // Process the payment
        decryptFilesInFolderWithDefaultKey(encryptedFolder);
        rl.close();
      }
    }
  );
}

function decryptFilesInFolderWithDefaultKey(encryptedFolder) {
  // Read the contents of the folder
  fs.readdir(encryptedFolder, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    // Iterate over each file in the folder
    files.forEach((file) => {
      const filePath = path.join(encryptedFolder, file);

      // Decrypt the file
      encryptor.decryptFile(
        filePath,
        filePath.replace(".encrypted", ""),
        defaultKey,
        function (err) {
          if (err) {
            console.log("Decryption failed for file:", filePath, err);
          } else {
            console.log("Decryption successful for file:", filePath);
            // Remove the encrypted file after decryption
            fs.unlinkSync(filePath);
          }
        }
      );
    });
  });
}