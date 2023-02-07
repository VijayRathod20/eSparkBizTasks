const fs = require("fs");

// Read the contents of a file
fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) throw err;

  // Capitalize the first letter of each word in the file's contents
//   let modifiedData = data.split(" ")
//     .map(word => word[0].toUpperCase() + word.slice(1))
//     .join(" ");
const res = data;
const arr = res.split(" ");

for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

}
const str2 = arr.join(" ");
    

  // Write the modified data back to the file
  fs.writeFile("example.txt", str2, (err) => {
    if (err) throw err;
    console.log("File written successfully");
  });
});
