const {
    Student,
    HomeroomTeacher,
    Class, CodeMaster,
    Sequelize, Entity,
    Teacher, StudentClass,
    DetailEntity, Periode,
} = require('../../../models');

class ClassController {
    index = (req, res) => {
        Class.findAll({
            attributes: [
                'id',
                'class_code',
                'is_active',
                [Sequelize.literal('"class_type"."code_name"'), 'type'],
                [Sequelize.literal(`"detail_entity->location"."code_name"`), 'location']
            ],
            include: [
                {
                    model: CodeMaster,
                    as: 'class_type',
                    attributes: []
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
            ]
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
    }

    show = async (req, res) => {
        try {
            let {status} = await this.checkExistanceData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })
    
                return;
            }
    
            let result = await Class.findOne({
                attributes: [
                    'id',
                    'class_code',
                    'grade',
                    [Sequelize.literal(`CONCAT("periode"."start_year", '-', "periode"."end_year")`), 'tahun_ajaran'],
                    [Sequelize.literal('"class_type"."code_name"'), 'type'],
                    [Sequelize.literal('"entity"."entity_name"'), 'entity_name'],
                    [Sequelize.literal('"detail_entity->location"."code_name"'), 'location_name'],
                    
                ],
                include: [
                    {
                        model: CodeMaster,
                        as: 'class_type',
                        attributes: []
                    }, {
                        model: Entity,
                        as: 'entity',
                        attributes: []
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
                    }, {
                        model: Periode,
                        as: 'periode',
                        attributes: []
                    }, {
                        model: HomeroomTeacher,
                        as: 'homeroom_teacher',
                        attributes: [
                            'id', 
                            'class_id', 
                            'teacher_id', 
                            [Sequelize.literal(`"homeroom_teacher->teacher"."fullname"`), 'teacher_fullname'],
                            [Sequelize.literal(`"homeroom_teacher->teacher"."photo"`), 'photo'],
                            [Sequelize.literal(`"homeroom_teacher->homeroom_type"."code_name"`), 'status_walikelas'],
                            'start_date',
                            'end_date',
                            [Sequelize.literal(`"homeroom_teacher->status_teacher"."code_name"`), 'teacher_status']
                        ],
                        include: [
                            {
                                model: CodeMaster,
                                as: 'status_teacher',
                                attributes: []
                            }, {
                                model: CodeMaster,
                                as: 'homeroom_type',
                                attributes: []
                            }, {
                                model: Teacher,
                                as: 'teacher',
                                attributes: []
                            }
                        ]
                    }, {
                        model: StudentClass,
                        as: 'student_class',
                        attributes: [
                            'id',
                            'class_id', 
                            'student_id', 
                            [Sequelize.literal(`"student_class->student"."name"`), 'name_student'],
                            [Sequelize.literal(`"student_class->student"."photo"`), 'photo']
                        ],
                        include: [
                            {
                                model: Student,
                                as: 'student',
                                attributes: []
                            }
                        ]
                    }
                ],
                where: {
                    id: req.params.id
                }
            })
            
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }

        
    }

    store = async (req, res) => {
        try {
            let class_name = await this.getClassCode(req.body.class_code_master_id, req.body.grade);
    
            let result = await Class.create({
                class_code: class_name,
                type: req.body.type,
                grade: req.body.grade,
                is_active: true,
                class_code_master_id: req.body.class_code_master_id,
                entity_id: req.body.entity_id,
                detail_entity_id: req.body.detail_entity_id,
                periode_id: req.body.periode_id,
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    update = async (req, res) => {
        try {
            let {status, data} = await this.checkExistanceData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })
    
                return;
            }
    
            let request = await this.requestsUpdate(req.body, data)
    
            let result = await Class.update(
                {
                    class_code: request.class_code,
                    type: request.type,
                    grade: request.grade,
                    is_active: request.is_active,
                    class_code_master_id: request.class_code_master_id,
                    entity_id: request.entity_id,
                    detail_entity_id: request.detail_entity_id,
                    periode_id: request.periode_id,
                }, {
                    where: {
                        id: req.params.id
                    }
                }
            )

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    delete = async (req, res) => {
        try {
            let {status} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await Class.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    storeHomeroomTeacher = (req, res) => {
        HomeroomTeacher.create({
            class_id: req.body.class_id,
            teacher_id: req.body.teacher_id,
            status: 28,
            homeroom_teacher_type: req.body.homeroom_teacher_type,
            start_date: req.body.start_date,
            is_active: true,
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    deleteHomeroomTeacher = async (req, res) => {
        try {
            let status = await this.checkExistanceHomeroomTeacher(req.params.id);
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }
    
            let result = await HomeroomTeacher.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    storeStudent = (req, res) => {
        StudentClass.create({
            class_id: req.body.class_id,
            student_id: req.body.student_id,
            status: req.body.status,
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    deleteStudentClass = async (req, res) => {
        try {
            let status = await this.checkExistanceStudentClass(req.params.id);
    
            if (status == false) {
                req.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })
    
                return;
            }
    
            let result = await StudentClass.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    deleteStudent = (req, res) => {

    }

    checkExistanceData = async (id) => {
        let result = await Class.findOne({
            where: {
                id: id
            }
        });

        return {
            status: (result != null) ? true : false,
            data: (result != null) ? result.dataValues : null
        };
    }

    checkExistanceHomeroomTeacher = async (id) => {
        let result = await HomeroomTeacher.findOne({
            where: {
                id: id
            }
        })

        return (result) ? true : false
    }

    checkExistanceStudentClass = async (id) => {
        let result = await StudentClass.findOne({
            where: {
                id: id
            }
        })

        return (result) ? true : false;
    }

    getClassCode = async (id, grade) => {
        let {code_name} = await CodeMaster.findOne({
            attributes: [
                'code_name'
            ],
            where: {
                id: id
            }
        });

        return `${code_name}${grade}`;
    }

    requestsUpdate = async (request, dataClass) => {
        let grade = (request.grade) ? request.grade : dataClass.grade;

        return {
            grade: grade,
            type: (request.type) ? request.type : dataClass.type,
            is_active: (request.is_active) ? request.is_active : dataClass.is_active,
            entity_id: (request.entity_id) ? request.entity_id : dataClass.entity_id,
            periode_id: (request.periode_id) ? request.periode_id : dataClass.periode_id,
            detail_entity_id: (request.detail_entity_id) ? request.detail_entity_id : dataClass.detail_entity_id,
            class_code_master_id: (request.class_code_master_id) ? request.class_code_master_id : dataClass.class_code_master_id,
            class_code: (request.class_code_master_id) ? await this.getClassCode(request.class_code_master_id, grade) : dataClass.class_code,
        }
    }
}

module.exports = new ClassController()