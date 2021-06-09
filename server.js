const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const checklistItemRoutes = require("./routes/api/checklistItems");
const { env } = require("process");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
	.connect(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB database connected ..."))
	.catch((err) => console.log(err));

app.use("/api/checklistItems", checklistItemRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/dist"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

app.listen(PORT, () =>
	console.log(`App is listening at http://localhost:${PORT}`)
);
