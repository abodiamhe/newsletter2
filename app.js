const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");
const http = require("node:http");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  client.setConfig({
    apiKey: "32b052baa7c859155d34df8ae53577f1-us8",
    server: "us8",
  });

  const list_id = "bea9012d63";

  const run = async () => {
    const response = await client.lists.batchListMembers(list_id, {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }],
    })
    .then(
        (value) => {
            console.log("Successfully added contact as an audience member.");
            res.sendFile(__dirname + "/success.html");
        },
        (reason) => {
            res.sendFile(__dirname + "/failure.html");
        },
    );
  };

  run();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("server listing in port 3000");
});



  // const data = {
  //   members: [
  //     {
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     }
  //   ]
  // };
  // const jsonData = JSON.stringify(data);
  //
  // const url = "https://us8.api.mailchimp.com/3.0/list/bea9012d63/members/";
  // const options = {
  //   method: "POST",
  //   auth: "smooth:32b052baa7c859155d34df8ae53577f1-us8"
  // }
  //
  // const request = http.request(url, options, function(response){
  //   response.on("data", function(data){
  //     console.log(JSON.parse(data));
  //   })
  // })
  // request.write(jsonData);
  // request.end();

//
// apikey
// 32b052baa7c859155d34df8ae53577f1-us8

// list id
// bea9012d63
