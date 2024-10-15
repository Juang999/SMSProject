const {
    LessonTeacher,
    DetailPeriode,
    Class, Periode,
    Entity, DetailEntity,
    Sequelize, CodeMaster,
    LessonMaster, DetailLesson,
} = require('../../../models');
const {
    Logging
} = require('../../../helper/helper.js');

class LessonController {
    index = (req, res) => { 
        LessonMaster.findAll({
            attributes: [
                'id',
                'nama_pelajaran'
            ],
            logging: false
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(({message, stack}) => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        })
    }

    show = async (req, res) => {
        try {
            let {status} = await this.checkExistanceData(req.params.id)
            let {periode_id, periode} = (req.query.periode_id) ? await this.getPeriode(req.query.periode_id) : await this.getLatestPeriode();

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }
    
            let result = await LessonMaster.findOne({
                attributes: [
                    'id',
                    [Sequelize.literal(`'${periode}'`), 'periode'],
                    'nama_pelajaran',
                    'is_active',
                    'description',
                ],
                include: [
                    {
                        model: DetailLesson,
                        as: 'detail_lesson',
                        required: false,
                        attributes: [
                            'id',
                            [Sequelize.literal(`"detail_lesson->entity"."entity_name"`), 'entity_name'],
                            [Sequelize.literal(`"detail_lesson->detail_entity->location"."code_name"`), 'location_name'],
                            [Sequelize.literal(`"detail_lesson->class"."class_code"`), 'class_name'],
                            [Sequelize.literal(`"detail_lesson->detail_periode->semester_code"."code_name"`), 'semester']
                            
                        ],
                        where: {
                            periode_id: periode_id
                        },
                        include: [
                            {
                                model: Class,
                                as: 'class',
                                attributes: []
                            }, {
                                model: Entity,
                                as: 'entity',
                                attributes: []
                            }, {
                                model: DetailPeriode,
                                as: 'detail_periode',
                                attributes: [],
                                include: [
                                    {
                                        model: CodeMaster,
                                        as: 'semester_code',
                                        attributes: []
                                    }
                                ]
                            }, {
                                model: DetailEntity,
                                as: 'detail_entity',
                                attributes: [],
                                include: [
                                    {
                                        model: CodeMaster,
                                        as: 'location',
                                        attributes: []
                                    }
                                ]
                            }
                        ],
                        order: [
                            [`"detail_lesson"."id"`, "ASC"]
                        ]
                    }
                ],
                where: {
                    id: req.params.id
                },
                logging: false
            });

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    store = (req, res) => {
        LessonMaster.create({
            nama_pelajaran: req.body.nama_pelajaran,
            tipe_pelajaran: req.body.tipe_pelajaran,
            description: req.body.description
        }, {
            logging: false
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(({message, stack}) => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        })
    }

    update = async (req, res) => {
        try {
            let {status, data} = await this.checkExistanceData(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let {nama_pelajaran, tipe_pelajaran, description, is_active} = this.requestsUpdate(req.body, data);

            let result = await LessonMaster.update({
                nama_pelajaran: nama_pelajaran, 
                tipe_pelajaran: tipe_pelajaran, 
                description: description, 
                is_active: is_active
            }, {
                where: {
                    id: req.params.id
                },
                individualHooks: true,
                logging: false
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result[1],
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({error: message, path: stack});
        }
    }

    delete = async (req, res) => {
        try {
            let {status} = await this.checkExistanceData(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await LessonMaster.destroy({
                where: {
                    id: req.params.id
                },
                individualHooks: true,
                logging: false
            });

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    addLessonClass = async (req, res) => {
        try {
            let {id: class_id, entity_id, detail_entity_id} = await this.getDataClass(req.body.class_id);

            let result = await DetailLesson.create({
                entity_id: entity_id,
                detail_entity_id: detail_entity_id,
                lesson_id: req.body.lesson_id,
                class_id: class_id,
                periode_id: req.body.periode_id,
                detail_periode_id: req.body.detail_periode_id,
            }, {
                logging: false
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    updateLessonClass = async (req, res) => {
        try {
            let {status, data} = await this.checkExistanceLessonClass(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    });

                return;
            }

            let {entity_id, detail_entity_id, lesson_id, class_id, periode_id, detail_periode_id} = this.requestUpdateLessonClass(req.body, data);

            let result = await DetailLesson.update({
                entity_id,
                detail_entity_id,
                lesson_id,
                class_id,
                periode_id,
                detail_periode_id,
            }, {
                where: {
                    id: req.params.id
                },
                individualHooks: true,
                logging: false
            });

            res.status(200)
                .json({
                    status: 'success',
                    data: result[1],
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    deleteLessonClass = async (req, res) => {
        try {
            let {status} = await this.checkExistanceLessonClass(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found',
                        data: null,
                        error: 'not found!'
                    });

                return;
            }

            let result = await DetailLesson.destroy({
                where: {
                    id: req.params.id
                },
                individualHooks: true,
                logging: false
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    addLessonTeacher = (req, res) => {
        LessonTeacher.create({
            detail_lesson_id: req.body.detail_lesson_id,
            teacher_id: req.body.teacher_id,
            is_active: true,
            start_date: req.body.start_date
        })
        .then(result => {
            res.status(200)
                .json({
                    status:'success',
                    data: result,
                    error: null
                })
        })
        .catch(({message, stack}) => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        })
    }

    deleteLessonTeacher = async (req, res) => {
        try {
            let status = await this.checkExistanceDataLessonTeacher(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await LessonTeacher.destroy({
                where: {
                    id: req.params.id
                },
                individualHooks: true,
                logging: false
            })

            
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    checkExistanceDataLessonTeacher = async (id) => {
        let result = await LessonTeacher.findOne({
            where: {
                id: id
            },
            logging: false
        });

        return (result) ? true: false;
    }

    requestsUpdate = (request, dataLesson) => {
        return {
            nama_pelajaran: (request.nama_pelajaran) ? request.nama_pelajaran : dataLesson.nama_pelajaran,
            tipe_pelajaran: (request.tipe_pelajaran) ? request.tipe_pelajaran : dataLesson.tipe_pelajaran,
            description: (request.description) ? request.description : dataLesson.description,
            is_active: (request.is_active) ? request.is_active : dataLesson.is_active,
        }
    }

    requestUpdateLessonClass = (request, dataLessonClass) => {
        return {
            entity_id: (request.entity_id) ? request.entity_id : dataLessonClass.entity_id,
            detail_entity_id: (request.detail_entity_id) ? request.detail_entity_id : dataLessonClass.detail_entity_id,
            lesson_id: (request.lesson_id) ? request.lesson_id : dataLessonClass.lesson_id,
            class_id: (request.class_id) ? request.class_id : dataLessonClass.class_id,
            periode_id: (request.periode_id) ? request.periode_id : dataLessonClass.periode_id,
            detail_periode_id: (request.detail_periode_id) ? request.detail_periode_id : dataLessonClass.detail_periode_id,
        }
    }

    checkExistanceData = async (id) => {
        let result = await LessonMaster.findOne({
            where: {
                id: id
            },
            logging: false
        })

        return {
            status: (result) ? true : false,
            data: (result) ? result.dataValues : null
        }
    }

    checkExistanceLessonClass = async (id) => {
        let result = await DetailLesson.findOne({
            where: {
                id: id
            },
            logging: false
        })

        return {
            status: (result) ? true : false,
            data: (result) ? result.dataValues : null
        }
    }

    getLatestPeriode = async () => {
        let result = await Periode.findOne({
            attributes: [
                'id',
                [Sequelize.literal(`CONCAT(start_year, ' - ', end_year)`), 'periode_name']
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            logging: false
        })

        return {
            periode_id: result.dataValues.id,
            periode: result.dataValues.periode_name
        };
    }

    getPeriode = async (periodeId) => {
        let result = await Periode.findOne({
            attributes: [
                'id',
                [Sequelize.literal(`CONCAT(start_year, ' - ', end_year)`), 'periode_name']
            ],
            where: {
                id: periodeId
            },
            logging: false
        })

        return {
            periode_id: result.dataValues.id,
            periode: result.dataValues.periode_name
        };
    }

    getDataClass = async (classId) => {
        let {id, entity_id, detail_entity_id} = await Class.findOne({
            attributes: [
                'id',
                'entity_id',
                'detail_entity_id'
            ],
            where: {
                id: classId
            },
            logging: false
        })

        return {id, entity_id, detail_entity_id};
    }
}

module.exports = new LessonController();