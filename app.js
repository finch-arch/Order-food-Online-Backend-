const express = require('express')
const app = express()
const path = require("path")
const hbs = require("hbs")

const collection = require("./mongod")
const { stringify } = require('querystring');

app.use(express.static(__dirname + '/static'));


const tempelatePath = path.join(__dirname , '/static')
app.use(express.json())
app.set("view engine" , "hbs")
app.use(express.urlencoded({extended:false}))
app.set("views" , tempelatePath)
app.listen(80 , ()=>{
    console.log("port connected");
})

app.get("/" , (req,res)=>{
    res.render("login")
})
app.get("/signup" , (req,res)=>{
    res.render("signup")
})

app.post("/signup" , async(req,res)=>{
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data])
res.render("home")
})
app.post("/login" , async(req,res)=>{
    try{
      const check = await collection.findOne({name:req.body.name})
      if (check.password===req.body.password) {
        res.render("home")
      }
      else{
        res.send("wrong password")
      }
    }
    catch{
     res.send("wrong details")
    }

})