var request = require('request');
var parseString = require('xml2js').parseString;

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
    		console.log(JSON.stringify(result));
			});
        }
    }
);

res.render('index');
res.end();
};