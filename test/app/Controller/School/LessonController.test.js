const {LessonController} = require('../../../../app/Controller/Controller');
const {LessonMaster, DetailLesson, LessonTeacher} = require('../../../../models');

test('test index LessonController', async () => {
    const findAllMock = jest.spyOn(LessonMaster, 'findAll');

    await LessonController.index();
    console.info(findAllMock.mock.results[0].value)
    expect(LessonMaster.findAll).toHaveBeenCalled();
});

test('test show LessonController', async () => {
    let showMock = jest.spyOn(LessonMaster, 'findOne');

    await LessonController.show({
        params: {
            id: 1
        }
    })

    console.info(showMock.mock.results[0].value);
    expect(LessonMaster.findOne).toHaveBeenCalledTimes(2);
});

test('test store LessonController', async () => {
    const createMock = jest.spyOn(LessonMaster, 'create');

    let data = {
        nama_pelajaran: `Drawing`,
        tipe_pelajaran: 47,
    };

    await LessonController.store({
        body: data
    }, null)

    console.info(createMock.mock.results[0].value)
    expect(LessonMaster.create).toHaveBeenCalledWith(data);
});

test('test update LessonController', async () => {
    let updateMock = jest.spyOn(LessonMaster, 'update');

    let data = {
        nama_pelajaran: 'Tarikh Islam', 
        tipe_pelajaran: 47, 
        description: 'Sejarah Kebudayaan Islam', 
        is_active: null
    }

    await LessonController.update({
        body: data,
        params: {
            id: 1
        }
    })

    console.info(updateMock.mock.results[0])
    expect(LessonMaster.update).toHaveBeenCalled();
})

test('test delete LessonController', async () => {
    let deleteMock = jest.spyOn(LessonMaster, 'destroy');

    await LessonController.delete({
        params: {
        id: 3
        }
    })

    console.info(deleteMock.mock.results[0])
    expect(LessonMaster.destroy).toHaveBeenCalled();
})

it.failing('test error addLessonClass LessonController', async () => {
    // let createMock = jest.spyOn(DetailLesson, 'create');

    let data = {
        entity_id: 4,
        detail_entity_id: 3,
        lesson_id: 1,
        class_id: 8,
        periode_id: 38,
        detail_periode_id: 32,
    }

    await LessonController.addLessonClass({
        body: data
    })

    // await expect(async () => await LessonController.addLessonClass({body: data}) ).toThrow();
})

it('test addLessonClass LessonController', async () => {
    let createMock = jest.spyOn(DetailLesson, 'create');

    let data = {
        entity_id: 8,
        detail_entity_id: 13,
        lesson_id: 6,
        class_id: 8,
        periode_id: 38,
        detail_periode_id: 32,
    }

    await LessonController.addLessonClass({
        body: data
    })

    expect(DetailLesson.create).toHaveBeenCalledWith(data);
})

it('test updateLessonClass LessonController', async () => {
    let updateMock = jest.spyOn(DetailLesson, 'update');

    await LessonController.updateLessonClass({
        body: {
            entity_id: 8,
        },
        params: {
            id: 8
        }
    })

    expect(DetailLesson.update).toHaveBeenCalledTimes(1);
})

it('test deleteLessonClass LessonController', async () => {
    let deleteMock = jest.spyOn(DetailLesson, 'destroy');

    await LessonController.deleteLessonClass({
        params: {
            id: 8
        }
    })

    expect(DetailLesson.destroy).toHaveBeenCalledTimes(1);
});

it('test addLessoTeacher LessonController', async () => {
    let createMock = jest.spyOn(LessonTeacher, 'create');

    let data = {
        detail_lesson_id: 13,
        teacher_id: 23,
        start_date: '2024-08-01',
    }
    
    await LessonController.addLessonTeacher({
        body: {
            detail_lesson_id: 13,
            teacher_id: 23,
            start_date: '2024-08-01',
        }
    })

    console.info(createMock.mock.results[0].value)
    expect(LessonTeacher.create).toHaveBeenCalledWith({
        detail_lesson_id: 13,
        is_active: true,
        teacher_id: 23,
        start_date: '2024-08-01',
    });
});

it.only('test deleteLessonTeacher LessonController', async () => {
    let deleteMock = jest.spyOn(LessonTeacher, 'destroy');

    await LessonController.deleteLessonTeacher({
        params: {
            id: 3
        }
    })

    console.info(deleteMock.mock.results[0].value);
    expect(LessonTeacher.destroy).toHaveBeenCalledTimes(1);
});