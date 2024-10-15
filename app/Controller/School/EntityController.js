const {
    Entity,
    CodeMaster,
    DetailEntity,
    Sequelize,sequelize,
} = require('../../../models')
const {
    Logging
} = require('../../../helper/helper.js');

class EntityController {
    index = (req, res) => {
        Entity.findAll({
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
                        error: err.message
                    })

                Logging.error({message, stack});
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

            let result = await Entity.findOne({
                attributes: [
                    'id',
                    'entity_name',
                    'is_active'
                ],
                logging: false,
                include: [
                    {
                        model: DetailEntity,
                        as: 'detail_entity',
                        attributes: [
                            'id', 
                            'entity_id', 
                            'location_id', 
                            [Sequelize.literal(`"detail_entity->location"."code_name"`), 'location_name'],
                            'is_active',
                        ],
                        include: [
                            {
                                model: CodeMaster,
                                as: 'location',
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
        Entity.create({
            entity_name: req.body.entity_name,
            is_active: true,
            province: req.body.province,
            city_regency: req.body.city_regency,
            sub_regency: req.body.sub_regency,
            address: req.body.address,
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
            let {data, status} = await this.checkExistanceData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }
    
            let requests = this.requestsUpdateEntity(req.body, data.dataValues);
    
            let result = await Entity.update({
                entity_name: requests.entity_name,
                is_active: requests.is_active,
                province: requests.province,
                city_regency: requests.city_regency,
                sub_regency: requests.sub_regency,
                address: requests.address,
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
                    error: error.message
                })

            Logging.error({message, stack});
        }
    }

    activate = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(200)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })
                
                return;
            }

            let result = await Entity.update({
                is_active: (data.dataValues.is_active == true) ? false : true
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
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    storeDetailEntity = (req, res) => {
        DetailEntity.create({
            entity_id: req.body.entity_id,
            location_id: req.body.location_id,
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

    activateDetailEntity = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceDetailEntity(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await DetailEntity.update({
                is_active: (data.is_active == true) ? false : true,
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

    deleteDetailEntity = async (req, res) => {
        try {
            let {status} = await this.checkExistanceDetailEntity(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await DetailEntity.destroy({
                where: {
                    id: req.params.id
                },
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

    checkExistanceData = async (id) => {
        let result = await Entity.findOne({
            where: {
                id: id
            },
            logging: false
        })

        return {
            data: (result) ? result : null,
            status: (result) ? true : false
        }
    }

    checkExistanceDetailEntity = async (id) => {
        let result = await DetailEntity.findOne({
            where: {
                id: id
            },
            logging: false
        })

        return {
            data: (result) ? result.dataValues : null,
            status: (result) ? true : false
        }
    }

    requestsUpdateEntity = (request, dataEntity) => {
        return {
            entity_name: (request.entity_name) ? request.entity_name : dataEntity.entity_name,
            is_active: (request.is_active) ? request.is_active : dataEntity.is_active,
            province: (request.province) ? request.province : dataEntity.province,
            city_regency: (request.city_regency) ? request.city_regency : dataEntity.city_regency,
            sub_regency: (request.sub_regency) ? request.sub_regency : dataEntity.sub_regency,
            address: (request.address) ? request.address : dataEntity.address,
        }
    }
}

module.exports = new EntityController();