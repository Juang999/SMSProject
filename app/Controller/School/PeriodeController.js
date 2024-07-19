const {
    Periode,
    CodeMaster,
    DetailPeriode,
    sequelize, Sequelize
} = require('../../../models')
const moment = require('moment')
const { where } = require('sequelize')
const {
    Logging
} = require('../../../helper/helper.js');

class PeriodeController {
    index = async (req, res) => {
        Periode.findAll({
            attributes: [
                'id',
                'periode_code',
                'start_year',
                'end_year'
            ],
            order: [
                ['start_year', 'ASC']
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
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }
    
            let detailPeriode = await Periode.findOne({
                attributes: [
                    'id',
                    'periode_code',
                    'is_active',
                    'start_year',
                    'end_year'
                ],
                include: [
                    {
                        model: DetailPeriode,
                        as: 'detail_periode',
                        attributes: [
                            'id',
                            [Sequelize.literal(`"detail_periode->semester_code"."code_name"`), 'semester'],
                            [Sequelize.literal(`TO_CHAR(start_date, 'YYYY-MM')`), 'start_month'],
                            [Sequelize.literal(`TO_CHAR(end_date, 'YYYY-MM')`), 'end_month'],
                        ],
                        include: [
                            {
                                model: CodeMaster,
                                as: 'semester_code',
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
                    data: detailPeriode,
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

    store = async (req, res) => {
        try {
            let result = await sequelize.transaction(async t => {
                let result = await Periode.create({
                        periode_code: `PR${req.body.start_year}${req.body.end_year}`,
                        is_active: true,
                        start_year: req.body.start_year,
                        end_year: req.body.end_year,
                    }, {
                        transaction: t
                    })

                    let extractedResult = result.dataValues;

                    extractedResult.detail_periode = await this.storeDetailPeriode(result.dataValues.id, JSON.parse(req.body.detail_periode), t)    

                    return extractedResult;
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

    update = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }
    
            let request = this.requestsUpdatePeriode(req.body, data)
    
            let result = await Periode.update({
                periode_code: request.periode_code,
                start_year: request.start_year,
                end_year: request.end_year
            }, {
                where: {
                    id: req.params.id
                },
                inidividualHooks: true,
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
    
            let result = await sequelize.transaction(async t => {
                await this.deleteHeaderPeriode(req.params.id, t),
                await this.deleteDetailPeriode(req.params.id, t)

                return true;
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

    updateDetailPeriode = async (req, res) => {
        try {
            let status = await this.checkExistanceDetailData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    });

                return;
            }
    
            let result = await DetailPeriode.update({
                start_date: moment(req.body.start_date).startOf('months').format('YYYY-MM-DD'),
                end_date: moment(req.body.end_date).endOf('months').format('YYYY-MM-DD'),
            }, {
                where: {
                    id: req.params.id
                },
                inidividualHooks: true
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

    periodeList = (req, res) => {
        Periode.findAll({
            attributes: [
                'id',
                [Sequelize.literal(`CONCAT(start_year, ' - ', end_year)`), 'periode']
            ],
            order: [
                ['start_year', 'ASC']
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

    requestsUpdatePeriode = (request, dataPeriode) => {
        let startYear = (request.start_year) ? request.start_year : dataPeriode.start_year;
        let endYear = (request.end_year) ?  request.end_year : dataPeriode.end_year;

        return {
            periode_code: `PR${startYear}${endYear}`,
            start_year: startYear,
            end_year: endYear
        }
    }

    storeDetailPeriode = async (periodeId, data, transaction) => {
        let bulkData = data.map(data => {
            return {
                semester_id: data.semester_id,
                periode_id: periodeId,
                start_date: moment(data.start_date).startOf("months").format('YYYY-MM-DD'),
                end_date: moment(data.end_date).endOf("months").format('YYYY-MM-DD'),
            }
        })

        let rawResult = await DetailPeriode.bulkCreate(bulkData, {transaction: transaction})

        let result = rawResult.map(data => {
            return data.dataValues;
        })

        return result;
    }

    checkExistanceData = async (id) => {
        let data = await Periode.findOne({
            attributes: [
                'id',
                'periode_code',
                'is_active',
                'start_year',
                'end_year'
            ],
            where: {
                id: id
            }
        })

        return {
            status: (data) ? true : false,
            data: (data) ? data.dataValues : null
        }
    }

    deleteHeaderPeriode = async (id, transaction) => {
        let result = await Periode.destroy({
            where: {
                id: id
            },
            force: true,
            inidividualHooks: true
        }, {
            transaction: transaction
        })

        return result;
    }

    deleteDetailPeriode = async (id, transaction) => {
        let result = await DetailPeriode.destroy({
            where: {
                periode_id: id
            },
            force: true,
            inidividualHooks: true,
        }, {
            transaction: transaction
        })

        return result;
    }

    checkExistanceDetailData = async (id) => {
        let detailPeriode = await DetailPeriode.findOne({
            attributes: [
                'id'
            ],
            where: {
                id: id
            }
        })

        return (detailPeriode) ? true : false
    }
}

module.exports = new PeriodeController()