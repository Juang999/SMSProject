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
            entity_name: 'Pondok Pesantren Fajrussalam 3'
        }
    })

    console.info(result)

    expect(result).toBeDefined()
})

it('test update entity in EntityController', async () => {
    let callback = jest.fn();

    await EntityController.update({
        body: {
            entity_name: 'Pondok Pesantren Fajrussalam',
            is_active: true,
            // province: 'Jawa Barat',
            // city_regency: 'Kabupaten Bogor',
            sub_regency: 'Babakan Madang',
            address: 'Karang Tengah',
        },
        params: {
            id: 4
        }
    }, callback);

    console.info(callback.mock.calls[0]);

    expect(callback).toHaveBeenCalled();
})

it('test activate EntityController', async () => {
    let callback = jest.fn();

    await EntityController.activate({
        params: {
            id: 4
        }
    }, callback)

    console.info(callback.mock.calls[0])

    expect(callback).toHaveBeenCalled();
})

it('test to input detail entity', () => {
    let callback = jest.fn();

    callback.mockImplementation(() => {
        return {
            entity_id: 8,
            location_id: 13,
            is_active: true
        }
    })

    EntityController.storeDetailEntity({
        body: {
            entity_id: 8,
            location_id: 13,
        }
    }, callback)

    console.info(callback.mock.results[0].value)

    expect(callback).toHaveBeenCalledWith({
        entity_id: 8,
        location_id: 13,
        is_active: true
    });
})

it('test to activate detail entity', async () => {
    let callback = jest.fn();

    callback.mockImplementation(() => {
        return 1;
    })

    await EntityController.activateDetailEntity({
        params: {
            id: 13
        }
    }, callback)

    expect(callback).toHaveBeenCalledWith(1);
})

test.only('test delete detail entity', async () => {
    let callback = jest.fn();

    callback.mockImplementation(() => {
        return 1;
    })

    await EntityController.deleteDetailEntity({
        params: {
            id: 13
        }
    }, callback)

    console.info(callback.mock.results[0].value);

    expect(callback).toHaveBeenCalledWith(1);
})