const fs = require("fs");
const path = require("path");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My page title</title></head>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("chunk", chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      const myFilePath = path.resolve(__dirname, "./message.txt");
      fs.writeFile(myFilePath, message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My page title</title></head>");
    res.write("<body>");
    res.write("<h1>Hello from node.js!</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
};

// module.exports = requestHandler;
// module.exports = {
// handler: requestHandler,
// someText: "hardcoded text"
// };
// module.exports.handler = requestHandler;
// module.exports.someText = "hardcoded text";
exports.handler = requestHandler;
exports.someText = "hardcoded text";
