const {StudentController} = require('../../../../app/Controller/Controller')

test('get data student', async () => {
    let dataStudent = await StudentController.getDataStudent();
    console.info(dataStudent)

    expect(dataStudent).toBeDefined();
})

test('test to create data student', async () => {
    let result = await StudentController.store({
        body: {
            name: 'Alter Ego', 
            date_of_birth: '2003-10-10', 
            place_of_birth: 'Bogor', 
            province: 'Jawa Barat', 
            city_regency: 'Kabupaten Bogor', 
            sub_regency: 'Kecamatan Babakan Madang', 
            address: '-',
            entity_id: 4,
            detail_entity_id: 3
        }
    })

    console.info(result)

    expect(result).toBeDefined();
})

test('test activate student', async () => {
    let result = await StudentController.changeStatusStudent(4)
    console.info(result)

    expect(result).toEqual([1])
})

test('test remove photo', async () => {
    let result = await StudentController.removePhotoStudent(6)
    console.info(result)

    expect(result).toEqual([1])
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

describe("bulk test showDetailDataStudent", () => {
    test.concurrent('test function showDetailDataStudent while data exist', async () => {
        let result = await StudentController.showDetailDataStudent(1)
        console.info(result)

        expect(result).toBeDefined()
    })

    test.concurrent(`test function showDetailDataStudent while data doesn't exist`, async () => {
        let result = await StudentController.showDetailDataStudent(2)
        console.info(result)

        expect(result).toBeFalsy()
    })
})

describe.only('bulk test update data student', () => {
    test.skip(`test function updateDataTeacher while data doesn't exist`, async () => {
        let result = await StudentController.updateDataStudent({
            body: {
                name: 'Gugun Gunawan',
                is_active: false,
                date_of_birth: '',
                place_of_birth: '',
                province: '',
                city_regency: '',
                sub_regency: '',
                address: '',
            }
        }, 2)
        console.info(result)

        expect(result).toBeFalsy();
    })

    test('test function updateDataTeacher while data exist', async () => {
        let result = await StudentController.update({
            body: {
                name: 'Gugun Gunawan',
                is_active: false,
                date_of_birth: '',
                place_of_birth: '2005-07-12',
                province: '',
                city_regency: '',
                sub_regency: '',
                address: '',
                entity_id: 6,
                detail_entity_id: 7
            }
        }, 7)
        console.info(result)

        expect(result).toEqual([1]);
    })
})

describe('bulk test delete data student', () => {
    test.skip(`test to delete data while data exist`, async () => {
        let result = await StudentController.deleteDataStudent(1)
        console.info(result)

        expect(result).toEqual(1)
    })

    test.concurrent(`test to delete data student while data doesn't exist`, async () => {
        let result = await StudentController.deleteDataStudent(2)
        console.info(result)

        expect(result).toBeFalsy()
    })
})