const { fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math");

test('Should convert 32 F to 0 C',()=>{
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);

})
test("Should convert 0 C to 32 F",()=>{
    expect(celsiusToFahrenheit(0)).toBe(32);

})

// test("Should add two numbers",(done)=>{
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5);
//         done();
//     })
// })

// test('Should add two numbers, async / await', async ()=>{
//     const sum = await add(2,5);
//     expect(sum).toBe(7);
// })