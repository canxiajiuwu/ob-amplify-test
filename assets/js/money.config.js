export default {
  ug: {
    jackpot: 50000000,
    jackpotStake: 500,
    DailyJackpotLow: 2500000,
    DailyJackpotLowStake: 500,
    DailyJackpotHigh: 5000000,
    DailyJackpotHighStake: 1000,
    NormalMinStake: 200,
    defaultStake: 300,
    NormalMaxWin: 150000000,
    minDeposit: 200,
    maxDeposit: 4000000,
    minWithdraw: 5000,
    maxWithdraw: 4000000,
    maxWithdrawDaily: 1000000, // 2021.8.23老谢让7百万改成1百万
    firstDeposit: [
      {
        depositAmount: 2000,
        deposit: 'UGX 2,000',
        get: `UGX <span>4,000</span>`,
        getUrl: 4000
      },
      {
        depositAmount: 5000,
        deposit: 'UGX 5,000',
        get: `UGX <span>10,000</span>`,
        getUrl: 10000
      },
      {
        depositAmount: 10000,
        deposit: 'UGX 10,000',
        get: `UGX <span>20,000</span>`,
        getUrl: 20000
      },
      {
        depositAmount: 25000,
        deposit: 'UGX 25,000',
        get: `UGX <span>50,000</span>`,
        getUrl: 50000
      }
    ],
    christmas_firstDeposit: [
      {
        depositAmount: 599,
        deposit: 'UGX 599',
        get: 'UGX 200',
        getUrl: 200
      },
      {
        depositAmount: 999,
        deposit: 'UGX 999',
        get: 'UGX 500',
        getUrl: 500
      },
      {
        depositAmount: 1999,
        deposit: 'UGX 1,999',
        get: 'UGX 1,000',
        getUrl: 1000
      },
      {
        depositAmount: 4999,
        deposit: 'UGX 4,999',
        get: 'UGX 2,000',
        getUrl: 2000
      }
    ],
    depositList: [2000, 5000, 10000],
    langList: [],
    FullReduction: [
      {
        amount: '200.00',
        limit: '1000.00',
        odds: '4.20'
      },
      {
        amount: '500.00',
        limit: '3000.00',
        odds: '5.20'
      },
      {
        amount: '2000.00',
        limit: '12000.00',
        odds: '5.20'
      },
      {
        amount: '5000.00',
        limit: '30000.00',
        odds: '7.50'
      },
      {
        amount: '10000.00',
        limit: '80000.00',
        odds: '7.50'
      }
    ],
    freebetBonus: {
      freebet: ['5,000', 200, 500, 300, '1,000'],
      word: ['7,000', '1,000']
    },
    awardsList: [
      {
        name: '9999.50'
      },
      {
        name: '4999.90'
      },
      {
        name: '4999.80'
      },
      {
        name: '4999.80'
      },
      {
        name: '2999.95'
      },
      {
        name: '2999.95'
      },
      {
        name: '2999.90'
      },
      {
        name: '2999.90'
      },
      {
        name: '2999.90'
      }
    ]
  },
  cm: {
    jackpot: 10000000,
    jackpotStake: 100,
    DailyJackpotLow: 500000,
    DailyJackpotLowStake: 100,
    DailyJackpotHigh: 1000000,
    DailyJackpotHighStake: 200,
    NormalMinStake: 50,
    defaultStake: 100,
    NormalMaxWin: 10000000,
    minDeposit: 50,
    maxDeposit: 1000000,
    minWithdraw: 500,
    maxWithdraw: 100000,
    maxWithdrawDaily: 100000, // 2024.01.22根据后台配置调整
    firstDeposit: [
      {
        depositAmount: 500,
        deposit: 'XAF 500',
        get: `XAF <span>1,000</span>`,
        getUrl: 1000
      },
      {
        depositAmount: 1000,
        deposit: 'XAF 1,000',
        get: `XAF <span>2,000</span>`,
        getUrl: 2000
      },
      {
        depositAmount: 10000,
        deposit: 'XAF 10,000',
        get: `XAF <span>20,000</span>`,
        getUrl: 20000
      },
      {
        depositAmount: 50000,
        deposit: 'XAF 50,000',
        get: `XAF <span>100,000</span>`,
        getUrl: 100000
      }
    ],
    christmas_firstDeposit: [
      {
        depositAmount: 99,
        deposit: 'XAF 99',
        get: 'XAF 50',
        getUrl: 50
      },
      {
        depositAmount: 199,
        deposit: 'XAF 199',
        get: 'XAF 100',
        getUrl: 100
      },
      {
        depositAmount: 399,
        deposit: 'XAF 399',
        get: 'XAF 200',
        getUrl: 200
      },
      {
        depositAmount: 999,
        deposit: 'XAF 999',
        get: 'XAF 500',
        getUrl: 500
      }
    ],
    depositList: [100, 200, 500, 1000, 2000, 5000, 10000, 50000],
    langList: [
      { lang: 'en', name: 'English' },
      { lang: 'fr', name: 'Le français' }
    ],
    FullReduction: [
      {
        amount: '50.00',
        limit: '300.00',
        odds: '4.20'
      },
      {
        amount: '100.00',
        limit: '600.00',
        odds: '5.20'
      },
      {
        amount: '500.00',
        limit: '3000.00',
        odds: '5.20'
      },
      {
        amount: '1000.00',
        limit: '6000.00',
        odds: '7.50'
      },
      {
        amount: '10000.00',
        limit: '80000.00',
        odds: '7.50'
      }
    ],
    freebetBonus: {
      freebet: ['1,000', 50, 100, 80],
      word: ['1,400', 200]
    },
    awardsList: [
      {
        name: '999.50'
      },
      {
        name: '499.90'
      },
      {
        name: '499.80'
      },
      {
        name: '499.80'
      },
      {
        name: '299.95'
      },
      {
        name: '299.95'
      },
      {
        name: '299.90'
      },
      {
        name: '299.90'
      },
      {
        name: '299.90'
      }
    ]
  }
}
