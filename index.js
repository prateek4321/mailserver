import express from "express";
import cors from "cors";
import Connection from "./database/db.js"; // backend mei .js extension is needed
import routes from "./routes/route.js";
import path from "path";

const __dirname = path.resolve();
const app = express(); // initializing express

app.use(cors()); // using cors
app.use(express.urlencoded({ extended: true })); // if some spaces(unwanted) then url is encoded it needs to be changed
app.use(express.json()); // telling express to handle json format of api
app.use("/", routes);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      // 2nd arguement is the callback function in case of error
      res.status(500).send(err);
    }
  ); // to pick index.js file
});
const PORT = process.env.PORT || 8000; // GENERAL AND PORT FOR LOCAL DEV

Connection(); // just called before start of server connnection function is called

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`)); // backticks used
