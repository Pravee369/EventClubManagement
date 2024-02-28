const  exp = require("express")
const eventApp = exp.Router()
const expressAsyncHandler = require("express-async-handler")
const verifyToken = require("../APIs/middlewares/verifyToken")

eventApp.use(exp.json())

eventApp.post('/postevent',verifyToken,expressAsyncHandler(async(req,res)=>
{
    const eventCollectionObj = req.app.get("eventCollection") 
    const newEvent = req.body;
    console.log("its postevent api route",newEvent)
    try{
        await eventCollectionObj.insertOne(newEvent)
        res.status(201).send({message:"Event posted succesfully"})
    }
    catch{
        res.status(400).send({message:"Event is not posted ,Something went wrong"})
    }
}))

eventApp.get('/get-allevents',expressAsyncHandler(async(req,res)=>
{
    const eventCollectionObj = req.app.get("eventCollection") 

    let cursor=await eventCollectionObj.find()
    let allEvents=[];
    await cursor.forEach(doc =>allEvents.push(doc));
    //console.log("its get-all-events api route",allEvents)

    res.status(200).send({message:allEvents})
}))

module.exports = eventApp;