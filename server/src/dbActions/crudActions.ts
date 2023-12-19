import * as path from "path";
import * as fs from "fs";

const notesFile = path.join(__dirname);
function createNote() {
  console.log(notesFile);
}

function readData(err, data) {
  console.log(data);
}
fs.readFile("JournalDEV.txt", "utf8", readData);
