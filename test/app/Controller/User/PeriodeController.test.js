const {
    PeriodeController
} = require('../../../../app/Controller/Controller')

let rangeYear = [
    {
        start_year: 2025,
        end_year: 2026,
    }, {
        start_year: 2026,
        end_year: 2027,
    }, {
        start_year: 2027,
        end_year: 2028,
    }, {
        start_year: 2028,
        end_year: 2029,
    }, {
        start_year: 2029,
        end_year: 2030,
    }
]

test.each(rangeYear)('test create header periode', async ({start_year, end_year}) => {
    let result = await PeriodeController.store({
        body: {
            start_year,
            end_year
        }
    })

    console.info(result)

    expect(result).toBeDefined();
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

test.only('test to create header periode & detail periode', async () => {
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
