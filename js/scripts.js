var swapped = false

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

var rates = {
	"CRYPTO": { "BTC": null, "ETH": null },
	"FIAT": { "USD": 1, "EUR": null }
};

function makeReadableFloat(val,after_float) {
	return (Number(parseFloat(val).toFixed(after_float))).toLocaleString(
		undefined,{'maximumFractionDigits':8});
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function Calculate() {
	let final_val,
		base_coin = $('#crypto-currencies option:selected').val(),
		convert_coin = $('#fiat-currencies option:selected').val(),
		value_to_convert = $("#to-convert").val();


	if (!swapped) {
		final_val = rates["FIAT"][convert_coin] * rates["CRYPTO"][base_coin] * value_to_convert;
	}
	else {
		final_val = value_to_convert / rates["CRYPTO"][base_coin] / rates["FIAT"][convert_coin];
	}
	var after_dot = 3;
	if (final_val < 1){
		after_dot = 5
	}


	$("#converted").css("display", "none");
	$("#converted").css("color", "#303030");
	$("#converted").html(makeReadableFloat(final_val, after_dot)).fadeIn(180);
}

async function updateValues() {
	while (true) {
		$.ajax(usd_to_eur).done(function (response) {
			function getFiatRates() {
				rates["FIAT"]["EUR"] = response;
			}
			getFiatRates()
		});
		$.ajax(crypto_settings).done(function (response) {
			function getCryptoRates() {
				rates["CRYPTO"]["BTC"] = response[0]["quotes"]["USD"]["price"];
				rates["CRYPTO"]["ETH"] = response[3]["quotes"]["USD"]["price"];
			};
			getCryptoRates();
			Calculate();

			$("#btc-price").css("display", "none");
			$("#btc-price").html("1 BTC = <b>" +
				makeReadableFloat(rates["CRYPTO"]["BTC"], 3) + "</b>$").fadeIn(180);
		});

		for (let i = 0; i < 10; i++) {
			await sleep(1 * 1000);
			if (i != 0) {
				$("#updated").html("Auto Update In " + (10 - i) + " ...");
			}
		}
	}
}


$(document).ready(function () {

	$("#crypto-currencies").change(function () {
		Calculate();
	});

	$("#fiat-currencies").change(function () {
		Calculate();
	});

	$("#swap-button").click(function (a, b) {
		a = $(".dropdown")[0];
		a.before($(".dropdown")[1]);
		a.before(this);
		swapped = !swapped;
		Calculate();
	})

	updateValues();
})
