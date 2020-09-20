// $(document).ready(function() {
// console.log(6)

// });

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://coinpaprika1.p.rapidapi.com/tickers",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
		"x-rapidapi-key": "289ecf230bmshe9159cc82bc2183p1cee5ejsndcbb688e0224"
	}
}

$.ajax(settings).done(function (response) {
    $("#btc-price").html(response[0]["quotes"]["USD"]["price"]);
    $("#converted").html(response[0]["quotes"]["USD"]["price"]);
});