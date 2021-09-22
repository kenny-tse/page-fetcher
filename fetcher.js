const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request('https://www.example.edu', (error, response, body) => {
  if (error) {
    console.log("URL is invalid!");
    return;
  }
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  const whatToWriteToFile = body;
  const lengthOfWritten = body.length;

  const path = './index.html';
  const answer = "Y";

  if (fs.existsSync(path)) {
    rl.question("Index.html already exists! Overwrite? (Y/N) ", (answer) => {
      rl.close();

      if (answer === "Y") {
        fs.writeFile('./index.html', whatToWriteToFile, err => {
          if (err) {
            console.error("File path is invalid!");
            return;
          }
          output(lengthOfWritten);
        });
      } else {
        return;
      }
    });
  } else {
    fs.writeFile('./index.html', whatToWriteToFile, err => {
      if (err) {
        console.error("File path is invalid!");
        return;
      }
      output(lengthOfWritten);
    });
  }
  return;
});

const output = function (bytes) {
  console.log("------------------------------------------------------------------");
  console.log("> node fetcher.js http://www.example.edu/ ./index.html");
  console.log(`Downloaded and saved ${bytes} bytes to ./index.html`);
  console.log("------------------------------------------------------------------");
};



