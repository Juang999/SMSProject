const {StudentController} = require('../../../../app/Controller/Controller')

test ('get data student', async () => {
    let dataStudent = await StudentController.getDataStudent();
    console.info(dataStudent)

    expect(dataStudent).toBeDefined();
})

describe('bulk test checkExistanceData', () => {
    test.concurrent('test function checkExistanceData', async () => {
        let {status, data} = await StudentController.checkExistanceData(1)
        console.info(status, data)
    
        expect(status).toBeTruthy()
    })

    test.concurrent('test function checkExistanceData', async () => {
        let {status, data} = await StudentController.checkExistanceData(2)
        console.info(status, data)
    
        expect(status).toBeFalsy()
    })
})

describe.only("bulk test showDetailDataStudent", () => {
    test.concurrent('test functiin showDetailDataStudent while data exist', async () => {
        let result = await StudentController.showDetailDataStudent(1)
        console.info(result)

        expect(result).toBeDefined()
    })

    test.concurrent(`test functiin showDetailDataStudent while data doesn't exist`, async () => {
        let result = await StudentController.showDetailDataStudent(2)
        console.info(result)

        expect(result).toBeFalsy()
    })
})