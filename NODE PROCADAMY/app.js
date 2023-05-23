const read = require("readline");
const fs = require("fs");
const http = require("http");





// -------lecture 4 ---reading and writing inputs-----------

// console.log("hello world 1")

// const read = require('readline')

// const rl = read.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question("please enter your name: ",(name) => {
//     console.log("you entered : " + name)
//     rl.close()
// })

// rl.on('close',()=>{
//     console.log("interface closed")
//     process.exit(0)
// })

// ----------lecture 5 Reading & Writing files synchronously--------------

// const read = require("readline");
// const fs = require("fs");

// let textIn = fs.readFileSync("./Files/text.txt", 'utf-8')
// console.log(textIn)

// let content = `Data read from input.txt: ${textIn}. \nDate created ${new Date()}`

// fs.writeFileSync('./Files/output.txt', content)


// ----------lecture 7 Reading & Writing files Asynchronously and callback hell--------------



// fs.readFile("./Files/text.txt", "utf-8",(error,data)=>{
//     console.log(data);
//     fs.readFile(`./Files/${data}.txt`, "utf-8", (error1, data1) => {
//       console.log(data1);
//       fs.writeFile("./Files/append.txt", `${data}\n\n${data1}\n\n${new Date()}` , () => {
//         console.log("file write successfully");
//       });
//     });
// });

// console.log('reading file.....')

// ----------lecture 8 creating a simple web server--------------

// let html = fs.readFileSync("./Template/index.html", 'utf-8')


// // creating a server
// const server = http.createServer((request,response)=>{
//     response.end(html)
//     console.log("a new request recived")
// })

// // start the server
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("server has started")
// })

// ----------lecture 12 routing--------------

const html = fs.readFileSync("./Template/index.html", 'utf-8')


// creating a server
const server = http.createServer((request,response)=>{

    let path = request.url;

    if (path === "/" || path.toLocaleLowerCase() === "/home") {
      response.end("you are in home page");
    } else if (path.toLocaleLowerCase() === "/about") {
      response.end("you are in about page");
    } else if (path.toLocaleLowerCase() === "/contact") {
      response.end("you are in contact page");
    } else{
      response.end("404 page not found");
    }
    
})

// start the server
server.listen(8000,'127.0.0.1',()=>{
    console.log("server has started")
})