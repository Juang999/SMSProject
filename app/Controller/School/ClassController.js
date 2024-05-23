const {
    Class
} = require('../../../models');

class ClassController {
    index = async () => {
        let dataClass = await Class.findAll()

        return dataClass
    }

    createClass = async (req) => {
        
    }
}

module.exports = new ClassController()