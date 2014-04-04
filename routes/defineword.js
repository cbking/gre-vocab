var request = require('request');
var parseString = require('xml2js').parseString;
var rtg = require("url").parse('redis://redistogo:99b28b6ed18ca680d7e0d699ada7465c@grideye.redistogo.com:10316/');
var db =  require('redis').createClient(rtg.port, rtg.hostname);
db.auth("99b28b6ed18ca680d7e0d699ada7465c");

exports.findDefinition = function (req, res) {

console.log("I am here!");
// request('http://www.google.com', function (error, response, body) {
//   console.log(body); // Print the google web page.
//   if (!error && response.statusCode == 200) {
//     console.log(body); // Print the google web page.
//   }
// });
console.log(req.query.wordtodefine);
request.post(
    'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/'+req.query.wordtodefine+'?key=6652298b-b9f5-4dbd-820b-b4dd6f5e1a28',
       function (error, response, body) {
        if (!error && response.statusCode == 200) {
           //console.log(response);
           parseString(response.body, function (err, result) {
           	console.log(result.entry_list.entry[0].def[0].dt);
           	// var jsonp = JSON.stringify(result);
           	// var jsonparsed = JSON.parse(jsonp);
           	//console.log(jsonparsed.entry_list.entry);
			save(req.query.wordtodefine, result.entry_list.entry[0].def[0].dt); 
			});
        }
    }
);

res.render('index');
res.end();
};

save = function (word, defintion) {
	db.set(word, defintion, function (err) {
		if (err) return console.log(err);
	});
};