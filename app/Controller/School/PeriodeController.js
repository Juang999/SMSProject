const {
    Periode,
    DetailPeriode,
    sequelize, Sequelize
} = require('../../../models')
const moment = require('moment')

class PeriodeController {
    index = async (req, res) => {
        Periode.findAll({
            attributes: [
                'id',
                'periode_code',
                'start_year',
                'end_year'
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
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    show = async (id) => {
        
    }

    store = async (req, res) => {
        let transaction = await sequelize.transaction();

        try {
            let result = await Periode.create({
                periode_code: `PR${req.body.start_year}${req.body.end_year}`,
                is_active: true,
                start_year: req.body.start_year,
                end_year: req.body.end_year,
            })
    
            let extractedResult = result.dataValues;
    
            extractedResult.detail_periode = await this.storeDetailPeriode(extractedResult.id, JSON.parse(req.body.detail_periode))    

            await transaction.commit();

            res.status(200)
                .json({
                    status: 'success',
                    data: extractedResult,
                    error: null
                })
        } catch (error) {
            await transaction.rollback();

            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    storeDetailPeriode = async (periodeId, data) => {
        let bulkData = data.map(data => {
            return {
                semester_id: data.semester_id,
                periode_id: periodeId,
                start_date: moment(data.start_date).startOf("months").format('YYYY-MM-DD'),
                end_date: moment(data.end_date).endOf("months").format('YYYY-MM-DD'),
            }
        })

        let rawResult = await DetailPeriode.bulkCreate(bulkData)

        let result = rawResult.map(data => {
            return data.dataValues;
        })

        return result;
    }
}

module.exports = new PeriodeController()