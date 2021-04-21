require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("607e4da89f8b7c491804e066").then((del)=>{
//     if(!del){
//         return console.log("No item to delete");
//     }
//     console.log(del)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false})
    return count;
}
deleteTaskAndCount("607e4da89f8b7c491804e066").then((task)=>{
    console.log(task);
}).catch((error)=>{
    console.log(error);
})