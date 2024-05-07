const TestController = require('../app/Controller/Test/TestController')

test('sum 1 + 1', () => {
    let add = TestController.add(1, 1)

    expect(add).toBe(2)
})