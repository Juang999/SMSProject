const {
    Entity,
    DetailEntity
} = require('../../../models')

class EntityController {
    index = async () => {
        let dataEntity = await Entity.findAll()

        return dataEntity;
    }

    show = async (id) => {
        let {data, status} = await this.checkExistanceData(id)

        if (status == false) {
            return false;
        }

        let result = await Entity.findOne({
            attributes: [
                'id',
                'entity_name',
                'is_active'
            ],
            include: [
                {
                    model: DetailEntity,
                    as: 'detail_entity',
                    attributes: ['id', 'entity_id', 'location_id', 'is_active']
                }
            ],
            where: {
                id: id
            }
        })

        return result;
    }

    store = async (req) => {
        let result = await Entity.create({
            entity_name: req.body.entity_name,
            is_active: true
        })

        return result
    }

    storeDetailEntity = async (req) => {
        let result = await DetailEntity.create({
            entity_id: req.body.entity_id,
            location_id: req.body.location_id,
            is_active: true,
        })

        return result
    }

    checkExistanceData = async (id) => {
        let result = await Entity.findOne({
            attributes: ['id'],
            where: {
                id: id
            }
        })

        return {
            data: (result) ? result : null,
            status: (result) ? true : false
        }
    }
}

module.exports = new EntityController();