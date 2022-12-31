import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connect from "./DB/connection.js";
import * as allRoutes from "./module/index.route.js";

const app = express();

app.use(express.json());
const baseUrl = "/api/v1";

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1 > <br> <h5>By Mohamed Elerian</h5>")
})
app.use(`${baseUrl}/uploads`, express.static('./uploads'))
app.use(`${baseUrl}/user`, allRoutes.userRoute)
app.use(`${baseUrl}/message`, allRoutes.messageRoute)
app.use(`${baseUrl}/auth`, allRoutes.authRoute)


connect();

app.listen(3000, () => {
    console.log("server running");
});