require('../src/db/mongoose');

// User.findByIdAndUpdate("607d7e0aa14ae87e5cbf2186",{ age:2 }).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:2})
// }).then((userCount)=>{
//     console.log(userCount);
// }).catch((e)=>{
//     console.log(e);
// })

const updateAgeAndCount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age });
    const count = await User.countDocuments({age});
    return count;
}
updateAgeAndCount("607d7e0aa14ae87e5cbf2186",2).then((count)=>{
    console.log(count);
}).catch((error)=>{
    console.log(error)
})