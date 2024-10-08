const Joi = require('joi');

const schemaValidation = Joi.object({
    code_field: Joi.string().required(),
    code_name: Joi.string().required(),
    code_description: Joi.string().required(),
})

const MasterCreateRequest = (req, res, next) => {
    let validate = schemaValidation.validate(req.body, {
        abortEarly: false
    });

    if (validate.error) {
        let validation = validate.error.details.map(element => {
            return element.message;
        })

        res.status(300)
            .json({
                status: 'invalidate',
                data: null,
                error: validation
            })

            return;
    }

    next()
}

module.exports = MasterCreateRequest;