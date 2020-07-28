# prerenderer-using-puppeteer-vagrant
Using Puppeteer inside a virtual box with vagrant to render html content of SPA, Can be used to serve the content of a website for search engine crawling bots.

Steps : 
- Add the ip set on the 'private_network' section of the Vagrant file to your hosts with a given hostName. e.g : localprerender.com
- run 'vagrant up'
- http://localprerender.com:8080/?destinationurl=https://www.google.com/&isFirstRequest=true
