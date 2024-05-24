const {
    EntityController
} = require('../../../../app/Controller/Controller')

test('test to get data index', async () => {
    let result = await EntityController.index();
    console.info(result)

    expect(result).toBeDefined();
})

test('test to get detail data', async () => {
    let result = await EntityController.show(4);
    console.info(result)

    expect(result).toBeDefined();
})

it('will create new entity', async () => {
    let result = await EntityController.store({
        body: {
            entity_name: 'Pondok Pesantren Fajrussalam 2'
        }
    })

    console.info(result)

    expect(result).toBeDefined()
})

let tables = [
    {
        entity_id: 6,
        location_id: 19
    }, {
        entity_id: 6,
        location_id: 20
    }
]

it.only.each(tables)('test to input detail entity', async ({entity_id, location_id}) => {
    let result = await EntityController.storeDetailEntity({
        body: {
            entity_id: entity_id,
            location_id: location_id
        }
    })

    console.info(result)

    expect(result).toBeDefined();
})