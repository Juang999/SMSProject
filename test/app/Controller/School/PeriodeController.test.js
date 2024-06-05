const {
    PeriodeController
} = require('../../../../app/Controller/Controller')
const {
    Periode
} = require('../../../../models');

let rangeYear = [
    {
        start_year: 2025,
        end_year: 2026,
        detail_periode: JSON.stringify([
            {
                start_date: "2025-07-01",
                end_date: "2025-12-31"
            }, {
                start_date: "2026-01-01",
                end_date: "2026-06-30"
            }
        ])
    }, {
        start_year: 2026,
        end_year: 2027,
        detail_periode: JSON.stringify([
            {
                start_date: "2026-07-01",
                end_date: "2026-12-31"
            }, {
                start_date: "2027-01-01",
                end_date: "2027-06-30"
            }
        ])
    }, {
        start_year: 2027,
        end_year: 2028,
        detail_periode: JSON.stringify([
            {
                start_date: "2027-07-01",
                end_date: "2027-12-31"
            }, {
                start_date: "2028-01-01",
                end_date: "2028-06-30"
            }
        ])
    }, {
        start_year: 2028,
        end_year: 2029,
        detail_periode: JSON.stringify([
            {
                start_date: "2028-07-01",
                end_date: "2028-12-31"
            }, {
                start_date: "2029-01-01",
                end_date: "2029-06-30"
            }
        ])
    }, {
        start_year: 2029,
        end_year: 2030,
        detail_periode: JSON.stringify([
            {
                start_date: "2029-07-01",
                end_date: "2029-12-31"
            }, {
                start_date: "2030-01-01",
                end_date: "2030-06-30"
            }
        ])
    }
]

test.each(rangeYear)('test create header periode', async ({start_year, end_year, detail_periode}) => {
    let result = await PeriodeController.store({
        body: {
            start_year,
            end_year,
            detail_periode
        }
    })

    console.info(result)

    expect(result).toBeDefined();
})

test('test updat header periode', async () => {
    let result = await PeriodeController.update({
        body: {
            start_year: 2030,
            end_year: 2031
        },
        params: {
            id: 41
        }
    })

    console.info(result)

    expect(result).toEqual([1])
})

test('test to input bulk detail periode', async () => {
    let result = await PeriodeController.storeDetailPeriode(1, [
        {
            semester_id: 12,
            start_date: '2024-07-01',
            end_date: '2024-12-31'
        }, {
            semester_id: 13,
            start_date: '2025-01-01',
            end_date: '2025-06-30'
        }
    ])

    console.info(result)

    expect(result).toBeDefined();
})

describe('bulk test to get data periode', () => {
    test('test to get data periode', async () => {
        let result = await PeriodeController.index();
        console.info(result)
    
        expect(result).toBeDefined();
    })

    test.skip('test to get data periode', async () => {
        expect(async () => await PeriodeController.index()).toThrow();
    })
})

test('test to create header periode & detail periode', async () => {
    let result = await PeriodeController.store({
        body: {
            start_year: 2030,
            end_year: 2031,
            detail_periode: [
                {
                    semester_id: 12,
                    start_date: '2030-07-01',
                    end_date: '2030-12-31'
                }, {
                    semester_id: 13,
                    start_date: '2031-01-01',
                    end_date: '2031-06-30'
                }
            ]
        }
    })

    console.info(result)

    expect(result).toBeDefined();
})

test('test to get detail data periode', async () => {
    let result = await PeriodeController.show({
        params: {
            id: 41
        }
    })
    console.info(result)

    expect(result).toBeDefined();
})

test('test to update detail periode', async () => {
    let result = await PeriodeController.updateDetailPeriode({
        body: {
            start_date: '2030-07-01',
            end_date: '2030-12-31'
        },
        params: {
            id: 37
        }
    })

    console.info(result)

    expect(result).toEqual([1])
})

test('test to delete periode', async () => {
    let result = await PeriodeController.delete({
        params: {
            id: 41
        }
    })
    console.info(result)

    expect(result).toBeTruthy();
})

it.only('test listPierode PeriodeController', async () => {
    let findAllMock = jest.spyOn(Periode, 'findAll');

    await PeriodeController.periodeList();

    // console.info(findAllMock.mock.results[0].value.Promise)
    expect(Periode.findAll).toHaveBeenCalled();
});