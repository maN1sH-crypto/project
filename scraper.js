const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeResults() {
    const url = "https://satta-king-fast.com/"; // Replace with the actual URL
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract results (adjust selectors based on the website's structure)
        const results = {
            date: new Date().toISOString().split('T')[0], // Today's date
            dswr: $('.dswr-result').text().trim() || "XX",
            frbd: $('.frbd-result').text().trim() || "XX",
            gzbd: $('.gzbd-result').text().trim() || "XX",
            gali: $('.gali-result').text().trim() || "XX",
        };

        return results;
    } catch (error) {
        console.error("Error fetching results:", error);
        return null;
    }
}

// Test the scraper
scrapeResults().then(results => {
    if (results) {
        console.log("Scraped Results:", results);
    } else {
        console.log("Failed to fetch results.");
    }
});