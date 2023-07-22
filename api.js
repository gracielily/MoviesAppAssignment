import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post("/api/authenticate", (req, res) => {
  if(req.body.username === "admin" && req.body.password === "admin") {
    return res.json({ token: "token_to_application" });
  }
});

export const handler = app;