const http = require('http');
const puppeteer = require('puppeteer');
var url = require('url');


function run (destination) {
    return new Promise(async (resolve, reject) => {
        try {
            var startTime = new Date().getTime();
            console.log("Called") ;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            //await page.goto(String(destination), {waitUntil: 'networkidle0'});

            await page.goto(String(destination));
            await page.waitFor(1000);

            content = await page.content();
            var endTime = new Date().getTime();
            browser.close();
            console.log("Resolved") ;
            var resolvingTime = endTime - startTime ;
            console.log("Script Took: "+resolvingTime+ " ms") ;
            return resolve(content);
        } catch (e) {
            return reject(e);
        }
    })
}


// const requestListener =

const server = http.createServer(function (req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const destination = query.destinationurl ;
    const isFirstRequest = query.destinationurl ;
    const datetime = new Date();

    if(destination !== undefined && isFirstRequest !== undefined){
        console.log("====") ;
        console.log(datetime);
        console.log("Destination : "+destination) ;
        run(destination).then(
            function(result){
                res.writeHead(200);
                res.end(result);
                console.log("====") ;
            }
        ).catch(
            function(error){
                res.writeHead(500);
                res.end();
                console.log(error) ;
            });
    }else{
        res.writeHead(200);
        res.end();
    }



});
server.listen(8080);
