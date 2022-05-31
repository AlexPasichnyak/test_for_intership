const http = require('http');
const url = require('url');
const countryByCapital = require('country-json/src/country-by-capital-city.json');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	
	if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }

	const urlReq = url.parse(req.url, true);
	const paramsQuery = urlReq.search ? urlReq.search.slice(1) : '';
	const queryStr = paramsQuery.split('=').slice(0);
	
	if (urlReq.pathname === '/capital' && queryStr[0] === 'country' && queryStr.length === 2) {

		res.writeHead(200, {'Content-Type': 'text/plain'} );

		const requestedСountry = queryStr[1]; 

		const result = countryByCapital.find((c) => 
			c.country == requestedСountry
		);

		if (result) res.end(`Capital of ${result.country} is ${result.city}`);
		else res.end(`The requested country ${requestedСountry} wasn\'t found. Check that the input is correct`);
		return
		
	} else {
		res.end('Make a request for a template http://localhost:3000/capital?country=NameOfTheCountry');
	}
		return;
});


server.listen(PORT, 'localhost', (error) => {
	error ? console.log(error) : console.log("Let's go to typing the name of country...");
});

