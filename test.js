const { ScraperContext, Scrape } = require("./src/helperScripts/webScraper.js")

const context = new ScraperContext
({
    site: "https://e621.net",
    query: "posts?tags",
    tags: "animated",
	amount: 5,
    posts: 
    {
        container: ".posts-container",
        tag: ["a"],
        attribute: "href",
    },  
    post: 
    {
        container: "#image-container",
        tag: ["img", "video"],
        attribute: "src",
    },
    pages: 
    {
        container: ".pagination",
        tag: ["a"],
        attribute: "href",
        query: {
            name: "page",
            min: 1,
            max: 100,
        },
    },
});

async function run()
{
    console.log(await Scrape(context))
}

run();