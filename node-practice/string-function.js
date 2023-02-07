const str1 = 'this first string';

console.log("CAT".charAt(1));

const s1 = '2+2'
console.log(eval(s1));

const s2 = new String("2+2");
console.log(eval(s2.valueOf()));

function capitalize(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
  
  let str = "hello, world!";
  console.log(capitalize(str)); // Output: "Hello, World!"
  