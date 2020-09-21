var btc_price, api_data;

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


function Calculate() {
	var base_coin = $('#crypto-currencies option:selected').val();
	var convert_coin = $('#fiat-currencies option:selected').val();
	var value_to_convert = $("#to-convert").val();
	if(converted_coin == "EUR"){

	}
	var final_val = to_convert * value
	$("#converted").html(makeReadableFloat(final_val));
}

$.ajax(crypto_settings).done(function (response) {
	$("#converted").html(makeReadableFloat(response[0]["quotes"]["USD"]["price"]));
});


function makeReadableFloat(val) {
	return (Number(parseFloat(val).toFixed(3)).toLocaleString());
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
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
			$("#btc-price").html("BTC Value: " + makeReadableFloat(btc_price) + "$").fadeIn(200);
		});

		while (i < 10) {
			await sleep(1 * 1000);
			$("#updated").html("Auto Update In " + (10-i));
			i++;
		}
	}
}
updateValues();




var fiat_settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=EUR",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
		"x-rapidapi-key": "289ecf230bmshe9159cc82bc2183p1cee5ejsndcbb688e0224"
	}
}

$.ajax(fiat_settings).done(function (response) {
	console.log(response);
	console.log("CHECKKKKKKKKKKKKKKKKKKKK");
});






