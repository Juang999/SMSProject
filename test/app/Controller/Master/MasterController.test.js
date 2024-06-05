const {MasterController} = require('../../../../app/Controller/Controller');
const {CodeMaster} = require('../../../../models');

let bulkData = [
    {
        code_field: 'class-type',
        code_name: 'Reguler',
        code_description: 'class type',
    }, {
        code_field: 'class-type',
        code_name: 'Intensive',
        code_description: 'class type',
    }
]

let dataCodeField = [
    {
        field: 'class-type'
    }
]

test.each(bulkData)('test create data class type', async ({code_field, code_name, code_description}) => {
    let createClassType = await MasterController.inputDataMaster({code_field, code_name, code_description})
    console.info(createClassType)

    expect(createClassType).toBeDefined();
})

test('test to get field code master', async () => {
    let dataField = await MasterController.getFieldCodeMaster();
    console.info(dataField)

    expect(dataField).toBeDefined()
})

test.each(dataCodeField)('test to get data code master by code_field', async ({field}) => {
    let data = await MasterController.getData(field)
    console.info(data)

    expect(data).toBeDefined();
})

test('test updateData MasterController', async () => {
    let updateMock = jest.spyOn(CodeMaster, 'update');

    let request = {
        code_field: 'lesson-type',
        code_name: 'ekstra kulikuler',
        code_description: 'tipe pelajaran',
        code_is_active: true,
    };

    await MasterController.updateData({
        body: request,
        params: {
            id: 31
        }
    })

    console.info(updateMock.mock.results[0])
    expect(CodeMaster.update).toHaveBeenCalled();
});

test.only('test delete MasterController', async () => {
    let deleteMock = jest.spyOn(CodeMaster, 'destroy');

    await MasterController.delete({
        params: {
            id: 46
        }
    })

    expect(CodeMaster.destroy).toHaveBeenCalled();
})