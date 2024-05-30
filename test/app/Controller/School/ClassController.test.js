const {
    ClassController
} = require('../../../../app/Controller/Controller')

test('test index ClassController', () => {
    let dataClass = [
        {
            id: 3, 
            class_code: '1B', 
            is_active: true, 
            type: 'Reguler'
        }, {
            id: 4, 
            class_code: '1C', 
            is_active: true, 
            type: 'Reguler'
        }, {
            id: 5, 
            class_code: '1D', 
            is_active: true, 
            type: 'Reguler'
        }
    ];

    let callback = jest.fn();

    callback.mockImplementation((result) => {
        return dataClass
    })

    ClassController.index(null, callback)

    console.info(callback.mock.results[0].value)

    expect(callback).toHaveBeenCalledWith(dataClass)
})

test('test store ClassController', async () => {
    let callback = jest.fn();

    let result = await ClassController.store({
        body: {
            type: 3,
            grade: 'B',
            class_code_master_id: 6,
            entity_id: 4,
            semester_id: 3,
            periode_id: 38,
            detail_periode_id: 32
        }
    }, callback)

    expect(callback).toHaveBeenCalledWith({
        type: 3,
        grade: 'B',
        class_code: '1B',
        class_code_master_id: 6,
        is_active: true,
        entity_id: 4,
        semester_id: 3,
        periode_id: 38,
        detail_periode_id: 32,
    })
})

test('test update ClassController', async () => {
    let callback = jest.fn();

    await ClassController.update({
        params: {
            id: 3
        }, 
        body: {
            type: 3,
            grade: 'C',
            class_code_master_id: 7,
        }
    }, callback)

    console.info(callback.mock.calls[0][0])

    expect(callback).toHaveBeenCalled();
})

test('test delete ClassController', async () => {
    let callback = jest.fn();

    callback.mockImplementation(() => {
        return [1]
    })

    await ClassController.delete({
        params: {
            id: 3
        }
    }, callback)

    console.info(callback.mock.results)

    expect(callback).toHaveBeenCalledWith([1])
})

test.only('test show ClassController', async () => {
    let result = await ClassController.show({
        params: {
            id: 3
        }
    })

    console.info(result)

    expect(result).toBeDefined();
})

test('test storeHomeroomTeacher ClassController', () => {
    let callback = jest.fn();

    let data = {
        class_id: 3,
        teacher_id: 21,
        status: 26,
        homeroom_teacher_type: 22,
        start_date: '2024-08-01',
        end_date: null,
        is_active: true,
    }

    callback.mockImplementation(() => {
        return data;
    })

    ClassController.storeHomeroomTeacher({
        body: data
    }, callback)

    console.info(callback.mock.results[0].value)

    expect(callback).toHaveBeenCalledWith(data);
})

test('test storeStudent ClassController', () => {
    let callback = jest.fn();

    ClassController.storeStudent({
        body: {
            class_id: 3,
            student_id: 1,
            status: 28
        }
    }, callback)

    console.info(callback.mock.calls[0][0])

    expect(callback.mock.calls[0][0]).toBeDefined();
})