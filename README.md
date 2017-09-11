# Mishap Map
A small, mobile-responsive application which shows live data of current traffic incidents in Victoria as per the <a href="https://victraffic-api.wd.com.au/api/v3/incidents">VicTraffic API</a> 

## Environments
The application was developed using only front-end technologies and leverages several lightwight libraries and frameworks - in particular Materialize for CSS styling and Gmaps / Google Maps, jQuery and Handlebars.

I opted to use Handlebars to render DOM elements as opposed to React as the information is quite lightweight and the application in its present state does not need a backend. By using Rob--W's <a href="https://github.com/Rob--W/cors-anywhere">CORS anywhere</a> application I was able to issues with cross origin resource sharing without building a Ruby or Node backend. In the future I am planning to collate daily data into a database and build it into a rails application where users can filter by incident types and get a better understanding of trends. 

## Installation
As the application has no dependencies users should just be able to clone the repo if they wish to modify it.

If you're curious to try it out it is also <a href="https://adrianmancuso.github.io/tic-tac-glow/">hosted on GitHub</a>.