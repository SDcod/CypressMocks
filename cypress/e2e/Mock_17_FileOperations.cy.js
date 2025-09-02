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

// 🟡 Exercise 2 (Medium): Append Logs

// Create a script that logs the current timestamp into logs.txt every time it runs.

// If the file doesn’t exist, create it.

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

// Do you want me to walk you through solutions for the 3 exercises (read/write, append logs, backup .txt files) or would you like to try them yourself first and then I can review your code?
