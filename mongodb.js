// CRUD with mongoDB
const { MongoClient, ObjectID } = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Connection error for database");
    }
    const db = client.db(databaseName);
//     db.collection("users").updateOne(
//       { name: "Jordan" },
//       {
//         $set: {
//           name: "Hidalgo",
//         },
//       }
//     ).then((result) =>{
//         console.log(result);
//     }).catch((error) =>{
//         console.log(error);
//     })
//   db.collection('tasks').updateMany({completed:false},{
//       $set:{
//           completed:true
//       }
//   }).then((result) =>{
//       console.log(result);
//   }).catch((error) =>{
//       console.log(error);
//    });
db.collection('users').deleteMany({name:"Hidalgo"}).then((result) => {
    console.log("deleted",result.deletedCount);
}).catch((error) =>{
    console.log("delete failed",error);
})
})