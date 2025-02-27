const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/results", async (req, res) => {
    try {
        const url = "https://satta-king-fast.com/";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];

        // Find the specific table with February 2025 data
        $("tr.chart-head").each((index, element) => {
            if ($(element).find("h1").text().includes("February 2025")) {
                let table = $(element).parent();

                table.find("tr.day-number").each((i, row) => {
                    let date = $(row).find(".day").text().trim();
                    let dswr = $(row).find("td").eq(1).text().trim();
                    let frbd = $(row).find("td").eq(2).text().trim();
                    let gzbd = $(row).find("td").eq(3).text().trim();
                    let gali = $(row).find("td").eq(4).text().trim();

                    results.push({ date, dswr, frbd, gzbd, gali });
                });
            }
        });

        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
