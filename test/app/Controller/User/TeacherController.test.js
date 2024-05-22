const {
    TeacherController
} = require('../../../../app/Controller/Controller')

test ('test to get data teacher', async () => {
    let dataTeacher = await TeacherController.index();
    console.info(dataTeacher)

    expect(dataTeacher).toBeDefined();
})

describe ('bulk testing for creating data teacher', () => {
    test ('create data teacher', async () => {
        let createDataTeacher = await TeacherController.createDataTeacher({
            body: {
                fullname: 'Fahmi Al-Farizi',
                start_date: '2024-10-26',
                is_active: 1,
                end_date: null,
                province: 'Jawa Barat',
                regency: 'Kabupaten Bogor',
                sub_regency: 'Kecamatan Babakan Madang',
                address: 'Desa Karangtengah',
                email: 'fahmiAl-Farizi@gmail.com',
                phone_number_1: '0867861234',
                phone_number_2: null,
                photo: null
            }
        })
    
        console.info(createDataTeacher);
    
        expect(createDataTeacher).toBeDefined()
    })

    test ('test error while create data teacher', async () => {
        await expect(async () => await TeacherController.createDataTeacher({
            body: {
                fullname: 'Fahmi Al-Farizi',
                start_date: '2024-10-26',
                is_active: 1,
                end_date: null,
                province: 'Jawa Barat',
                regency: 'Kabupaten Bogor',
                sub_regency: 'Kecamatan Babakan Madang',
                address: 'Desa Karangtengah',
                email: 'fahmiAl-Farizi@gmail.com',
                phone_number_1: '0867861234',
                phone_number_2: null,
                photo: null
            }
        })).toThrow();
    })
})

describe ('bulk testing to get detail data teacher', () => {
    test ('get detail data teacher while data exist', async () => {
        let detailDataTeacher = await TeacherController.show(6)
        console.info(detailDataTeacher)
    
        expect(detailDataTeacher).toBeDefined()
    })

    test (`get detail data teacher while data doesn't exist`, async () => {
        let detailDataTeacher = await TeacherController.show(9)
        console.info(detailDataTeacher)
    
        expect(detailDataTeacher).toBeNull()
    })
})

describe ('bulk test for updating feature', () => {
    test (`update data teacher while data doesn't exist`, async () => {
        let updateDataTeacher = await TeacherController.update({
            regency: 'Kabupaten Bandung Barat'
        }, 9)
    
        console.info(updateDataTeacher)
    
        expect(updateDataTeacher).toBeFalsy()
    })

    test ('update data teacher while data exist', async () => {
        let updateDataTeacher = await TeacherController.update({
            regency: 'Kabupaten Bandung Barat'
        }, 7)
    
        console.info(updateDataTeacher)
    
        expect(updateDataTeacher).toEqual([1])
    })
})

describe('bulk testing check data', () => {
    test ('check data id while data exist', async () => {
        let requestsUpdateData = await TeacherController.checkDataTeacher(6)
        console.info(requestsUpdateData)
    
        expect(requestsUpdateData.status).toBeTruthy()
    })

    test (`check data id while data doesn't exist`, async () => {
        let requestsUpdateData = await TeacherController.checkDataTeacher(9)
        console.info(requestsUpdateData)
    
        expect(requestsUpdateData.status).toBeFalsy()
    })
})

describe.only('test delete data teacher', () => {
    test (`test to delete teacher while data doesn't exist`, async () => {
        let status = await TeacherController.delete(16)
        console.info(status)

        expect(status).toBeFalsy()
    })

    test('test to delete data teacher while data exist', async () => {
        let status = await TeacherController.delete(18)
        console.info(status)

        expect(status).toBeDefined()
    })
})