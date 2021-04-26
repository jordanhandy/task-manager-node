const request = require('supertest'); //* This is the testing library provided by Express team
const jwt = require('jsonwebtoken'); // To provide login tokens for logged in users
const mongoose = require('mongoose'); // to perform Model operations
const app = require('../src/app'); // to allow us to access express without running it
const User = require('../src/models/user'); // to access user model

//? Generate our Own user ID so that it is consistent at each test
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name:"Jason Hidalgo",
    email:"jason@testsuite.com",
    password:"what561.ca",
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.JWT_TOKEN)
    }]
}

beforeEach(async ()=>{
    await User.deleteMany();
    await new User(userOne).save();
    
})

test('Should signup a new user',async()=>{
    await request(app).post('/users')
    .send({
        name:"Jordan",
        email:"jordan@example.com",
        password:"mypaword93949"
    })
    .expect(201)
})

test("Should login existing user",async()=>{
    const response = await request(app).post("/users/login")
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should fail to login nonexistent user",async()=>{
    await request(app).post("/users/login")
    .send({
        email: "emailtest",
        password: "newpass"
    })
    .expect(400);
})

test("Should get profile for user",async()=>{
    await request(app).get("/users/me")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('Should not get profile for unauthenticated user',async()=>{
    await request(app).get("/users/me")
    .send()
    .expect(401)
})

test('Should delete account for user',async()=>{
    const response = await request(app).delete("/users/me")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(await User.findById(userOneId)).toBeNull();
})
test("Should not delete account for unauthenticated user",async()=>{
    await request(app).delete("/users/me")
    .send()
    .expect(401)
})