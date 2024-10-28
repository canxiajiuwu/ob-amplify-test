import cashoutLang from "./cashout_en"
import Lib from "@/assets/js/Lib"

const { mainThemeColor } = Lib.common.jsStyleData
// Charge refund: {cost}
export default {
  unit: "UGX.",
  units: "UGX ",
  areaCode: "+256",
  cashoutLang,
  phoneNumber: "+256 779628479",
  mail: "onebetservice@gmail.com",
  optional: 'Optional',
  reminder: {
    unLogin: "You have not logged in yet, please login",
    removeMatches: "Some matches bettings are unacceptable,delete them.",
    betLimit: "this gift of betting limit is {limit}",
    minimumStake: "Minimum stake should be {limit}",
    money: "Your money is not enough",
    expired: "Some matches have expired",
    accepted: "Bet accepted.Ticket ID:{ticket}",
    refused: "Bet rejected.",
    network:
      "Oops! A network error occured. Your coins haven't been used. Please try again.",
    networkError: "Oops! A network error occured.",
    coins: "Sorry , you have insufficient coins",
    jackpot: "You cannot select more than 2 odds for this match",
    deposit1: "Enter PIN to continue",
    deposit2: "Something went wrong. Please try again later",
    deposit3:
      "Deposit Successful! Deposited: {amount}; Account Balance: {balance}",
    deposit4: "Maximum {amount} UGX",
    deposit5: "Minimum {amount} UGX",
    forget: "The phone number is not registered",
    password:
      "Enter a combination of letters and numbers at least 8 characters long",
    password2: "The passwords do not match twice, please re-enter",
    agent: "Please complete your name, email and mobile phone number.",
    login: "the phone number is invalid",
    withdraw1: "Your money is not enough.",
    withdraw2: "You can withdraw up to UGX {amount} per transaction.",
    withdraw3: "The minimum withdraw amount is UGX {amount} per transaction",
    withdraw5: "You can withdraw at most UGX {amount} per transaction",
    withdraw4:
      "Your money will be added to your mobile money account once your withdrawal is approved.",
    ticketSuccessful: "Ticket cancelled successfully",
    ticketFailed: "Ticket cancellation failed",
    search: "The search content cannot be empty.",
    validate: "Authentication successful",
    giftActivate:
      "You got UGX. {amount} Cash gift which can be used in Betslip.",
    button: {
      ok: "OK"
    },
    claimSuccess:
      "Claimed successfully, the reward has been added to your account.",
    claimFailed: "Claimed Failed",
    pullError:
      "Loading ticket failed! Kindly try to follow other ticket to bet.",
    cashoutBouns:
      "There are bonus (only available today) you didn’t claim yet, are you sure to leave?",
    cashoutRestTimes:
      "Only {num} bets away from claiming a bonus, are you sure to leave?",
    cashoutBounsLeft: "Keep playing",
    cashoutBounsRight: "Insist leaving",
    promoCodeTips: 'Please enter a correct PROMO CODE'
  },
  fourLeague: {
    title: "Win Every Few Minutes"
  },
  pullRefresh: {
    pull: "Pull to Refresh",
    loading: "loading..."
  },
  accountBack: {
    back: "BACK",
    coins: "My Coins: ",
    live: "Live",
    markets: "MARKETS"
  },
  accountGiftList: {
    title1: "Gift View",
    how: "How to Use?",
    title: "Choose Cash Gifts",
    usage: "The usage conditions must be met.",
    noGifts: "You have no available gifts at this time.",
    limit: "On Stakes of ",
    limit1: " or More",
    expires: "Expires on {time}",
    start: "Start at {time}",
    notStart: "Not Start",
    Use: "Use",
    skip: "Skip Using Gifts",
    rules: "Rules",
    odds: 'Only for "Sports" betting；Placed bets with odds > ',
    placed: "Placed bets with odds > ",
    rem: "You recevied <span style='color: #FA4F35'>{number}</span> Gifts valued at {unit} <span style='font-weight: bold;color: #FA4F35'>{money}</span>",
    rem1: "You recevied <span style='color: #FA4F35'>{number}</span> Freebet valued at {unit} <span style='font-weight: bold;color: #FA4F35'>{money}</span>",
    reduce: "Gift is not available during Reduction Promotion",
    freebet: "Condition(s) to unlock FreeBet:",
    betAmount: "Betting amount > {amount} UGX,",
    betCount: "Bet times > {count},",
    depositAmount: "Deposit amount > {amount} UGX",
    unlock: "Unlock"
  },
  accountInboxBox: {
    available: "No message available"
  },
  accountMybetBox: {
    ticket_category: [
      "PreMatch / Live",
      "jackpot",
      "Intimate bet!",
      "Daily Jackpot"
    ],
    ticket_date_type1: "active",
    ticket_date_type2: "today",
    ticket_date_type3: "week",
    ticket_date_type4: "month",
    ticket_date_type5: "all",
    bet_id: "bet id",
    ticket_status1: "Pending Results",
    ticket_status2: "Lose",
    ticket_status3: "Won",
    ticket_status4: "Cancelled By User",
    ticket_status5: "Fail",
    ticket_status6: "Verifying",
    bet_id_title: "BET ID: #"
  },
  accountMybetDetailBox: {
    ticket_status1: "Pending Results",
    ticket_status2: "Lose",
    ticket_status3: "Won",
    ticket_status4: "Cancelled By User",
    ticket_status5: "Fail",
    summary: "Summary",
    actions: "Actions",
    stake: "Your stake",
    type: "Type",
    ticket_type1: "Pre Match",
    ticket_type2: "Live",
    ticket_type3: "Jackpot",
    ticket_type4: "Intimate bet!",
    ticket_type5: "Daily Jackpot",
    odds: "Odds",
    bonus: "Win Bonus",
    payout: "Payout:",
    place: "Bet placed on ",
    actionsButton1: "Share Bet",
    actionsButton2: "bet again",
    actionsButton3: "cancel bet",
    event: "Events",
    result: "FT Result",
    start: "Starts at ",
    pending: "Pending Results",
    pick: "Pick",
    outcome: "Outcome",
    delete: "Delete",
    deleteSuccess: "Delete successful",
    cancel: "Cancel",
    deleteReminder: "Are you sure to delete this ticket?",
    sharePoster: "Share Your Winning Poster",
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    onlyWinners: "Only winners",
    filterList: ["All", "settled", "unsettled"]
  },
  accountTransactionBox: {
    tabs1: "Deposit",
    tabs2: "Withdraw",
    tabs3: "System Bonus",
    refund: "Refund ",
    fee: "Fee ",
    onebet: "From onebet"
  },
  betslipBack: {
    back: "Betslip",
    betslip: "BETSLIP",
    clear: "Clear Betslip",
    keep: "Keep Odds of Betslip?",
    deposit: "Deposit",
    preMatch: "PreMatch / Live",
    intimate: "Intimate Bet! "
  },
  betslipMarketList: {
    introduce:
      "Congrats! Your {length} selections give you a Win bonus of {percent}%. Add one more selection and get a {percentMore}% Win bonus instead.",
    introduce1: "Select 1 more game(Each odd≥1.20), get 3% extra bonus!",
    readMore: "Read more.",
    live: "Live",
    vs: "vs.",
    starts: "Starts ",
    already: "Already Started",
    expired: "Odds for this selection have been deactivated",
    started: "Started",
    expired1: "expired",
    odds: "Odds have been changed from {from} to {to}",
    more: "More Markets",
    clear: "clear betslip",
    reminder: "You have no bets in your betslip <br> Kindly add some bets",
    intimate: "Go to Intimate",
    reminderBoxTitle:
      "You still have <strong style='color: red'>{gift}</strong> CASH GIFT available",
    reminderBet:
      "Bet <s>{limit}</s> and only pay <span style='font-size: 0.6666rem;color:red;font-weight: bold'>{pay}</span>",
    reminderWhether: "whether to use Cash Gifts?",
    place: "Place Bet Now",
    trending: "Trending",
    topLeagues: "Top Leagues",
    country: "Countries",
    az: "A-Z Countries",
    remove: "Removed Locked"
  },
  betslipPlaceBet: {
    offersRewards: "Offers & Rewards",
    stake: "Stake",
    choose: "Choose Cash Gift ",
    available: "available",
    total: "Total Odds",
    balance: "Wallet Balance",
    potential: "Potential winnings",
    bonusList: "Bonus boost",
    payout: "Final Payout",
    place: "Place Bet",
    pay: "About to Pay <span style='font-weight: bold'>{stake}</span>",
    giftIntro:
      "Gift is another kind of CASH that you can use it to reduce your paying amount.",
    reminderBet:
      "Bet {limit} and only pay &nbsp <span style='font-weight: bold;color:red'>{pay}</span> &nbsp by using gift,Odds ≥ {odds}",
    betReminder1: {
      title: "Balance Insufficient",
      msg: "There is not enough balance in your account to place this bet.",
      cancelButtonText: "Later",
      confirmButtonText: "Deposit"
    },
    bet: "Bet",
    odds: "Odds",
    get: "get",
    reduction: "reduction",
    reduced: "reduced",
    pay1: "Pay",
    reduceReminder:
      "Bet {limit} or higher & Odds≥{odds} can get a {amount} reduction"
  },
  betslipRelatedBets: {
    title: "Related bets"
  },
  betslipConfirm: {
    title: "Confirm to Pay",
    choose: "Choose Cash Gift (None)",
    confirm: "Confirm"
  },
  betslipSuccess: {
    betSuccessWorldCup:
      "To share this ticket you'll get a Free Predict of World Cup, <span style='color: #2750CA; text-decoration: underline'>SHARE NOW</span>",
    betSuccessLive: "Bet Submitted",
    betSuccessLiveWord:
      "Your bet is being processed. Kindly check your notifications shortly or sms.",
    betSuccessful: "Bet Successful",
    total: "Total Stake",
    bonusList: "{bonusList}% win bonus",
    payout: "Final Payout",
    bet_id: "Bet ID",
    payment: "Actual Payment Stake",
    continue: "Continue Betting",
    check: "Check Bet History >",
    cash: "Cash Gifts",
    share:
      "Get extra <span style='color: #FA6B52;'>10,000,000 UGX</span> by sharing your bet! <span style='color: #2750CA; text-decoration: underline'>SHARE NOW</span>",
    betRefund:
      "You joined Daily First Bet Refund promotion, <span style='text-decoration:underline;color: red'>Learn more</span>"
  },
  coinsSpin: {
    play: "Play",
    pay: "About to Pay 20 Coins",
    reminder: "Congratulations! You won UGX {prize}.",
    prizes: [
      "Try Again",
      "5000 Cash",
      "10000 Cash",
      "200 Cash Gift",
      "500 Cash Gift",
      "2000 Cash Gift",
      "5000 Cash Gift"
    ],
    more: "Get more coins",
    art1: "1. Up to 50 coins for daily check in.",
    art2: "2.Successfully place bets on sports can get 15 coins daily,<span style='color: #EACE1E;text-decoration: underline'>Bet Now</span>",
    art3: "3.100 coins for first <span style='color: #EACE1E;text-decoration: underline'>download OneBet APP</span>",
    instructions: "Instructions",
    ins1: "It takes 20 coins per spin;<br> If you hit cash or Cash gift, the amount will be credited to your account immediately;<br>The final interpretation belongs to OneBet."
  },
  coinsCenter: {
    title: "Coins Center",
    again: "Try <br> Again",
    winBonus: "Win bonus",
    getMore: "Get More Coins",
    checkIn: "Check in daily",
    app: "First download App",
    real: "Bet on Real Sports",
    virtual: "Bet on Virtual sports",
    jackpot: "Bet on Jackpots",
    li:
      "1.Daily check-in and completion of coin tasks can obtain corresponding coins. <br>\n" +
      "          2.Coins can be used to play and to get bonus. <br>\n" +
      "          3.Participating in the coin tasks for the first time every day to get coins. <br>\n" +
      "          4.The final interpretation belongs to OneBet.",
    checkInNow: "Check in now",
    download: "Download free",
    betNow: "Bet now",
    finish: "Finished"
  },
  commonModal: {
    ok: "OK",
    cancel: "Cancel",
    share: "Share Betslip",
    shareArt: "Share this bet with friends",
    copy: "Copy",
    button: "Load Betslip",
    shareArt1: "Do you have a shared betslip code? Enter it here.",
    shareArt2:
      "The copied code has been pasted, you can load or change it here!",
    shareContent:
      "Follow me to win big on OneBet! Bet with me via: {url}{code}",
    copyFail: "Copy failed",
    copySuccess: "Share link is copied successfully!",
    yes: "YES",
    no: "NO"
  },
  footer: {
    tc: "T&C",
    play: "How to Play",
    about: "About",
    contact: "Privacy Policy",
    service: "Customer Service",
    dedicatedly:
      "OneBet's customer service team will dedicatedly cater all your requests anytime anywhere anyhow!",
    call: "Call Us",
    online: "Online Help",
    reminder:
      "You have to be 25 years and above to bet. Betting is addictive and can be psychologically harmful.<br><br> Onebet is regulated by The National Gaming Board Uganda. Licence GB-54-012 <br><br> www.onebet.ug is a product legally operating under license GB-54-012 of LEV UGANDA LIMITED"
  },
  countryInfo: {
    change: "Change",
    ug: "Uganda",
    cm: "Cameroon"
  },
  footerMenu: {
    total: "Total Odds ",
    Possible: "Possible Payout UGX. ",
    home: "Home",
    live: "Live({number})",
    mybets: "My Bets",
    account: "Account",
    betslip: "Betslip",
    bonus: `<span style='color:${mainThemeColor};font-weight: bold;'>{percent}</span> bonus boost activated.`,
    bonusLess: `Add <span style='color:${mainThemeColor};font-weight: bold;'>{number}</span> bet with 1.20 or more odds to activate a <span style='color:${mainThemeColor};font-weight: bold;'>{percent}</span> Bonus Boost.`,
    bonusMore: `<span style='color:${mainThemeColor};font-weight: bold;'>1</span> more bet with 1.20 or more odds to get a <span style='color:${mainThemeColor};font-weight: bold;'>{percent}</span> Bonus Boost.`,
    boost: "UGX {money} ({percent}) Bonus Boost",
    learn: "Learn more about Bonus Boost"
  },
  betslipExtraBonus: {
    title: "{percent}% Bonus Boost",
    left: "{length} Valid selections",
    right: "{length} of 42 selections",
    desc: "As you add more games to your betslip with an odd of 1.20 or more, your possible winning is multipled upto 600% for 42 games.",
    got: "Got it"
  },
  header: {
    menu: "Menu",
    search: "Search",
    betslip: "Betslip"
  },
  headerDownload: {
    title: "Get OneBet App now!",
    art: "Save on bundles, small & free!",
    button: "Download",
    button1: "Download App"
  },
  homeMenu: {
    freebet: "FreeBet",
    search: "Search Teams, Leagues",
    home: "Home",
    jackpot: "Jackpot",
    result: "Results",
    deposit: "Deposit",
    app: "App",
    live: "Live",
    sport: "Sports",
    Soccer: "Football",
    Basketball: "Basketball",
    Cricket: "Cricket",
    Rugby: "Rugby",
    usa: "USA Football",
    Volleyball: "Volleyball",
    Tennis: "Tennis",
    league: "Top League",
    today: "Today Football",
    Gifts: "Gifts",
    Promotions: "Promotions",
    cash: "Get Cash",
    coins: "Check in",
    other: "other sports",
    other1: "other",
    coinsSpin: "coins Spin"
  },
  jackpotBetslip: {
    Combinations: "Combinations",
    total: "Total Stake",
    clear: "Clear All",
    place: "PLACE BET",
    pay: "About to Pay <span style='font-weight: bold'>{stake}</span>",
    auto: "Auto Pick",
    pick: "Picked {length}/13 Matches",
    accept: "The order has been accepted.TicketId {id}"
  },
  jackpotResult: {
    win: "WINNINGS",
    result: "RESULTS",
    correct: "correct",
    none: "None",
    winners: "winners",
    pending: "Pending Result"
  },
  jackpotHowToPlay: {
    art1: 'How to Play "Jackpot"',
    art2: "The OneBet 13 Jackpot Competition consists of predicting the results of 13 matches, which are selected by OneBet, every week.",
    art3: "To take part and have a chance to win the jackpot, you must get registered and have at least UGX 500 in your account. If you correctly predict all 13 match results, you win the Super Jackpot prize! Consolation prizes are awarded also for correctly predicting 12 or 11 match results.",
    art4: "How to Take Part",
    art5: "Make your selections – On the OneBet 13 Jackpot competition entry page, make your predictions for each one of the listed matches (Home win, Draw, Away win). Stake amount of each combination is UGX 500. You can make more than 1 prediction for one match. This will increase the stake amount by UGX 500 for every each additional combination formed by your selections.",
    art6: 'Check and place bets – Make sure to check all of the selections before you click on the "Place Bet" button. Once submitted, the bets cannot be cancelled, amended or refunded. You may place bets until 17:00 Saturday at Uganda time. The countdown to the competition’s closure time is clearly shown on the competition entry page.',
    art7: 'Check the results – on Monday Afternoon at Uganda Time, all match results and prizes will be published in the "Previous Results" on "Jackpot" page.',
    art8: "Auto Pick",
    art9: "By choosing the “Jackpot Rush” option, a random selection of one prediction per match will be automatically selected with a fixed stake of UGX 500. Further predictions may be added to the random selection. This will increase the cost of the entry by UGX 500 for every additional combination."
  },
  jackpots: {
    title: "JACKPOTS",
    tabs: ["Grand Jackpot", "Daily Jackpots", "Results", "Help"],
    winnings: "Winnings",
    grand: "OneBet Grand Jackpot",
    grandJackpot: "Grand Jackpot",
    dailyJackpots: "Daily Jackpots",
    grand_1: "50,000,000 UGX",
    draw: "Draw No. ",
    expire: "Expire on ",
    daily: "DAILY JACKPOTS",
    only: "Only one step away from a millionaire",
    daily_3: ["Small Bet", "Big Jackpot Amount", "Easy to Win"],
    ended: "Ended on ",
    win: "WIN UPTO UGX ",
    helpTab: ["Grand Jackpot", "Daily Jackpots"],
    helpDaily: [
      {
        title: 'How to Play "Daily Jackpot"',
        text: "The Daily Jackpot Competition consists of GG/NG and 3 Way, predicting the results of 8 - 13 matches, which are selected by OneBet every day. \n\nTo take part and have a chance to win the jackpot, you must get registered and have at least UGX 500 in your account. If you correctly predict all 8 - 13 match results, you win the Super Jackpot prize!"
      },
      {
        title: "How to Take Part",
        text: 'Make your selections – On the Daily Jackpot competition entry page, make your predictions for each one of the listed matches (Home win, Draw, Away win, Yes, No). Stake amount of each combination is UGX 500/UGX1000. \n\nCheck and place bets – Make sure to check all of the selections before you click on the "Place Bet" button. Once submitted, the bets cannot be cancelled, amended or refunded. The countdown to the competition’s closure time is clearly shown on the top banner of Daily Jackpot. \n\nCheck the results – usually daily jackpot ticket will be settled when the last match finished in daily jackpot. All match results and prizes can be checked here: My Bets> Daily Jackpot \n\nSpecial conditions - If one Jackpot match is suspended, postponed or cancelled (void) and not resumed within 24 hours from initial kick off time, all the bets for this Jackpot round are cancelled and stakes are refunded.'
      },
      {
        title: "Auto Pick",
        text: "By choosing the “Jackpot Rush” option, a random selection of one prediction per match will be automatically selected with a fixed stake of UGX 500/UGX 1000. "
      }
    ],
    helpGrand: [
      {
        title: 'How to Play "Jackpot"',
        text: "The Grand Jackpot Competition consists of predicting the results of 13 matches, which are selected by OneBet, every week. \n\nTo take part and have a chance to win the jackpot, you must get registered and have at least UGX 500 in your account. If you correctly predict all 13 match results, you win the Super Jackpot prize! Consolation prizes are awarded also for correctly predicting 12 or 11 match results."
      },
      {
        title: "How to Take Part",
        text: 'Make your selections – On the OneBet 13 Jackpot competition entry page, make your predictions for each one of the listed matches (Home win, Draw, Away win). Stake amount of each combination is UGX 500. You can make more than 1 prediction for one match. This will increase the stake amount by UGX 500 for every each additional combination formed by your selections. \n\nCheck and place bets – Make sure to check all of the selections before you click on the "Place Bet" button. Once submitted, the bets cannot be cancelled, amended or refunded. You may place bets until 17:00 Saturday at Uganda time. The countdown to the competition’s closure time is clearly shown on the competition entry page. \n\nCheck the results – on Monday Afternoon at Uganda Time, all match results and prizes will be published in the "Previous Results" on "Jackpot" page.'
      },
      {
        title: "Auto Pick",
        text: "By choosing the “Jackpot Rush” option, a random selection of one prediction per match will be automatically selected with a fixed stake of UGX 500. Further predictions may be added to the random selection. This will increase the cost of the entry by UGX 500 for every additional combination."
      }
    ]
  },
  jackpotsWeeklyCash: {
    title: "weeklyCash",
    notice: [
      "To reward users for their active participation in Jackpot, OneBet will choose Lucky users to refund CASH",
      "Weekly random choose 20 Lucky users,Each lucky user will get <span style='color:#fe415a'>2,000</span> UGX cash!", // x,xxx 货币单位 cash!
      "1 most lucky user will be chosen, Get <span style='color:#fe415a'>10,000</span> UGX CASH", // x,xxx 货币单位 CASH
      "the more ticket you place in Jackpot, the bigger chance you will be chosen."
    ],
    tips: "Tips",
    betNow: "Bet Now",
    joinUsers: "This week join users:",
    lastWeek: "Last week reward list",
    listHeader: ["Lucky user", "Cash Refund"],
    termsCondition: "Terms and Conditions",
    termsConditionList: [
      "1. Play Grand Jackpot and Daily Jackpot both will be able to be chosen;",
      "2. We'll deliver the cash on Monday;",
      "3. You can check who win in the Last week reward list;",
      "4. The more you play Jackpot, the bigger chance you will be chosen;",
      "5. OneBet reserves the final explanation right."
    ],
    noticeWinning: {
      title: "Congratulations!",
      contentFront: "You won ",
      contentBehind:
        " UGX in last Daily Jakpots and the money has been credited to your OneBet account.",
      ok: "OK"
    },
    monetaryUnit: "UGX"
  },
  liveTabs: {
    Upcoming: "Upcoming",
    All: "All",
    live: "Live In-Play",
    Soccer: "Football",
    Basketball: "Basketball",
    usa: "USA Football",
    Rugby: "Rugby",
    Tennis: "Tennis",
    Cricket: "Cricket",
    Volleyball: "Volleyball"
  },
  loginEntry: {
    balance: "Balance: ",
    Gifts: "Gifts: ",
    register: "Register",
    login: "Login",
    joinNow: "Join Now"
  },
  matchDetailInbox: {
    back: "BACK",
    markets: "MARKETS",
    vs: "VS",
    ended: "Match ended",
    suspended: "Match suspended"
  },
  matchDetailMarket: {
    available: "Betting Not Available",
    match: "Please wait or try a different match"
  },
  matchDetailMenu: {
    favorite: "My Favorite",
    All: "All"
  },
  matchDetailModel: {
    ok: "OK"
  },
  modelLeagues: {
    tag: "Please select a tag",
    sport: "Please select a sport",
    market: "Please select a market"
  },
  preMatchBox: {
    live: "Live",
    market: "Markets"
  },
  featuredMatch: {
    title: "Featured Match",
    more: "More",
    live: "Live",
    bestOdds: "BEST ODDS"
  },
  preMatchFilter: {
    name1: "Today's Highlights",
    name2: "3h",
    name3: "Tomorrow",
    name4: "This Week",
    name5: "Next Week",
    tabs: [
      { id: 0, name: "Today's Highlights" },
      { id: 3, name: "For you" },
      { id: 1, name: "Upcoming" },
      { id: 2, name: "Countries" }
    ],
    upcoming: [
      "All",
      "Today",
      "Tomorrow",
      "Next 48hrs",
      "This Week",
      "Next Week"
    ]
  },
  preMatchSoccerMenu: {
    All: "All Sports"
  },
  rowTabs: {
    Highlights: "Home",
    Jackpots: "Jackpots",
    Daily: "Daily Jackpot",
    Intimate: "Intimate Bet!",
    Soccer: "Football",
    Casino: "Casino",
    Basketball: "Basketball",
    usa: "USA Football",
    Rugby: "Rugby",
    Tennis: "Tennis",
    Cricket: "Cricket",
    Volleyball: "Volleyball",
    new: "NEW",
    coinsSpin: "Coins Spin",
    getCash: "Get Cash",
    popular: "Popular Bets"
  },
  signIn: {
    checkIn: "Check-in",
    checkedIn: "Checked-in",
    getCoins: "Get {coins} Coins",
    week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    title: "Successfully Check in",
    art: "Large amount check in coins on weekends.",
    win: "Win Cash >"
  },
  teamTitle: {
    teams: "TEAMS"
  },
  account: {
    title: "Account Details",
    phoneNumber: "Phone Number",
    balance: "Balance",
    coins: "Coins",
    gift: "Sports Gifts",
    casinoGift: "Casino Gifts",
    betBy: "bet by",
    deposit: "Deposit",
    withdraw: "Withdrawals",
    authority: "My Authority",
    history: "Transaction History",
    casinoHistory: "Casino Bet History",
    inbox: "Inbox",
    call: "Call ",
    help: "7/24 Online Help",
    logout: "LOG OUT",
    problem: "Report a Problem",
    login: "Login to View ",
    nickname: "Modify Nickname",
    nicknameArt:
      "At most 15 charactors and can only modify once every 30 days.",
    nickNameSuccess: "Modify success",
    profile: "Profile Picture",
    nickname1: "Nickname",
    note: "Note",
    note1: "1. Only first time change nickname can get 600 cash gift",
    note2: "2. Only first time set profile picture can get 600 cash gift",
    note3: "3. Profile picture and nickname can modify only once every 30 days",
    completeTitle: "Complete Account Information",
    completeInfo:
      "You can get 600 cash gift after perfecting your nickname and profile picture.",
    setting: "Go to set",
    setTeam: "Set Home Team",
    setLeague: "Set Favorite League",
    card1: "Casino saving card, highest save <span>1197 UGX</span> per month\n",
    card2: "<span>{r_num} UGX</span> wasn't claimed yet in this period\n",
    card3: "<span>{saving_money} UGX</span>  money has been saved\n",
    card4:
      "<span>{saving_money} UGX</span>  money has been saved, renewal now to get another {t_amount} UGX Gifts next period\n",
    check: "Check",
    claim: "Claim",
    Renew: "Renew",
    sportsgifts: "Sports Gifts has been expired",
    casinogifts: "Casino Gifts has been expired",
    partner: 'Apply to be a OneBet Partner'
  },
  accountDeposit: {
    choose: "Choose an amount",
    from: "Deposit from",
    amount: "Amount",
    chargeRem: "The charge fees will be refunded to your ONEBET account.",
    art1: "You must have funds on your {name} mobile money account in order to make a deposit.",
    depositAmount: "Deposit Amount",
    placeholder: "Please enter amount",
    deposit: "Deposit",
    clear: "Clear",
    apply: "Apply",
    refund: "Deposit after refund:",
    mtn: "(MTN)",
    airtel: "(AIRTEL)",
    topUp: "Deposit",
    art2: "Deposit UGX 2000 or more from your mobile money wallet to your OneBet account wallet. All mobile money transaction fees will be charged on your account, then the same amount charged is automatically refunded into your OneBet account wallet on top of the initial deposit",
    art3: "See tables below for more details:",
    minUsers: "MIN USERS",
    airtelUsers: "AIRTEL USERS",
    range: "range",
    transaction: "transaction",
    fees: "fees",
    OneBet: "OneBet",
    charge: "charge",
    cashback: "cashback",
    artNew: "Deposit any amount you will get Yo! Payment charge refund.",
    note: "Note: The pop up is a primary authorization tool however incase the network is having intermittent service they may fail to send the pop up and ask you manually to approve by dialing *165#",
    mtnReminder:
      "We regret to inform you that the Airtel Mobile Money Services are temporarily off. Kindly use MTN number to {method}."
  },
  accountForgetStep1: {
    number: "07XXXXXXXX",
    changePassword: "Change Password",
    art: " Enter your phone number to reset your account.",
    setPassword: "Set Password",
    art1: "Enter your new password",
    enter: "Enter Mobile Number",
    next: "Next",
    login: "Go to Login"
  },
  accountForgetStep2: {
    changePassword: "Change Password",
    art1: "A 4 digit code has been sent to ",
    art2: "Enter the 4 digit code sent to your phone number",
    resend: "Resend Code ",
    reminder1: "Set a strong password to secure your account.",
    confirm: "Confirm password",
    change: "CHANGE PASSWORD"
  },
  accountLogin: {
    title: "Login to OneBet",
    art: "Enter your login details to continue",
    enter: "Enter Mobile Number",
    number: "07XXXXXXXX",
    password: "Password",
    login: "LOGIN",
    forget: "Forgot Password?",
    signUp: "Sign Up"
  },
  accountRegister: {
    mtn: "Only available for Orange number temporarily. <br> MTN is coming soon.",
    number: "07XXXXXXXX",
    title: "Signup to ",
    name: "OneBet",
    get: "Get ",
    gift: " Gift when you register.",
    enter: "Enter Mobile Number",
    password: "Password",
    confirm: "Confirm password",
    create: "CREATE ACCOUNT",
    length: "Length of 8-14 characters.",
    already: "Already have an account?<span>Log In</span>",
    bottom:
      " By registering for an account, you agree to our <br>Terms of Use.",
    isRegistered:
      "This filled number has been registered on OneBet, kindly confirm if you enter a correct phone number.",
    tologin: "Login with this account",
    rnewnum: "Re-enter a new number",
    epc: 'Enter PROMO CODE'
  },
  accountVerify: {
    title: "Verify Mobile Number",
    art: "Activate your account either by entering the 4 digit code!",
    name: "Enter the code sent to your mobile number",
    resend: "Resend Code ",
    button: "Complate Registration"
  },
  accountWithdraw: {
    withdraw: "Withdraw",
    Withdrawal: "Withdrawal to ",
    placeholder: "Enter Withdrawal Amount",
    Balance: "Account Balance ",
    request: "Request Withdraw",
    bottomList: [
      "1.Maximum per transaction is UGX ",
      "2.Maximum Daily Transaction value is UGX ",
      "3.Your withdrawal will be credited soon. If it is not finished in an hour, please contact online service for help.",
      "4.In case of special circumstances, the maximum daily withdrawal amount will become 1,000,000 UGX; you can apply to onebet to restore the normal amount."
    ]
  },
  betslipBonus: {
    back: "BACK",
    win: "Win Bonus",
    art: "Win bonus - Add more selections to your bet slip and get up to 250% extra payout!",
    art1: "Win even BIGGER with our win bonus",
    art3: "To assist your attempts to bet small win BIG, we offer Africa’s biggest win bonus. <br>It’s available on any multibet with 3 selections or more and goes up to 250% for winning bets with 30 legs. <br>Here’s how it works:",
    art4: "Your win bonus is calculated based on your winnings excluding the stake. If a match is cancelled or postponed, it isn’t counted towards your total number of legs",
    legs: "{number} legs {percent}% Bonus"
  },
  jackpot: {
    onebet: "OneBet 13",
    Results: "Previous Results",
    howToPlay: "How to Play",
    draw: "Draw No. ",
    Expires: "Expires on "
  },
  result: {
    sport_name: "Football",
    tournament_name: "All"
  },
  search: {
    search: "Search term ",
    placeholder: "Search Teams,League,Odds",
    history: "Search History",
    popular: "Popular Odds",
    hot: "Hot Searches",
    delete: "Are you sure you want to delete all search history?"
  },
  dataError: {
    loading: "Data failed loading.Please reload.",
    reload: "Reload"
  },
  dataNoResult: {
    inbox: "No message available"
  },
  terms: {
    title: "Terms and Conditions",
    content:
      "<h2>A. INTRODUCTION</h2>" +
      '<p>By using and/or visiting any section (including sub-domains) of the OneBet.ug website or any other websites or applications that we own (the “Website”) and/or registering on the Website, you agree to be bound by (i) these Terms and Conditions; (ii) our Privacy Policy; (iii) the Rules applicable to our sports betting, virtual sports, Jackpot, Casino or other gaming products as further referenced at paragraph 2 below (together the "Terms"), and are deemed to have accepted and understood all the Terms and Rules.</p>' +
      "<p>Please read the Terms carefully and if you do not accept the Terms, do not use the Website. The Terms shall also apply to all telephone betting and betting or gaming via mobile devices including downloadable applications to a mobile device (as if references to your use of the Website were references to your use of our telephone betting and/or mobile devices betting facilities).</p>" +
      "<p>Where you play any game, or place a bet, using the Website, you will be deemed to accept and agree to be bound by, the Rules which apply to the applicable products available on the Website. </p>" +
      "<p>We may need to change the Terms from time to time for a number of reasons (including to comply with applicable laws and regulations, and regulatory requirements). All changes will be published on the Website. The most up-to-date Terms will be available on the Website. If any change is unacceptable to you, you should cease using the Website and/or close your account. If, however, you continue to use the Website after the date on which the changes to the Terms come into effect, you will be deemed to have accepted those changes.</p>" +
      '<p>Reference to "OneBet", "We", "Us" or "Our" is reference to onebet.ug’s corporate entities.</p>' +
      '<p>Reference to "you", "your" or the "customer" is reference to any person using the Website or the services of OneBet and/or any registered customer of OneBet.</p>' +
      '<p>Reference to "Username" is reference to any person who has registered on our website by using Phone number.</p>' +
      "<p>As you are aware, the right to access and/or use the Website (including any or all of the products offered via the Website) may be illegal in certain countries (including, for example, the USA). You are responsible for determining whether you're accessing and/or using the Website in compliance with applicable laws in your jurisdiction and you warrant that gambling is not illegal in the territory where you reside.</p>" +
      "<h2>B. YOUR ONEBET ACCOUNT</h2>" +
      "<h3>Application</h3>" +
      "<p>1.1 All applicants must be over 25 years of age to place a bet or register with OneBet. reserves the right to ask for proof of age from any customer and suspend their account until satisfactory documentation is provided. OneBet takes its responsibilities in respect of under-age gambling very seriously.</p>" +
      "<p>1.2 All information supplied when registering with the site MUST be accurate and complete in all respects. In particular, if using a credit or debit card, the cardholder's name MUST be the same as the name used when registering with the Website. Where this is not the case, the relevant account will be suspended. Where an account is suspended, the relevant customer should contact us. All bets that are placed prior to an account being suspended will stand - win or lose.</p>" +
      "<p>1.3 OneBet may confirm a customer’s address by posting an address verification letter to the customer. All correspondence will be discreet and the envelope will not display any reference to OneBet. When such correspondence is initiated, all offers and withdrawal requests may remain pending until the address has been confirmed as correct.</p>" +
      "<p>1.4 By accepting the Terms and/or registering to use the Website you hereby agree that we shall be entitled to conduct any and all such identification, credit and other verification checks from time to time that we may require and/or are required by applicable laws and regulations and/or by the relevant regulatory authorities for use of the Website and our products generally. You agree to provide all such information as we require in connection with such verification checks. We shall be entitled to suspend or restrict your account in any manner that we may deem in our absolute discretion to be appropriate, until such time as the relevant checks are completed to our satisfaction.</p>" +
      "<p>1.5 As part of the registration process, we may supply your information details to authorised credit reference agencies to confirm your identity. You agree that we may process such information in connection with your registration.</p>" +
      "<p>1.6 Customers may open only one account. Should we identify any customer with more than one account we reserve the right to close or suspend any such customer and OneBet shall also be entitled to withhold and/or retain any and all amounts which would otherwise have been paid or payable to you (including any winnings or bonus payments).</p>" +
      "<p>1.7 Customers must keep their registration and account details up to date. This, and your account information, may be amended in the Personal Account section of the Website. If you require any assistance, please contact us.</p>" +
      "<h3>Account Details</h3>" +
      "<p>2.1 OneBet allows all its customers to choose their own username and password combination. Customers must keep this information secret and confidential as you are responsible for all bets placed on your account and any other activities taking place on your account.</p>" +
      "<p>2.2 Bets will stand if your username and password have been entered correctly (whether or not authorised by you), subject to there being sufficient funds in the account.</p>" +
      "<p>2.3 If, at any time, you feel a third party is aware of your user name and/or password you should change it immediately via the Website. Should you forget part or all of your combination, please contact us.</p>" +
      "<p>2.4 You are responsible for all transactions where your name and account number or name and username are correctly quoted (whether or not authorised by you). If you nominate another person as an authorised user of your account, you shall be responsible for all transactions such person makes using the relevant account details. Should you lose your account details or feel that someone else may have your account details, please contact us.</p>" +
      "<p>2.5 Please note that cardholder details and any other sensitive data should never be sent to us by unencrypted email.</p>" +
      "<p>2.6 The current balance and transaction history of your account may be viewed at any time once you have logged into your account on the Website.</p>" +
      "<h3>Personal Details</h3>" +
      "<p>3.1 Your personal information is processed in accordance with our Privacy Policy.</p>" +
      "<h3>Suspension and Closure</h3>" +
      "<p>4.1 If you want to close your account, please contact us. Any negative balance on your account will fall immediately due and payable to OneBet, and your account will not be closed until the relevant amount owed to OneBet is paid in full.</p>" +
      "<p>4.2 OneBet reserves the right to close or suspend your account at any time and for any reason. Without limiting the preceding sentence, OneBet shall be entitled to close or suspend your account if:</p>" +
      "<p>(a) you become bankrupt;</p>" +
      "<p>(b) OneBet considers that you have used the Website in a fraudulent manner or for illegal and/or unlawful or improper purposes;</p>" +
      "<p>(c) OneBet considers that you have used the Website in an unfair manner or have deliberately cheated or taken unfair advantage of OneBet or any of its customers;</p>" +
      "<p>(d) OneBet is requested to do so by the police, any regulatory authority or court;</p>" +
      "<p>(e) OneBet considers that any of the events referred to in (a) to (c) above may have occurred or are likely to occur;</p>" +
      "<p>4.3 If OneBet closes or suspends your account for any of the reasons referred to in (a) to (e) above, you shall be liable for any and all claims, losses, liabilities, damages, costs and expenses incurred or suffered by OneBet (together “Claims”) arising therefrom and shall indemnify and hold OneBet harmless on demand for such Claims. In the circumstances referred to in (a) to (e) above, OneBet shall also be entitled to withhold and/or retain any and all amounts which would otherwise have been paid or payable to you (including any winnings or bonus payments).</p>" +
      "<h2>C. YOUR FINANCES</h2>" +
      "<h3>Deposits and Bets</h3>" +
      "<p>1.1 You may only bet with the amount of cleared funds held in your account. Accordingly, if you want to place bets or participate in gaming, you must deposit monies into your account. Further details of how to deposit, withdraw and transfer funds can be found at Deposits/Withdrawals.</p>" +
      "<p>1.2 By depositing funds into your account, you direct us and we agree to hold them, along with any winnings, for the sole and specific purpose of using them (i) to place your sporting and gaming stakes; and (ii) settling any fees or charges that you might incur in connection with the use of our services (Purpose). We shall be entitled to suspend or close your account if we reasonably consider or have reason to believe that you are depositing funds without any intention to place sporting and/or gaming stakes. In such circumstances we may also report this to relevant authorities.</p>" +
      "<p>1.3 All funds that we hold for you are held in separate designated customer bank accounts to be used solely for the Purpose and the bank has acknowledged this. We must return the funds to you if they are not used for the Purpose.</p>" +
      "<p>The bank has acknowledged that your funds are held in those accounts solely for the Purpose. The bank has confirmed that it will not mix customers’ funds in those accounts with any other, including our own, and that it has no claim on the funds itself.</p>" +
      "<p>In view of the above, in the event of our insolvency, your funds are protected. The funds would still belong to you and would not fall into the hands of the liquidator.</p>" +
      "<p>1.4 You agree that we shall be entitled to retain any interest which might accrue on monies held in your OneBet account.</p>" +
      "<p>1.5 No credit will be offered by any employee of OneBet, and all bets must be supported by sufficient funds in the customer account. OneBet reserves the right to void any bet which may have inadvertently been accepted when the account did not have sufficient funds to cover the bet. Should funds be credited to a customer's account in error it is the customer's responsibility to inform OneBet without delay. OneBet will recover such funds by account adjustment.</p>" +
      "<p>1.6 Unless otherwise stated, all examples given on the Website are given in UGX. For any transaction which requires a currency exchange, the applicable exchange rate will be the mid-rate as quoted by the Financial Times. The currency options available are listed in Appendix One to these Terms and Conditions and on the Website.</p>" +
      "<p>1.7 Once a currency is selected, funds are deposited, wagered and winnings paid in that currency. In order to transact in a different currency, you must close your existing account by contacting us and open a new account with your preferred currency.</p>" +
      "<p>1.8 OneBet shall be entitled to withhold and/or retain any and all amounts earned or received by you as a result of or in connection with your ‘unauthorised’ use of the Website including activities which are not for an authorised purpose.</p>" +
      "<h3>Withdrawals</h3>" +
      "<p>2.1 Where possible, all withdrawals will be processed to the payment account from which the deposits were made. Withdrawal payments can only be made in the name of and to the registered account holder.</p>" +
      "<p>2.2 Withdrawals can be processed by clicking 'Withdraw' on the Website, subject to there being sufficient funds in your betting account.</p>" +
      "<p>2.3 If the value of a deposit is not played through in full before a withdrawal is requested, OneBet reserves the right to make a charge to the customer’s account to cover all reasonable costs relating to both the deposit and withdrawal. If necessary, the value of the withdrawal requested may be reduced accordingly.</p>" +
      "<h3>Other</h3>" +
      "<p>3.1 If we incur any charge-backs, reversals or other charges in respect of your account, we reserve the right to charge you for the relevant amounts incurred.</p>" +
      "<p>3.2 We may, at any time, set off any positive balance on your account against any amounts owed by you to OneBet or any company within the OneBet group.</p>" +
      "<p>3.3 You are responsible for reporting your winnings and losses to the tax and/or other authorities in your jurisdiction.</p>" +
      "<p>3.4 Internet gambling may be illegal in the jurisdiction in which you are located. If so, you are not authorised to use your payment card to complete the transaction. However, any bets/wagers accepted from such jurisdictions will stand - win or lose.</p>" +
      "<h2>D. BETTING PROCEDURES</h2>" +
      "<h3>Placing Bets</h3>" +
      "<p>1.1 OneBet reserves the right to decline all, or part, of any bet requested at its sole and absolute discretion. All bets are placed at your own risk and discretion.</p>" +
      "<p>1.2 We only accept bets made online (including via mobile device or downloadable applications on a mobile device). Bets are not accepted in any other form (ost, email, fax, etc.) and where received will be invalid and void - win or lose.</p>" +
      "<p>1.3 It is the responsibility of the customer to ensure details of their bets are correct. Once bets have been placed they may not be cancelled or changed by the customer. OneBet reserves the right to cancel any bet at any time.</p>" +
      "<p>1.4 Your funds will be allocated to bets in the order they are placed and will not be available for any other use. OneBet reserves the right to void and/or reverse any transactions made after a bet has been placed involving allocated funds, either at the time or retrospectively.</p>" +
      "<h3>Bet Confirmation</h3>" +
      "<p>2.1 Bets will not be valid if there are insufficient funds in your account.</p>" +
      "<p>2.2 A bet that you request will only be valid once accepted by OneBet’s servers. Each valid bet will receive a unique transaction code. We shall not be liable for the settlement of any bets which are not issued with a unique transaction code. If you are unsure about the validity of a bet, please check your account history, or contact us.</p>" +
      "<p>2.3 Notwithstanding the above, if bets are placed via a credit or debit card they are not valid until we have received payment in full. The bet will be automatically void if we have not received the payment prior to the relevant event commencing.</p>" +
      "<p>2.4 Should a dispute arise, you and OneBet agree that the OneBet transaction log database will be the ultimate authority in such matters.</p>" +
      "<h3>Offers</h3>" +
      "<p>3.1 All customer offers are limited to one per person, family, household address, email address, telephone number, linked MTN/Airtel mobile money, mobile device (e.g. mobile or tablet), application download or shared computer (e.g. public library or workplace).</p>" +
      "<p>3.2 Where any term of the offer or promotion is breached or there is any evidence of a series of bets placed by a customer or group of customers (e.g. where common betting patterns across the same fixture/markets have been identified across accounts), which due to a deposit bonus, enhanced payments, free and risk free bets, or any other promotional offer results in guaranteed customer profits irrespective of the outcome, whether individually or as part of a group, OneBet reserves the right to reclaim the bonus element of such offers and in OneBet’s absolute discretion settle bets at the correct odds, void the free and risk free bets or void any bet funded by the deposit bonus. In addition, OneBet reserves the right to levy an administration charge on the customer up to the value of the deposit bonus, free and risk free bet or additional payment to cover administrative costs. OneBet further reserves the right to ask any customer to provide sufficient documentation for OneBet to be satisfied in its absolute discretion as to the customer’s identity prior to OnetBet crediting any bonus, free and risk free bet or offer to the customer’s account.</p>" +
      "<p>3.3 OneBet reserves the right to withdraw the availability of any offer or all offers to any customer or group of customers at any time and at OneBet’s sole and absolute discretion. Offers only apply to customers who have made an actual/real money deposit with OneBet.</p>" +
      "<p>3.4 OneBet reserves the right to amend the terms of or cancel any customer offer or promotion at any time.</p>" +
      "<h3>Settlement and Payouts</h3>" +
      "<p>4.1 All bets are subject to the Rules for the relevant sport / market / game set out in the How to play section and the provisions set out in Appendix Two to these Terms and Conditions.</p>" +
      "<p>4.2 OneBet reserves the right to suspend a market and/or cancel any bet at any time. When a market is suspended any bets entered will be rejected. OneBet also reserves the right to cease betting on any markets at any time without notice.</p>" +
      '<p>4.3 The " Final Payout " calculation available on the Website is for information purposes only, and all bets will be calculated using the stake/risk at the odds accepted. In multiple bets/parlays with a void selection(s) the " Final Payout" figure is reduced accordingly.</p>' +
      "<p>4.4 Should a customer include a non-runner or void selection in a multiple bet/parlay, the bet will be settled on the remaining selections.</p>" +
      "<p>4.5 Winnings from settled bets are added to the balance of your betting account. Any funds/winnings credited to an account in error are not available for use, and OneBet reserves the right to void any transactions involving such funds and/or withdraw the relevant amount from your account and/or reverse the transaction, either at the time or retrospectively.</p>" +
      "<p>4.6 OneBet reserves the right to withhold payment and to declare bets on an event void if we have evidence that the following has occurred: (i) the integrity of the event has been called into question; (ii) the price(s) or pool has been manipulated; or (iii) match-rigging has taken place. Evidence of the above may be based on the size, volume or pattern of bets placed with OneBet across any or all of our betting channels. Any decision made by OneBet in this regard will be conclusive. If any customer owes any money to OneBet for any reason, we have the right to take that into account before making any payments to that customer.</p>" +
      "<p>4.7 Where there is evidence of a series of bets each containing the same selection(s) having been placed by or for the same individual or syndicate of individuals, OneBet reserves the right to make bets void or withhold payment of returns pending the outcome of any subsequent investigation.</p>" +
      "<p>4.8 For events where there is no official \"off\" declared, the advertised start time of the event will be deemed the 'off'. If for any reason a bet is inadvertently accepted after an event or match has commenced (other than live In-Play betting clearly indicated on the Website), bets will stand providing the final outcome is not known, and that no participant/team has gained any material advantage (e.g. a score, sending off for the other team, etc.) at the time the bet was placed. If the outcome of an event/market is known OneBet reserves the right to void the bet, win or lose. Disputes over times bets are placed will be settled using the transaction log. All times stated on the Website and/or referred to by OneBet staff relate to GMT unless stated otherwise.</p>" +
      "<p>4.9 In-Play Betting - where we have reason to believe that a bet is placed after the outcome of an event is known, or after the selected participant or team has gained a material advantage (e.g. a score, sending off for the other team etc.) we reserve the right to void the bet, win or lose.</p>" +
      "<p>4.10 If for any reason we are unable to validate the outcome of a particular market (e.g. due to loss of live pictures), all bets will be void, unless settlement of bets is already determined.</p>" +
      "<p>4.11 Where a customer gives ambiguous instructions, OneBet reserves the right to split the amount of monies staked between the potential outcomes. Where this is impractical we reserve the right to void the whole of that bet. In any event, the decision of OneBet is final.</p>" +
      "<h2>E. USE OF THE WEBSITE</h2>" +
      "<h3>Information and Content</h3>" +
      "<p>1.1 Information accessed by you on the Website (including results, statistics, sporting data and fixture lists, odds and betting figures) is for your personal use only and the distribution or commercial exploitation of such information is strictly prohibited. No warranty is given as to the uninterrupted provision of such information, its accuracy or as to the results obtained through its use. It should not be relied upon when placing bets, which are made at your own risk and discretion.</p>" +
      "<h3>Your Equipment</h3>" +
      "<p>2.1 Your computer equipment or mobile device and internet connection may affect the performance and/or operation of the Website. OneBet does not guarantee that the Website will operate without faults or errors or that the OneBet services will be provided without interruption. OneBet does not accept any liability for any failures or issues that arise due to your equipment, internet connection or internet or telecommunication service provider (including, for example, if you are unable to place bets or to view or receive certain information in relation to particular events).</p>" +
      "<p>2.2 For customers using OneBet’s mobile sites for the placing of bets, please note that OneBet will not be responsible for any damage to, or loss of data from the mobile device that the software is installed on, and will also not be responsible for any call, data or other charges incurred whilst using the software.</p>" +
      "<h3>Fair Use</h3>" +
      "<p>3.1 The Website and OneBet products may only be used for the purposes of placing bets on events and/or gaming products.</p>" +
      "<p>3.2 You must not use the Website for any purpose which (in OneBet’s opinion) is illegal, defamatory, abusive or obscene, or which OneBet considers discriminatory, fraudulent, dishonest or inappropriate.</p>" +
      "<p>3.3 OneBet will seek criminal and contractual sanctions against any customer involved in fraudulent, dishonest or criminal acts via or in connection with the Website or OneBet's products. OneBet will withhold payment to any customer where any of these are suspected. The customer shall indemnify and shall be liable to pay to OneBet, on demand, all Claims (as defined in paragraph B.4.3 above) arising directly or indirectly from the customer’s fraudulent, dishonest or criminal act.</p>" +
      "<h3>Software and Technology Issues</h3>" +
      "<p>4.1 In order for you to use certain products offered on the Website you may need to download some software (for example, casino games that are made available via a flash player). Also, certain third party product providers may require you to agree to additional terms and conditions governing the use of their products. If you do not accept those third party terms and conditions, do not use the relevant third party software. OneBet does not accept any liability in respect of any third party software.</p>" +
      "<p>4.2 You are only permitted to use any and all software made available to you via the Website for the purpose of using products on the Website and, save to the extent permitted by applicable law, for no other purposes whatsoever.</p>" +
      "<p>4.3 We hereby grant to you a personal, non-exclusive, non-transferable right to use the relevant software, for the sole purpose of using/playing products on the Website (including the online casino), in accordance with the following provisions.</p>" +
      "<p>(a) You are not permitted to: (i) install or load the software onto a server or other networked device or take other steps to make the software available via any form of \"bulletin board\", online service or remote dial-in or network to any other person; (ii) sub-license, assign, rent, lease, loan, transfer or copy (except as expressly provided elsewhere in these terms and conditions) your licence to use the software or make or distribute copies of the software; (iii) enter, access or attempt to enter or access or otherwise bypass OneBet’s security system or interfere in any way (including but not limited to, robots and similar devices) with the relevant products or the Website or attempt to make any changes to the software and/or any features or components thereof; or (iv) copy or translate any user documentation provided 'online' or in electronic format. In addition, and except to the minimum extent permitted by applicable law in relation to computer programs (including, the purposes expressly permitted by Section 296A(1) or Section 50(B)2 of the Copyright Designs and Patents Act 1988), you are not permitted to: (a) translate, reverse engineer, decompile, disassemble, modify, create derivative works based on, or otherwise modify the software; or (b) reverse engineer, decompile, disassemble, modify, adapt, translate, make any attempt to discover the source code of the software or to create derivative works based on the whole or on any part of the software.</p>" +
      '<p>(b) You do not own the software. The software is owned and is the exclusive property of OneBet or a third party software provider company (the "Software Provider"). Any software and accompanying documentation which have been licensed to OneBet are proprietary products of the Software Provider and protected throughout the world by copyright law. Your use of the software does not give you ownership of any intellectual property rights in the software.</p>' +
      '<p>(c) The software is provided "as is" without any warranties, conditions, undertakings or representations, express or implied, statutory or otherwise. OneBet hereby excludes all implied terms, conditions and warranties (including any of merchantability, satisfactory quality and fitness for any particular purpose). OneBet does not warrant that: (i) the software will meet your requirements; (ii) the software will not infringe any third party’s intellectual property rights; (iii) the operation of the software will be error free or uninterrupted; (iv) any defects in the software will be corrected; or (v) the software or the servers are virus-free.</p>' +
      "<p>(d) In the event of communications or system errors occurring in connection with the settlement of accounts or other features or components of the software, neither OneBet nor the Software Provider will have any liability to you or to any third party in respect of such errors. OneBet reserves the right in the event of such errors to remove all relevant products from the Website and take any other action to correct such errors.</p>" +
      "<p>(e) You hereby acknowledge that how you use the software is outside of OneBet’s control. Accordingly, you load and use the software at your own risk. OneBet will not have any liability to you or to any third party in respect of your receipt of and/or use of the software.</p>" +
      "<p>(f) The software may include confidential information which is secret and valuable to the Software Provider and/or OneBet. You are not entitled to use or disclose that confidential information other than strictly in accordance with these Terms and Conditions.</p>" +
      "<p>4.4 While OneBet endeavours to ensure that the Website is available 24 hours a day, OneBet shall not be liable if for any reason the Website is unavailable at any time or for any period. We reserve the right to make changes or corrections to or to alter, suspend or discontinue any aspect of the Website and the content or services or products available through it, including your access to it.</p>" +
      "<p>4.5 You must not misuse the Website by introducing viruses, Trojans, worms, logic bombs or other material which is malicious or technologically harmful. In particular, you must not access without authority, interfere with, damage or disrupt the Website or any part of it; any equipment or network on which the Website is stored; any software used in connection with the provision of the Website; or any equipment, software or website owned or used by a third party. You must not attack our Website via a denial-of-service attack. We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of the Website, software or to your downloading of any material posted on it, or on any website linked to it.</p>" +
      "<h3>Third Party Content</h3>" +
      "<p>5.1 OneBet receives feeds, commentaries and content from a number of suppliers. Certain third party product providers may require you to agree to additional terms and conditions governing the use of their feeds, commentaries and content. If you do not accept the relevant third party terms and conditions, do not use the relevant feeds, commentaries or content.</p>" +
      "<p>5.2 OneBet does not accept any liability in respect of any third party feeds, commentaries and content.</p>" +
      "<p>5.3 OneBet does not allow any employee, anyone else in any way connected to such employee or anyone otherwise connected to a third party service provider (to be determined in OneBet’s absolute discretion) to bet/wager on any market or event where the third party service provider is providing a service to OneBet . OneBet will void any bet/wager where it determines in its absolute discretion that such betting/wagering has taken place.</p>" +
      "<p>5.4 Where the Website contains links to third party websites and resources, these links are provided for your information only. OneBet has no control over the content of these sites or resources, and accepts no liability for them or for any loss or damage that may arise from your use of them. The inclusion of a link to a third party website does not constitute an endorsement of that third party’s website, product or services (if applicable).</p>" +
      "<h3>Errors</h3>" +
      "<p>6.1 OneBet will not be liable for any errors in respect of bets including where: (i) OneBet has incorrectly stated the relevant odds/spreads/handicap/totals amount; (ii) OneBet continues to accept bets on closed or suspended markets; (iii) OneBet incorrectly calculates or pays a settlement amount; or (iv) any error occurs in a random number generator or pay tables included, incorporated or used in any game or product.</p>" +
      "<p>6.2 Incorrect Price - Prior to the start of an event, In-Play or after the event, where an Obvious Error is identified any bets will stand and be settled at the OneBet revised price. Where a revised price is deemed less than 1.01 then bets will be void.</p>" +
      "<p>Where there is sufficient time before the start of an event, OneBet will endeavour to contact the customer and may allow the option of cancelling the bet in our absolute discretion.</p>" +
      "<p>6.3 Incorrect Count/Line/Spread/Handicap/Total - Prior to the start of an event, In-Play or after the event, where an Obvious Error is identified any bets will stand and be settled at the count, line, spread, handicap or total taken at the OneBet revised price except for the following situations:</p>" +
      "<p>i) Where a revised price is deemed less than 1.01 then bets will be void.</p>" +
      "<p>ii) Any bet placed on a count, line, spread, handicap or total where the outcome is already known when the bet was placed will be void.</p>" +
      "<p>6.4 Where there is sufficient time before the start of an event, OneBet will endeavour to contact the customer and may in our absolute discretion allow the option of cancelling the bet.</p>" +
      "<p>6.5 Incorrect Fixture - Where the wrong player or team is quoted within a fixture name all bets will be void. Such determination to be in OneBet’s absolute discretion.</p>" +
      "<p>6.6 Wrong Participant - If a wrong participant is quoted for any match or event, bets placed on that participant will be void; other participants may also be void. Such determination to be in OneBet’s absolute discretion.</p>" +
      "<p>6.7 Late Bets - If for any reason a pre-event bet is inadvertently accepted after a match or event has commenced, bets will be settled as follows:</p>" +
      "<p>i) If the event and market is covered In-Play then bets will stand at the revised price at the time the bet was placed (where a revised price is deemed less than 1.01 then bets will be void), unless the outcome is already known in which case such bets will be void.</p>" +
      "<p>ii) If the event or market is not covered In-Play then the bet will stand as long as the selected participant or team has not gained a material advantage (e.g. a score, sending off for the other team etc.). Where a material advantage has been gained OneBet reserve the right to void the bet, win or lose. Any bet placed where the outcome is already known, including In-Play, will be made void.</p>" +
      "<p>6.9 Obvious Error - Maximum Winnings - The maximum amount which can be won for a bet placed where there is an Obvious Error and a revised price is USD 5,000 or its equivalent, unless the expected winning amount of the original bet was greater than USD 5,000 or its equivalent. In such circumstances, the winning amount of the bet placed at the revised price will equal that of the original bet with any excess stake becoming void.</p>" +
      "<h3>Other</h3>" +
      "<p>7.1 OneBet actively monitors traffic to and from the Website. OneBet reserves the right in its sole discretion to block access where evidence indicative of automated or robotic activity is found.</p>" +
      "<p>7.2 OneBet reserves the right to restrict access to all or certain parts of the Website in respect of certain jurisdictions.</p>" +
      "<p>7.3 OneBet may alter or amend the products offered via the Website at any time and for any reason.</p>" +
      "<p>7.4 From time to time, all or part of the Website may be unavailable for use by you because of our maintenance of the Website and/or alteration or amendment of any of the Website products.</p>" +
      "<h2>F. OUR LIABILITY</h2>" +
      "<p>OneBet does not accept any liability for any damages, liabilities or losses which are deemed or alleged to have arisen out of or in connection with the Website or its content (including delays or interruptions in operation or transmission, loss or corruption of data, communication or lines failure, any person's misuse of the Website or its content or any errors or omissions in content).</p>" +
      "<p>While OneBet endeavours to ensure that the information on the Website is correct, OneBet does not warrant the accuracy or completeness of the information and material on the Website. The Website may contain typographical errors or other inaccuracies, or information that is out of date. OneBet is under no obligation to update such material. The information and material on the Website is provided “as is”, without any conditions, warranties or other terms of any kind. Accordingly, to the maximum extent permitted by law, OneBet provides you with the Website on the basis that OneBet excludes all representations, express or implied warranties, conditions and other terms which but for these terms and conditions might have effect in relation to the Website.</p>" +
      "<p>OneBet’s total aggregate liability to you under or in connection with these Terms and Conditions does not exceed:</p>" +
      "<p>(a) the value of the bets you placed via your account in respect of the relevant bet or product that gave rise to the relevant liability; and</p>" +
      "<p>(b) the amount of applicable monies, where such monies have been misplaced by us.</p>" +
      "<p>(c) USD 5,000 (or its equivalent) in respect of any other liability.</p>" +
      "<p>OneBet shall not be liable, in contract, tort (including negligence) or for breach of statutory duty or in any other way for any of the following (whether incurred directly or indirectly):</p>" +
      "<p>(a) loss of profits;</p>" +
      "<p>(b) loss of business;</p>" +
      "<p>(c) loss of revenue;</p>" +
      "<p>(d) loss of opportunity;</p>" +
      "<p>(e) loss of data;</p>" +
      "<p>(f) loss of goodwill or reputation; or</p>" +
      "<p>(g) any special, indirect or consequential losses,</p>" +
      "<p>Whether or not such losses were within the contemplation of the parties at the date of these terms and conditions.</p>" +
      "<h2>G. OUR INTELLECTUAL PROPERTY RIGHTS</h2>" +
      "<p>The contents of the Website are protected by international copyright laws and other intellectual property rights. The owner of these rights is OneBet, its affiliates or other third party licensors.</p>" +
      "<p>All product and company names and logos mentioned on the Website are the trademarks, service marks or trading names of their respective owners, including OneBet.</p>" +
      "<p>Except to the extent required to use a product for the purpose of placing bets, no part of the Website may be reproduced or stored, modified, copied, republished, uploaded, posted, transmitted or distributed, by any means or in any manner, or included in any other website or in any public or private electronic retrieval system or service including text, graphics, video, messages, code and/or software without our express prior written consent.</p>" +
      '<p>If you make use of a feature that allows you to upload material, information, comments, postings or other content to the Website ("User Content"), then the User Content will be considered to be non-confidential and non-proprietary and OneBet has the right to use, copy, distribute and disclose to third parties any User Content for any purpose. OneBet also has the right to disclose your identity to any third party who is claiming that any User Content posted or uploaded by you to the Website constitutes a violation of their intellectual property rights or of their right to privacy. OneBet has the right to remove, amend or edit any User Content you make on the Website.</p>' +
      "<p>Any commercial use or exploitation of the Website or its content is strictly prohibited.</p>" +
      "<h2>H. OTHER PROVISIONS</h2>" +
      "<p>These Terms and Conditions, the Privacy Policy, the Cookies Policy and any document expressly referred to in them and any guidelines or rules posted on the Website constitute the entire agreement and understanding of the parties and supersede any previous agreement between the parties relating to their subject matter. You acknowledge and agree that in entering into and agreeing to these Terms and Conditions, the Privacy Policy, the Cookies Policy and any document expressly referred to in them and any guidelines or rules posted on the Website you do not rely on, and shall have no remedy in respect of, any statement, representation, warranty, understanding, promise or assurance (whether negligently or innocently made) of any person (whether party to this agreement or not) other than as expressly set out therein. Nothing in this clause shall operate to limit or exclude any liability for fraud or fraudulent misrepresentation.</p>" +
      "<p>In no event will any delay, failure or omission (in whole or in part) in enforcing, exercising or pursuing any right, power, privilege, claim or remedy conferred by or arising under these Terms and Conditions or by law, be deemed to be or construed as a waiver of that or any other right, power, privilege, claim or remedy in respect of the circumstances in question, or operate so as to bar the enforcement of that, or any other right, power, privilege, claim or remedy, in any other instance at any time or times subsequently.</p>" +
      "<p>The rights and remedies provided by these Terms and Conditions are cumulative and (unless otherwise provided in these Terms and Conditions) do not exclude any other rights or remedies available in law.</p>" +
      "<p>If any provision of these Terms and Conditions is found by any court or administrative body of competent jurisdiction to be invalid or unenforceable, such invalidity or unenforceability shall not affect the other provisions of these Terms and Conditions which shall remain in full force and effect.</p>" +
      "<p>You shall execute or cause to be executed all documents and do or cause to be done all further acts and things consistent with the terms of these Terms and Conditions that OneBet may from time to time reasonably require in order to vest in and secure to OneBet the full benefit of rights and benefits to be transferred or granted to OneBet under these Terms and Conditions and for the protection and enforcement of the same and otherwise to give full effect to the terms of these Terms and Conditions.</p>" +
      "<p>Nothing in these Terms and Conditions shall create or be deemed to create a partnership, joint venture or principal-agent relationship between the parties and no party shall have authority to bind any other in any way unless expressly provided otherwise in these Terms and Conditions.</p>" +
      "<p>OneBet shall not be in breach of these Terms and Conditions nor liable for delay in performing, or failure to perform, any of its obligations if such delay or failure results from events, circumstances or causes beyond its reasonable control including (without limitation) any telecommunications network failures, power failures, failures in third party computer hardware or software, fire, lightning, explosion, flood, severe weather, industrial disputes or lock-outs, terrorist activity and acts of government or other competent authorities. In such circumstances the time for performance shall be extended by a period equivalent to the period during which performance of the obligation has been delayed or failed to be performed.</p>" +
      "<p>OneBet may assign, transfer, charge, sub-license or deal in any other manner with these Terms and Conditions, or sub-contract any of its rights and obligations under these Terms and Conditions, to any party including any company within the OneBet group.</p>" +
      "<p>Any notice to be given under these Terms and Conditions must be in writing, in English and may be served by hand delivery, first class post, recorded delivery or registered post or airmail, email or fax to: (a) in the case of OneBet , the address of the relevant OneBet company as set out at the beginning of these Terms and Conditions or as displayed on the Website; and (b) in respect of notices given by OneBet to you, pursuant to the customer registration procedure (including any amendment to those details you have notified to OneBet). Any notice shall be deemed to have been received: (a) if delivered by hand, at the time of delivery; (b) if sent by first class post, recorded delivery or registered post, at 09.30 (GMT) on the second clear day after the date of posting; (c) if sent by pre-paid registered airmail, at 09.30 (GMT) on the fifth clear day after the date of posting; (d) if sent by email, at the time of sending; and (e) if sent by fax, at the time of transmission by the sender.</p>" +
      "<p>The Appendices, the Privacy Policy, and any document expressly referred to in them and any guidelines or rules posted on the Website form an integral part of these Terms and Conditions and shall have effect as if set out in full in the body of these Terms and Conditions. In the event of any inconsistency between the main body of these Terms and Conditions and the Appendices, the Privacy Policy, and/or any document expressly referred to in them and any guidelines or rules posted on the Website, unless stated otherwise, the main body shall prevail.</p>" +
      "<h2>I. COMPLAINTS, DISPUTES, GOVERNING LAW AND JURISDICTION</h2>" +
      "<p>Should there be any claim or dispute arising from a past or current transaction, please contact us. If OneBet is unable to settle the dispute, OneBet will refer the dispute to an arbiter, whose decision will be final (save in respect of any manifest error) subject to full representation given to all parties involved. No dispute regarding any bet/wager will result in litigation, court action or objection to a bookmaker’s licence or permit (including any remote operator’s licence or personal licence) unless OneBet fails to implement the decision given by arbitration.</p>" +
      "<p>Settlement of bets on American sports: In all cases bets on American sports will be settled using statistics and results as provided by each sport's governing body (obvious errors excepted). The relevant governing bodies are as follows, NFL, NCAAF, CFL, NBA, NCAAB, NHL, MLB, NASCAR, MLS and the PGA tour.</p>" +
      "<p>Subject to paragraph B.3.1 above, these Terms and Conditions and any dispute or claim arising out of or in connection with it or its subject matter, whether of a contractual or non-contractual nature, shall be governed by and construed in accordance with the laws of Uganda.</p>" +
      "<p>By accepting these Terms and Conditions and/or placing bets or wagers and/or making use (whether authorised or not) of the facilities offered by OneBet (whether through the Website or otherwise), you irrevocably agree that the courts of Uganda shall have exclusive jurisdiction to settle any dispute which may arise out of or in connection with these Terms and Conditions. Notwithstanding the foregoing, OneBet shall be entitled to bring a claim against a customer in the court of the customer's country of domicile.</p>" +
      "<h2>Appendix</h2>" +
      "<h3>Appendix One</h3>" +
      "<p>CURRENCY OPTIONS AVAILABLE AT OneBet</p>" +
      "<p>Uganda Shillings (UGX)</p>" +
      "<h3>Appendix Two</h3>" +
      "<p>BETTING PROVISIONS</p>" +
      "<p>Sports and Special Event Betting</p>" +
      "<p>We accept bets/wagers for sporting and other special events that are advertised on the Website. All such bets/wagers are subject to the rules applicable to each sport, e.g. Football, Tennis, Boxing, etc. In a match between two teams where the participants are named, if any player is replaced prior to the match starting, all match bets placed prior to the change will be void, win or lose. Our general betting rules will apply to any situations not covered by the special rules.</p>" +
      "<p>The result of a match or event will be determined on the day of its conclusion for betting purposes, subject to confirmation by the relevant sport's governing body. Any subsequent enquiry that may result in an overturned decision will not be recognised by OneBet, and original settlement of bets will stand.</p>" +
      "<p>If the venue for a sporting event is changed, all bets placed based on the original venue will be made void and stakes refunded, unless otherwise stated.</p>" +
      "<p>Minimum bets amount</p>" +
      "<p>The minimum bets amount for each order is the relevant value defined below based on the currency of the user’s account:-UGX 200.</p>" +
      "<p>Maximum Winnings</p>" +
      "<p>The maximum winnings for each bet is the relevant value defined below based on the currency of the user’s account:-UGX 1,000,000.</p>" +
      "<p>Related Contingency Betting</p>" +
      "<p>Multiple bets which combine different selections within the same event are not accepted where the outcome of one affects or is affected by the other.</p>" +
      "<p>For example, in a Football match involving Arsenal and Everton:</p>" +
      "<p>If the odds for Manchester United final payout at home against Tottenham are 2.00 and the correct score odds for Manchester United final payout 1-0 is 8.00, by having the multiple bet of Manchester United final payout and the correct score to be 1-0, a customer would be getting 16.00 for an bet that should have odds of 8.00, as if Manchester United win 1-0 they would automatically have won the match.</p>" +
      "<p>An exception to this rule is where special odds are offered for the combined eventuality, e.g. First Player to Score/Correct Score, known as a Scorecast.</p>" +
      "<p>When the related parts of a bet are resolved at different times but still within the same tournament, the bet will be settled as instructed, with the price of the second or subsequent selection being determined at each individual stage.</p>" +
      "<p>For example, a multiple bet of:</p>" +
      "<p>Nadal final payout the semi-final of Wimbledon; and</p>" +
      "<p>Nadal final payout the Wimbledon tournament outright.</p>" +
      "<p>As the odds of the second selection depends on the outcome of the first, the odds of Nadal winning the tournament at the time the bet was struck cannot be used to calculate the multiple bet, and the correct odds after the initial selection is completed will be attributed instead.</p>" +
      "<p>Multiple bets which combine different selections within different events are also not accepted where the outcome of one affects or is affected by the other.</p>" +
      "<p>For example, a multiple bet selecting:</p>" +
      "<p>Formosa final payout the 2000 Guineas; and</p>" +
      "<p>Formosa final payout the Derby.</p>" +
      "<p>As the odds for Formosa final payout the Derby depend on whether she wins the 2000 Guineas, the odds for her final payout the Derby at the time the bet was struck cannot be used to calculate the multiple bet. A special price to win both races will be quoted instead.</p>" +
      "<p>In the case of all multiples including selections with related outcomes, if a bet is taken inadvertently OneBet reserves the right to void part of or the whole of the bet.</p>" +
      ""
  },
  aboutus: {
    title: "About Us",
    content:
      "<p>Onebet, a world-leading sports betting and online casino platform, enjoys prestige in Africa, with an incorporated virtual slot machine herein one can place their bets on the available mobile application, herewith returns on the application. Onebet apply the high-end technology thereof introducing new ways to bet to multitudes of passionate football fans in accordance with convenience.</p>" +
      "<p>Onebet sustain the company by creating a betting platform where precise technology and appreciative service are incorporated in, hereupon the gaming mobile application gain extensive attention after launching. The mission of Onebet is to provide value-worthy quality casino games to clients in a manner that contributes to the development of the betting culture.</p>" +
      "<p>Onebet herein is a registered company located in Johannesburg, South Africa, under the Registration of OneBet Limited, therefore the final interpretation right of any divergence is deserved by the company. </p>" +
      "<p>You can count on Onebet for advice and solutions:</p>" +
      "<p>Mail:{mail}</p>"
  },
  giftModal: {
    title: "Recevied Cash Gifts! | Unused Cash Gift!",
    art: "Use it in your Betslip",
    view: "View",
    betNow: "Bet Now",
    reminder: "What's cash gift?"
  },
  download: {
    site: "Onebet.ug",
    download: "Download for Free",
    android: "For android 4.03 or Higher",
    art: "Win Big in Your Favorite Sport Game"
  },
  privacy: {
    title1: "Privacy Policy",
    art1: "This Privacy Policy is agreed between you and OneBet’s corporate entities (‘OneBet’, ‘We’, ‘Us’ or ‘Our’ as appropriate). OneBet will only process your personal data for the purposes for which it collected it, namely to provide you with an online betting service.",
    art2: "OneBet does not normally share your data with any other third parties; however, at times we may be required by law or legal process to disclose your personal information. We may also disclose information about you if we believe that disclosure is necessary for the public interest.",
    art3: "You have a right to access your data and request it to be changed or deleted at no cost to yourself. You also have a right to stop receiving marketing information. You may do this by just removing the tick mark in the Account page when you login.",
    art4: "By submitting your information to us and using the Website you confirm your consent to the use of your personal information as set out in this Privacy Policy. If you do not agree with the terms of this Privacy Policy please do not use the Website or otherwise provide us with your personal information.",
    title2: "Introduction",
    art5: "Your privacy is important to OneBet. We follow closely the laws and ensure legality. We endeavour to keep your personal information protected at all times by implementing adequate technical and organizational controls. Please take a moment to read the following policy to learn how we handle your personal information, as your use of our services will indicate your acceptance of its content.",
    title3: "Purpose of Collection",
    art6: "We collect and use your personal information to satisfy legal and regulatory requirements; for historical and statistical purposes; for security and control and for the smooth provision of our services. From time to time, we may also use your personal information to contact you by mail, email, telephone or mobile phone to introduce you to our products or any events, activities, projects, plans, developments, undertakings and special offers taking place, being promoted or supported by OneBet. The data supplied by you upon registering online or thereafter shall be kept by OneBet and will solely by used to determine the legality of registration and activity on the Website. By supplying us with your information you confirm that you do not consider use of your information in accordance with this Privacy Policy to be a breach of your rights under “The Act”. We encourage you to contact us at any time and remind you of your right to opt out at any time from receiving any promotional or marketing materials from us.",
    title4: "Disclosure to Third Parties",
    art7: "As a policy OneBet will not disclose any personal information to anyone other than those employees that need access to your data to provide you with a service. We may, however, be required by law or legal process to disclose your personal information to authorities.",
    title5: "Protection of Information",
    art8: "OneBet safeguards the security of the data you provide us with physical, electronic, and managerial procedures. Please note that we cannot guarantee that any data transmitted over the Internet is completely secure. Accordingly, we encourage you to take every precaution to protect your personal data when you are on the Internet.",
    title6: "Access of Information",
    art9: "The Management of OneBet together with the Fraud Team will have the right to access the submitted personal information relating to the registered players. You always have a right of access the information we have about you. To review and update your personal contact information, simply contact OneBet and you will be provided with information about your personal data we hold. If you prefer you may contact our Customer Service using the contact details available on the site. Additionally, you have the right to have any inaccurate information corrected and where applicable, erased. It is our right to ask you to provide us with a written request for information we hold about you.",
    title7: "Commitment to privacy",
    art10:
      "To make sure your personal information remains confidential; we communicate these privacy guidelines to every OneBet employee. OneBet’s Website may, from time to time, contain links to other sites. OneBet does not share your personal information with those websites and is not responsible for their privacy practices. We encourage you to learn about the privacy policies of any such company. If we are going to use your personal information differently from that stated at the time of collection, we will inform you accordingly. OneBet’s Privacy Policy is subject to change at any time. It is in your interest to review the privacy policy regularly for any changes."
  },
  howToPlayTitle: "How to Play",
  howToPlay: [
    {
      title: "Deposit",
      list: [
        {
          title: "1.How to deposit?",
          art:
            "Step 1. click account " +
            "<br> Step 2. find deposit" +
            "<br> Step 3. enter the amount you want to deposit." +
            "<br> Notice:" +
            "<br> 1. Before depositing, please make sure that you have sufficient funds in your mobile money account." +
            "<br> 2. After you have entered the amount you want to deposit, a transaction request pop up will show on your phone. Then you can enter your PIN code to confirm the transaction." +
            "<br> 3. Incase PIN authorization hasn’t pop up in 30 second, manually dial *165# (MTN) or *185# (Airtel) to authorize."
        },
        {
          title: "2. Why deposit delay exists?",
          art: "Due to the unstable network, your deposit may have some delay to be reflected on your account. But don’t worry it will be credited soon. If your deposit still hasn’t reflected in an hour, you can contact our online service for help."
        },
        {
          title:
            "3. What is minimum and maximum deposit amount per transaction?",
          art:
            "The minimum deposit amount is UGX 200 per transaction." +
            "<br> The maximum deposit amount is UGX 4,000,000 per transaction."
        }
      ]
    },
    {
      title: "Withdraw",
      list: [
        {
          title: "1. How to withdraw?",
          art:
            "Step 1. click account" +
            "<br> Step 2. find withdrawal" +
            "<br> Step 3. enter the amount you want to withdraw " +
            "<br> Step 4. click request withdraw. " +
            "<br> Notice: Before processing withdrawal, you must complete the identity verification. You can choose to enter your identification number or passport number to complete the verification."
        },
        {
          title: "2. Why withdrawal delay exists?",
          art: "Due to the unstable network, your withdraw may have some delay to be reflected on your mobile money account. But don’t worry it will be credited soon."
        },
        {
          title: "3. What is minimum and maximum withdrawal amount per day?",
          art:
            "The minimum withdraw amount is UGX 5000 per transaction." +
            "The maximum withdraw amount is UGX 4,000,000 per transaction." +
            "<br> The Maximum Daily transaction value is UGX 7,000,000."
        }
      ]
    },
    {
      title: "Check in",
      list: [
        {
          title: "1. How to check in?",
          art: "You can find “check in” icon in Menu - top left of header part, click it means you check in successfully."
        },
        {
          title:
            "2. What will happen if I have forgotten to check in yesterday?",
          art: "The coins for daily check in are flexible. If you have forgotten to check in yesterday, you will not get the coins for yesterday. Kindly make sure to check in everyday."
        }
      ]
    },
    {
      title: "Coin Spin",
      list: [
        {
          title: "How to play coin spin?",
          art: "“Coin Spin” can be found at right side of top header. It takes 20 coins for every spin. Coins can only got by daily check in. If you hit cash or Cash gift, the amount will be credited to your balance or gift part immediately."
        }
      ]
    },
    {
      title: "Daily Jackpot",
      list: [
        {
          title: "1. How to play Daily Jackpot?",
          art:
            "Usually, there will be 8-13 selected matches from the official leagues. Make your own predictions on matches or you can choose auto pick options, and then pay for it. When you correct-predicted all matches, you can get UGX 5M prize immediately." +
            "Gifts are not available for Daily Jackpot."
        },
        {
          title:
            "2. What will happen when one of the match has been postponed at Daily Jackpot?",
          art: "On the condition that one of the match has been postponed, the Daily Jackpot will be canceled and all the stake money will be refunded to your balance."
        },
        {
          title: "3. Daily Jackpot settlement",
          art: "The time for Daily Jackpot will be finished within 24 hours after all the match has been completed. "
        }
      ]
    },
    {
      title: "Intimate Bet",
      list: [
        {
          title: "1. How to play Intimate Bet?",
          art:
            "Intimate Bet is a hit betting way at our site. You can choose a match and then tap the market number (usually the number is 8) at the right side of the match. Then the market details will appears. Actually, there are 8 columns about the match, just choose the right one you believe in. You can at least choose one choice." +
            "<br> Gifts are not available for Intimate Bet."
        },
        {
          title:
            "2. What will happen when one of the match has been postponed at Intimate Bet?",
          art: "If the match in Intimate Bet you have bet on was postponed or canceled, the stake money will be refunded to your balance directly."
        },
        {
          title: "3. Intimate Bet settlement",
          art: "The time for Intimate Bet will be finished within 24 hours after all the match has been completed. "
        }
      ]
    },
    {
      title: "Place Bet",
      list: [
        {
          title: "1. How to bet?",
          art: "You can place different kinds of bets: singles, multiples and system (combined) bets. After you have made your choices, you must click betslip to pay for them. The minimum stake is UGX 200 per bet"
        },
        {
          title: "2. Can I cancel a bet?",
          art: "Yes, you can cancel your bet on condition that all the matches you bet haven’t start. Then the stake money will be refunded to your balance in several minutes."
        },
        {
          title: "3. Settlement",
          art: "All match settlements are based on the result at the end of regular time. "
        },
        {
          title: "4. Where can I see my sport bets and results?",
          art:
            "Please Check “My Bets” directly where you can find a list of all bets you have placed." +
            "<br> The results is inside of “all” at “My Bets” part. You can click in the match to see details of your ticket results."
        }
      ]
    },
    {
      title: "Gift",
      list: [
        {
          title: "1. What is gift?",
          art: "Gift can only be used in your betslip and they can be deducted some money from your total payment. Gifts can only be used for sports and live betting, and it's not available in Jackpot, Daily Jackpot and Intimate bet."
        },
        {
          title: "2. How to use gift?",
          art:
            "Before using a gift, please make sure its requirement of stake and odds." +
            "<br> e.g.: " +
            "<br> a 500 cash gift needs a stake of 2000 or more, total odds > 3.2;" +
            "You have to choose a match with odds>3.2 and place a stake of 2000 or more before you can use this gift."
        },
        {
          title: "3. How to get gift?",
          art: "You can get gifts from first deposit promotion, coin spin and other promotions at the site. "
        }
      ]
    }
  ],
  giftHowToUse: {
    button: "Use Gift Now",
    title: "How to Use Gifts?",
    title1: "How to Use Gifts?",
    step1: "Step 1, Confirm Your Gifts’ requirements!",
    account: "Account > Gifts",
    art1:
      "As we can see:" +
      "<br> this gift needs a stake of 1,000 or more; Odds > 3.2; only for Sports betting." +
      "<br> Gift can be used when the start time begin",
    step2: "Step 2, tap USE button to enter home page and choose match to bet",
    step3:
      "Step 3, enter Betslip page to confirm if your stake and Odds reached the requirement of the gift.",
    "art3-1":
      "You can also choose which gift to use if you have 2 or more gifts in your account after arrived the requirement of your gift.",
    "art3-2":
      "Usually, our system will automatically choose the suitable gift for you if the requirement has been reached.",
    title2: "How to get gift?",
    art4: "There are 2 ways to get gifts: ",
    "art4-1":
      "1. One way is play coins spin; you can daily collect coins to play coins spin to get gifts.",
    "art4-2":
      "2. Another is participating OneBet promotions to get gifts; such as invite friends promotion."
  },
  giftGuide: {
    title: "WHAT IS GIFT?",
    art1: "Gift is another kind of CASH that you can use it to reduce your paying amount while the betting amount won't change on OneBet.",
    title1: "HOW TO USE A GIFT?",
    step1:
      "Available Gifts will be displayedayed in your betslip, choose a Gift to continue.",
    step2:
      "Gifts can be used for sports and live betting. Gifts can have usage conditions, please ensure your selected Gift meets the usage conditions.",
    step3:
      "The amount of your selected Gift will be automatically deducted from the order when you place an order.",
    title2: "HOW CAN I GET GIFTS?",
    list2: [
      '<span style="font-weight: bold">1.</span> 100% GET 50,000 CASH GIFT after register successful!',
      '<span style="font-weight: bold">2.</span> Play COIN SPIN to get CASH GIFT. Menu  -->  Get Cash <span style="color: #009A44; font-weight: bold;text-decoration: underline">Get Now</span>',
      '<span style="font-weight: bold">3.</span> OneBet Promotions.  Learn more on PROMOTIONS page'
    ],
    title3: "MOST ASKED QUESTIONS",
    list: [
      {
        title: '1. Do "Gifts" expire?',
        art: "Gifts may have a period during which they are valid and after which the Gifts will expire."
      },
      {
        title: '2. Can I simultaneously use different "Gifts"?',
        art: 'Only 1 "Gift" can be used per transaction.'
      },
      {
        title: '3. Is it possible to cashout a "Gift"?',
        art: "No, it is not possible."
      }
    ]
  },
  agent: {
    title: "Contact with us",
    name: "Name",
    email: "Email",
    mobile: "Mobile",
    contactUs: "Contact us"
  },
  validate: {
    title:
      "You can use the deposit or withdrawal  <br> function by identity verification.",
    firstName: "First Name (As it appears on your ID)",
    surname: "Surname (As it appears on your ID)",
    location: "Location",
    idType: [
      {
        id: 0,
        name: "National Identification Number"
      },
      {
        id: 1,
        name: "Passport"
      }
    ],
    reminder: {
      national: "Please enter your national ID",
      passport: "Please enter your passport number"
    },
    nationality: "Nationality",
    submit: "Submit",
    notNow: "Not Now"
  },
  welcomeBonus: {
    button: "GET NOW"
  },
  firstDeposit: {
    title: "WELCOME BONUS",
    conspicuous:
      "Get up to <span>50,000 UGX</span> free bet gifts on your first deposit",
    time: "Deal ends in",
    deposit: "Deposit",
    get: "Get extra UGX",
    cash: "Cash Gifts",
    buttonReminder: "Deposit {deposit} to get extra {get} cash gifts now.",
    button: "Deposit {money} Now",
    title1: "What happens next?",
    art1: "You will receive a request on your phone to confirm the payment.",
    art2: "After you do this, the funds will appear in your account immediately.",
    title2: "Attention",
    art3: "1.Only MTN & Airtel customers can take part in this promotion.Please make sure there is sufficient balance in your mobile money account.",
    art4: "2.The pop up is a primary authorization tool in case the network is having intermittent service. They may fail to send the pop up then you need manually to approve the transaction.<div style='font-weight: bold'>MTN dial*165#,Airtel dial *185#</div>",
    terms: "Terms and conditions:",
    termsList: [
      "1. Each account can get this Cash Gifts only once.",
      "2. Make a first deposit of UGX 2000 / 5000 / 10000 / 25000, and you get Cash Gifts value of UGX 4000 / 10000 / 20000 / 50000.",
      "3. You will receive the Gift once you make the first deposit.",
      "4. Cash Gift can only be used it in your betslip.",
      "5. OneBet reserves the final right of this Cash Gifts."
    ],
    footer: "©2022 OneBet",
    reminder: {
      unLogin: "You can deposit after logging in or registering.",
      already:
        "You already participated this promotion before, please make a deposit in deposit center. The center makes deposits.",
      success: " Please enter service PIN to authorize the deposit.",
      submit:
        "Submit successfully. Incase PIN authorization hasn’t pop up in 30 second, manually dial *165#(MTN) or *185#(Airtel) to authorize. Otherwise, you have to try again by tapping deposit button."
    },
    login: "Login",
    register: "Register",
    continue: "Continue"
  },
  dailyJackpotIndex: {
    win: "WIN UPTO UGX ",
    marketList: ["GG/NG", "3 WAY"]
  },
  dailyJackpotDetail: {
    back: "Back",
    marketList: ["GG/NG", "3 WAY"],
    expires: "EXPIRES ON ",
    win: "WIN",
    stake: "Stake",
    clear: "Clear All",
    place: "PLACE BET",
    auto: "Auto Pick",
    pick: "Picked {length}/{totalLength} Matches"
  },
  hotTournaments: [
    {
      country_name: "England",
      tournament_name: "Premier League",
      sport_id: 1,
      sport: "Football",
      tournament_id: 17,
      color: "#C4ADF4",
      width: "2.77778rem"
    },
    {
      country_name: "Spain",
      tournament_name: "LaLiga",
      sport_id: 1,
      sport: "Football",
      tournament_id: 8,
      color: "#AEC0EA",
      width: "2.77778rem"
    },
    {
      country_name: "Germany",
      tournament_name: "Bundesliga",
      sport_id: 1,
      sport: "Football",
      tournament_id: 35,
      color: "#F8A6A8",
      width: "2.77778rem"
    },
    {
      country_name: "Italy",
      tournament_name: "Serie A",
      sport_id: 1,
      sport: "Football",
      tournament_id: 23,
      color: "#AEC0EA",
      width: "2.77778rem"
    },
    {
      country_name: "France",
      tournament_name: "Ligue 1",
      sport_id: 1,
      tournament_id: 34,
      color: "#AEC0EA",
      width: "2.77778rem"
    },
    {
      country_name: "International Clubs",
      tournament_name: "UEFA Champions League",
      sport_id: 1,
      sport: "Football",
      tournament_id: 7,
      color: "#AEC0EA",
      width: "3.61111rem"
    },
    {
      country_name: "International Clubs",
      tournament_name: "UEFA Europa League",
      sport_id: 1,
      sport: "Football",
      tournament_id: 679,
      color: "#B4B4B4",
      width: "3.61111rem"
    },
    {
      country_name: "England",
      tournament_name: "Championship",
      sport_id: 1,
      sport: "Football",
      tournament_id: 18,
      color: "#B4B4B4",
      width: "2.77778rem"
    }
  ],
  inviteFriend: {
    title: 'Refer your friends to OneBet!',
    art: 'Both of you can get rewards',
    CITitle: 'Cumulative Income',
    IF: 'Invited Friends',
    fp: 'FreeBet Payout',
    rewards: 'Rewards',
    rftf: 'Refer friend to finish registration on OneBet, both of you can get <span>500 UGX FreeBet</span>',
    rewardsStep: ['Refer Friends', 'Friend completes <br> registration', 'Both get <br> <span>500 UGX FreeBet</span>'],
    sm: 'Social Media',
    rdf: 'Refer Designated Friend',
    rec: 'Recommend',
    rh: 'Rewards History',
    hisarr: ['All', 'To use', 'To unlock', 'Withdrawable', 'Win'],
    up: 'Unlock Payout',
    wmta: 'Withdraw Money to Account',
    ifpn: "Input friend's phone number",
    ufp: 'Unlock FreeBet Payout',
    fa: 'Friend account',
    btn: ['', '', 'Waiting for ticket result', '', 'Unlock', '', 'Withdraw to account', 'Use Now'],
    rules: [
      '1. Reward',
      'Refer friend to finish registration on OneBet, both of you can get 500 UGX Freebet.You can check Account —> My Authority —> FreeBet',
      '2. Freebet',
      [
        'a.Each Freebet get through his promotion will be expired in 7 days;',
        "b.Each settled Freebet payout will be cleared after 7 days if you didn't withdraw the winning to your account balance;",
        "c.Unlock condition: Invitee's betting amount on OneBet need to be reached 10,000 UGX",
        'd.Withdraw: Unlock successfully and apply to withdraw before expired, the Freebet payout money will be credited to your account balance.'
      ],
      '3. To qualify for a Referral Gift, the referred customer must be a new customer and not hold any account at OneBet.',
      '4. OneBet reserves the final right of this Promotion.'
    ],
    title1: "YOU GOT A TOTAL OF <br> UGX <span>{gifts}</span> IN GIFTS",
    viewMore: "VIEW MORE",
    title2: "FOLLOW THE STEPS BELOW <br> TO GET YOUR GIFTS",
    item1:
      " 1. Click on share to share a link which includes your referral code.",
    share: "SHARE",
    item2:
      "2. Gifts will be credited to both participants’ accounts after your friend made bet stakes in a total value of UGX 10,000 or above. Gifts can be viewed by going to ",
    bonus: '"My Gifts"',
    terms: "Terms and Conditions:",
    terms1:
      "1. When a newly referred customer place bets worth UGX 10,000 or more, you can get 10,000 Bonus and your referred friend can get 5000 Bonus;",
    termsA:
      "   A. A newly referred customer at OneBet must place a total amount of Stakes with all Odds of 2.0 or above which account for a total of UGX 10,000 or more (can be placed at different times).",
    termsB: "   B. Only Settled Stakes are valid for this promotion.",
    termsC:
      "   C. A Settled Stake will not be valid if a stake has been fully cashed out. If a stake has been partially cashed out, the Settled Stake will be calculated based on the remaining active stake.",
    Customer: "Customer",
    Invitor: "Invitor",
    Invitee: "Invitee",
    Value: "Value",
    Amount: "Amount",
    requirement: "Stake requirement",
    Games: "Games",
    terms2:
      "2. To qualify for a Referral Gift, the referred customer must be a new customer and not hold any account at OneBet.",
    terms3:
      '3. Once the newly referred customer meets the Stake Conditions (A, B and C) to obtain a "Cash Gift", a "Cash Gift" of UGX 5,000 will automatically be credited to the newly referred customer and a "Cash Gift" of UGX10,000 will be credited to the referrer’s account.',
    terms4:
      "4. Every Gift obtained from this promotion will be valid for 7 days.",
    terms5: "5. OneBet reserves the final right of this Promotion.",
    terms6:
      "6. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts.",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    sms: "SMS",
    myFriends: "My Friends",
    totalInvited: "Total Invited Friends: ",
    totalBonus: "Total Gifts Return: UGX ",
    friend: "Friend",
    Stake: "Stake",
    Settled: "Settled",
    Registration: "Registration",
    continue: "Continue to invite",
    noData1: "You haven't invite any Friends yet. ",
    noData2: " Start invite your Friends now!",
    invite: "Invite Now",
    shareWords:
      "I invite you to join me in Winning Big at OneBet! Register now to get UGX.50,000 cash gifts! High odds, Quick payouts, Free withdrawals, Enjoy the best live betting gaming Via: ",
    reminder:
      "Sorry the PC can't send message, Please use your phone to try again",
    message:
      "I invite you to join me in Winning Big at OneBet! Register now to get UGX.50,000 cash gifts! High odds, Quick payouts, Free withdrawals, Enjoy the best live betting gaming Via: "
  },
  dailyBetRefund: {
    art1: "GET 20% REFUND",
    art2: "if your daily first bet without winning!",
    conditions: "Must Meet Following Conditions:",
    conditions1: "1. Daily first Ticket betting amount ≥ UGX 10,000",
    conditions2: "2. Daily first Ticket Odds ≥ 3.20",
    betNow: "Bet Now",
    valid: "Valid Time: Oct. 31 - Nov. 8",
    terms: "Terms and Conditions",
    termsList: [
      "1. This promotion only available for daily first Ticket; ",
      "2. Jackpot, Daily Jackpot and Intimate Bet’s Ticket are not available for this promotion; ",
      "3. The 20% refund is according to your daily first betting amount ( Gift won't be counted in your betting amount); ",
      "4. The 20% bet amount will refund to your Onebet Balance;",
      "5. This promotion only available for sports ( Prematch, Live ); ",
      "6. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts."
    ]
  },
  liveMatchs: {
    0: [
      {
        name: "My Favorite",
        matchId: "",
        teams: []
      },
      {
        name: "1X2",
        matchId: [1],
        teams: ["1", "X", "2"]
      }
    ],
    1: [
      {
        name: "My Favorite",
        matchId: "",
        teams: []
      },
      {
        name: "For You",
        matchId: [1, 18, 10, 60, 8],
        teams: []
      },
      {
        name: "1X2",
        matchId: [1],
        teams: ["1", "X", "2"]
      },
      {
        name: "Over/Under",
        matchId: [18],
        teams: ["Goals", "Over", "Under"]
      },
      {
        name: "Next Goal",
        matchId: [8],
        teams: ["1", "None", "2"]
      },
      {
        name: "Double chance",
        matchId: [10],
        teams: ["12", "X2", "1X"]
      },
      {
        name: "1st 1X2",
        matchId: [60],
        teams: ["1", "X", "2"]
      },
      {
        name: "2nd 1X2",
        matchId: [83],
        teams: ["1", "X", "2"]
      },
      {
        name: "Home Over/Under",
        matchId: [19],
        teams: ["Goals", "Over", "Under"]
      },
      {
        name: "Away Over/Under",
        matchId: [20],
        teams: ["Goals", "Over", "Under"]
      }
    ],
    dateName: {
      0: "Today",
      1: "Tomorrow"
    }
  },
  popularMatches: [
    {
      name: "1X2",
      matchId: 1,
      teams: ["1", "X", "2"]
    },
    {
      name: "Over/Under",
      matchId: 18,
      teams: ["Goals", "Over", "Under"]
    },
    {
      name: "Double chance",
      matchId: 10,
      teams: ["12", "X2", "1X"]
    },
    {
      name: "Both teams to score",
      matchId: 29,
      teams: ["Yes", "No"] // yes no
    },
    {
      name: "1st half - total",
      matchId: 68,
      teams: ["Goals", "Over", "Under"]
    },
    {
      name: "1st half - 1x2",
      matchId: 60,
      teams: ["1", "X", "2"]
    }
  ],
  storeModal: {
    add: "Added Successful",
    cancel: "Cancellation Successful"
  },
  betSharing: {
    art: "Onebet Bet-Share is a promotion that enables one to share bets placed with friends, families or colleagues. This can be done directly through social media platforms such as WhatsApp, Facebook or SMS. Participants in this promotion stand a chance of winning up to 10,000,000 ugx.",
    rank: "MY RANK",
    play: "PLAY NOW",
    title1: "How dose it work",
    list1: [
      "1. In order to participate in this promotion, visit our website and click on either <span style='font-weight: bold; text-decoration: underline; color: #FFCF00' class='betSharingRegister'>'Register'</span> (if you are a new Onebet customer) or <span style='font-weight: bold; text-decoration: underline; color: #FFCF00' class='betSharingLogin'>'login'</span>.",
      "2. Place a bet and then share by clicking on the share button in your ticket.",
      "3. Recipient of the shared bet should then click on the link and place a bet.",
      "4. This promotion is ONLY applicable to normal Pre-match and live bets.",
      "5. Jackpots bets, Daily Jackpot and Intimate bet are NOT considered in this promotion."
    ],
    title2: "How are the payouts done?",
    list2: [
      "1. The prize will be awarded to the top 10 bet-share participants with the highest number shared bets clicked and bets placed on them in 2 work days after this promotion over.",
      "2. The Leader Board is ultimately subject to settled markets.",
      "3. The leader Board is updated every day at 00:00 AM.",
      "4. The first winner will receive 10,000,000 UGX.",
      "5. The second winner will receive 1,000,000 UGX.",
      "6. The third winner will receive 500,000 UGX (250,000 UGX Cash Gift + 250,000 cash).",
      "7. Winners from 4th to 10th winner will each receive 100,000 UGX (50,000 UGX cash + 50,000 Cash Gift).",
      "8. The money will be directly credited to your Account balance.",
      "9. OneBet reserves the final right of this promotion."
    ],
    title3: "How to share?",
    list3: [
      "Way 1. Choose market and place your bet, Click <span style='font-weight: bold; text-decoration: underline; color: #FFCF00'>SHARE NOW</span> on your bet successful page",
      "Way 2. Go to <span style='font-weight: bold; text-decoration: underline; color: #FFCF00'>'My Bets'</span>, enter your ticket and click <span style='font-weight: bold; text-decoration: underline; color: #FFCF00''>SHARE BET</span> button."
    ]
  },
  betSharingRank: {
    title: "#LeaderBoardofShareBet",
    time: "Ends on Sunday 2020-11-29 11:59:59 PM",
    rank: "My Rank",
    art: "You are only one step away from success <br> Place your bet and share now!",
    art1:
      "Congratulations! You are now in the {rank}th place on today's Leader Board! " +
      "You are only one step away from 10,000,000 UGX. Place your Bet and share now!",
    art2:
      "Congratulations! You are now in the 1st place on today's Leader Board!" +
      "Keep it! The 10,000,000 UGX is almost in your pocket!",
    art3: "You did not participate this promotion yet, place a bet and Share to join now!",
    place: "PLACE BET",
    final: "Your Final Ranking:",
    tableTitle: "Bets Placed From Shared Links",
    terms: "Terms and Conditions",
    winner: "Winners 4 – 10: 50,000 UGX"
  },
  winAdModal: {
    title: "You win ",
    art: "From real sports ticket ID {id}",
    detail: "details"
  },
  freeBet: {
    activity: "Place 2 Bets or more get 1 FreeBet",
    title: "Free Bet",
    free: "Bet For Free",
    predict: "Predict one game once at least, Win Up to",
    money: "500,000,000 UGX",
    name: "FreeBet",
    login: "Login to Bet",
    pick: "Picked {select}/{length} Matches",
    noFree: `No free bet, <span style='color:${mainThemeColor}'>get now!</span>`,
    unlockReminder: `You have some locked Freebet, <span style='color:${mainThemeColor}'>check now!</span>`
  },
  freeBetList: {
    title: "Free Bet View",
    more: "On Matches of {number} or More",
    useNow: "Use Now"
  },
  freeBetPromotion: {
    claim: "Claim FreeBet",
    get: "Get More FreeBet",
    first: "First Bet on App",
    invite:
      "Invite a friend to register and place bets, Check your invited friends in invite promotion",
    upperBtn: "Bet Now",
    lowerBtn: "Invite",
    how: "How to Use FreeBet",
    step: "Step",
    step1: "Tap <FreeBet> in the middle top Menu to enter FreeBet section",
    step2: "Choose the games you want to bet ( at least 6 games )",
    step3: "Confirm and tap PLACE BET to finish",
    title: "How to Use FreeBet?",
    list: [
      "1. Each account can only claim 10,000 UGX FreeBet per day;",
      "2. Each FreeBet will be expired after 3 days from the date you claim it;",
      "3. Each invitee register and bet successfully You will get 1 FreeBet;",
      "4. Each phone number/device can only get 1 Freebet while first bet on App;",
      "5. All the FreeBet you get through this promotion will be credited to your OneBet account directly;",
      "6. The promotion is valid during Feb. 26th,2021 - Mar. 31th, 2021;",
      "7. Intimate Bet will not be counted in this activity;",
      "8. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts."
    ]
  },
  betRefused: {
    title: "Bet Failed",
    detail: "Details",
    reBet: "Re-bet",
    extra:
      "add <span style='color: #E62D0E'>{number}</span> more selections and get a <span style='color: #E62D0E'>{percent}%</span> win bonus."
  },
  betslipBonusNew: {
    bonus: "OneBet Mega Bonus",
    terms: "Terms and Conditions",
    art: "OneBet Mega Bonus offers a great chance to earn a Bonus of up to 600% on Bets at OneBet. This offer applies to returns on all events, all markets of sports and live betting with 3 or more selections with odds 1.2 or higher. If your bet wins, the following bonuses will be added to your returns:",
    termsList: [
      "1. This offer applies to returns on all events, all markets of sports and live betting with 3 or more selections and odds 1.2 or higher.",
      "2. The bonus rate is selected based on the number of selections with odds 1.2 or higher.",
      "3. Bonus Calculation Formula: stake*total odds*bonus rate. For example: If a player chooses 5-Folds, with 5 odds such as 1.54, 2.3, 2, 12, 1.15 and the stake is 100, then the max bonus will be: 100*(1.54*2.3*2*12*1.15)*5% (in this case, only 4 selections reach the odds requirement, the max bonus rate will be calculated based on 4-Folds as the list shown above).",
      "4. The bonus will not apply if a stake has been fully cashed out. If a stake has been partially cashed out, the bonus will be calculated based on the remaining active stake.",
      "5.The bonus part of returns will be added to the customer's account after the customer's orders are settled.",
      "6. In the case of a selection being postponed/void, then the bonus will still apply, but the odds will be calculated as 1.0. For example: If a player chooses 6-Folds, with 6 odds such as 1.54, 2.3, 2, 12, 1.15, 2 and the stake is 100, then the bonus will be: 100*(1.54*2.3*2*12*1.15*2)*10%. When the last selection is void, the bonus will be 100*(1.54*2.3*2*12*1.15*1)*5%. Note that the bonus rate also changes from 10% to 5% because there are only 4 selections with odds higher than 1.2 now.",
      "7. Where any term of the offer or promotion is breached or there is any evidence of a series of bets placed by a customer or group of customers, which due to a deposit bonus, enhanced payments, free bets, risk free bets or any other promotional offer results in guaranteed customer profits irrespective of the outcome, whether individually or as part of a group, OneBet reserves the right to reclaim the bonus element of such offers and in their absolute discretion either settle bets at the correct odds, void the free and risk free bets or void any bet funded by the deposit bonus.",
      "8. OneBet reserves the right to amend, cancel, reclaim or refuse any promotion at its own discretion."
    ]
  },
  betslipApp: {
    gift: "App Exclusive Gift",
    open: "OPEN",
    con: "Congratulations!",
    get: "You get <span style='color: #FEEF00'>{number}</span>  {type}",
    use: "Use",
    giftList: ["Coins", "Cash Gift", "Free Bet"]
  },
  appDownload: {
    btn: "Download for Free",
    app: "APP User Exclusive",
    install:
      "<span style='font-weight: bold;'>INSTALL THE ONEBET APP NOW!</span><br> and get a <span style='color: #FCFF00;font-weight: bold;'>10,000 UGX</span> - Gifts!",
    listOne: ["Fast & Light", "Simple Secure", "Save Bundles"],
    listTwo: ["Casino", "Virtual"]
  },
  downloadActivity: {
    row1: "First time login on APP <br> Get <span style='color: #FD4505'>10,000 Cash Gift</span>",
    row2: "Daily first bet on APP <br> Get up to <span style='color: #FD4505'>100,000 CASH</span>",
    terms: "Terms and conditions",
    list: [
      "1.Gift will be credited to your ONEBET account after login on APP;",
      "2.Each device/IP can only get the 10,000 Cash Gift once;",
      "3.APP exclusive Bonus (Cash/ Cash Gift/Free Bet) will be directly credited to your ONEBET account; every customer can only enjoy the exclusive Bonus once a day;",
      "4.OneBet reserves the final right of this promotion."
    ]
  },
  newbieExclusive: {
    betNow: "Bet Now",
    boxList: [
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>200 Free Bet given away</span><br>Daily first bet successfully",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>20% stake back</span><br>Daily first bet lose",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>10,000 Cash Gift</span><br>Continuous 7 days' Check-in",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>Unexpected Bonus</span><br>Continuous bets weekly",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>Up to 50,000 Cash Gift</span><br>First Deposit"
    ],
    terms: [
      "1.200 free bet only available for successfully daily first bet;",
      "2.The odds of daily first lose bet must eaquals or more than 5.5, then 20% stake will be refund;",
      "3.10,000 Cash Gift only available for 7 consecutive days' check in;",
      "4.The cash Bonus (Cash/Cash Gift/Free Bet) obtained by a week's betting will be directly added to your Onebet account;",
      "5.New users can enjoy the activity within 10 days after registration;",
      "6.Duration: 20/01/2021 ~20/02/2021;",
      "7. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts."
    ]
  },
  jackpotUpdate: {
    title: "To our Valued Customers:",
    art1: "We are carrying out an upgrade to your favorite Jackpot/ Daily Jackpot/ Intimate Bet. While this was meant to make your gaming experience better, we understand that you were inconvenienced by the upgrade, and we sincerely apologize.",
    art2: "To ensure that you continue to get best gaming experience at our site, OneBet will always on the way.",
    art3: "Stay tuned for 21st, February, 2021."
  },
  depositSuccess: {
    title: "Deposit Submitted",
    art1: "You will receive a request on your phone, to confirm the payment. After you do this, the funds will appear in your account immediately.",
    art2: "The pop up is primary authorization tool in case the network is having intermittent service. They may fail to send the pop up then you need manually to approve the transaction. *165#(MTN) or *185#(Airtel)",
    art3: "If you have any problem while depositing, get help via:",
    try: "Try",
    complete: "Complete"
  },
  withdrawSuccess: {
    title: "Withdraw Submitted",
    art1: "Your withdrawal will be credited to your Mobile money immediately",
    back: "Back to Home",
    art2: "If you didn't receive your withdrawal after 1 hour, please get help via:"
  },
  progress: {
    loading: "Loading",
    play: "PLAY GAME",
    free: "FREE MODE"
  },
  bettingIncentives: {
    more: '<span style="color: #FFF16C;font-weight: 700;font-size: 40rem/108;">{times}</span> more bets to activate another Free chance',
    more2: "{times} more bets to activate another Free chance",
    free: 'You have <span style="color: #FFF16C;font-weight: 700;font-size: 40rem/108;">{award}</span> free Play left',
    rules: "RULES",
    rulesItem:
      "1. One customer can participate 3 times a day;<br>2. Place 2 Bets (Odds ≥ 1.50, Stake ≥ 2000) will earn you a free chance.",
    rewards: "REWARDS",
    rewardsItem:
      '<span style="color: #FFF16C;">First prize</span> - Samsung Galaxy S21+ 5G, 6.7 - Phantom Silver<br><span style="color: #FFF16C;">Second prize</span> - 50,000 Airtime<br><span style="color: #FFF16C;">Third prize</span> - 5 G Mbs<br><span style="color: #FFF16C;">Fourth prize</span> - 500 FreeBet<br><span style="color: #FFF16C;">Fifth prize</span> - 500 Cash Gift<br><span style="color: #FFF16C;">Sixth prize</span> - 200 FreeBet<br><span style="color: #FFF16C;">Seventh prize</span> - 200 Cash Gift',
    rewardsDes:
      "If you hit the first prize, please contact our online customer service and leave your Shipping Address as soon as you win the prize so that we can ship the reward to you,The Reward list will be announced every Monday.<br>There are total 3 First prize (Samsung Galaxy S21 x 3) prepared for customers during this promotion and this prize will be canceled after been given out.",
    monday: "The Reward list will be announced every Monday",
    last: "Winning list of last week",
    terms:
      "1. This promotion is available during 2021.03.11 ~ 2021.03.31;<br>2. Jackpots, Intimate Bet!, Daily Jackpot and FreeBet won't be count in this promotion;<br>3. You can immediately join this promotion after bet successful;<br>4. Prematch & Live bet can't be cancelled after bet successfully;<br>5. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts.",
    first: "Samsung Galaxy S21+ 5G, 6.7 - Phantom Silver",
    second: "Airtime",
    third: "Mbs",
    cash: "Cash Gift",
    freebet: "FreeBet",
    small: "200",
    big: "500",
    noChance: "Free chance is exhausted",
    con: "Congratulations! You Won {quantity} {kind} !<br>Already been credited to your {kind} account."
  },
  betReduction: {
    back: "BACK",
    betNow: "BET NOW",
    rule: "Rules of Bet Reduction",
    bet: "Bet <span> (or Higher)</span>",
    odds: "Odds <span> (or Higher)</span>",
    reduction: "Reduction",
    terms: "Terms and Conditions",
    termsList: [
      "1. Every registered user can join this promotion; ",
      "2. Gift is not available in this activity; ",
      "3. Your Placed Bet will not able to be canceled if you participate this promotion;",
      "4. Duration: Mar. 20 ~ Mar.31; ",
      "5. OneBet reserves the right to amend, cancel, reclaim or refuse any promotion at its own discretion."
    ]
  },
  freebetBonus: {
    theme: "My Bonus",
    rules: "Rules",
    claim: "Claim",
    over: "Over",
    activate: "Activate",
    used: "Used",
    use: "Use Now",
    terms:
      "1. Jackpots and Intimate Bet! Is not available for this promotion;<br>2. The number of your bets will be cleared every morning;<br>3. This promotion is available till June 08, 2021;<br>4. All the ticket of this promotion can't be cancelled;<br>5.OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality and the balance of promotions at its own discretion. Promotions and Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts and associated winnings from a given account or any associated accounts.",
    panicBuying: "Start to Claim at PM 6:00 and 1000 FreeBet limited everyday",
    claimAfter: "Claim After",
    bet: "Place {number} Bets to activate. Betting amount >{amount}, Odds >1.50 per Bet",
    appBet:
      "Place {number} Bets on App to activate. Betting amount >{amount}, Odds >1.50 per Bet",
    invite: "Invite friends to register and place a bet to activate",
    claimOver:
      "Sorry, today's FreeBet has been claimed over, come back tomorrow.",
    success: "Congrats!  You received FreeBet successfully."
  },
  topMsgPop: {
    freebetExpired: "Your Unused FreeBet will be expired soon",
    giftExpired: "Your Unused Cash Gifts will be expired soon",
    congrat: "Congrats! You win 7,000 FreeBet today",
    activate:
      "Activate your <span style='color: #FF0000'>7,000</span> FreeBet and use it now!",
    freebetExpiredDate: "Your {amount} FreeBet will expire on {date}",
    giftExpiredDate: "Your {amount} cash gift will expire on {date}"
  },
  gamesHall: {
    back: "Games",
    play: "play"
  },
  casino: {
    modal: {
      title:
        "Do you have fun with this game? Wanna enjoy more flunent game, better experience and more professional platform? Go to OneGame to find out!",
      later: "Maybe Later",
      go: "Go Now"
    }
  },
  onebetLeague: {
    totalPayout: "Total Payout",
    left: "(Left)",
    betStake: "Bet{left} Stake",
    rulesT: "Cashout Rules",
    rules: [
      "In order to let client get the biggest income according to match's current status status, Onebet release a new function -- Cashout, with which clients can cashout their bets before the math finished. This means there is no need to wait the end of your bet game to get bonus or decrease your lose.",
      `<b>Cashout amount range:</b> Onebet will calculate a real-time withdrawal amount range according to the  match status and clients' betting amount.
        <br>-- minimum cashout amount 100 UGX
        <br>-- Cashout function will not be available when your winning amount less than 250 UGX`,
      "<b>Rest amount after Cashout:</b> the rest amount will be toke as your new stake and settled after all the match finished in your ticket.",
      "After generate cashout, the range of cashout will be locked in 10s. Cashout range will be changed according to the match status in your ticket and need to be generated again."
    ],
    sct: "Cashout Request Submitted",
    scs: "Your cashout request is being processed.Please check your tickets shortly.",
    strObj: [
      "Are you sure to cashout {amount} UGX? The rest amount {restNum} UGX will be your new Stake in this ticket after cashout. This operation is irreversible!",
      "Are you sure to cashout all the Stake {amount} UGX in this ticket? This operation is irreversible!"
    ],
    co: "Cahout Offer",
    rc: "Request Cashout",
    coe: "Cashout offer expired",
    remaining: "remaining",
    ra: "Rest Amount",
    batc: "Biggest Amount to Cashout",
    cashout: "cashout",
    toWin: "To Win",
    ended: "ENDED",
    live: "LIVE",
    result: "Results",
    matchDay: "MatchDay",
    start: "Starts in",
    status: ["Lose", "Won", "Pending"],
    standing: "Standing",
    matchDays: "Matchdays",
    season: "Season",
    onebetLeague: "Onebet League",
    matches: "Matches"
  },
  virtualFreebet: {
    title: "FreeBet for OneBet League",
    mybet: "My Bet - Market:",
    pick: "Pick:",
    login: "Login to Place Bet",
    continue: "Continue Bet",
    place: "Place Bet",
    stake: "Stake",
    payout: "Final Payout",
    myFreebets: "My FreeBets",
    view: "View",
    number: "{number} more Bets in OneBet League can get you a FreeBet",
    getNow: "Get Now",
    title1: "How to get FreeBet",
    list1:
      " 1. Every 10 bets in OneBet League will get you a random FreeBet, daily get up to 5 FreeBets. Each FreeBet is random.<br>\n" +
      "        2. Join OneBet Promotion",
    title2: "How to use FreeBet",
    list2:
      "Step1. Choose an outcome you like from current page;<br>\n" +
      "        Step2. OneBet System will automatically choose a FreeBet from your account;<br>\n" +
      "        Step3. Click 'Place Bet' to go on;<br>\n" +
      "        Step4. The match will start and calculate your winning bonus after you confirmed;<br>\n" +
      "        Notice: OneBet will deduct the FreeBet amount and credit the rest winning money to your account\n" +
      "      </div>",
    title3: "Terms and conditions",
    list3:
      "1. The FreeBet you get in OneBet league can only be used in OneBet League; <br>\n" +
      "        2. All matches in OneBet League are virtual games, plesae place your bets carefully;<br>\n" +
      "        3. OneBet reserves the final explanation right.",
    stakeEnough:
      "Sorry, there is no usable FreeBet in your account. Please read 'How to get FreeBet'",
    later: "Later",
    betSuccess:
      "Bet Successfully! The match will start immediately, and your winning money will be credited to your OneBet account directly.",
    con: "Congratulations!",
    conWord:
      "The result is {home_score}:{away_score}, Your winning {win} UGX has been credited to your OneBet account.",
    higher: "Higher winning Odds Markets",
    betslip1: "{number} more bets can get you a FreeBet",
    betslip2:
      "You got one FreeBet,<span style='text-decoration: underline; color: #2750CA'>check now</span>"
  },
  uefaHall: {
    title1: "Champion of EURO2020",
    word: "Predict who will be the Champion of EURO to <br> share 10 million cash bonus!",
    predict: "Predict",
    homeTeam: "Your home team is:",
    predictPeople: "Predicted people",
    title2: "Daily welfare during UEFA EURO2020",
    li1: "1.Get <span style='color: #FDD445;font-weight: bold;'>5% Extra bonus</span> on each winning ticket for prematch/live bet only.",
    li2: "2.Complete below task to get <span style='color: #FDD445;font-weight: bold;'>500 Bonus</span>.",
    checkIn: "Check in",
    checkedIn: "Checked in",
    completed: "Completed",
    playSpin: "Play coin spin",
    playNow: "play now",
    bet: "Place 2 bets on prematch/live",
    li3: "3.Predict UEFA EURO 2020 matches to get Free Gift!",
    choose: "Get Free Gift Now",
    terms: "Terms and  conditions:",
    termsList: [
      "1. Valid time:2021.06.12 - 2021.07.12",
      "2. The 'Champion of UEFA EURO2020' can only be predicted until the Top 16.",
      "3. Please claim the daily welfare bonus before it's been reset everyday",
      "4. Onebet reserves the final explanation right"
    ],
    reminder1:
      "Congrats! You completed the EURO 2020 daily task and get 500 bonus. ",
    reminder2:
      "Congrats! You get UGX 500 GIFT for betting EURO 2020 match successfully. "
  },
  uefaToday: {
    word: "You can FREE choose one team to support, if the support team win you will be reward <span style='color: #FDD445;font-weight: bold;'>500 bonus</span>",
    title: "Want to get more bonus?",
    word1:
      "There are more UEFA EURO2020 matches can be chosen. If the betting amount over <span style='color: #FDD445;font-weight: bold;'>UGX 50,000</span> in any game, You can have a chance to support another team",
    support: "Support",
    confirm: "Confirm",
    bonus: "Bonus don't stop!",
    word2:
      "Get <span style='color: #FDD445;font-weight: bold;'>500 UGX</span> gift by choosing any match of today's UEFA EURO 2020 to place a bet below",
    termsList: [
      "1. Promotion valid: 2021.06.12 - 2021.07.12.",
      "2. Place any match of UEFA ERUO 2020 can get UGX 500 gift.",
      "3. Only the first bet on every UEFA EURO 2020 match can get gift",
      "4. Each Ticket can only get one gift",
      "5. Onebet reserves the final explanation right"
    ],
    success:
      "You already choose {country} as your home team. Waiting for sharing CASH!"
  },
  uefaChampion: {
    title: "Who will be the Champion <br> of UEFA EURO2020",
    final: "Final match time: 11/07 22:00",
    title1:
      "Choose your champion of UEFA EURO2020 <br> to share <span style='color: #FC6F12;font-weight: bold;'>10 million cash bonus</span>",
    confirm: "Confirm",
    termsList: [
      "1. Valid time:2021.06.12 - 2021.07.02;",
      "2. Only one team can be chosen and unchangeable after confirm.",
      "3. Successfully predict people will share the bonus together",
      "4. The bonus will be credited to your game account after 1 work day of the Final",
      "5. Onebet reserves the final explanation right"
    ],
    success1: "Congrats! The UEFA EURO 2020 champion is {name}",
    success2:
      "You got a total of <span style='color: #FDD445;font-weight: bold;'>UGX {amount} cash bonus</span>",
    failed1: "Sorry! The UEFA EURO 2020 champion is {name}",
    failed2:
      "Your home team has been eliminated. Thank you for your participation",
    list: {
      title: "List of Winners",
      word: "There are <span style='color: #FF2626;font-weight: bold;'>3,504</span> people who correctly predict during Champion of Euro 2020 will going to share <span style='color: #FF2626;font-weight: bold;'>10,000,000 UGX</span>! Check out whether you are in the list!",
      modalTitle: "Champion of Euro 2020",
      modalWord: "10,000,000 UGX <br> has been given away! Check it out!",
      button: "Check"
    }
  },
  dailyGiveaway: {
    yesterday: "Yesterday Successfully Withdrawals",
    check: "check",
    taskTitle: "Complete below tasks to share ",
    task1: "Daily check in",
    task2: "Place a bet on real sports",
    task3: "Play OneBet League",
    completed: "completed",
    checkIn: "Check in",
    betNow: "Bet Now",
    playNow: "Play Now",
    terms: "Terms and Conditions",
    termsList: [
      "1. Every customer can only withdraw once a day;",
      "2. Only new customers who didn’t create account on OneBet can help you increase your cash;",
      "3. The money will be cleared if you didn’t reach the withdraw amount in time;",
      "4. The withdraw money will be credited to your OneBet balance directly, you can use it to place bet or withdraw to your MMA account;",
      "5. Your invited people’s betting amount must arrived a half of your first time’s shared amount before you can withdraw;",
      "6. Your invited friends must complete the tasks can increase you withdraw amount;",
      "7. OneBet reserves the final explanation right of this promotion."
    ],
    congra: "Congratulations!",
    finishTask: "You’ve finished all the tasks !",
    share:
      "Split up <span style='font-size: 0.6667rem;font-weight: bold'>5,000,000</span> UGX",
    clipReminder: "Choose a card to get your bonus",
    winModal: {
      title: "Congratulations",
      content:
        'You get <span style="font-size: 0.80556rem;font-weight: bold;color: #FF452C">{amount} </span> <span style="font-size: 0.5556rem;font-weight: bold;color: #FF452C">CASH</span> only <span style="color: #FF452C">{left_amount} UGX</span> away to withdraw!',
      button: "ACCEPT"
    },
    withdraw: {
      title: "MY CASH",
      deal: "Deal ends in",
      word: "You are only {left_amount} UGX away from withdraw {withdraw} UGX share this promotion to your friends to get.",
      share: "SHARE",
      friends: "Friends",
      betting: "Betting",
      increase: "Increase",
      art: "Withdraw Amount:",
      unlock: "Unlock withdrawal eligibility",
      button: "WITHDRAW NOW",
      amount: "1000 - 2000",
      reminder: "Invite more Friends to help you unlock this function",
      inviteModal:
        "You are only <span style='color: #FF452C;font-weight: bold'>{left_amount} UGX</span> away to withdraw! Invite friends to join this event to help you cashout.",
      inviteButton: "INVITE FRIENDS",
      shareTitle: "DAILY SHARE 5,000,000 UGX",
      shareContent: "Invite your friends to share 5,000,000 UGX"
    },
    canWithdraw: {
      title: "Congratulations!",
      word: "You are able to withdraw",
      withdraw: "WITHDRAW",
      art: "The money will be credited to your OneBet account directly You can use it place a bet or withdraw to your MMA."
    },
    successWithdraw: "Successfully Withdraw!",
    successReminder:
      "You already shared today’s 5,000,000 UGX, please come back tomorrow"
  },
  giveawayShare: {
    title: "MY WITHDRAW AMOUNT",
    share: "SHARE",
    art: 'Invite your friends to join OneBet and <span style="color: #FFEA00;font-weight: bold">share 5,000,000 UGX</span> too!'
  },
  giveawayInvite: {
    shareTitle: "Daily 5,000,000 UGX giveaway | OneBet\n",
    shareContent:
      "To complete only 3 tasks can share 5,000,000 UGX on OneBet! Join to get the money now!\n",
    title: "DAILY SHARE",
    join: "JOIN NOW",
    item1: {
      amount: "5,000.00",
      name: "Alex",
      word: "It really works! I got my cash!",
      content1:
        "<span style='color: #333333;font-weight: bold'>Joan:</span>Thanks for my help :)",
      content2:
        "<span style='color: #333333;font-weight: bold'>Alex</span> replied <span style='color: #333333;font-weight: bold'>Joan</span> Yeah, I would like to help you back."
    },
    item2: {
      amount: "10,000.00",
      name: "Michael",
      word: "I withdrew 10,000 UGX successfully!",
      content1:
        "<span style='color: #333333;font-weight: bold'>Kadhafi:</span>Wow! Me only withdrew 3000 UGX today",
      content2:
        "<span style='color: #333333;font-weight: bold'>Jayson:</span>Let me try tomorrow :)",
      content3:
        "<span style='color: #333333;font-weight: bold'>Hillary:</span>Is this true? I’m new on OneBet",
      content4:
        "<span style='color: #333333;font-weight: bold'>Michael:</span> replied <span style='color: #333333;font-weight: bold'>Hillary:</span>100 percent true! At least I withdrew it successfully ☺"
    },
    item3: {
      amount: "5,000.00",
      name: "Andasio",
      word: "2 mins easily cash out 5000 UGX",
      content1:
        "<span style='color: #333333;font-weight: bold'>James:</span>hahah, me too. I love OneBet!",
      content2:
        "<span style='color: #333333;font-weight: bold'>Tony:</span>how??? Help me!"
    },
    item4: {
      amount: "3,000.00",
      name: "Johnson",
      word: "Not lucky today, I invite 6 people only 2 helped me. And I only get UGX 3000.",
      content1:
        "<span style='color: #333333;font-weight: bold'>Rashida:</span>Money is not easy to earn, isn’t it?",
      content2:
        "<span style='color: #333333;font-weight: bold'>Gérard:</span>Share on Facebook is much easier to get help, people helped me all from FB.",
      content3:
        "<span style='color: #333333;font-weight: bold'>Morris:</span>You can try Watsapp where many people would like to try"
    }
  },
  makka: {
    word: "Bet UGX 1,000 stands a chance to be today's winner, good luck!",
    prizes: "Prizes:",
    art1: "— Daily 1000 winners of UGX 15,000 each.",
    art2: "— Grand winner of UGX 500,000/= on 9th August 2021.",
    open: "Open to all new and existing customers:",
    li1: "1.Customers will be required to place a cash bet on at least one or more OneBet League(OneBet Virtual Games) matches using a stake of 1,000/= or more. They will automatically enter into the draw to win daily prizes. Continus betting 7 days in OneBet League will automatically enter into the draw to win Grand prizes.",
    li2: "2.OneBet will credit the winning money to your OneBet balance directly and inform you via SMS message",
    li3: "3.Winners are chosen randomly by OneBet League promotion systems at 8:00 am next day.",
    footer: "Promo runs from 30th July 2021 to 9th August 2021.",
    footer1: "General OneBet terms and conditions apply.",
    button: "Play Now"
  },
  freebetHow: {
    title: "How to use FreeBet?",
    art: "There are two places where you can check your FreeBet: ",
    art1: "1. Account > FreeBet",
    "art1-1":
      "Here you can see your FreeBet’s details: " +
      "<br> Expiration date and how many matches you need to bet." +
      "<br> Some FreeBet need to reach pointed conditions to unlock\n" +
      "<br> FreeBet can be used when the start time begin\n",
    art2: "2. Home page > FreeBet Column ",
    "art2-1": "You can use your FreeBet to bet free here",
    title1: "How to get FreeBet?",
    art3: "Same as gift, there are 2 ways to get FreeBet: Coins spin and OneBet Promotions."
  },
  mybetCasinoBanner: {
    // pengding
    1: {
      up: "Still waiting for the results?",
      down: "Give a shot on our casino games first!"
    },
    // Lose
    2: {
      up: "Seem not very luck today?",
      down: "Why not try our casino games first!"
    },
    // won
    3: {
      up: "Good luck today? ",
      down: "Try our casino games!"
    }
  },
  cardPacks: {
    title: "Congrats!",
    art: "You get today's reward card pack(s)",
    button: "Open Now"
  },
  christmas: {
    back: "Onebet Christmas Carnival",
    title1: "Daily First Deposit Bonus",
    word1:
      "Get <span style='color: #FFEF3D;font-size: 0.55556rem;'>50%</span> cash gift refund, Only for daily first deposit",
    deposit: "Deposit Now",
    title2: "Bet to Get Christmas Gift",
    word2: "The higher betting amount you have, the higher bonus you get!\n",
    button2: "Spin to Win",
    title3: "Christmas Bonus for Jackpot",
    word3:
      "Get an extra <span style='color: #FFEF3D;font-size: 0.55556rem;'>5%</span> <br> Christmas Bonus",
    button3: "Bet Now",
    art3: "This extra 5% bonus only available for people who placed on Jackpot during this promotion.",
    title4: "OneBet League Goes Wild",
    learnMore: "Play Now ❯",
    word4:
      "Every 10 bets in OneBet League can get you a free chance to play coins spin, one can only get 5 free spin a day.",
    termsTitle: "Terms and Conditions",
    termsList: [
      "1. All the bonus you win will be credited to your OneBet account;",
      "2. Gift and Freebet both have a expiration date, don’t forget use them before invalid;",
      "3. Only settled market’s bet amount will be calculated to this promotion;",
      "4. Christmas Jackpot Bonus will be credited to your account as soon as all Jackpot matches been settled;",
      "5. OneBet reserves all the rights!"
    ],
    coinsReminder:
      "You get a Free Chance to play coins spin.You can spin now or convert it to coins.",
    spin: "Spin Now",
    convert: "Convert to 20 coins",
    shareBet: "Share your ticket,up to 50% discount on betting amount!",
    ChristmasSale: "Christmas Sale",
    completeInfo:
      "Complete avatar and nickname to wear your own Christmas Decoration and get <span class='money'>3,000 UGX</span> FreeBet!"
  },
  christmas_preheat: {
    countdown: "Christmas Carnival Countdown",
    title1: "How to join",
    word1_1: "Bet any match during this promotions;",
    word1_2: "Betting amount/ betting times reach the demands;",
    word1_3: "You can get gifts, Freebet and Cash.",
    word1:
      "Don’t miss the chance to get a Christmas gift at OneBet.\n" +
      "Now invite friends to join will get you a mysterious gift!",
    button: "Invite Friends",
    title2: "Christmas Bonus",
    word2:
      "Free Spin to <br> Win up to <br><span style='color: #FFEF3D;font-size: 0.55556rem;'>UGX 1,000,000</span>",
    word3:
      "<span style='color: #8B201C;font-size: 0.55556rem;'>50%</span>  cash gift  refund, Only for  daily first deposit",
    word4:
      "Get an extra <span style='color: #FFEF3D;font-size: 0.55556rem;'>5%</span>  Christmas Bonus",
    invite:
      "I invite you to join me in OneBet - lightest and fastest sports betting platform to get your OneBet Christmas gift! 20,000 Christmas gifts are waiting for you! Get now:"
  },
  christmas_spin: {
    betting: "Your Betting Amount",
    increase: "Increase your betting amount by invite people to join OneBet",
    invite: "Invite Friends now",
    line: [1000, 8000, 20000],
    termsTitle: "Rules",
    termsList: [
      "1. There are total 3 spin wheels here, you must unlock them with the demand betting amount;",
      "UGX 1,000 ≤ The first level ≤ UGX 7,999,",
      "UGX 8,000 ≤ The second level ≤ UGX 19,999,",
      "The third level ≥ UGX 20,000.",
      "2. Each user can play this Spin Wheel 3 times a day during this promotion, only if his betting amount reached the demand;",
      "3. The Spin Wheel will automatically upgrade to the next level when your betting amount reached the demand;",
      "4. You will get 20% of your invite people’s betting amount to add your own betting amount;",
      "5. Only new user who didn’t create account on OneBet before can increase your betting amount;",
      "6. Betting amount will be cleared at 24:00 o’clock every day;",
      "7. OneBet reserves the final explanation right."
    ],
    noTimes:
      "Your bet amount doesn’t reach the required demands. Increase your betting amount first.",
    noTimesLeft: "Increase Now",
    hasTimes:
      "Congratulations! You won a Free Spin! Press PLAY to win your Christmas Gift.",
    prizeTitle: "Congratulations!",
    prize: "You win {amount} {type}",
    noWin: "NO WIN. Good luck next time.",
    updateTitle: "Spin Wheel Upgraded",
    update:
      "Level {level} Spin Wheel unlocked! More gifts and higher Cash are waiting for you.",
    complete:
      "Sorry, your 3 Free Spin has been used up today! Kindly come back tomorrow!"
  },
  christmas_first_deposit: {
    dailyDeposit:
      "You already get today’s first deposit refund. Go to deposit page to continue top up.",
    termsList: [
      "1. Each Customer can get gift refund on daily first deposit;",
      "2. Only deposit the 4 specified amount above can get gift refund;",
      "3. OneBet reserves all the rights."
    ]
  },
  sharePoster: {
    title: "Winning Poster",
    via: "Share your winning poster via",
    gallery: "Gallery",
    fail: "Failed to generate poster, please try again.",
    cancel: "Cancel",
    cut: "Cut",
    next: "Next"
  },
  weekly: {
    Ends: "ENDS IN"
  },
  epl_terms: {
    title1: "Prediction",
    art1: "One can unlock the predict qualification only after place a bet on EPL games;",
    art2: "One can unlock the modify qualification only after his/her inviting friends place a bet on EPL games;",
    art3: "The reward will be directly credited to your OneBet account after the Matchday;",
    art4: "One can only predict once in one Matchday and can modify the prediction by inviting friends to unlock the qualification;",
    art5: "Invitees must place bet on EPL games to unlock inviters’ predict qualification;",
    art6: "Bet EPL Live matches will Multiply your winning up to 1.2 times;",
    art7: "Only predict 8, 9, 10 matches can get reward in match prediction;",
    art8: "Correctly predict 8 matches: upto 1/9 cash pool amount;",
    art9: "Correctly predict 9 matches: upto 2/9 cash pool amount;",
    art10: "Correctly Predict 10 matches: upto 1/3 cash pool amount;",
    art11:
      "If multiple people predict 8, 9, and 10 games at the same time, then they will split the corresponding prize money for 8, 9, and 10 equally.",
    art12:
      "e.g.: There 4 people predict 10 matches correctly in round 32, those 4 players will split 1/3 cash of the total cash pool.",
    art13:
      "If there are no one Predict correctly 10 matches in this round, the reward money of 10 matches will be added to the cash pool for the next round.",
    art14:
      "All the predictions in simple prediction must be right stands you a chance to share the 1/3 cash pool",
    title2: "Cash Pool",
    art16: "Match Prediction takes 2/3 of the Cash Pool;",
    art17: "Simple Prediction takes 1/3 of the Cash Pool;",
    art18:
      "Undivided bonuses will be accumulated to the next season's Cash Pool.",
    title3: "General",
    art20: "This offer cannot be used in conjunction with any other offers.",
    art21:
      "We reserve the right to void scores, or not pay out a prize, where all or part of the score results from any obvious error, mistake or technical fault (including incorrect game payouts) whether caused by a machine or human error in respect of any of the participating games.",
    art22:
      "We further reserve the right to void scores, or not pay out a prize where, in our opinion, all or part of the score results from cheating or collusion with other players.",
    art23:
      "We reserve the right to withdraw and/or change these promotional terms and conditions at our sole discretion, and any decision with regard to the winnings offered.",
    art24:
      "We may, at our sole discretion, exclude any customer from receiving selected promotions and any other promotions and offers.",
    art25: "General T&Cs apply."
  },
  epl: {
    season: "Season 2021-22",
    matchday: "Matchday {round} of 38",
    my: "My Predictions",
    winners: "Prediction Winners",
    match: "Match Prediction",
    simple: "Simple Prediction",
    submit: "Submit",
    note: "Note:",
    note1: "Place at least one bet on EPL games to unlock qualifications",
    terms:
      "By participating in this Promotion you are voluntarily abiding by the <span style='color: #53FE8B;'>Terms & Conditions</span>",
    modify: "Modify Prediction",
    modification: "Modifications",
    unlock: "How to unlock modify rights",
    step1: "Invite Friends",
    step2: "Friends Bet EPL",
    step3: "Unlock Modification",
    unlockArt:
      "Unlock your modify qualifications by inviting friends to bet on this round of EPL games",
    share: "Share link copied successfully",
    via: "Or via",
    con: "Congratulations!",
    unlockSucc: "You unlock the modify qualification successfully",
    modifyNow: "Modify now",
    later: "Later",
    choice: "You must modify at least one choice before submit!",
    predict: "Please predict all the matches!",
    simplePredict: "Please predict all the questions!",
    already: "You already submitted.",
    subSucc: "Submit successfully!",
    closed:
      "The game is about to start, the prediction channel has been closed!",
    next: "The next matchday prediction will be started after ",
    betlive: "Bet Live",
    liveNote: "Bet Live get 1.2 times reward of your prediction",
    amount: "Winning Amount:",
    scores: "Total scores:",
    total: "Total Winning Amount:",
    first: "First Place:",
    check: "CHECK MORE",
    winner: "Winners",
    prediction: "Prediction",
    player: "Player",
    winning: "Winning",
    art1: "Only show top 10 winners of last Matchday",
    other: "Predict all correctly will share 1/3 of the cash pool",
    gameResult: "Game result",
    yourChoice: "Your choice",
    live: "Live",
    noData: "No statistics yet",
    notJoinSimple: "You didn't participate simple prediction",
    notJoinMatch: "You didn't participate match prediction",
    liveNotPredict:
      "The prediction of this round has ended, come back next round or bet live matches.",
    livePredict:
      "You already made prediction in this round! Bet live to multiply your winning to 1.2 times.",
    shareArt:
      "I invited you to join me in FREE sharing 5,000,000 UGX at OneBet! Place a bet on EPL matches to unlock your qualification now:\n",
    predictTitle: "Unlock EPL Predict successfully!",
    predictContent:
      "Now you can Predict EPL Free and have a chance to win 5,000,000 UGX.",
    predictButton: "Free Predict Now"
  },
  hottestTickets: {
    learnMore: "Learn More",
    noContent: "The content cannot be empty.",
    title: "Hottest Tickets",
    Reward: "Reward",
    Rules: "Rules",
    bigCake: ["5,000,000 UGX", "Bonus for Every Week!"],
    bgList: ["Daily Top 3", "Weekly top 10", "50% Stake Refund"],
    button: "Share Bet Now",
    loadCode: "Load code",
    totalOdds: "Total Odds",
    Matches: "Matches",
    type: "Type",
    downMore: "slip to load more",
    followBet: "Follow to Bet",
    noBets: "There is no bets yet, place a bet now!",
    weeklyTop: "Weekly Top 10",
    week: "Week",
    topList: ["Phone", "Total Follow Bets", "Reward"],
    yesterdayTop: "Yesterday Top 3",
    details: "DETAILS",
    detailsList: [
      {
        title:
          "1. <span style='font-weight: bold;'>Daily Top 3</span> most followed bets users rewards:",
        list: [
          "1st place, <span style='font-weight: bold;'>5,000 UGX cash</span>;",
          "2nd place, <span style='font-weight: bold;'>4,000 UGX cash</span>;",
          "3rd place, <span style='font-weight: bold;'>2,500 UGX cash</span>;"
        ]
      },
      {
        title:
          "2. <span style='font-weight: bold;'>Weekly Top 10</span> followed bets users rewards:",
        list: [
          "1 ~ 3 place, <span style='font-weight: bold;'>10,000 UGX cash + 10,000 UGX Freebet + 30,000 UGX gift</span>;",
          "4 ~ 6 place, <span style='font-weight: bold;'>5,000 UGX cash + 5,000 UGX Freebet + 15,000 UGX gift</span>;",
          "7 ~ 10 place, <span style='font-weight: bold;'>2,500 UGX cash + 2,500 UGX Freebet + 5,000 UGX gift</span>;"
        ]
      },
      {
        title:
          "3. Daily reward will be credited to your account at 00:00 next day, weekly reward will be credited to your account at 00:00 on next Monday;"
      },
      {
        title:
          "4. If the sharing ticket lost and there are over 3 people followed to bet, you will get up to <span style='font-weight: bold;'>50%</span> stake refund;"
      },
      {
        title:
          "5.All players who shared tickets will get a <span style='font-weight: bold;'>600 UGX</span> gift in the day;"
      },
      {
        title: "6. OneBet reserves the final explanation rights."
      }
    ],
    rulesList: [
      "1. All data are subject to onebet statistics;",
      "2. Only users who both share on social media and the website can participate in the cash sharing activity;",
      "3. The rewards of this promotion include cash, Freebet and Gift;",
      "4. The rewards for the top three places on the day will be distributed in the early morning of the next day;",
      "5. The top ten rewards of the current week will be distributed in the early morning of the next Monday;",
      "6. All rewards will be recharged directly to all your onebet accounts, please check and use them in time;",
      "7. When there is a match starts in your ticket, itr will be removed from the display interface;",
      "8. OneBet reserves the final explanation rights."
    ],
    share: "Share to both social media and website",
    congratulations: "Congratulations",
    winningPopUp: [
      "You are rewarded",
      "UGX",
      "by sharing your ticket",
      "yesterday!",
      "last week!"
    ],
    cashBackPopUp: "You get 50% Betting amount refunded of your sharing ticket",
    codeWrong: "Wrong betslip code! Please input a correct betslip code!",
    bannerCopywriting: "Share Your Bet to win 5,000,000 UGX Every week",
    followMe: "Follow me to win big on OneBet! Bet with me via:",
    mustTakeItDown: "This is a sure to win ticket! Bet with me to win Big!",
    noTickets: "There is no shareable ticket yet, place a bet to share now!",
    betslipTips: `Share ticket to win <span style='color:${mainThemeColor}'>5,000,000 UGX</span> Bonus every week!`,
    followCount: "Follow-ups:"
  },
  sportsPromos: {
    title: "Sports promos",
    prizes: ["FreeBet", "Onebet League FreeBet", "Gifts"],
    item_title: "Win {prize} about {unit} {amount}",
    modal_prize:
      "Get <span style='color:#FCFF00'> {unit} {amount}</span> {prize}",
    stake: "Min stake {unit} {num}",
    odd: "Min odds of {num}",
    folds: "Min folds of {num}",
    expire: "Expiring on {time}",
    optIn: "Opt In",
    come: "Complete Reward Condition?",
    completed: "Completed",
    more: "Show More",
    list_art: "If {art} in {match}",
    detail_art:
      "If {art} in {match} {league} at {time} and all Opted in conditions been fulfilled, you will be reward {amount} {unit} {prize}",
    terms: [
      "1. Only bet PreMatch/Live with Cash can paticipate in this promotion (Gift, FreeBet and Jackpot bets won't be counted).",
      "2. You can paticipate many sports promos but one multiple ticket can only fulfil one sports promo ( according to the time you join the promos).",
      "3. One Sports Promo can only be paticipated once;",
      "4. Reward will be credited to your OneBet account after the promo been settled;",
      "5. OneBet reserves the final explanation rights;"
    ],
    status: {
      optedIn: "Opted In",
      unsettled: "Unsettled",
      settled: "Settled",
      failed: "failed",
      expired: "Expired"
    },
    reminderList: {
      expired: "Sorry, you didn't fulfil this promo's conditions.",
      unsettled:
        "You've fulfilled all the conditions. The Promo will be settled soon, kindly pay attention to your OneBet account.",
      settled: "Reward has been credited to your OneBet account, kindly check.",
      failed:
        "This Promo didn't reach the draw conditions, thank you for your participation.",
      complete:
        "All conditions have been fulfilled! Promo will be settled as soon as the match finished, kindly pay attention to your OneBet account.",
      goBet:
        '"{condition}" is/are not fulfilled, bet to complete the reward condition(s) now!'
    },
    success: "Opted in successfully",
    betslip: `All conditions of Sports Promo( {team} ) have been fulfilled. <span style='color:${mainThemeColor}'>Check more>></span>`
  },
  backup: {
    select: `No backup number,<span style='color:${mainThemeColor}'>set up now</span>`,
    modify:
      "Modify your alternate number,<span style='color:#2750CA;'>set up now ></span>",
    title: "Set up an alternate number",
    code: "Verification Code",
    art: "You can add an alternate number, one account can at most add 1 MTN phone number and 1 Airtel phone number.",
    sendCode: "Send Code",
    success: "submit successfully",
    alternate: "Alternate number",
    withdraw:
      "MTN withdraw function is unavailable temporary, kindly use alternate number to withdraw.",
    notSet: "Add another phone number"
  },
  a2hs: {
    titleQ: "Annoying to enter URLs?",
    titleA: "Add OneBet to Your Home Screen.",
    step1: "Copy the link and open it in Chrome;",
    step2: {
      safari: "Use Safari,",
      tap: "Tap",
      andC: "and choose",
      add: "Add to Home Screen"
    }
  },
  worldCup: {
    title: "World Cup"
  },
  announcement: {
    title: "Upgrade Notice",
    recoveryWord: "Estimated recovery time",
    wait: "Please wait patiently",
    maintenanceWord: "System Maintenance Time",
    countdownWord: "Maintenance Countdown"
  },
  rushHour: {
    rushHourTitle: "Crash Rush Hour",
    rushHourPlayNow: "Play Now",
    rushHourRules1:
      "Play Crash Game 5, 20, 100 and 200 times during each Rush Hour time can get bonus;",
    rushHourRules2:
      "Play Crash Game within these specified periods can get you an extra Bonus (CASH, Cash gift, Freebet included in the Bonus);",
    rushHourRules3:
      "One can get unlimited bonus till the bonus is exhausted during the Rush Hour;",
    rushHourRules4: "Bonus is limited, first come first serve;",
    rushHourRules5: "OneBet reserves the final explanation right."
  },
  commissionCenter: {
    remindWord:
      "Slow win and don't' wanna take the risk? Invite friends to play together, get at least 3% of his betting amount as commission and other bonus!",
    IFBN: "Learn More"
  }
}
