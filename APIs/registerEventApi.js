const  exp = require("express")
const registerApp = exp.Router()
const expressAsyncHandler = require("express-async-handler")
const verifyToken = require("../APIs/middlewares/verifyToken")

registerApp.use(exp.json())


registerApp.post("/register-event",verifyToken,expressAsyncHandler(async(request,response)=>
 {
     const registerEventCollectionObj = request.app.get("registerEventCollection")
     const event = request.body;
     console.log(event);
     delete event._id;
     console.log("event is:",event)
     await registerEventCollectionObj.insertOne(event);
     response.status(201).send("user registered for event successfully")
 }))


 registerApp.get('/get-registered-events',expressAsyncHandler(async(request,response)=>
 {
      const registerEventCollectionObj = request.app.get("registerEventCollection")

      let allRegisteredEvents=await registerEventCollectionObj.find().toArray(); 
     
      response.status(200).send({message:"got all registered events",payload:allRegisteredEvents})
 }))



registerApp.delete('/delete-event',verifyToken,expressAsyncHandler( async(req, res) => {
    const eventId = req.body._id;
    console.log("eventId ",eventId);
    const ObjectId = require('mongodb').ObjectId;
    const id2 = new ObjectId(eventId);
    console.log(id2.toString());  
    const registerEventCollectionObj = req.app.get("registerEventCollection");

    // let allRegisteredEvents=await registerEventCollectionObj.find().toArray(); 
    //  allRegisteredEvents.map((event)=>console.log(event._id))

    // Your code to delete the event from the database
    await registerEventCollectionObj.deleteOne({ _id:  new ObjectId(id2) }, (error, result) => {
      if (error) {
        console.log('Error deleting event:', error);
        return res.status(500).send({ message: 'Internal server error' });
      }
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: 'Event not found' });
      }
      res.status(204).send({ message: 'Event deleted successfully' });
    });
  }));




module.exports = registerApp;