import ServerlessHttp from 'serverless-http';
const express = require('express');
const path = require('path');

const app = express();
const port = 3100;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the HTML file
app.get('/.netlify/web-app/server', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const handler = ServerlessHttp(app);
mudule.exports.handler = async(event, context) => {
  const result
}