const http = require("http");
// const fs = require("fs");
const routes = require("./routes");

// const server = http.createServer((req, res) => {
//   // console.log('req', req);
//   // console.log(req.url, req.method, req.headers);
//   // process.exit();
//   const url = req.url;
//   const method = req.method;
//   if (url === "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>My page title</title></head>");
//     res.write("<body>");
//     res.write(
//       "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>"
//     );
//     res.write("</body>");
//     res.write("</html>");
//     return res.end();
//   } else if (url === "/message" && method === "POST") {
//     const body = [];
//     req.on("data", (chunk) => {
//       body.push(chunk);
//       console.log("chunk", chunk);
//     });
//     req.on("end", () => {
//       const parsedBody = Buffer.concat(body).toString();
//       const message = parsedBody.split("=")[1];
//       // fs.writeFileSync("message.txt", message);
//       fs.writeFile("message.txt", message, (err) => {
//         res.statusCode = 302;
//         res.setHeader("Location", "/");
//         return res.end();
//       });
//     });
//   } else {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>My page title</title></head>");
//     res.write("<body>");
//     res.write("<h1>Hello from node.js!</h1>");
//     res.write("</body>");
//     res.write("</html>");
//     res.end();
//   }
// });

// const server = http.createServer(routes);
console.log('routes.someText', routes.someText);
const server = http.createServer(routes.handler);

server.listen(3000);
