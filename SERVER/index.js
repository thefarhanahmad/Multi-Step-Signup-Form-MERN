const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectCloudinary = require("./config/cloudinaryConnect");
const fileUpload = require("express-fileupload");

require("dotenv").config();

//middleware
app.use(express.json());
app.use(cookieParser());

//fileupload middleware to parse data from files.file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "https://multi-step-signup-form.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    aallowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

//database connecting
const dbConnect = require("./config/dbConnection");
dbConnect();
connectCloudinary();

//route import and mount
const routes = require("./routes/routes");
app.use("/api/v1", routes);

// default api
app.get("/", (req, res) => {
  res.send("App is running...!");
});

//activate
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running at port no. ${PORT}`);
});
