const {MasterController} = require('../../../../app/Controller/Controller')

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

test.only.each(dataCodeField)('test to get data code master by code_field', async ({field}) => {
    let data = await MasterController.getData(field)
    console.info(data)

    expect(data).toBeDefined();
})