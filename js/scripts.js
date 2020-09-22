var btc_price, api_data;

var usd_to_eur = {
	"async": true,
	"crossDomain": true,
	"url": "https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=EUR",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
		"x-rapidapi-key": "289ecf230bmshe9159cc82bc2183p1cee5ejsndcbb688e0224"
	}
}
var crypto_settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://coinpaprika1.p.rapidapi.com/tickers",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
		"x-rapidapi-key": "289ecf230bmshe9159cc82bc2183p1cee5ejsndcbb688e0224"
	}
}

function makeReadableFloat(val) {
	return (Number(parseFloat(val).toFixed(3)).toLocaleString());
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function Calculate() {
	var base_coin = $('#crypto-currencies option:selected').val();
	var convert_coin = $('#fiat-currencies option:selected').val();

	console.log(btc_price);
	var value_to_convert = $("#to-convert").val();


	var final_val = value_to_convert * btc_price;
	$("#converted").css("display", "none");
	$("#converted").css("color", "#303030");
	$("#converted").html(makeReadableFloat(final_val)).fadeIn(200);
}

async function updateValues() {
	while (true) {
		var i = 0;
		$.ajax(crypto_settings).done(function (response) {
			function getBTC() {
				btc_price = response[0]["quotes"]["USD"]["price"];
				return btc_price;
			};
			btc_price = getBTC();
			$("#btc-price").css("display", "none");
			$("#btc-price").html("1 BTC Value: " + makeReadableFloat(btc_price) + "$").fadeIn(300);
			Calculate();
		});

		while (i < 10) {
			await sleep(1 * 1000);
			if (i != 0) {
				$("#updated").html("Auto Update In " + (10 - i) + " ...");
			}
			i++;
		}

	}
}
updateValues();






// 	console.log("CHECKKKKKKKKKKKKKKKKKKKK");
// });






