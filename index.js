const express= require("express")
const PORT = process.env.PORT || 9000
const http = require("http");
const app = express()
app.use(express.json())

app.get("/" , (req,res) =>{
    res.send("hello World")
})

app.listen(PORT), () => {
    console.log(`server is running at port: ${PORT}`)
}