const Joi = require('joi');

const schemaValidation = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'parameter {{#label}} is required'
    }),
    code_name: Joi.string(),
    code_description: Joi.string(),
    code_is_active: Joi.boolean(),
})

const MasterUpdateRequest = (req, res, next) => {
    let validate = schemaValidation.validate({
        id: req.params.id,
        code_name: req.body.code_name,
        code_description: req.body.code_description,
        code_is_active: req.body.code_is_active,
    }, {
        abortEarly: false
    });

    if (validate.error) {
        let result = validate.error.details.map(element => {
            return element.message;
        })

        res.status(300)
            .json({
                status: 'failed',
                data: null,
                error: result
            })

        return;
    }

    next();
}

module.exports = MasterUpdateRequest;