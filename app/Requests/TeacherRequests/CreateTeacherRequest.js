const Joi = require('joi');

const schemaValidation = Joi.object({
    fullname: Joi.string().required(),
    start_date: Joi.date().required(),
    is_active: Joi.boolean().required(),
    end_date: Joi.date(),
    province: Joi.string(),
    regency: Joi.string(),
    sub_regency: Joi.string(),
    address: Joi.string(),
    email: Joi.string(),
    phone_number_1: Joi.number(),
    phone_number_2: Joi.number(),
    entity_id: Joi.number(),
    detail_entity_id: Joi.number(),
})

const CreateTeacherRequest = (req, res, next) => {
    const validate =schemaValidation.validate(req.body)
}