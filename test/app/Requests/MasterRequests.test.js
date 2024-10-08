const {Requests} = require('../../../app/Kernel')

describe('master requests', () => {
    it.only('should MasterUpdateRequest', () => {
        let result = Requests.MasterUpdateRequest({
            params: {
                id: 1
            },
            body: {
                code_code: 'update',
                code_field: 'update',
                code_name: 'update',
                code_description: 'update',
                code_is_active: true,
            }
        })

        console.info(result)
    })
})