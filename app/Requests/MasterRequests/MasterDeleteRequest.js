const Joi = require('joi');

const schemaValidation = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'parameter {{#label}} is required'
    })
})

const MasterDeleteRequest = (req, res, next) => {
    const validate = schemaValidation.validate({
        id: req.params.id
    }, {
        abortEarly: false
    })

    if (validate.error) {
        let result = validate.error.details.map(element => {
            return element.message;
        })

        res.status(300)
            .json({
                status: 'invalidate',
                data: null,
                error: result
            })

        return;
    }

    next()
}

module.exports = MasterDeleteRequest;