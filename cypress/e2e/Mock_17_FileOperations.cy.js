// //read and write file
// //cy.writeFile('path/to/message.txt', 'Hello World')
// // cy.readFile('path/to/message.txt').then((text) => {
// //     expect(text).to.equal('Hello World') // true
// //   })

// //upload file
// // cy.selectFile('path/to/file.txt')

// //using fs module
// The fs (File System) module lets you interact with files and directories. You can use it in synchronous or asynchronous (callback/promise) ways.

// Import
// const fs = require("fs"); // built-in, no install needed

// 🔹 Common File Operations
// 1. Read a file
// // Async (preferred)
// fs.readFile("example.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log("File contents:", data);
// });

// // Sync
// const data = fs.readFileSync("example.txt", "utf8");
// console.log("File contents:", data);

// 2. Write to a file
// // Async
// fs.writeFile("output.txt", "Hello World!", (err) => {
//   if (err) throw err;
//   console.log("File written successfully");
// });

// // Sync
// fs.writeFileSync("output.txt", "Hello World!");

// 3. Append to a file
// fs.appendFile("output.txt", "\nAppended text", (err) => {
//   if (err) throw err;
//   console.log("Data appended");
// });

// 4. Delete a file
// fs.unlink("output.txt", (err) => {
//   if (err) throw err;
//   console.log("File deleted");
// });

// 5. Check if a file exists
// if (fs.existsSync("example.txt")) {
//   console.log("File exists!");
// } else {
//   console.log("File not found!");
// }

// 6. List files in a directory
// fs.readdir("./", (err, files) => {
//   if (err) throw err;
//   console.log("Files:", files);
// });

// 🏋️ Practical Exercises (Interview Style)
// 🟢 Exercise 1 (Easy): Read & Write

// Create a file notes.txt with some text.

// Write a Node.js script that:

// Reads its content.

// Writes the content to a new file notes_copy.txt.

const fs = require("fs");

// fs.writeFile("cypress/fixtures/output.txt", "dummy text", (err) => {
//   if (err) {
//     console.log("error while writing file", err);
//   }

//   console.log("success writing file");
// });

// fs.readFile("cypress/fixtures/output.txt", "utf8", (err, data) => {
//   if (err) console.log(err);

//   console.log("content : " + data);
// });

// 🟡 Exercise 2 (Medium): Append Logs

// Create a script that logs the current timestamp into logs.txt every time it runs.

// If the file doesn’t exist, create it.
// let timestamp = Date.now().toString();
// fs.writeFile("cypress/fixtures/timestamp.now.txt", timestamp, (err) => {
//   if (err) throw err;
// });

// 🔴 Exercise 3 (Advanced): Directory Operations

// Write a script that:

// Checks if a directory backup exists, if not create it.

// Copies all .txt files from the current folder into backup.

// 🚀 Bonus (Very Common in Interviews):

// Watch a file for changes

// fs.watch("example.txt", (eventType, filename) => {
//   console.log(`File changed: ${filename}, Event: ${eventType}`);
// });

// ✅ With these, you’ll cover all the usual fs module questions that come up in interviews.

// cypress/e2e/file_io.cy.js
describe("Read and Write Files with Cypress", () => {
  const filePath = "cypress/fixtures/testData.json";

  it("writes and reads a JSON file safely", () => {
    const data = { name: "ChatGPT", version: "1.0.0" };

    // Write file
    cy.writeFile(filePath, data).then(() => {
      cy.log("✅ File written successfully");
    });

    // Read file with error handling
    cy.readFile(filePath, { log: true })
      .then((content) => {
        expect(content).to.have.property("name", "ChatGPT");
        cy.log("📖 File read successfully");
      })
      .catch((err) => {
        cy.log(`❌ Error reading file: ${err.message}`);
        throw err; // fail test
      });
  });
});

// cypress/e2e/fs_task.cy.js
describe("File operations via Node fs tasks", () => {
  const filePath = "tmp/testFile.txt";

  it("writes and reads with Node fs", () => {
    cy.task("writeToFile", {
      filename: filePath,
      content: "Hello Cypress!",
    }).then((result) => {
      expect(result.success).to.be.true;
      cy.log(`✅ File written to ${result.path}`);
    });

    cy.task("readFromFile", filePath).then((result) => {
      if (!result.success) {
        throw new Error(`❌ File read failed: ${result.error}`);
      }
      expect(result.data).to.include("Cypress");
      cy.log(`📖 File content: ${result.data}`);
    });

    cy.readFile("/path/to/file", "utf-8", { log: true });
  });
});
