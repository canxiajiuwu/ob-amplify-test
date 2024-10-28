const template = require('lodash.template')

export const TDK = {
  // 公共seo 首页
  common: {
    cm_en: {
      title:
        'The most popular sports betting site with the highest odds in Cameroon | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'betting, sport, bookmaker, Cameroon, best odds, football betting, bet, games,'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'One of Cameroon’s best sports betting companies. Live betting, 100% register bonus, 24/7 support, free withdrawals and offering FREEBET for new customers.'
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'The most popular sports betting site with the highest odds in Cameroon | OneBet'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'One of Cameroon’s best sports betting companies. Live betting, 100% register bonus, 24/7 support, free withdrawals and offering FREEBET for new customers.'
        }
      ]
    },
    cm_fr: {
      title:
        'Le site de paris sportifs le plus populaire offrant les cotes les plus élevées au Cameroun | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'paris, sport, signet, Cameroon, meilleures cotes, paris sur le football, parier, jeux'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            "L’une des meilleures sociétés de paris sportifs du Cameroun. Paris en direct, bonus d'inscription à 100%, assistance 24/7, retraits gratuits et offre PARIGRATUIT pour les nouveaux clients."
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'Le site de paris sportifs le plus populaire offrant les cotes les plus élevées au Cameroun | OneBet'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            "L’une des meilleures sociétés de paris sportifs du Cameroun. Paris en direct, bonus d'inscription à 100%, assistance 24/7, retraits gratuits et offre PARIGRATUIT pour les nouveaux clients."
        }
      ]
    }
  },
  // 首页分享
  'lang-refer': {
    cm_en: {
      title: 'Join me on OneBet, to get 100 XAF Freebet to start winning!',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'betting, sport, bookmaker, Cameroon, best odds, football betting, bet, games,'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Highest Odds, Quick Payouts, Free Withdrawals. Quick and easy online sports betting in Cameroon.'
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Join me on OneBet, to get 100 XAF Freebet to start winning!'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Join me on OneBet, the most popular sports betting site with the highest odds in Cameroon, to get 100 XAF Freebet to start winning!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://www.onebet.cm/_ipx/f_webp,q_80/images/invite/bg.png'
        }
      ]
    },
    cm_fr: {
      title:
        'Rejoignez-moi sur OneBet, pour obtenir 100 XAF Freebet pour commencer à gagner!',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'paris, sport, signet, Cameroon, meilleures cotes, paris sur le football, parier, jeux'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Highest Odds, Quick Payouts, Free Withdrawals. Quick and easy online sports betting in Cameroon.'
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'Rejoignez-moi sur OneBet, pour obtenir 100 XAF Freebet pour commencer à gagner!'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Rejoignez-moi sur OneBet, le site de paris sportifs le plus populaire avec les cotes les plus élevées au Cameroun, pour obtenir 100 XAF Freebet pour commencer à gagner!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://www.onebet.cm/_ipx/f_webp,q_80/images/invite/bg.png'
        }
      ]
    }
  },
  // live
  'lang-live-sportName': {
    cm_en: {
      title: 'Live in-Play | Sports betting | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Live betting, In-Play, Live, Cameroon, betting, bookmaker, livebet'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'play all live matches on football sports betting'
        }
      ]
    },
    cm_fr: {
      title: 'En direct en jeu | Paris sportifs | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Paris en direct, Dans le Jeu, En Direct, Cameroon, paris, signet, parier en direct'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'jouer tous les matchs en direct sur les paris sportifs football'
        }
      ]
    }
  },
  // jackpotEntrance
  'lang-jackpotEntrance': {
    cm_en: {
      title: 'Jackpot | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'Jackpot' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Predict 11 to 13 matches' markets to hit Daily Jackpots or Grand Jackpot"
        }
      ]
    },
    cm_fr: {
      title: 'Jackpot | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'Jackpot' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Prédisez les marchés de 11 à 13 matchs pour remporter les jackpots quotidiens ou le grand jackpot'
        }
      ]
    }
  },
  // app
  'lang-download': {
    cm_en: {
      title: 'OneBet App Download | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'app' },
        {
          hid: 'description',
          name: 'description',
          content: 'Download OneBet App'
        }
      ]
    },
    cm_fr: {
      title: "Téléchargement de l'application OneBet | OneBet",
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'app' },
        {
          hid: 'description',
          name: 'description',
          content: "Téléchargement de l'application OneBet"
        }
      ]
    }
  },
  // match detail
  'lang-match-matchId-client': {
    cm_en: {
      title: template(
        '<%= home_name %> vs <%= away_name %> <%= start_time %> Prediction and Markets Odds | OneBet'
      ),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '/'
        },
        {
          hid: 'description',
          name: 'description',
          content: template(
            '<%= tournament_name %>, <%= country_name %> <%= home_name %> vs <%= away_name %> <%= start_time %> Prediction and Markets Odds'
          )
        }
      ]
    },
    cm_fr: {
      title: template(
        '<%= home_name %> vs <%= away_name %> <%= start_time %> Prédiction et marchés impairs | OneBet'
      ),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '/'
        },
        {
          hid: 'description',
          name: 'description',
          content: template(
            '<%= tournament_name %>, <%= country_name %> <%= home_name %> vs <%= away_name %> <%= start_time %> Prédiction et cotes des marchés'
          )
        }
      ]
    }
  },
  // soccer
  'lang-sports-sportName': {
    cm_en: {
      title: template('<%= sportName %> | Sports betting | OneBet'),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: template('<%= sportName %> betting, sports betting')
        },
        {
          hid: 'description',
          name: 'description',
          content: template(
            'Filter matches of relevant leagues by country to bet on <%= sportName %> sports betting'
          )
        }
      ]
    },
    cm_fr: {
      title: template('<%= sportName %>  | Paris sportifs | OneBet'),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: template('parier sur le <%= sportName %>, paris sportifs')
        },
        {
          hid: 'description',
          name: 'description',
          content: template(
            'Filtrez les matchs des ligues concernées par pays pour parier sur les paris sportifs sur le <%= sportName %>'
          )
        }
      ]
    }
  },
  // 游戏大厅
  'lang-gamesHall': {
    cm_en: {
      title:
        "Dare you Challenge the world's strongest goalkeeper with me? | OneBet",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "No one can stop me even the world's strongest goalkeeper! Dare you challenge them with me?"
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            "Dare you Challenge the world's strongest goalkeeper with me?"
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            "No one can stop me even the world's strongest goalkeeper! Dare you challenge them with me?"
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/common/gamesHall/share.jpg'
        },
        {
          hid: 'whatsapp:title',
          property: 'whatsapp:title',
          content:
            "Dare you Challenge the world's strongest goalkeeper with me?"
        },
        {
          hid: 'whatsapp:url',
          property: 'whatsapp:url',
          content: 'https://www.onebet.cm/en/gamesHall'
        },
        {
          hid: 'whatsapp:description',
          property: 'whatsapp:description',
          content:
            "No one can stop me even the world's strongest goalkeeper! Dare you challenge them with me?"
        },
        {
          hid: 'whatsapp:image',
          property: 'whatsapp:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/common/gamesHall/share.jpg'
        }
      ]
    },
    cm_fr: {
      title:
        'Est- ce que vous deviez le plus fort gardien de but du monde avec moi? | OneBet',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Personne ne peut m'arrêter même le plus fort gardien de but du monde! Tu oses les défier avec moi?"
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'Est- ce que vous deviez le plus fort gardien de but du monde avec moi?'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            "Personne ne peut m'arrêter même le plus fort gardien de but du monde! Tu oses les défier avec moi?"
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/common/gamesHall/share.jpg'
        },
        {
          hid: 'whatsapp:title',
          property: 'whatsapp:title',
          content:
            'Est- ce que vous deviez le plus fort gardien de but du monde avec moi?'
        },
        {
          hid: 'whatsapp:url',
          property: 'whatsapp:url',
          content: 'https://www.onebet.cm/en/gamesHall'
        },
        {
          hid: 'whatsapp:description',
          property: 'whatsapp:description',
          content:
            "Personne ne peut m'arrêter même le plus fort gardien de but du monde! Tu oses les défier avec moi?"
        },
        {
          hid: 'whatsapp:image',
          property: 'whatsapp:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/common/gamesHall/share.jpg'
        }
      ]
    }
  },
  // about us
  'lang-aboutUs': {
    cm_en: {
      title: 'About us | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'OneBet, onebet, one bet, 1bet'
        },
        { hid: 'description', name: 'description', content: 'About onebet.' }
      ]
    },
    cm_fr: {
      title: 'À propos de nous | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'OneBet, onebet, one bet, 1bet'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'À propos de OneBet.'
        }
      ]
    }
  },
  // account
  'lang-account': {
    cm_en: {
      title: 'Account details | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    },
    cm_fr: {
      title: 'Account details | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    }
  },
  // betslip
  'lang-betslip': {
    cm_en: {
      title: 'Betslip | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Chosen markets will be displayed here'
        }
      ]
    },
    cm_fr: {
      title: 'Betslip | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Les marchés choisis seront affichés ici'
        }
      ]
    }
  },
  // featured
  'lang-featured': {
    cm_en: {
      title: 'Featured match | Sports betting | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Best Odds of football matches'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'OneBet football featured matches'
        }
      ]
    },
    cm_fr: {
      title: 'Match en vedette | Paris sportifs | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Best Odds of football matches'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'OneBet gives the best Odds of featured football matches'
        }
      ]
    }
  },
  // freebet
  'lang-freebet': {
    cm_en: {
      title: 'Freebet |Sports betting | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'freebet, onebet freebet'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Free to bet editor chosen matches with Freebet win up to 500,000,000!'
        }
      ]
    },
    cm_fr: {
      title: 'Freebet | Paris sportifs | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'freebet, onebet freebet'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            "Pariez gratuitement sur les matchs choisis par l'éditeur avec des gains Freebet jusqu'à 500,000,000!"
        }
      ]
    }
  },
  // howToPlay
  'lang-howToPlay': {
    cm_en: {
      title: 'How to play | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'How to deposit, how to withdrawal, how to place a bet on OneBet'
        }
      ]
    },
    cm_fr: {
      title: 'Comment jouer | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Comment déposer, comment retirer, comment placer un pari sur OneBet'
        }
      ]
    }
  },
  // invite
  'lang-invite': {
    cm_en: {
      title: 'Referral Friends | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Referral friends to get gifts on OneBet.'
        }
      ]
    },
    cm_fr: {
      title: 'Invitez des amis pour obtenir un cadeau | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Invitez des amis à parier sur OneBet pour obtenir un cadeau en espèces!'
        }
      ]
    }
  },
  // login
  'lang-login': {
    cm_en: {
      title: 'Login | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Input phone number and password to ogin onebet account here'
        }
      ]
    },
    cm_fr: {
      title: 'Se connecter | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Entrez le numéro de téléphone et le mot de passe pour vous connecter au compte OneBet ici'
        }
      ]
    }
  },
  // mybet
  'lang-mybet': {
    cm_en: {
      title: 'My Bet | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    },
    cm_fr: {
      title: 'My Bet | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    }
  },
  // onebetLeague-freebet
  'lang-onebetLeague-freebet': {
    cm_en: {
      title: 'OneBetLeague Freebet | Sports Betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'freebet' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Use OneBetLeague Freebet to bet free virtual football sports betting games'
        }
      ]
    },
    cm_fr: {
      title: 'OneBetLeague Freebet | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'freebet' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Utilisez OneBet League Free Bet pour parier gratuitement sur des jeux de paris sportifs sur le football virtuel'
        }
      ]
    }
  },
  // popular
  'lang-popular': {
    cm_en: {
      title: 'Popular bet | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'The most popular sports betting bet of each market will be displayed here'
        }
      ]
    },
    cm_fr: {
      title: 'Pari populaire | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Le pari sportif le plus populaire de chaque marché sera affiché ici'
        }
      ]
    }
  },
  // privacy
  'lang-privacy': {
    cm_en: {
      title: 'Privacy Policy | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Privacy policy of OneBet'
        }
      ]
    },
    cm_fr: {
      title: 'politique de confidentialité | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Politique de confidentialité de OneBet'
        }
      ]
    }
  },
  // register
  'lang-register': {
    cm_en: {
      title: 'Register | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Register on OneBet with your phone number.'
        }
      ]
    },
    cm_fr: {
      title: "s'enregistrer | OneBet",
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Inscrivez-vous sur OneBet avec votre numéro de téléphone.'
        }
      ]
    }
  },
  // terms
  'lang-terms': {
    cm_en: {
      title: 'Terms and Conditions | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Terms and conditions should be know while playing on OneBet.'
        }
      ]
    },
    cm_fr: {
      title: 'Termes et conditions | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Les termes et conditions doivent être connus lorsque vous jouez sur OneBet.'
        }
      ]
    }
  },
  // promotions
  'lang-promotions': {
    cm_en: {
      title: 'Promotions | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'promotions' },
        {
          hid: 'description',
          name: 'description',
          content:
            'All OneBet promotions include refer friends, download App display here'
        }
      ]
    },
    cm_fr: {
      title: 'Promotions | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'promotions' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Toutes les promotions OneBet incluent le parrainage d'amis, téléchargez l'affichage de l'application ici"
        }
      ]
    }
  },
  // onebet league
  'lang-onebetLeague': {
    cm_en: {
      title: 'OneBetLeague | virtual sports betting | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'virtual games, virtual football'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Play virtual football games and win every 5 minutes in OneBetLeague'
        }
      ]
    },
    cm_fr: {
      title: 'OneBetLeague | paris sportifs virtuels | Un pari',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'virtual games, virtual football'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Jouez à des matchs de football virtuels et gagnez toutes les 5 minutes dans OneBetLeague'
        }
      ]
    }
  },
  // coinsCenter winBonus
  'lang-coinsCenter-winBonus': {
    cm_en: {
      title: 'Coins center | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Daily check in to get coins and use it to win prizes'
        }
      ]
    },
    cm_fr: {
      title: 'Centre de pièces | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Enregistrez-vous quotidiennement pour obtenir des pièces et utilisez-les pour gagner des prix'
        }
      ]
    }
  },
  // onebet deposit
  'lang-deposit': {
    cm_en: {
      title: 'Deposit | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'Deposit, free Deposit' },
        {
          hid: 'description',
          name: 'description',
          content: 'Deposit with your MTN/Orange number on OneBet'
        }
      ]
    },
    cm_fr: {
      title: 'Dépôt | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'Deposit, free Deposit' },
        {
          hid: 'description',
          name: 'description',
          content: 'Déposez avec votre numéro MTN/Orange sur OneBet'
        }
      ]
    }
  },
  // onebet withdraw
  'lang-withdraw': {
    cm_en: {
      title: 'withdraw | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'withdraw, fast withdraw'
        },
        { hid: 'description', name: 'description', content: 'withdraw' }
      ]
    },
    cm_fr: {
      title: 'withdraw | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'withdraw, fast withdraw'
        },
        { hid: 'description', name: 'description', content: 'withdraw' }
      ]
    }
  },
  // sitemap
  'lang-sitemap': {
    cm_en: {
      title: 'sitemap | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    },
    cm_fr: {
      title: 'sitemap | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    }
  },
  // crashGame
  'lang-crashGame': {
    cm_en: {
      title: 'Crash Game | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'onebet crashgame, high odds'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'High Odds never end, cashout anytime you want!'
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Crash Game | OneBet'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'High Odds never end, cashout anytime you want!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/en/common/crashGame/crashGameShare.jpg'
        },
        {
          hid: 'whatsapp:title',
          property: 'whatsapp:title',
          content: 'Crash Game | OneBet'
        },
        {
          hid: 'whatsapp:url',
          property: 'whatsapp:url',
          content: 'https://www.onebet.cm/en/crashGame'
        },
        {
          hid: 'whatsapp:description',
          property: 'whatsapp:description',
          content: 'High Odds never end, cashout anytime you want!'
        },
        {
          hid: 'whatsapp:image',
          property: 'whatsapp:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/en/common/crashGame/crashGameShare.jpg'
        }
      ]
    },
    cm_fr: {
      title: 'Crash Game | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'onebet crashgame, cotes élevées'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Les cotes élevées ne finissent jamais, encaissez quand vous le souhaitez!'
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Crash Game | OneBet'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Les cotes élevées ne finissent jamais, encaissez quand vous le souhaitez!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/fr/common/crashGame/crashGameShare.jpg'
        },
        {
          hid: 'whatsapp:title',
          property: 'whatsapp:title',
          content: 'Crash Game | OneBet'
        },
        {
          hid: 'whatsapp:url',
          property: 'whatsapp:url',
          content: 'https://www.onebet.cm/fr/crashGame'
        },
        {
          hid: 'whatsapp:description',
          property: 'whatsapp:description',
          content:
            'Les cotes élevées ne finissent jamais, encaissez quand vous le souhaitez!'
        },
        {
          hid: 'whatsapp:image',
          property: 'whatsapp:image',
          content:
            'https://static-sport.onebet.cm/webRelease/static/images/lang/fr/common/crashGame/crashGameShare.jpg'
        }
      ]
    }
  },
  // sports promos
  'lang-sportPromos': {
    cm_en: {
      title: 'Sport Promos | Sports betting | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'hottest match, predict free'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'OneBet editors will recommend some hot matches which can be bet totally free and get cash gift, Freebet on sport promo'
        }
      ]
    },
    cm_fr: {
      title: 'Promos sportives | Paris sportifs | OneBet',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'match le plus chaud, sans pronostic'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Les éditeurs de OneBet recommanderont des matchs chauds qui peuvent être pariés totalement gratuitement et obtenir un cadeau en espèces, un pari gratuit sur la promotion sportive'
        }
      ]
    }
  },
  // hottest tickets
  'lang-hottestTickets': {
    cm_en: {
      title: 'Hottest Tickets | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'The hottest tickets ranki on OneBet, choose any ticket to follow to bet'
        }
      ]
    },
    cm_fr: {
      title: 'Billets les plus chauds | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Les tickets les plus chauds sont classés sur OneBet, choisissez n'importe quel ticket à suivre pour parier"
        }
      ]
    }
  },
  // hottest Tickets Reward
  'lang-hottestTicketsReward': {
    cm_en: {
      title: 'Hottest Tikets Reward | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    },
    cm_fr: {
      title: 'Récompense des billets les plus chauds | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    }
  },
  // hottest Tickets Rules
  'lang-hottestTicketsRules': {
    cm_en: {
      title: 'Hottest Ticket Rules | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    },
    cm_fr: {
      title: 'Règles des billets les plus populaires | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        { hid: 'description', name: 'description', content: '/' }
      ]
    }
  },
  // freebet how to use
  'lang-freeBetHowToUse': {
    cm_en: {
      title: 'How to use Freebet | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Guide you how to use Freebet on OneBet step by step.'
        }
      ]
    },
    cm_fr: {
      title: 'Comment utiliser le Freebet | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Vous expliquer comment utiliser Freebet sur OneBet, étape par étape.'
        }
      ]
    }
  },
  // moreCoins
  'lang-coinsCenter-moreCoins': {
    cm_en: {
      title: 'How to get coins | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'How to get coins on OneBet.'
        }
      ]
    },
    cm_fr: {
      title: 'Comment obtenir des pièces | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Comment obtenir des pièces sur OneBet.'
        }
      ]
    }
  },
  // sports detail
  'lang-sports-sportName-countryName': {
    cm_en: {
      title: template(
        '<%= country %> football league | Sports betting | OneBet'
      ),
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: template(
            '<%= country %> relevant leagues to bet on football sports betting.'
          )
        }
      ]
    },
    cm_fr: {
      title: template(
        "Ligue de football d'<%= country %> | Paris sportifs | OneBet"
      ),
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: template(
            'Les ligues <%= country %> pertinentes pour parier sur les paris sportifs sur le football.'
          )
        }
      ]
    }
  },
  'lang-sports-sportName-countryName-leagueId-leagueName': {
    cm_en: {
      title: template('<%= country %> | Sports betting | OneBet'),
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: template(
            'The recent matches of <%= country %> <%= leagueName %> will be displayed here.'
          )
        }
      ]
    },
    cm_fr: {
      title: template('<%= country %> | Paris sportifs | OneBet'),
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: template(
            'Les matchs récents de la <%= country %> <%= leagueName %> seront affichés ici.'
          )
        }
      ]
    }
  },
  // firstDeposit
  'lang-firstDeposit': {
    cm_en: {
      title: 'First deposit bonus | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Get up to 100,000 on the first deposit.'
        }
      ]
    },
    cm_fr: {
      title: 'Bonus de premier dépôt | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: "Obtenez jusqu'à 100 000 sur le premier dépôt."
        }
      ]
    }
  },
  // casino
  'lang-casino': {
    cm_en: {
      title: 'Online Slot Casino | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Most popular online slot casino games'
        }
      ]
    },
    cm_fr: {
      title: 'Casino de machines à sous en ligne | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Jeux de casino en ligne les plus populaires'
        }
      ]
    }
  },
  // kickersX
  'lang-kickersX': {
    cm_en: {
      title: 'OKickersX | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Kicks with your favorite role to win big reward'
        }
      ]
    },
    cm_fr: {
      title: 'KickersX | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Lancez-vous avec votre rôle préféré pour gagner une grosse récompense'
        }
      ]
    }
  },
  // nova6
  'lang-nova6': {
    cm_en: {
      title: 'Nova6 | Bet Free | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Register users can bet free to hit 16,000,000 XAF JackPot on Nova 6 every week!'
        }
      ]
    },
    cm_fr: {
      title: 'Nova6 | Pariez gratuitement | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Les utilisateurs inscrits peuvent parier gratuitement pour remporter un JackPot de 16 000 000 XAF sur Nova 6 chaque semaine!'
        }
      ]
    }
  },
  // giftHowToUse
  'lang-giftHowToUse': {
    cm_en: {
      title: 'How to use gift | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content: 'Guide you how to use gift on OneBet step by step.'
        }
      ]
    },
    cm_fr: {
      title: 'Comment utiliser le cadeau | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Vous explique comment utiliser le cadeau sur OneBet, étape par étape.'
        }
      ]
    }
  },
  // result
  'lang-result': {
    cm_en: {
      title: 'Match result | Sports betting | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'All the results of played matches, include football, basketball, rugby,cricket, volleyball and so on.'
        }
      ]
    },
    cm_fr: {
      title: 'Résultat du match | Paris sportifs | OneBet',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '/' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Tous les résultats des matchs joués incluent le football, le basket-ball, le rugby, le cricket, le volley-ball, etc.'
        }
      ]
    }
  }
}
