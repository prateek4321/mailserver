import express from "express";

import {
  saveSendEmails,
  getEmails,
  toggleStarredEmail,
  deleteEmails,
  moveEmailsToBin,
} from "../controller/email-controller.js";

const routes = express.Router(); // inbuilt function for routing
// when save endpoint is matched what work we need to do
routes.post("/save", saveSendEmails); // first route is post api and route name is save, and when save is hit from frontend the callback function is called and that is saveSendEmails
routes.post("/save-draft", saveSendEmails);
routes.get("/emails/:type", getEmails);
routes.post("/starred", toggleStarredEmail);
routes.delete("/delete", deleteEmails);
routes.post("/bin", moveEmailsToBin);

export default routes;
