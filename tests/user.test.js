const request = require('supertest'); //* This is the testing library provided by Express team
const app = require('../src/app'); // to allow us to access express without running it
const User = require('../src/models/user'); // to access user model
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");


beforeEach(setupDatabase);

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
    await request(app).delete("/users/me")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull();
})
test("Should not delete account for unauthenticated user",async()=>{
    await request(app).delete("/users/me")
    .send()
    .expect(401)
})

test("Should upload avatar image",async()=>{
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/simpsons.jpg')
    .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields',async()=>{
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        email:"updated@example.com",
        password:"abc123klm"
    })
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user.email).toBe("updated@example.com")

})
test("Should not update invalid user fields",async()=>{
    await request(app).patch("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "home"
    })
    .expect(400)

})