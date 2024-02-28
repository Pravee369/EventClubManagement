const exp=require("express")
const app=exp();

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log("server listening on",port));

const path=require("path")
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))

//get mongo client
const mclient=require("mongodb").MongoClient;

//connect to mongodb server
 mclient.connect("mongodb://localhost:27017/eventdb")
.then(dbRef=>
    {
        let dbObj=dbRef.db("eventdb");
        let userCollection=dbObj.collection("userscollection");
        let eventCollection=dbObj.collection("eventsCollection");
        let registerEventCollection=dbObj.collection("registerEventsCollection")
        //share collections objects to APIs
        app.set("userCollection",userCollection)
        app.set("eventCollection",eventCollection)
        app.set("registerEventCollection",registerEventCollection)
        console.log("db connection success")
    })
    .catch((err)=>
    {
        console.log("error in  db connection",err)
    })


    //import userapp
    const userApp=require("./APIs/userApi");
    const eventApp=require("./APIs/eventApi");
    const registerApp = require("./APIs/registerEventApi");

    //forward req to userapi
    app.use("/register",registerApp)
    app.use("/user-api",userApp);
    app.use("/event-api",eventApp);
    
//page refresh
app.use('/*',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'./build/index.html'),err=>{
      if(err){
          next(err)
      }
  })
})

const InvalidPathmiddleware=(request,response,next)=>{
  response.send({message:"invalid path"})

}
app.use("*",InvalidPathmiddleware)

const errorHandlingMiddleware=(error,request,response,next)=>{
  response.send({message:error.message});
}
app.use(errorHandlingMiddleware)


