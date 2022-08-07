const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const https = require("https")
const { json } = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/',  (req,res)=>{
        res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res)=>{
        const firstname = req.body.first_name
        const lastname = req.body.last_name
        const email = req.body.email
        const data = {
            members:[{
                email_address: email,
                status : "subscribed",
                merg_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }]
        }
        jsonData = JSON.stringify(data)


        console.log(firstname, lastname, email)
        const apiKey = "a7cd89499a9d755d94ba0d084eb63e66-us14"
        const url="https://us14.api.mailchimp.com/3.0/lists/521238b07f"
        const options={
                method:"POST",
                auth:"taylor:a7cd89499a9d755d94ba0d084eb63e66-us14"
        }


       const request = https.request(url, options, (response)=>{

                response.on("data", (data)=> {
                    console.log(JSON.parse(data))
                })
        })

       request.write(jsonData)
       request.end()
       console.log(firstname, lastname, email) 

})
app.listen(8080, (req,res)=>{
    console.log("Server is running on port 8080")

})

