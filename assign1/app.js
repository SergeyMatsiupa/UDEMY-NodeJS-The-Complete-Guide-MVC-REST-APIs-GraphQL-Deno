const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Assignment 1</title>");
    res.write("<head>");
    res.write("<body>");
    res.write("<h1>Greeting text!</h1>");
    res.write(
      "<form method='POST' action='/create-user'><input type='text' name='username'><button type='submit'>Create</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Assignment 1 - Users</title>");
    res.write("<head>");
    res.write("<body>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log("username", username);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
});

server.listen(3000);
