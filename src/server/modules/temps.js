var request = require("request");
var parseString = require("xml2js").parseString;
request("http://10.0.0.241/status.xml", function(error, response, body) {
  if (err) throw new Error(err);
  parseString(body, function(err, result) {
    if (err) throw new Error(err);
    const temp = Number(result.response.temp1);
    console.log(temp);
  });
});
