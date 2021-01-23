const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

let localHost = '127.0.0.1';

app.use(express.static(__dirname + '/static/stylesheets'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/weather", (req, res) => {
    let result = req.query.weather;
    let url = `<| Add Your Link |>`;
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            let appData = [data];
            res.render("weather", { data: appData });
        }
    });
});

let port = process.env.PORT | 3000;

app.listen(port, () => {
    console.log(`Weather App Working At Port ${port}.`)
});
