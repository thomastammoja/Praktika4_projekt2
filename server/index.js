const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { response } = require("express");

// Middleware
app.use(cors());
app.use(express.json());

// Routes //
// a.1 All countries
app.get("/countries", async (req, res) => {
    try {
        const allCountries = await pool.query("SELECT name AS country FROM country")
        res.json(allCountries.rows);
    } catch (err) {
        console.error(err.message);
    };
});

// b.1 All countries from specified continent (country and capital)
app.get("/countries/:continent", async (req, res) => {
    try {
        const { continent } = req.params;
        const allCountries = await pool.query(
            "SELECT country.name AS country, city.name AS capital FROM country " +
            "INNER JOIN city ON country.capital = city.id " +
            "WHERE continent = $1", [continent]);
        res.json(allCountries.rows);
    } catch (err) {
        console.error(err.message);
    };
});

// c.1 All data about specific city (by city id)
app.get("/city/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const city = await pool.query(
            "SELECT * FROM city " +
            "WHERE id = $1", [id]);
        res.json(city.rows);
    } catch (err) {
        console.error(err.message);
    };
});

// c.2 All data about specific city (by city name)
app.get("/city/name/:name", async (req, res) => {
    try {
        const cityName = req.params.name;
        const city = await pool.query(
            "SELECT * FROM city " +
            "WHERE name = $1", [cityName]);
        res.json(city.rows);
    } catch (err) {
        console.error(err.message);
    };
});


// d.1 All data about specific country (data about country and cities by country code)
app.get("/cities/byCountryCode/:countryCode", async (req, res) => {
    try {
        const { countryCode } = req.params;
        const specificCountry = await pool.query(
            "SELECT city.id AS cityId, city.name AS city, city.countrycode, " +
            "city.district, city.population AS cityPopulation, country.name AS country, " +
            "country.continent, country.region, country.surfacearea, country.indepyear, " +
            "country.population AS countryPopulation, country.lifeexpectancy, country.gnp, " +
            "country.gnpold, country.localname, country.governmentform, country.headofstate, " +
            "country.capital AS capitalId, country.code2 " +
            "FROM city " +
            "INNER JOIN country ON city.countrycode = country.code " +
            "WHERE city.countrycode = $1", [countryCode]);
        res.json(specificCountry.rows);
    } catch (err) {
        console.error(err.message);
    };
});

// d.2 All data about specific country (data about country and cities by country name)
app.get("/cities/byCountry/:country", async (req, res) => {
    try {
        const countryName = req.params.country;
        const specificCountry = await pool.query(
            "SELECT city.id AS cityId, city.name AS city, city.countrycode, " +
            "city.district, city.population AS cityPopulation, country.name AS country, " +
            "country.continent, country.region, country.surfacearea, country.indepyear, " +
            "country.population AS countryPopulation, country.lifeexpectancy, country.gnp, " +
            "country.gnpold, country.localname, country.governmentform, country.headofstate, " +
            "country.capital AS capitalId, country.code2 " +
            "FROM city " +
            "INNER JOIN country ON city.countrycode = country.code " +
            "WHERE country.name = $1", [countryName]);
        res.json(specificCountry.rows);
    } catch (err) {
        console.error(err.message);
    };
});


app.listen(5000, () => {
    console.log("server has started on port 5000")
})