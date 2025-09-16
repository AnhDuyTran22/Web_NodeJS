import express from "express";
import 'dotenv/config'
import webRoutes from "routes/web";
import initDatabase from "config/seed";


const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// config routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static file: images/css/is
app.use(express.static('public'));

// config routes
webRoutes(app);

// seeding data
initDatabase();

app.listen(8080, () => {
    console.log(`My app is running on port: ${PORT}`)
    console.log("env port: ", process.env.PORT)
})