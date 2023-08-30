const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fname;
    const lastName =  req.body.lname;
    const email = req.body.email;

const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
       
    ]
};

const jsonData = JSON.stringify(data);

const options = {
    url: "https://us21.api.mailchimp.com/3.0/lists/d031bdd9bd",
    method: "POST",
    headers: {
        "Authorization": SECRET_API_KEY
    },
    body: jsonData
};

request(options, (error, response, body) => {
    if (error) {
        res.sendFile(__dirname + "/failure.html");
    } else {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    }
    console.log(response.statusCode);
});

});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});

