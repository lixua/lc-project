var app = require('../../express');
var PayPal = require('paypal-express-checkout-simple');
var uuid = require('node-uuid');

// TODO: Put your PayPal settings here:
var returnUrl = 'https://lc-project.herokuapp.com/#!/user/cart';
var cancelUrl = 'https://lc-project.herokuapp.com/#!/user/cart';
/**
 * React to pay POST. This will create paypal pay url and redirect user there.
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {}          [description]
 * @return {[type]}      [description]
 */
app.post('/pay', function(req, res) {
	// create paypal object in sandbox mode. If you want non-sandbox remove tha last param.
	var paypal = PayPal.create("Ethancwb_api1.foxmail.com", 'PNJ3PU4GWTAX6F3S', 'AFcWxV21C7fd0v3bYYYRCpSSRl31AQuLdrGOUvG1pIx34k8g0nPf30hQ');
	paypal.setPayOptions('ACME Soft', null, "https://image.ibb.co/iUUc2k/logo_home.png", '00ff00', 'eeeeee');

	paypal.setProducts([{
		name: req.body.name,
		description: req.body.description,
		quantity: req.body.count,
		amount: req.body.price
	}]);

	// Invoice must be unique.
	var invoice = uuid.v4();
	paypal.setExpressCheckoutPayment(
		'ethancwb@foxmail.com',
		invoice,
		req.body.price,
		req.body.description,
		'USD',
		returnUrl,
		cancelUrl,
		false,
		function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
			return;
		}
		res.send(data);
		// Regular paid.
		// res.redirect(data.redirectUrl);
	});
});

app.get('/paypal/cancel', function(req, res) {
	// Cancel payment.
	res.send('Payment canceled');
});

app.get('/paypal/success', function(req, res) {
	var paypal = PayPal.create("Ethancwb_api1.foxmail.com", 'PNJ3PU4GWTAX6F3S', 'AFcWxV21C7fd0v3bYYYRCpSSRl31AQuLdrGOUvG1pIx34k8g0nPf30hQ', true);
	paypal.getExpressCheckoutDetails(req.query.token, true, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
			return;
		}

		// Check token and details.
		var resObj = JSON.stringify(data);
		res.send('Successfuly payment, ' + resObj);
	});
});

/// catch 404 and forwarding to error handler
app.use(function(req, res) {
	res.status(404).send('Unknown page');
});

// run App;
var server = app.listen(8893, function () {
  var host = server.address().address;
  var port = server.address().port;
});
