const mainThemeColor = '#5a40ff'
module.exports = {
  unit: 'XAF.',
  units: 'XAF ',
  areaCode: '+237',
  cashoutLang: require('./cashout_fr'),
  phoneNumber: '+237 779628479',
  mail: 'onebetservice@gmail.com',
  optional: 'Facultatif',
  reminder: {
    unLogin: "Vous ne vous êtes pas inscrit, veuillez d'abord vous inscrire",
    removeMatches:
      "Certains paris sur des matchs sont inacceptables,supprimez-les,s'il vous plaît.",
    betLimit: 'La limite du cadeau de pari est {limit}',
    minimumStake: 'La mise minimum doit être de {limit}',
    money: 'Votre argent n”est pas suffisant',
    expired: 'Certains matchs ont expiré',
    accepted: 'Vous avez accepté ce pari ID du billet:{ticket}',
    refused: 'Vous avez rejeté ce pari.',
    network:
      'Hélas! Une erreur de votre réseau s”est produit.Vos pièces ne sont pas payées. Veillez réessayer',
    networkError: 'Hélas! Une erreur de votre réseau s”est produit.',
    coins: "Désolé, vous n'avez pas assez de pièces",
    jackpot:
      'Vous ne pouvez pas sélectionner la chance au delà de 2 pour ce match',
    deposit1: 'entrer PIN pour continuer',
    deposit2: 'Un problème est survenu. Veuillez réessayer plus tard',
    deposit3:
      'Déposez avec succès. Déposé: {amount}; .Solde de compte: {balance}',
    deposit4: 'Maximum {amount} XAF',
    deposit5: 'Minimum {amount} XAF',
    forget: 'Votre numéro de téléphone n”est pas enregistré',
    password:
      'entrer une combinaison de lettres et de chiffres au moins 8 caractères',
    password2:
      'Ce mot de passe ne correspondent pas 2 fois, réessayez-vous de nouveau',
    agent:
      'Veillez compléter votre nom, email et numéro de télélphone portable.',
    // "login": "Votre numéro de téléphone portable est invalide",
    login:
      'Veuillez saisir un numéro de téléphone mobile valide à 10 chiffres, par exemple : 06xxxxxxxx',
    passwordTip:
      'Votre mot de passe doit comporter 4 chiffres, les lettres et symboles ne seront pas acceptés.',
    passwordRestriction: '4 chiffres (0-9)',
    rePsdJoinNow: 'This filled number has been registered on OneBet.',
    rePsd:
      "Le mot de passe ne correspond pas à votre compte ! <span style='font-weight: bold;text-decoration: underline;'>Mot de passe oublié? Générez-en un nouveau.</span>",
    withdraw1: "Vous n'avez pas assez d'argent.",
    withdraw2: "Vous pouvez retirer jusqu'à {amount} XAF par transaction.",
    withdraw3: 'Le montant minimum de retrait est {amount} XAF par transaction',
    withdraw5: 'Vous pouvez retirer au plus {amount} XAF par transaction',
    withdraw4:
      'Une fois le retrait réalisé, votre argent sera transféré sur votre compte mobile.',
    ticketSuccessful: 'réussir à annuler le billet',
    ticketFailed: 'échouer à annuler le billet',
    search: 'Le contenu de recherche ne peut pas être vide.',
    validate: 'Authentification avec succès',
    button: {
      ok: 'OK',
      confirm: 'confirmer',
      cancel: 'Annuler'
    },
    claimSuccess:
      'Claimed successfully, the reward has been added to your account.',
    claimFailed: 'Claimed Failed',
    pullError:
      'le chargement du ticket a échoué, veuillez essayer de suivre un autre ticket pour parier.',
    cashoutBouns:
      "l y a un bonus (disponible uniquement aujourd'hui) que vous n'avez pas encore réclamé. Êtes-vous sûr de vouloir partir ?",
    cashoutRestTimes:
      "À seulement {num} paris de la réclamation d'un bonus, êtes-vous sûr de partir ?",
    cashoutBounsLeft: 'Continuer à jouer',
    cashoutBounsRight: 'Partir malgré tout',
    sureAbandonUsing:
      "Réduire vos mises entraînera l'impossibilité d'utiliser le cadeau en espèces. Êtes-vous sûr d'abandonner l'utilisation de ce cadeau ?",
    continueUse: 'Continuer à utiliser',
    abandon: 'Abandonner',
    remind: 'Souviens-toi de mon choix et ne le rappelle pas la prochaine fois',
    promoCodeTips: 'Veuillez saisir un CODE PROMO correct'
  },
  nova6: 'Nova 6',
  pullRefresh: {
    pull: "Essayer d'actualiser",
    loading: 'chargement...'
  },
  accountBack: {
    back: 'RETOUR',
    coins: 'Mes pièces: ',
    live: 'en direct',
    markets: 'MARCHÉS'
  },
  accountGiftList: {
    friendStr:
      "Hé cher ami, il semblerait qu'il y ait un pari gratuit sur ton compte que tu n'as pas encore utilisé ! Va vérifier ton compte Freebet et utilise-le maintenant !",
    withdrawFail: 'Withdrawal Failed Kindly try again!',
    unlocked: 'Débloqué',
    title1: 'profil de cadeau',
    how: 'comment utiliser?',
    title: 'choisir des cadeaux cash',
    usage: "Répondre aux conditions d'utilisation.",
    noGifts: "Vous n'avez aucun cadeau disponible pour le moment.",
    limit: 'sur les mises de ',
    limit1: ' ou plus',
    expires: "expiré jusqu'à {time}",
    start: 'Départ à {time}',
    notStart: 'Ne pas démarrer',
    Use: 'utiliser',
    skip: 'Ne pas utiliser de cadeaux',
    rules: 'règles',
    odds: 'uniquement pour"Sports" parier;avoir fait des paris avec des chances >= ',
    placed: 'placer vos paris avec des chances > ',
    rem: "Vous avez reçu <span style='color: #FA4F35'>{number}</span> Gifts valued at {unit} <span style='font-weight: bold;color: #FA4F35'>{money}</span>",
    rem1: "Vous avez reçu <span style='color: #FA4F35'>{number}</span> Freebet valued at {unit} <span style='font-weight: bold;color: #FA4F35'>{money}</span>",
    reduce:
      "Le cadeau n'est pas disponible pendant la promotion de réduction\n",
    freebet: 'Condition(s) pour déverrouiller FreeBet:',
    betAmount: 'Montant de la mise > {amount} XAF,',
    betCount: 'Temps de pari > {count},',
    depositAmount: 'Montant du dépôt > {amount} XAF',
    unlock: 'Ouvrir\n',
    freeBet: 'FreeBet',
    freeBetTickets: 'Billets FreeBet',
    accomplishNow: 'Accomplissez maintenant',
    present:
      "Ce FreeBet est obtenu de {get}, vous pouvez retirer l'argent gagnant au solde de votre compte après {after}",
    freeStake: 'Free Stake',
    payout: 'paiement',
    bottomTitle: ['Paiement bloqué', 'Le paiement a été débloqué', 'Retiré'],
    bottomTitleExpired: 'Expiré! Impossible de se retirer.',
    btn: ['Déverrouiller', 'Retirer au com pte', ''],
    instructionExpire:
      'La fenêtre de retrait de la commande a expiré et les fonds gagnants ne peuvent plus être retirés.',
    filterArr: ['All', 'Pour déverrouiller', 'Retirable', 'crédité'],
    from: [
      "Enregistrement d'un nouvel utilisateur",
      'Inviter des amis',
      'Rappeler les amis'
    ],
    after0:
      'Placez un pari avec une cote ≥ {odd}, montant cumulé des paris {amount}XAF',
    after1:
      'Un ami place un pari dont la cote est > {odd}, montant cumulé du pari {amount}XAF',
    after2:
      'Placez un pari avec une cote ≥ {odd}, montant cumulé des paris {amount}XAF',
    withdrawMoney: "Retirer de l'argent au compte",
    goingWithdraw:
      'Toutes nos félicitations!<br/>Votre Freebet a gagné: XAF {money}, retirez-le au solde de votre compte maintenant?',
    instruction1:
      'Félicitations, vous avez atteint les conditions de retrait, appuyez sur le bouton Retirer pour retirer le paiement du pari gratuit sur le solde de votre compte OneBet à tout moment',
    instruction2:
      "Il n'y a pas d'argent retirable, veuillez être patient pour attendre le règlement.",
    instruction3:
      'Le montant du paiement xxx XAF a été retiré sur le solde de votre compte, vous pouvez vérifier dans la boîte de réception.',
    lock1:
      'En raison du montant total de paris de votre ami + {phone} n\'a pas atteint {money} XAF, vous ne pouvez pas retirer le paiement gratuit gagnant au solde de votre compte,<span style="color: #4C50FA;text-decoration: underline;">en savoir plus</span> <br/><br/> Débloquez le paiement en demandant à votre ami de parier sur OneBet maintenant:',
    lock2:
      "En raison du montant total de paris de votre ami + 237690 **** 656 n'a pas atteint {money} XAF, vous ne pouvez pas retirer le paiement gratuit gagnant au solde de votre compte, en savoir plus Débloquez le paiement en demandant à votre ami de parier sur OneBet maintenant:"
  },
  accountInboxBox: {
    available: "Auncun message n'est disponible"
  },
  accountMybetBox: {
    ticket_category: [
      'PreMatch / Live',
      'freebet',
      'jackpot',
      'Intime pari!',
      'Quotidien Jackpot'
    ],
    ticket_date_type1: 'actif',
    ticket_date_type2: 'jour',
    ticket_date_type3: 'semaine',
    ticket_date_type4: 'mois',
    ticket_date_type5: 'tout',
    bet_id: 'pari id',
    ticket_status1: 'en attente',
    ticket_status2: 'Perdre',
    ticket_status3: 'gagné',
    ticket_status4: 'annulé par les utilisateurs',
    ticket_status5: 'échoué',
    ticket_status6: 'Vérification',
    bet_id_title: 'PARI ID: #'
  },
  accountMybetDetailBox: {
    ticket_status1: 'en attente',
    ticket_status2: 'Perdre',
    ticket_status3: 'gagné',
    ticket_status4: 'annulé par les utilisateurs',
    ticket_status5: 'échoué',
    summary: 'résumé',
    actions: 'Actions',
    stake: 'Votre mise',
    type: 'Type',
    ticket_type1: 'avant le match',
    ticket_type2: 'en direct',
    ticket_type3: 'Jackpot',
    ticket_type4: 'pari intime!',
    ticket_type5: 'Jackpot quotidien',
    ticket_type7: 'FreeBet',
    odds: 'chances',
    freebets: 'Statut',
    bonus: 'gagner un bonus',
    payout: 'Paiement:',
    place: 'Pari placé sur ',
    actionsButton1: 'Partager le pari',
    actionsButton2: 'parier encore une fois',
    actionsButton3: 'annuler le pari',
    event: 'Evénements',
    result: 'FT Résultats',
    start: 'Commencez à ',
    pending: 'en attente',
    pick: 'Choisir',
    outcome: 'Résultat',
    delete: 'Supprimer',
    deleteSuccess: 'Supprimer réussi',
    cancel: 'Cancel',
    deleteReminder: 'Êtes-vous sûr de supprimer ce ticket?',
    sharePoster: 'Partagez votre affiche gagnante',
    months: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jun',
      'Jul',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc'
    ],
    onlyWinners: 'Seuls les gagnants',
    filterList: ['Tout', 'colonisé', 'non acquitté']
  },
  accountTransactionBox: {
    tabs1: 'Dépôt',
    tabs2: 'Rretrait',
    tabs3: 'Système de Bonus',
    refund: 'Retourner ',
    fee: 'Frais ',
    onebet: 'De OneBet'
  },
  betslipBack: {
    back: 'Grille de paris',
    betslip: 'GRILLE DE PARIS',
    clear: 'effacer le grille de paris',
    keep: 'Gardez Les coté de pari?',
    deposit: 'dépôt',
    preMatch: 'PreMatch/En direct ',
    intimate: 'Pari Intime! '
  },
  betslipMarketList: {
    introduce:
      'Félicitations!Vos sélections {length} vous donnent un bonus de victoire de {percent}%.Ajoutez une sélection supplémentaire et obtenez un bonus de victoire {percentMore}%.',
    introduce1:
      'Sélectionnez un jeu de plus,(chaque cote≥1.20), obtenez 3% de bonus supplémentaire!',
    readMore: 'voir plus.',
    live: 'en direct',
    vs: 'vs.',
    starts: 'Commencement ',
    already: 'déjà commencé',
    expired: 'Les cotes pour cette sélection ont été désactivées',
    started: 'Commencé',
    expired1: 'Expiré',
    odds: 'Les cotes ont été modifiées de {from} à {to}',
    more: 'plus de marchés',
    clear: 'effacer le grille de paris',
    reminder:
      "Veuillez ajouter quelques paris <br> Vous n'avez pas de paris dans votre grille de paris",
    intimate: 'Allez Intime',
    reminderBoxTitle:
      "Vous avez encore <strong style = 'color: red'> {gift} </strong> un Cadeau en cash disponible",
    reminderBet:
      "Bet <s>{limit}</s> et only pay <span style='font-size: 0.6666rem;color:red;font-weight: bold'>{pay}</span>",
    reminderWhether: 'Utiliser ou non les cadeaux cash?',
    place: 'pari réuss',
    trending: 'tendance',
    topLeagues: 'Top Ligues',
    country: 'Pays',
    az: 'A-Z Pays',
    remove: 'Supprimé Expiré'
  },
  betslipPlaceBet: {
    offersRewards: 'Offres et récompenses',
    stake: 'mise',
    choose: 'choisir un cadeau ',
    available: 'disponible',
    total: 'Les cotes totales',
    balance: 'solde de portefeuille',
    potential: 'Gains possibles',
    bonusList: 'Bonus Supplémentaire',
    payout: 'paiement',
    place: 'placer le pari',
    qBet: 'Paris rapides',
    pay: "Comment Payer <span style='font-weight: bold'>{stake}</span>",
    giftIntro:
      'Le cadeau est un autre type de CASH que vous pouvez utiliser pour réduire votre montant de paiement.',
    reminderBet:
      "Pariez {limit} et ne payez que &nbsp <span style = 'font-weight: bold; color: red'> {pay} </span> &nbsp en utilisant un cadeau, des chances ≥ {odds}",
    betReminder1: {
      title: 'solde insuffisant',
      msg: "Le solde de votre compte n'est pas suffisant pour placer ce pari.",
      cancelButtonText: 'plus tard',
      confirmButtonText: 'dépôt'
    },
    bet: 'Pari',
    odds: 'Chances',
    get: 'obtenir',
    reduction: 'réduction',
    reduced: 'réduit',
    pay1: 'Payer',
    reduceReminder:
      'Pariez {limit} ou plus et cotes ≥{odds} peut obtenir une réduction de {amount}',
    checkDetail: 'vérifier les détails',
    oddsExpire: 'Certaines cotes ont expiré',
    addMore: 'Ajouter plus de marchés',
    oddTitle: 'Les chances ne correspondaient pas',
    stakeTitle: 'Changer les enjeux'
  },
  betslipRelatedBets: {
    title: 'Paris associés'
  },
  betslipConfirm: {
    title: 'Confirmer le paiement',
    choose: 'choisir un cadeau en cash (nul)',
    confirm: 'Confirmer'
  },
  betslipSuccess: {
    betSuccessWorldCup:
      "Pour partager ce pari, vous obtiendrez un pronostic gratuit de la Coupe du monde, <span style='color: #2750CA; text-decoration: underline'>PARTAGEZ MAINTENANT</span>",
    betSuccessLive: 'Pari soumis',
    betSuccessLiveWord:
      '   Votre pari a été soumis avec succès, veuillez vérifier votre SMS ou votre historique de paris pour confirmer si le pari est réussi.',
    betSuccessful: 'pari réussi',
    total: 'Mises totales',
    bonusList: '{bonusList}% gagner un bonus',
    payout: 'paiement',
    bet_id: 'Pari Id',
    payment: 'Mise de paiement réelle',
    continue: 'Continuer À Parier',
    check: "Vérifier l'histoire des paris",
    cash: 'des cadeaux cash',
    share:
      "Obtenez <span style='color: #FA6B52;'>10,000,000 XAF supplémentaires</span>en partageant votre pari!<span style='color: #2750CA; text-decoration: underline'>PARTAGE MAINTENANT</span>",
    betRefund:
      "Vous avez rejoint la promotion de Remboursement du Premier Pari Quotidien, <span style='text-decoration:underline;color: red'>Apprendre plus</span>"
  },
  createBetslip: {
    title: 'Create Betslip',
    merge: 'Fusionner les tickets locaux',
    choose: 'Choisissez un cadeau en espèces',
    stake: 'Mises',
    desired: 'Gains souhaités',
    starts: 'Commence dans',
    hour: 'heure',
    folds: 'Plis du marché',
    outcomes: 'Sélectionnez les résultats',
    create: 'Créer',
    reminder1:
      "Réduisez vos mises empêcheront l'utilisation du cash gfit, êtes-vous sûr de modifier le montant pour abandonner l'utilisation de ce cadeau ?",
    reminder2:
      "Réduisez vos Les gains souhaités empêcheront l'utilisation du cash gfit, êtes-vous sûr de modifier le montant pour abandonner l'utilisation de ce cadeau ?",
    reminderDesired: 'Les gains minimum souhaités doivent dépasser la mise',
    reminderDesired1:
      'Le montant de vos billets locaux est supérieur aux gains souhaités.',
    reminderMarkets: 'La gamme de plis du marché est de 2 à 20',
    reminderMarkets1:
      'Vos marchés de billets locaux se situent au-dessus de la fourchette de repli du marché',
    reminderFail:
      'Échec de la création du ticket, veuillez ajuster les paramètres et réessayer.',
    reminderGiftStake:
      'Pour utiliser ce cadeau, votre mise minimale doit être de {stake}',
    reminderGiftWinning:
      'Pour utiliser ce cadeau, vos gains minimum souhaités doivent être de {stake}'
  },
  coinsSpin: {
    play: 'Jouer',
    pay: 'À propos du paiement de 20 pièces',
    reminder: 'Félicitations!Vous avez gagné XAF{prize}.',
    prizes: [
      'essayez encore une fois',
      '1000 Cash',
      '10000 Cash',
      '50 cadeaux cash',
      '100 cadeaux cash',
      '500 cadeaux cash',
      '1000 cadeaux cash'
    ],
    more: 'Obtenez plus de pièces',
    art1: "1. Jusqu'à 50 pièces pour la connexion quotidienne.",
    art2: "2. Placer les paris sportifs avec succès peut obtenir 15 pièces par jour,<span style='color: #EACE1E;text-decoration: underline'>Pariez maintenant</span>",
    art3: "3.100 pièces pour le premier fois <span style = 'color: #EACE1E; text-decoration: underline'> téléchargez l'application d'OneBet </span>",
    instructions: 'Instructions',
    ins1: "Il dépense 20 pièces par tour;<br>Si vous touchez cash ou un cadeau Cash, le montant sera immédiatement crédité sur votre compte;<br>L'interprétation finale appartient à OneBet."
  },
  coinsCenter: {
    title: 'Centre de pièces',
    again: 'Réessayer',
    winBonus: 'gagner un bonus',
    getMore: 'Gagner plus de pièces ',
    checkIn: 'Inscription quotudienne',
    app: "Premier téléchargement d'APP",
    real: 'Parier sur Real Sports',
    virtual: 'Parier sur Virtual sports',
    jackpot: 'Parier sur Jackpots',
    li:
      "1.Obtenir des pièces dès l'inscription quotidienne et les tachês. <br>\n" +
      '          2.Pièces pour tirer lots et gagner Bonus. <br>\n' +
      '          3.Obtenir des pièces en participant les tachês la première fois. <br>\n' +
      "          4.Les droits d'interprétation sont à OneBet.",
    checkInNow: 'Enregistrer maintenant',
    download: 'Téléchargement gratuit',
    betNow: 'Parier maintenant',
    finish: 'fini'
  },
  commonModal: {
    ok: 'OK',
    cancel: 'annuler',
    share: 'Partager le grille de paris',
    shareArt: 'Partagez ce pari avec des amis',
    copy: 'Copier',
    button: 'Charger grille de paris',
    shareArt1: 'Avez-vous un code du grille de paris partagé? Entrez-le ici.',
    shareArt2:
      'Le code copié a été collé, vous pouvez le charger ou le modifier ici!',
    shareContent:
      'Suivez-moi de gagner grand sur OneBet! Parier avec moi via: {url} {code}',
    copyFail: 'Copie échouée',
    copySuccess:
      'Le lien des sélections de paris partageable a été copié avec succès!',
    yes: 'Oui',
    no: 'Non'
  },
  footer: {
    tc: 'T&C',
    play: 'Comment faire',
    about: 'concernat',
    contact: 'Politique de confidentialité',
    service: 'Service Clients',
    dedicatedly:
      "L'equipe du service clients d'OneBet repondra à toutes vos demandes à tout moment et en tout lieu!",
    call: 'Nous Téléphoner',
    online: 'Aide En ligne',
    reminder:
      'Vous devez être 25 ans et plus pour parier. Le pari est addictif et peuvent être psychologiquement nocifs. <br> <br> OneBet est réglementé par le National Gaming Board Uganda. Licence #000012'
  },
  countryInfo: {
    change: 'Changer',
    ug: 'Ouganda',
    cm: 'Cameroun'
  },
  footerMenu: {
    total: 'Chances totales ',
    Possible: 'Paiement Possible XAF. ',
    home: 'Accueil',
    live: 'En direct({number})',
    mybets: 'Mes Paris',
    account: 'Compte',
    betslip: 'Grille de paris',
    bonus: `<span style='color: ${mainThemeColor};font-weight: bold;'>{percent}</span> bonus supplémentaire activé.`,
    bonusLess: `Ajoutez <span style='color: ${mainThemeColor};font-weight: bold;'>{number}</span>
      pari avec une cote de 1,20 ou plus pour activer un bonus supplémentaire de <span style='color: ${mainThemeColor};font-weight: bold;'>{percent}</span>`,
    bonusMore: `Ajoutez encore <span style='color: ${mainThemeColor};font-weight: bold;'>1</span>
      pari avec une cote de 1.20 ou de plus pour obtenir un Bonus Supplémentaire de <span style='color: ${mainThemeColor};font-weight: bold;'>{percent}</span>.`,
    boost: 'XAF {money} ({percent}) Bonus Supplémentaire',
    learn: 'En savoir plus sur Bonus Supplémentaire'
  },
  betslipExtraBonus: {
    title: '{percent}% Bonus Supplémentaire',
    left: '{length} sélections valides',
    right: '{length} de 42 sélections',
    desc: "Au fur et à mesure que vous ajoutez plus de jeux à votre bulletin de paris avec une cote de 1,20 ou plus, votre gain possible est multiplié jusqu'à 600% pour 42 jeux.",
    got: 'Bien su'
  },
  header: {
    menu: 'Menu',
    search: 'recherche',
    betslip: 'Grille de paris'
  },
  headerDownload: {
    title: 'Acquérir PremeirBet maintenant!',
    art: 'Économiser sur les lots, petits et gratuits!',
    button: 'Télécharger',
    button1: 'Télécharger App'
  },
  homeMenu: {
    freebet: 'FreeBet',
    search: 'Rechercher des Équipes, Ligues,Jeu ID, Chances',
    home: 'Accueil',
    jackpot: 'Jackpot',
    result: 'Résultats',
    deposit: 'Dépôt',
    app: 'App',
    live: 'En direct',
    sport: 'Sports',
    Soccer: 'Football',
    Basketball: 'Basketball',
    Cricket: 'Cricket',
    Rugby: 'Rugby',
    usa: 'Football américain',
    Volleyball: 'Volley-ball',
    Tennis: 'Tennis',
    league: 'Top Ligue',
    today: "Football d'aujourd'hui",
    Gifts: 'Cadeaux',
    Promotions: 'Promos',
    cash: 'Acquérir cash',
    coins: 'CONNEXION',
    other: 'autres sports',
    other1: 'autres',
    coinsSpin: 'Roulette'
  },
  jackpotBetslip: {
    Combinations: 'Combinaison',
    total: 'Mises totales',
    clear: 'Effacerr tout',
    place: 'Placer le pari',
    pay: "À propos du paiement <span style='font-weight: bold'>{stake}</span>",
    auto: 'Sélection automatique',
    pick: 'Sélectionné {length}/13 Matchs',
    accept: 'Cet ordre a été accepté. TicketId {id}'
  },
  jackpotResult: {
    win: 'GAINS',
    result: 'RESULTATS',
    correct: 'Correct',
    none: 'Nul',
    winners: 'vainqueurs',
    pending: 'en attente'
  },
  jackpotHowToPlay: {
    art1: 'Comment Jouer "Jackpot"',
    art2: '13 compétitons de Jackpot de OneBet consistent à prédire les résultats de 13 matchs sélectionnés par OneBet par semaine.',
    art3: 'Si vous voulez vous engager à Jackpot et avoir de la chance de le gagner, vous devrez vous enregistrer et avoir au moins 100 XAF sur votre compte.Si vous prédisez correctement tous les résultats de13 matchs, vous gagnerez le super-prix de Jackpot!Si vous prédisez correctement 11 ou 12 résultats, vous gagnerez encore des prix de consolation.',
    art4: "Comment s'engager",
    art5: "Faire votre séléction--Veillez faire vos prédictions pour chaque match listé (Accueil de gagner, Match nul,Défaite)sur la page d'entrée de 13 compétitions de Jackpot de OneBet. La somme de mise de chaque combinaison est de 100 XAF.Vous pouvez faire plus de 1 prédiction pour un match.Pour chaque combinaison suplémentairele formée par vos sélections,cela pourrait augmenter la somme de mise par 100 XAF.",
    art6: "Vérifier et placer vos paris--Avant de cliquer sur \\Placer le pari\\,vous devez vérifier toutes les sélections.Une fois soumis, ces paris ne peuvent pas être annulés, amendés et rendus.Vous pouvez placer vos paris avant 17 heures du samedi en Ouganda. Le compte à rebours pour la clôture des compétitons est clairement affiché sur la page d'entrée de compétitions",
    art7: "Vérifier vos résultats--Sur la page de \\Résultats précédents\\ de Jackpot, tous les résultats et prix des matchs seront publiés dans l'après-midi du lundi en Ouganda.",
    art8: 'Sélectionner autotiquement',
    art9: "Après choisi l'option de Jackpot Rush ,une sélection random pour une prédiction par match sera automatiquement sélectée avec une mise fixée de 100 XAF.Plus de prédictions pourraient être ajoutées à cette sélection random.Pour chaque combinaison suplémentairele,cela augmentera le coût d'entrée par 100 XAF."
  },
  jackpots: {
    title: 'JACKPOTS',
    tabs: ['Grand Jackpot', 'Quotidien Jackpot', 'Résultats', 'Aider'],
    winnings: 'Gains',
    grand: 'OneBet Grand Jackpot',
    grandJackpot: 'Grand Jackpot',
    dailyJackpots: 'Quotidien Jackpot',
    grand_1: '10,000,000 XAF',
    draw: 'Tirer un numéro ',
    expire: 'Expiré ',
    daily: 'Quotidien Jackpots',
    only: "A un pas d'un millionnaire",
    daily_3: ['Petit Paris', 'Gros montant du jackpot', 'Facile á gagner'],
    ended: 'terminé le ',
    win: 'WIN UPTO XAF ',
    helpTab: ['Grand Jackpot', 'Quotidien Jackpot'],
    helpDaily: [
      {
        title: 'Comment jouer "Quotidien Jackpot"',
        text: 'La concurrence quotidienne du jackpot se compose de GG / NG et 3 voies, prédisant les résultats de 8 - 13 matches, qui sont sélectionnés parOnebetChaque jour. \n\nPour participer et ont la chance de gagner le jackpot, vous devez vous inscrire et avoir au moins Ugx 500 dans votre compte. Si vous prédisez correctement tous8 -13 résultats de correspondance, vous gagnez le prix Super Jackpot!'
      },
      {
        title: 'Comment prendre part',
        text: 'Faire vos sélections - sur leRéailyPage d\'accueil de la concurrence de Jackpot, faites vos prédictions pour chacun des matchs classés (gagnant maison, dessin, vaincade,Oui,Non). Le montant de la combinaison est chaque XAF 100/ XAF 200. \n\nVérifiez et placez les paris - Assurez-vous de vérifier toutes les sélections avant de cliquer sur le bouton "Place Bet". Une fois soumis, les paris ne peuvent pas être annulés, modifiés ou remboursés. Le compte à rebours au moment de la fermeture de la concurrence est clairement indiqué sur leTop Bannière de Jackpot Daily. \n\nVérifiez les résultats -Le billet généralement que Jackpot, le journal du journal sera généralement réglé lorsque le dernier match a terminé dans le journal quotidien. UneLL correspondant les résultats et les prixPeut être vérifié ici: Mes paris> Jackpot quotidien \n\nConditions particulières - Si un match de jackpot est suspendu, reporté ou annulé (vide) et non repris dans les 24 heures suivant le coup d\'œil initial, tous les paris pour ce tour Jackpot sont annulés et les enjeux sont remboursés.'
      },
      {
        title: 'AutoPick',
        text: "En choisissant l'option \"Jackpot Rush\", une sélection aléatoire d'une prédiction par correspondance sera automatiquement sélectionnée avec un enjeu fixe d'XAF 100/ XAF 200."
      }
    ],
    helpGrand: [
      {
        title: 'Comment Jouer "Jackpot"',
        text: 'Grand Jackpot consistent à prédire les résultats de 13 matchs sélectionnés par OneBet par semaine. \n\nSi vous voulez vous engager à Jackpot et avoir de la chance de le gagner, vous devrez vous enregistrer et avoir au moins 100 XAF sur votre compte.Si vous prédisez correctement tous les résultats de13 matchs, vous gagnerez le super-prix de Jackpot!Si vous prédisez correctement 11 ou 12 résultats, vous gagnerez encore des prix de consolation.'
      },
      {
        title: "Comment s'engager",
        text: "Faire votre séléction--Veillez faire vos prédictions pour chaque match listé (Accueil de gagner, Match nul,Défaite)sur la page d'entrée de 13 compétitions de Jackpot de OneBet. La somme de mise de chaque combinaison est de 100 XAF.Vous pouvez faire plus de 1 prédiction pour un match.Pour chaque combinaison suplémentairele formée par vos sélections,cela pourrait augmenter la somme de mise par 100 XAF. \n\nVérifier et placer vos paris--Avant de cliquer sur \\Placer le pari\\,vous devez vérifier toutes les sélections.Une fois soumis, ces paris ne peuvent pas être annulés, amendés et rendus.Vous pouvez placer vos paris avant 17 heures du samedi en Ouganda. Le compte à rebours pour la clôture des compétitons est clairement affiché sur la page d'entrée de compétitions. \n\nVérifier vos résultats--Sur la page de \\Résultats précédents\\ de Jackpot, tous les résultats et prix des matchs seront publiés dans l'après-midi du lundi en Ouganda."
      },
      {
        title: 'Sélectionner autotiquement',
        text: "Après choisi l'option de Jackpot Rush ,une sélection random pour une prédiction par match sera automatiquement sélectée avec une mise fixée de 100 XAF.Plus de prédictions pourraient être ajoutées à cette sélection random.Pour chaque combinaison suplémentairele,cela augmentera le coût d'entrée par 100 XAF."
      }
    ]
  },
  jackpotsWeeklyCash: {
    title: 'Espèces hebdomadaires',
    notice: [
      'Pour récompenser les utilisateurs pour leur participation active au Jackpot, OneBet choisira les utilisateurs chanceux de rembourser CASH',
      "Chaque semaine, choisissez au hasard 20 utilisateurs chanceux,Chaque utilisateur chanceux recevra <span style='color:#fe415a'>400</span> XAF cash!", // x,xxx 货币单位 cash!
      "1 utilisateur le plus chanceux sera choisi, Obtenez <span style='color:#fe415a'>2,000</span> XAF CASH", // x,xxx 货币单位 CASH
      "plus vous placez de billets dans Jackpot, plus vous avez de chances d'être choisi."
    ],
    tips: 'Conseils',
    betNow: 'Pariez maintenant',
    joinUsers: 'Cette semaine, rejoignez les utilisateurs :',
    lastWeek: 'Liste des récompenses de la semaine dernière',
    listHeader: ['Utilisateur chanceux', 'Remboursement en espèces'],
    termsCondition: 'Termes et conditions',
    termsConditionList: [
      '1. Jouez au Grand Jackpot et au Daily Jackpot tous les deux pourront être choisis ;',
      "2. Nous livrerons l'argent le lundi ;",
      '3. Vous pouvez vérifier qui gagne dans la liste des récompenses de la semaine dernière;',
      "4. Plus vous jouez au Jackpot, plus vous avez de chances d'être choisi ;",
      "5. OneBet se réserve le droit d'explication finale."
    ],
    noticeWinning: {
      title: 'Toutes nos félicitations!',
      contentFront: 'Vous avez gagné ',
      contentBehind:
        " XAF lors des derniers Daily Jakpots et l'argent a été crédité sur votre compte OneBet.",
      ok: "D'ACCORD"
    },
    monetaryUnit: 'XAF'
  },
  liveTabs: {
    Upcoming: 'Prochain',
    All: 'Tout',
    live: 'Live In-Play',
    Soccer: 'Football',
    Basketball: 'Basketball',
    usa: 'Football américain',
    Rugby: 'Rugby',
    Tennis: 'Tennis',
    Cricket: 'Cricket',
    Volleyball: 'Volley-ball'
  },
  loginEntry: {
    balance: 'Solde: ',
    Gifts: 'Cadeaux: ',
    register: "S'enregistrer",
    login: "S'identifier",
    joinNow: "S'enregistrer"
  },
  matchDetailInbox: {
    back: 'Retour',
    markets: 'MARCHÉS',
    vs: 'VS',
    ended: 'Match terminé',
    suspended: 'Match suspendu'
  },
  matchDetailMarket: {
    available: 'Pari indisponible',
    match: "Attendez,s'il vous plaît!Et veillez essayer un match différent"
  },
  matchDetailMenu: {
    favorite: 'My Favorite',
    All: 'Tout'
  },
  matchDetailModel: {
    ok: 'OK'
  },
  modelLeagues: {
    tag: 'Veuillez sélectionner un tag',
    sport: 'Veillez sélectionner un sport',
    market: 'Veillez sélectionner un marché'
  },
  preMatchBox: {
    live: 'En direct',
    market: 'Marchés'
  },
  featuredMatch: {
    title: 'Match Populaire',
    more: 'Plus',
    live: 'En direct',
    bestOdds: 'BEST ODDS'
  },
  preMatchFilter: {
    name1: "Clou d'aujourd'hui",
    name2: '3h',
    name3: 'Demain',
    name4: 'Cette semaine',
    name5: 'semaine prochaine',
    tabs: [
      { id: 0, name: "Clou d'aujourd'hui" },
      { id: 3, name: 'Pour toi' },
      { id: 1, name: 'Prochain' },
      { id: 2, name: 'Pays' }
    ],
    upcoming: [
      'Tous',
      "Aujourd'hui",
      'Demain',
      '48 heures suivantes',
      'Cette semaine',
      'semaine prochaine'
    ]
  },
  preMatchSoccerMenu: {
    All: 'Tous les Sports'
  },
  rowTabs: {
    Highlights: 'Accueil',
    Jackpots: 'Jackpots',
    Daily: 'Jackpot Quotidien',
    Intimate: 'Pari Intime!',
    Soccer: 'Football',
    Casino: 'Casino',
    Basketball: 'Basketball',
    usa: 'Football américain',
    Rugby: 'Rugby',
    Tennis: 'Tennis',
    Cricket: 'Cricket',
    Volleyball: 'Volleyball',
    new: 'NOUVELL',
    coinsSpin: 'Roulette',
    getCash: 'Acquérir cash',
    popular: 'Pair Populaire'
  },
  signIn: {
    checkIn: 'Check-in',
    checkedIn: 'Checked-in',
    getCoins: 'acquérir {coins} des pièces',
    week: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
    title: 'présence avec succès',
    art: 'Grand montant de pièces de présence le weekend.',
    win: "Gagner de l'argent >"
  },
  teamTitle: {
    teams: 'GROUPES'
  },
  account: {
    title: 'Détails du compte',
    phoneNumber: 'Numéro de Téléphone portable',
    balance: 'Solde',
    coins: 'Pièces',
    gift: 'cadeaux de sport',
    casinoGift: 'Cadeaux de casino',
    betBy: 'parier par',
    deposit: 'Dépôt',
    withdraw: 'Retrait',
    authority: 'Mon autorité',
    history: 'Histoire de transaction',
    casinoHistory: 'Historique des paris au casino',
    inbox: 'Boîte de réception',
    call: 'Téléphoner ',
    help: '7/24 aide en ligne',
    logout: 'Se Déconnecter',
    problem: 'Signaler un problème',
    login: 'Connectez-vous pour voir',
    nickname: 'Modifier le surnom',
    nicknameArt:
      'Au plus 15 litteurs et ne peuvent que modifier une fois tous les 30 jours.',
    nickNameSuccess: 'Modifier le succès',
    profile: 'Image de profil',
    nickname1: 'Surnom',
    note: 'Note',
    note1:
      '1. Seulement la première fois le changement de surnom peut obtenir 100 cadeau de cadeau',
    note2:
      '2. Seulement la première fois le profil de profil peut obtenir 100 cadeau de cadeau.',
    note3:
      '3. Photo de profil et surnom ne peut modifier une seule fois tous les 30 jours',
    completeTitle: 'Informations complètes sur le compte',
    completeInfo:
      'Vous pouvez obtenir 100 cadeaux de cadeau après avoir perdu parfaitement votre surnom et votre profil de profil.',
    setting: 'Aller à définir',
    setTeam: "Définir l'équipe à domicile",
    setLeague: 'Définir la ligue préférée',
    card1:
      "Carte d'économie de casino, plus haut sauvegarder <span>1232 XAF</span> par mois\n",
    card2:
      "<span>{r_num} XAF</span> n'a pas encore été revendiqué dans cette période\n",
    card3: "L'argent <span>{saving_money} XAF</span> a été économisé",
    card4:
      "L'argent <span>{saving_money} XAF</span> a été économisé, pouvant réclamer <span>{t_amount} XAF</span> au cours de la prochaine période",
    card5:
      'Renouvellement maintenant pour obtenir une autre période de <span>{t_amount} XAF</span> la prochaine période',
    check: 'Vérifier',
    claim: 'Réclamation',
    Renew: 'Renouveler',
    sportsgifts: '{num} Cadeaux sportifs seront expirés',
    casinogifts: 'Les cadeaux {num} Casino seront expirés',
    partner: 'Postulez pour être un partenaire OneBet'
  },
  accountDeposit: {
    choose: 'Choisir un montant',
    from: 'Dépôt de',
    amount: 'Montant',
    chargeRem:
      "Les frais facturés seront remboursés sur votre compte d'OneBet.",
    art1: 'Il est nécessaire que vous ayez des fonds dans votre {name} portefeille de téléphone portable afin de les déposer.',
    depositAmount: 'Montant de dépôt',
    placeholder: 'Veillez entrer le montant',
    deposit: 'Dépôt',
    clear: 'Effacer',
    apply: 'Appliquer',
    refund: 'Déposer après avoir retourné:',
    mtn: '(MTN)',
    airtel: '(AIRTEL)',
    topUp: 'Dépôt',
    art2: 'Déposer 2000 XAF ou plus à votre compte de OneBet de votre portefeuille de téléphone portable. Tous les frais de transaction des fonds de téléphone portable sera pris en charge par votre compte,puis le même montant chargé est automatiquement retourné à votre compte de OneBet en haut du dépôt initial.',
    art3: 'Voir les tables en dessous pour plus de détails:',
    minUsers: 'MIN UTILISATEURS',
    airtelUsers: 'AIRTEL UTILISATEURS',
    range: 'cadre',
    transaction: 'transaction',
    fees: 'frais',
    OneBet: 'OneBet',
    charge: 'charge',
    cashback: 'retourner cash',
    artNew:
      'Déposez tout montant que vous obtiendrez! Retourner les frais de paiement.',
    note: "noter:la fenêtre contextuelle est un outil d'autorisation principal, mais si le réseau dispose d'un service intermittent, elle peut ne pas envoyer la fenêtre contextuelle et vous demander d'approuver manuellement en composant le * 165 #",
    mtnReminder:
      'Orange est en maintenance ! Veuillez utiliser MTN pour {method} à la place, nous vous informerons dès que Orange sera rétabli.'
  },
  accountForgetStep1: {
    number: '06XXXXXXXX',
    changePassword: 'Initialiser votre mot de passe',
    art: 'Entrer votre numéro de téléphone portable pour réinitialiser votre compte.',
    enter: 'Entrer votre numéro de téléphone portable',
    setPassword: 'Définir le mot de passe',
    art1: 'Entrez votre nouveau mot de passe',
    next: 'Suivant',
    login: 'Allez vous identifier'
  },
  accountForgetStep2: {
    changePassword: 'Changer le Mot de Passe',
    art1: 'Un code de sécurité à 4 chiffres a été envoyé ',
    art2: 'Entrer le code de sécurité à 4 chiffres envoyé à votre téléphone portable',
    resend: 'Renvoyer le code de sécurité ',
    reminder1: 'initialiser un mot de passe fort pour sécuriser votre compte.',
    confirm: 'Confirmer votre mot de passe',
    change: 'CHANGER LE MOT DE PASSE'
  },
  accountLogin: {
    title: "S'identifier à OneBet",
    art: "Entrer vos détails d'identfication pour continuer",
    enter: 'Entrer votre numéro de téléphone portable',
    number: '06XXXXXXXX',
    password: 'Le mot de passe',
    login: "S'IDENTIFIER",
    forget: 'Oublier le mot de passe?',
    signUp: "s'inscrire"
  },
  accountRegister: {
    mtn: "Actuellement, seul l'enregistrement du numéro d'Orange est accepté. <br> MTN sera bientôt lancé.",
    number: '06XXXXXXXX',
    title: "s'inscrire pour ",
    name: 'OneBet',
    get: 'Acquérir ',
    gift: 'Cadeau quand vous vous enregistrez.',
    enter: 'Entrer votre numéro de téléphone portable',
    password: 'Le mot de passe',
    confirm: 'Confirmer votre mot de passe',
    create: 'CRÉER UN COMPTE',
    length: 'Longueur de 8 à 14 caractères.',
    already: "Vous avez déjà un compte?<span>s'identifier</span>",
    bottom:
      "En vous inscrivant à un compte, vous acceptez nos <br> Conditions d'utilisation.",
    isRegistered:
      'Ce numéro renseigné a été enregistré sur OneBet, veuillez confirmer si vous entrez un numéro de téléphone correct.',
    tologin: 'Connectez-vous avec ce compte',
    rnewnum: 'Entrez à nouveau un nouveau numéro',
    epc: 'Entrez le CODE PROMO'
  },
  accountVerify: {
    title: 'Vérifier votre numéro de téléphone portable',
    art: 'Activer votre compte après avois entré le code de sécurité à 4 chiffres!',
    name: 'Entrer le code envoyé à votre télélphone portable',
    resend: 'Renvoyer le code de sécurité',
    button: 'Enregistrement complet'
  },
  accountWithdraw: {
    withdraw: 'Retrait',
    Withdrawal: 'retirer à ',
    placeholder: 'Entrer le montant de retrait',
    Balance: 'Solde de compte ',
    request: 'Demande de retrait',
    bottomList: [
      '1.Le maximum par transaction est de XAF ',
      '2.La valeur de la transaction quotidienne maximale est de XAF ',
      "3.Votre retrait sera bientôt crédité. S'il n'est pas terminé dans une heure, veuillez contacter le service en ligne pour obtenir de l'aide."
    ]
  },
  betslipBonus: {
    back: 'RETOUR',
    win: 'Gagner le Bonus',
    art: "Gagner le Bonus--Ajouter plus de sélestions à votre grille de paris Et l'extra grimpe à 250%!",
    art1: 'Voire gagner plus GROS avec nos bonus',
    art3: "Pour vous aider à gagner GROS avec des petits paris,nous vous offrons le plus gros bonus <br>.Il est dispobible sur n'importe quel multi-paris avec 3 sélections ou plus et vos gains de paris grimpent à 250% avec 30 manches. <br> Ici,c'est comment fonctionner:",
    art4: "Calculer votre gain de pari en fonction de vos gains sauf la mise.Si un match est annulé ou reporté, votre numéro de manches total ne l'inclut pas.",
    legs: '{number} Jambes {percent}% Bonus'
  },
  jackpot: {
    onebet: 'OneBet 13',
    Results: 'Résultats précedents',
    howToPlay: 'Comment faire',
    draw: 'Tirer un numéro ',
    Expires: 'Expiré '
  },
  result: {
    sport_name: 'Football',
    tournament_name: 'Tous'
  },
  search: {
    search: 'Rechercher les termes',
    placeholder: 'Rechercher des équipes, la ligue, les cotes',
    history: 'Historique des recherches',
    popular: 'Cotes populaires',
    hot: 'Recherches à chaud',
    delete: "Voulez-vous vraiment supprimer tout l'historique de recherche ?"
  },
  dataError: {
    loading: 'Chargement de donnés échoué. Veillez recharger.',
    reload: 'Recharger'
  },
  dataNoResult: {
    inbox: 'Pas de message disponible'
  },
  terms: {
    title: 'Conditons générales',
    content:
      '<h2>A. INTRODUCTION</h2>' +
      '<p>En utilisant et/ou visitant toute section (y compris les sous-domaines) du site Web OneBet.cm ou de tout autre site Web ou applications que nous possédons (le "site Web") et/ou vous enregistrant sur le site Web,vous acceptez d\'être lié par (i) ces Conditions générales;(iii )les Règles applicables à notre pari sportif, sports virtuels, Jackpot, Casino ou autres produits de jeu, elles sont mentionnées plus explicitement au paragraphe 2 ci-dessous(les "Conditions" génériques), et vous êtes réputé avoir accepté et compris tous les Conditions et Règles </p>' +
      "<p>Veillez lire les Conditions attentivement et Si vous n'acceptez pas ces Conditions, n'utilitsez pas ce site Web.Les Conditions s'appliquent également à tous les paris téléphoniques et paris ou jeux via des appareils mobiles,y compris les applications téléchargeables sur un appareil mobile (comme si l'utilisation de notre site Web équivaut à utiliser notre pari téléphonique et ou  nos appareils mobiles pour parier )</p>" +
      "<p>Lorque vous jouez à un jeu, ou placez un pari, en utilisant ce site Web, vous serez réputé accepter et consentir à être lié par les Règles qui s'appliquent aux produits applicables disponibles sur le site Web</p>" +
      "<p>Nous devons modifier les Conditions de temps en temps pour de nombreuses raisons y compris le respect des lois applicabels,des règlements et des exigences réglementaires. Toutes les modifications seront publiées sur ce site Web.Les conditions les plus contemporaines seront disponibles sur ce site Web. Si vous n'acceptez pas aucune modifications,vous devezcesser d'utiliser le site Web et /ou fermer votre compte. Toutefois, si vous continuez à utiltiser ce site Web après la date à laquelle les modifications des Conditions entrent en vigueur,vous serez réputé avoir accepté ces modifications</p>" +
      '<p>Les référeces à "OneBet","Nous","Nous" ou "Notre" concernent les entités sociales de OneBet.</p>' +
      '<p>Les références à "vous", "votre" ou "client" concernent toute personne utilisant le site Web ou les services de OneBet et ou tout client qui s\'est enregistré à OneBet.</p>' +
      '<p>Les références à "nom de l\'utilisateur" concernent toute personne qui s\'est enregistrée sur notre site Web par le numéro de téléphone portable.</p>' +
      "<p>Comme vous le savez, le droit d'accéder au site Web et ou d'utiliser le site Web (y compris tout produit ou tous les produits proposés via le site Web) peut être illégal dans certains pays (par exemple,y compris les États Unis).</p>" +
      "<p>Vous êtes responsable de déterminer si l'accès au site Web et/ou l'utilisation de ce site conforment aux lois applicables dans votre juridiction et vous assurez que le jeux n'est pas illégal sur le territoire où vous habitez</p>" +
      '<h2>B. Votre compte de OneBet</h2>' +
      '<h3>Application</h3>' +
      "<p>1.1 Tous les demandeurs doivent être âgés de plus de 25 ans pour placer un pari ou s'enregistrer sur OneBet. Réserver le droit de demander une preuve d'âge à tout client et suspendre son compte jusqu'à ce qu'une documentation satisfaisante soit fournie. OneBet attache une grande importance aux responsabilités du jeu des mineurs.</p>" +
      "<p>1.2 Toutes les informations fournies DOIVENT être exactes et compètes à tous égards lors de l'inscription sur le site.En particulier, si vous utilisez une carte bleue ou carte de débit, le nom du titulaire de la carte DOIT être le même que le nom utilisé lors de l'inscription sur le site Web. Si ce n'est pas le cas, votre compte concerné sera suspendu. Lorsqu'un compte est suspendu, le client concerné doit nous contacter.Avant la suspension d'un compte,tous les paris placés seront sauvegardé- gagner ou perdre.</p>" +
      "<p>1.3 OneBet peut confirmer l'adresse d'un client en envoyant une lettre pour vérifier l'adresse au client.Toutes les correspondances seront discrètes et l'envelppe n'affichera aucune référence à OneBet. Losqu'une telle correspondance est initiée, toutes les offres et demandes de retrait peuvent rester en attente jusqu'à ce que l'adresse soit confirmée comme étant correcte.</p>" +
      "<p>1.4 En acceptant les Conditions et /ou en vous inscrivant pour utiliser le site Web, vous acceptez que nous aurons le droit d'effectuer toutes les vérifications d'identification, de crédit et autres vérifications de temps à autre que nous exigeons et/ou sont exigées par les lois applicables et réglementations et/ou par les autorités réglementaires compétentes pour utiliser le site Web et nos produits en général. Vous acceptez de fournir toutes les informations dont nous avons besoin dans le cadre de ces contrôles de vérification. Nous aurons le droit de suspendre ou de restreindre votre compte de toute manière que nous pourrions juger appropriée à notre entière discrétion , jusqu'à ce que les vérifications pertinentes soient effectuées à notre satisfaction.</p>" +
      "<p>1.5 Pendant le processus d'inscription, nous pouvons fournir les détails de vos informations à des agences de référence de crédit autorisées pour confirmer votre identité.Vous acceptez que nous puissions traiter ces informations dans le cadre de votre inscription.</p>" +
      "<p>1.6 Les clients ne peuvent ouvrir qu'un seul compte.Si nous identifions un client avec plus d'un compte, nous réservons le droit de fermer ou de suspendre le compte d'un tel client et OneBet aura également le droit de retenir et / ou de conserver tous les montants qui auraient autrement été payés ou payables à vous (y compris tout gains ou paiements de bonus).</p>" +
      "<p>1.7 Les clients doivent garder à jour leurs informations d'inscription et de compte.Ceci,ainsi que les informations de votre compte, peuvent être modifiés dans la section du Compte personnel du site Web.Si vous avez besoin d'aide, veuillez nous contacter.</p>" +
      '<h3>Détails du compte</h3>' +
      "<p>2.1 OneBett permet à tous ses clients de choisir leur propre combinaison de nom d'utilisateur et de mot de passe.Les clients doivent garder ces informations secrètes et confidentielles car vous êtes responsable de tous les paris placés sur votre compte et de toute autre activité se déroulant sur votre compte.</p>" +
      "<p>2.2 Les paris seront valables si votre nom d'utilisateur et votre mot de passe ont été entrés correctement (que vous y ayez ou non l'autorisation), sous réserve qu'il y ait suffisamment de fonds sur votre compte. </p>" +
      "<p>2.3 Si, à tout moment, vous pensez qu'un tiers connaît votre nom d'utilisateur et / ou votre mot de passe, vous devez le modifier immédiatement via le site Web.Si vous oubliez une partie ou la totalité de votre combinaison, veuillez nous contacter.</p>" +
      "<p>2.4 Vous êtes responsable de toutes les transactions où votre nom et numéro de compte ou nom et nom d'utilisateur sont correctement cités (que vous y ayez ou non l'autorisation).Si vous nommez une autre personne comme utilisateur autorisé de votre compte, vous serez responsable de toutes les transactions que cette personne effectue en utilisant les détails de compte pertinents.Si vous perdez les détails de votre compte ou pensez que quelqu'un d'autre peut avoir les détails de votre compte, veuillez nous contacter.</p>" +
      '<p>2.5 Veuillez noter que les coordonnées du titulaire de la carte et toute autre donnée sensible ne doivent jamais nous être envoyées par e-mail non crypté.</p>' +
      "<p>2.6 Le solde actuel et l'historique des transactions de votre compte peuvent être consultés à tout moment une fois que vous vous êtes connecté à votre compte sur le site Web.</p>" +
      '<h3>Détails personnels</h3>' +
      '<p>3.1 Vos informations personnelles sont traitées conformément à notre Politique de Confidentialité.</p>' +
      '<h3>Suspension et Fermeture</h3>' +
      "<p>4.1 Si vous souhaitez fermer votre compte, veuillez nous contacter. Tout solde négatif sur votre compte deviendra être immédiatement exigible et payable à OneBet,et votre compte ne sera pas fermé tant que le montant dû à OneBet n'aura pas été entièrement payé.</p>" +
      '<p>4.2 OneBet se réserve le droit de fermer ou de suspendre votre compte à tout moment et pour quelque raison que ce soit. Sans limiter la phrase précédente, OneBet aura le droit de fermer ou de suspendre votre compte dans ces cas.</p>' +
      '<p>(a) Vous faites faillite;</p>' +
      '<p>(b) OneBet considère que vous avez utilisé le site Web de manière frauduleuse ou à des fins illégales ou inappropriées</p>' +
      "<p>(c) OneBet considère que vous avez utilisé le site Web de manière injuste ou que vous avez délibérément trompé ou profité des intérêts illégitimes de OneBet ou de l'un de ses clients;</p>" +
      '<p>(d) OneBet est invité à le faire par la police, toute autorité de régulation ou tribunal</p>' +
      "<p>(e) OneBet considère que l'un des événements mentionnés de (a) à (c) ci-dessus peut s'être produit ou est susceptible de se produire</p>" +
      "<p>4.3 Si OneBet ferme ou suspend votre compte pour l'une des raisons mentionnées aux points (a) à (e) ci-dessus, vous serez responsable de tous les réclamations, pertes, responsabilités, dommages, coûts et dépenses encourus ou subis par OneBet (ensemble «Réclamations»).Vous doit indemniser et dégager OneBet sur les demendes pour de telles réclamations. Dans les circonstances mentionnées de (a) à (e) ci-dessus, OneBet aura également le droit de retenir et / ou de conserver tous les montants qui auraient autrement été payés ou payables à vous (y compris les gains ou les paiements de bonus).</p>" +
      '<h2>C. VOS CAPITAUX</h2>' +
      '<h3>Dépôts et Paris</h3>' +
      "<p>1.1 Vous ne pouvez parier qu'avec les fonds compensés détenus sur votre compte.Par conséquent, si vous souhaitez placer des paris ou participer à des jeux, vous devez déposer de l'argent sur votre compte. Et vous trouverez de plus amples informations sur la façon de déposer, de retirer et de transférer des fonds en consultant Dépôts / Retraits.</p>" +
      "<p>1.2 En déposant des fonds sur votre compte,vous nous dirigez et nous acceptons de les conserver, ainsi que tous les gains,dans le seul et spécifique but de les utiliser (i) pour placer vos mises sportives et de jeu;et (ii) régler les frais ou charges que vous pourriez encourir dans le cadre de l'utilisation de nos services (Objectif).Nous aurons le droit de suspendre ou de fermer votre compte si nous considérons raisonnablement ou avons des raisons de croire que vous déposez des fonds sans aucune intention de placer des mises sportives et / ou de jeu. Dans de telles circonstances, nous pouvons également le signaler aux autorités compétentes.</p>" +
      "<p>1.3 Tous les fonds que nous détenons pour vous sont détenus dans des comptes bancaires de clients désignés séparés pour être utilisés uniquement aux fins et la banque l'a reconnu.Nous devons vous restituer les fonds s'ils ne sont pas utilisés aux fins.</p>" +
      "<p>La banque a reconnu que vos fonds sont détenus dans ces comptes uniquement aux fins.La banque a confirmé qu'elle ne mélangerait pas les fonds des clients de ces comptes avec d'autres, y compris les nôtres, et qu'elle n'a aucun droit sur les fonds eux-mêmes.</p>" +
      "<p>Au vu de ce qui précède, en cas d'insolvabilité, vos fonds sont protégés. Les fonds vous appartiendraient toujours et ne tomberaient pas entre les mains du liquidateur.</p>" +
      "<p>1.4 Vous acceptez que nous ayons le droit de conserver les fonds détenus qui pourraient amener de l' intérêt sur votre compte de OneBet.</p>" +
      "<p>1.5 Aucun crédit ne sera offert par un employé de OneBet,et tous les paris doivent être supportés par des fonds suffisants sur le compte du client.OneBet se réserve le droit d'annuler tout pari qui aurait pu être accepté par inadvertance lorsque le compte ne disposait pas de fonds suffisants pour couvrir le pari.Si des fonds sont crédités sur le compte d'un client par erreur, il est de la responsabilité du client d'en informer OneBet sans délai.OneBet récupérera ces fonds par ajustement de compte.</p>" +
      "<p>1.6 Sauf indication contraire, tous les exemples donnés sur le site Web sont donnés en XAF.Pour toute transaction nécessitant un change des devises, le taux de change applicable sera le taux moyen indiqué par le Financial Times.Les options de devises disponibles sont listées dans l'annexe 1 des conditions générales et sur le site Web.</p>" +
      "<p>1.7 Une fois qu'une devise est choisie, les fonds sont déposés, misés et les gains payés dans cette devise.Pour effectuer des transactions dans une devise différente, vous devez fermer votre compte existant en nous contactant,et puis ouvrir un nouveau compte avec votre devise préférée.</p>" +
      '<p>1.8 OneBet aura le droit de retenir et / ou de conserver tout montant  reçu ou concerné avec votre utilisation «non autorisée» du site Web, y compris les activités qui ne sont pas à des fins autorisées.</p>' +
      '<h3>Retraits</h3>' +
      "<p>2.1 Lorsque c'est possible, tous les retraits seront traités sur le compte de paiement à partir duquel les dépôts ont été effectués.Les retraits ne peuvent être effectués qu'au nom du titulaire et du compte enregistré.</p>" +
      "<p>2.2 Les retraits peuvent être traités en cliquant sur «Retrait» sur le site Web, sous réserve qu'il y ait les fonds suffisants sur votre compte de paris.</p>" +
      "<p>2.3 Si la montant d'un dépôt n'est pas complètement épuisé avant qu'un retrait ne soit demandé, OneBet se réserve le droit de facturer le compte du client pour couvrir tous les coûts raisonnables liés à la fois au dépôt et au retrait.Si nécessaire, la montant du retrait demandé peut être réduite en conséquence.</p>" +
      '<h3>Autre</h3>' +
      "<p>3.1 Si nous effectuons des rétro-facturations, des annulations ou d'autres frais à l'égard de votre compte, nous nous réservons le droit de vous facturer les montants correspondants engagés.</p>" +
      '<p>3.2 Nous pouvons, à tout moment, compenser tout solde positif de votre compte des montants que vous devez à OneBet ou à toute entreprise du groupe OneBet.</p>' +
      '<p>3.3 Vous êtes responsable de rapporter vos gains et vos pertes aux autorités fiscales et / ou aux autres autorités de votre juridiction.</p>' +
      "<p>3.4 Le jeu sur Internet peut être illégal dans la juridiction dans laquelle vous vous trouvez. Si tel est le cas, vous n'êtes pas autorisé à utiliser votre carte de paiement pour accomplir la transaction. Cependant, tous les paris/pots acceptés dans ces juridictions seront valables - gagner ou perdre.</p>" +
      '<h2>D. PROCÉDURES DE PARI</h2>' +
      '<h3>Placer les paris</h3>' +
      '<p>1.1 OneBet se réserve le droit de refuser tout ou partie demande de paris à sa seule et absolue discrétion.Vous prenez en charge tous les risques de tvos paris</p>' +
      '<p>1.2 Nous acceptons uniquement les paris effectués en ligne (y compris via un appareil mobile ou des applications téléchargeables sur un appareil mobile). Les paris ne sont acceptés sous aucune autre forme (ost, e-mail, fax, etc.) et ils seront invalides - gagner ou perdre.</p>' +
      "<p>1.3 Il est de la responsabilité du client de s'assurer que les détails de ses paris sont corrects. Une fois les paris placés, ils ne peuvent être ni annulés ni modifiés par le client. OneBet se réserve le droit d'annuler n'importe quel pari à tout moment.</p>" +
      "<p>1.4 Vos fonds seront répartis aux paris dans l'ordre dans lequel ils sont placés et ne seront pas disponibles pour une autre utilisation. OneBet se réserve le droit d'annuler et / ou de révoquer toute transaction effectuée après qu'un pari a été placé impliquant des fonds répartis, soit à ce moment, soit rétrospectivement.</p>" +
      '<h3>Confirmation de Paris</h3>' +
      '<p>2.1 Les paris ne seront pas valides si les fonds sont insuffisants sur votre compte.</p>' +
      "<p>2.2 Un pari que vous demandez ne sera valable qu'une fois accepté par les serveurs de OneBet. Pour chaque pari valide,vous recevrez un code de transaction unique. Nous ne serons pas responsables du règlement des paris qui ne sont pas émis avec un code de transaction unique.Si vous n'êtes pas sûr de la validité d'un pari, veuillez vérifier l'histoire de votre compte ou contactez-nous.</p>" +
      "<p>2.3 Malgré les réglémentations ci-dessus, si les paris sont placés via une carte bleue ou de débit, ils ne sont valables que lorsque nous avons reçu le paiement intégral. Le pari être automatiquement annulé si nous n'avons pas reçu le paiement avant le début de l'événement concerné.</p>" +
      "<p>2.4 S'il y a un différend, vous et OneBet convenez que la base de données du journal des transactions de OneBet sera l'autorité ultime en la matière.</p>" +
      '<h3>Offres</h3>' +
      "<p>3.1 Toutes les avantages du client sont limitées à une par personne, famille, adresse du domicile, adresse e-mail, numéro de téléphone, monnaie mobile liée par MTN / Airtel , appareil mobile (par exemple, appareil mobile ou tablette), téléchargement d'application ou ordinateur partagé (par exemple bibliothèque publique ou lieu de travail).</p>" +
      "<p>3.2 Lorsque l'une des Conditions de l'offre ou de la promotion est violée ou s'il existe des preuves d'une série de paris placés par un client ou un groupe de clients (par exemple, lorsque des modèles de paris communs sur le même appareil/les mêmes marchés ont été identifiés dans les comptes), à cause d'un bonus de dépôt, des paiements améliorés, des paris gratuits et sans risque, ou toute autre résultat de l'offre promotionnelle s'engedre par des bénéfices clients garantis quel que soit le résultat, que ce soit individuellement ou en groupe, OneBet se réserve le droit de récupérer l'élément bonus de ces offres et à la discrétion absolue de OneBet, réglez les paris à la cote correcte, annulez les paris gratuits et sans risque ou annulez tout pari financé par le bonus de dépôt. En outre, OneBet se réserve le droit de prélever des frais administratifs sur le client à concurrence de la valeur du bonus de dépôt, du pari gratuit et sans risque ou du paiement supplémentaire pour couvrir les frais administratifs. OneBet se réserve en outre le droit d'exiger de tout client qu'il ait une discrétion absolue sur l'identité de son client avant que OneBet ne crédite un bonus, un pari gratuit et sans risque ou une offre sur le compte du client, afin que OneBet soit entièrement satisfait. </p>" +
      "<p>3.3 OneBet se réserve le droit de retirer la disponibilité de toute offre ou de toutes les offres à tout client ou groupe de clients à tout moment et à la seule et absolue discrétion de OneBet. Les offres ne s'appliquent qu'aux clients qui ont effectué un dépôt en argent réel avec OneBet. </p>" +
      "<p>3.4 OneBet se réserve le droit de modifier les conditions ou d'annuler toute offre du client ou promotion à tout moment.</p>" +
      '<h3>Règlement et Paiements</h3>' +
      "<p>4.1 Tous les paris sont soumis aux règles du sport / marché / jeu concerné énoncées dans la section Comment jouer et aux dispositions de l'Annexe 2 des présentes Conditions générales.</p>" +
      "<p>4.2 OneBet se réserve le droit de suspendre un marché et / ou d'annuler tout pari à tout moment. Lorsqu'un marché est suspendu, tous les paris inscrits seront rejetés.OneBet se réserve également le droit de cesser de parier sur tous les marchés à tout moment sans remarquer.</p>" +
      '<p>4.3 Le calcul du " Paiement final "disponible sur le site Web est à titre informatif uniquement, et tous les paris seront calculés en utilisant la mise / le risque aux cotes acceptées. Dans plusieurs paris/banquiers avec une sélection (s) ) invalide, le montant du "Paiement final " est réduit en conséquence.</p>' +
      '<p>4.4 Si un client inclut une sélection non partante ou annulée dans un pari / pari multiple, le pari sera réglé sur les sélections restantes.</p>' +
      "<p>4.5 Les gains des paris réglés sont ajoutés au solde de votre compte de paris. Les fonds / gains crédités sur un compte par erreur ne sont pas disponibles pour utilisation, et OneBet se réserve le droit d'annuler toute transaction impliquant de tels fonds et / ou de retirer le montant correspondant de votre compte et / ou d'annuler la transaction, soit au moment ou rétrospectivement.</p>" +
      "<p>4.6 OneBet se réserve le droit de réserver le paiement et de déclarer les paris invalides pendant l'événement si nous avons la preuve que les circonstances suivantes se sont produites: (i) l'intégrité de l'événement est mise en doute; (ii) le prix ou le prix total a été manipulé; ou (Iii) Un jeu truqué a été joué. Les preuves ci-dessus peuvent être basées sur la taille, le nombre ou la méthode de paris effectués en utilisant OneBet sur l'un ou l'ensemble de nos canaux de paris. Toute décision prise par OneBet à cet égard est définitive. Si un client doit de l'argent à OneBet pour quelque raison que ce soit, nous avons le droit d'en tenir compte avant de payer le client.</p>" +
      "<p>4.7 Lorsqu'il existe des preuves d'une série de paris contenant chacun la même sélection (s) ayant été placés par ou pour le même individu ou syndicat d'individus, OneBet se réserve le droit d'annuler les paris ou de retenir le paiement des retours en attendant le résultat de tout enquête.</p>" +
      "<p>4.8 Pour les événements où il n'y a pas de «off» officiel déclaré, l'heure de début annoncée de l'événement sera considérée comme «off». Si, pour une raison quelconque, un pari est accepté par inadvertance après le début d'un événement ou d'un match (autre que les paris en direct en direct clairement indiqués sur le site Web), les paris seront maintenus à condition que le résultat final ne soit pas connu et qu'aucun participant / équipe n'ait gagné tout avantage matériel (par exemple un score, un renvoi pour l'autre équipe, etc.) au moment où le pari a été placé. Si le résultat d'un événement / marché est connu, OneBet se réserve le droit d'annuler le pari, de gagner ou de perdre. Les litiges sur les périodes de placement des paris seront réglés à l'aide du journal des transactions. Toutes les heures indiquées sur le site Web et / ou mentionnées par le personnel de OneBet se rapportent à GMT, sauf indication contraire.</p>" +
      "<p>4.9 Pari en jeu - lorsque nous avons des raisons de croire qu'un pari est placé après que le résultat d'un événement est connu, ou après que le participant ou l'équipe sélectionné a obtenu un avantage matériel (par exemple, un score, l'envoi pour l'autre équipe, etc. ) nous nous réservons le droit d'annuler le pari, de gagner ou de perdre.</p>" +
      "<p>4.10 Si, pour une raison quelconque, nous ne sommes pas en mesure de valider le résultat d'un marché particulier (par exemple en raison de la perte d'images en direct), tous les paris seront nuls, à moins que le règlement des paris ne soit déjà déterminé.</p>" +
      "<p>4.11 Lorsqu'un client donne des instructions ambiguës, OneBet se réserve le droit de répartir le montant des sommes mises en jeu entre les résultats potentiels. Lorsque cela n'est pas pratique, nous nous réservons le droit d'annuler la totalité de ce pari. Dans tous les cas, la décision de OneBet est définitive.</p>" +
      '<h2>E. UTILISATION DU SITE WEB</h2>' +
      '<h3> Information et Contenu</h3>' +
      "<p>1.1Les informations auxquelles vous avez accès sur le site Web (y compris les résultats, les statistiques, les données sportives et les listes de matches, les chances et les chiffres de paris) sont destinées à votre usage personnel uniquement et la distribution ou l'exploitation commerciale de ces informations est strictement interdite.Aucune garantie n'est donnée quant à la fourniture ininterrompue de ces informations, leur exactitude ou quant aux résultats obtenus par leur utilisation. Il ne faut pas s'y fier lorsque vous placez des paris, qui sont effectués à vos propres risques et à votre discrétion.</p>" +
      '<h3>Votre Équipment</h3>' +
      "<p>2.1 Votre équipement informatique ou appareil mobile et votre connexion d'Internet peuvent affecter les performances et / ou le fonctionnement du site Web.OneBet ne garantit pas que le site Web fonctionnera sans fautes ou erreurs ou que les services de OneBet seront fournis sans interruption.OneBet décline toute responsabilité pour les pannes ou problèmes qui surviennent en raison d'équipement, de connexion d'Internet ou d'Internet ou de fournisseur de services de télécommunications( y compris, par exemple, si vous ne parvenez pas à placer des paris ou à afficher ou recevoir certaines informations relatives à des événements spéciaux)</p>" +
      "<p>2.2Pour les clients utilisant les sites mobiles de OneBet pour placer des paris, veuillez noter que OneBet ne sera pas responsable de tout dommage ou perte de données de l'appareil mobile sur lequel le logiciel est installé, et ne sera pas non plus responsable de tout appel, données ou autres frais encourus lors de l'utilisation du logiciel.</p>" +
      '<h3>Utilisation équitable</h3>' +
      '<p>3.1 Le site Web et les produits de OneBet ne peuvent être utilisés que pour placer des paris sur des événements et / ou des produits de jeux.</p>' +
      "<p>3.2 Vous ne devez pas utiliser le site Web à des fins qui (de l'avis de OneBet) sont illégales, diffamatoires, abusives ou obscènes,ou que OneBet considère comme discriminatoires, frauduleuses, malhonnêtes ou inappropriées.\n</p>" +
      "<p>3.3OneBet recherchera des sanctions crimineles et contractuelles contre tout client impliqué dans des actes frauduleux, malhonnêtes ou criminels via ou en relation avec le site Web ou les produits de OneBet.OneBet retiendra le paiement à tout client si l'un de ces éléments est suspecté.Le client indemnisera et sera tenu de payer à OneBet, sur demande, toutes les réclamations (telles que définies au paragraphe B.4.3 ci-dessus) découlant directement ou indirectement de l'acte frauduleux, malhonnête ou criminel du client.</p>" +
      '<h3>Problèmes de logiciel et de technologie</h3>' +
      "<p>4.1 Afin que vous puissiez utiliser certains produits proposés sur le site Web, vous devrez peut-être télécharger certains logiciels (par exemple, des jeux de casino mis à disposition via un lecteur flash).En outre, certains fournisseurs de produits du tiers peuvent vous demander d'accepter des conditions générales supplémentaires régissant l'utilisation de leurs produits. Si vous n'acceptez pas ces conditions générales du tiers, n'utilisez pas le logiciel du tiers concerné.OneBet décline la responsabilité à l'égard de tout logiciel du tiers.</p>" +
      "<p>4.2 Vous n'êtes autorisé à utiliser que tout logiciel mis à votre disposition via le site Web dans le but d'utiliser des produits sur le site Web et dans le cadre autorisé par les lois applicables, ils ne peuvent pas être utilisés à d'autres fins.</p>" +
      "<p>4.3 Nous vous accordons par la présente un droit personnel, non exclusif et non transférable d'utiliser le logiciel concerné, dans le seul but d'utiliser / jouer des produits sur le site Web (y compris le casino en ligne), conformément aux dispositions suivantes.</p>" +
      "<p>(a) Vous n'êtes pas autorisé à: (i)installer ou charger le logiciel sur un serveur ou un autre appareil en réseau ou prendre d'autres mesures pour rendre le logiciel disponible via toute forme de «babillard», service en ligne, accès distant ou réseau à toute autre personne;(ii) sous-licencier, céder, louer,  prêter, transférer ou copier (sauf disposition expresse ailleurs dans les  conditions générales)votre licence pour utiliser le logiciel ou faire ou distribuer des copies du logiciel; (iii) entrer, accéder ou tenter d'entrer, d'accéder ou de contourner le système de sécurité de OneBet ou d'interférer de quelque manière que ce soit (y compris, mais sans s'y limiter, les robots et appareils similaires)avec les produits concernés ou le site Web ou tenter d'apporter des modifications au logiciel et / ou ses fonctionnalités ou composants; ou (iv) copier ou traduire toute documentation d'utilisateur fournie «en ligne» ou au format électronique.En outre,et sauf dans la mesure minimale autorisée par la loi applicable en ce qui concerne les programmes informatiques (y compris, les fins expressément autorisées par l'article 296A (1) ou l'article 50 (B) 2 du Copyright Designs et Patents Act 1988), vous êtes n'est pas autorisé à: (a) traduire, désosser, décompiler, désassembler, modifier, créer des œuvres dérivées basées sur le logiciel ou autrement modifier le logiciel; (b) faire de l'ingénierie inverse, décompiler, désassembler, modifier, adapter, traduire, tenter de découvrir le code source du logiciel ou de créer des œuvres dérivées basées sur l'ensemble ou sur une partie quelconque du logiciel.</p>" +
      "<p>(b) Vous ne possédez pas le logiciel. Le logiciel est la propriété exclusive de OneBet ou d'un fournisseur de logiciels du tiers (le «fournisseur de logiciels»). Tout logiciel et la documentation d'accompagnement qui ont été concédés sous licence à OneBet sont des produits propriétaires du fournisseur de logiciels et protégés dans le monde entier par la loi sur les droits d'auteur. Votre utilisation du logiciel ne vous confère aucun droit de propriété intellectuelle sur le logiciel.</p>" +
      "<p>(c) Le logiciel est fourni «tel quel» sans aucune garantie, condition, engagement ou représentation, expresses ou implicites, statutaire ou autre.OneBet exclut par la présente tous les termes, conditions et garanties implicites (y compris toute qualité marchande, qualité satisfaisante et aptitude à un usage particulier). OneBet ne garantit pas que: (i) le logiciel répondra à vos exigences; (ii) le logiciel n'enfreindra pas les droits de propriété intellectuelle d'un tiers; (iii) le fonctionnement du logiciel sera sans erreur ou ininterrompu; (iv) tout défaut du logiciel sera corrigé; ou (v) le logiciel ou les serveurs sont exempts de virus. </p>" +
      "<p>(d) En cas d'erreurs de communication ou de système survenant dans le cadre du règlement des comptes ou d'autres fonctionnalités ou composants du logiciel, ni OneBet ni le fournisseur de logiciel n'auront de responsabilité envers vous ou envers un tiers en ce qui concerne ces erreurs. OneBet se réserve le droit en cas de telles erreurs de supprimer tous les produits concernés du site Web et de prendre toute autre mesure pour corriger ces erreurs.</p>" +
      "<p>(e) Vous reconnaissez que la manière dont vous utilisez le logiciel est hors du contrôle de OneBet. En conséquence, vous chargez et utilisez le logiciel à vos propres risques. OneBet n'aura aucune responsabilité envers vous ou envers un tiers en ce qui concerne votre réception et / ou votre utilisation du logiciel.</p>" +
      "<p>(f) Le logiciel peut inclure des informations confidentielles qui sont secrètes et précieuses pour le fournisseur de logiciels et / ou OneBet. Vous n'êtes pas autorisé à utiliser ou à divulguer ces informations confidentielles autrement que dans le strict respect des présentes conditions générales.</p>" +
      "<p>4.4 Bien que OneBet s'efforce de garantir que le site Web est disponible 24 heures sur 24, OneBet ne sera pas responsable si, pour une raison quelconque, le site Web est indisponible à tout moment ou pour une période quelconque. Nous nous réservons le droit d'apporter des modifications ou des corrections à ou de modifier, suspendre ou interrompre tout aspect du site Web et le contenu ou les services ou produits disponibles via celui-ci, y compris votre accès à celui-ci.</p>" +
      '<p>4.5 Vous ne devez pas abuser du site Web en introduisant des virus, des chevaux de Troie, des vers, des bombes logiques ou tout autre matériel malveillant ou technologiquement nuisible. En particulier, vous ne devez pas accéder sans autorisation, interférer avec, endommager ou perturber le site Web ou une partie de celui-ci; tout équipement ou réseau sur lequel le site Web est stocké; tout logiciel utilisé dans le cadre de la fourniture du site Web; ou tout équipement, logiciel ou site Web appartenant à ou utilisé par un tiers. Vous ne devez pas attaquer notre site Web via une attaque par déni de service. Nous ne serons pas responsables de toute perte ou dommage causé par une attaque de déni de service distribuée, des virus ou tout autre matériel technologiquement nuisible qui pourrait infecter votre équipement informatique, vos programmes informatiques, vos données ou tout autre matériel exclusif en raison de votre utilisation du site Web, logiciel ou à votre téléchargement de tout matériel publié dessus, ou sur tout site Web lié à celui-ci.</p>' +
      '<h3>Contenu du tiers </h3>' +
      "<p>5.1 OneBet reçoit des flux, des commentaires et du contenu d'un certain nombre de fournisseurs. Certains fournisseurs de produits tiers peuvent vous demander d'accepter des conditions générales supplémentaires régissant l'utilisation de leurs flux, commentaires et contenus. Si vous n'acceptez pas les conditions générales pertinentes du tiers, n'utilisez pas les flux, commentaires ou contenus pertinents.</p>" +
      '<p>5.2 OneBet décline toute responsabilité en ce qui concerne les flux, commentaires et contenus de tiers.</p>' +
      "<p>5.3 OneBet ne permet à aucun employé et à toute autre personne liée de quelque manière que ce soit à un tel employé ou à toute autre personne connectée à un fournisseur de services du tiers (à déterminer à la discrétion absolue de OneBet ) de parier / miser sur tout marché ou événement où le fournisseur de services du tiers fournit un service à OneBet. OneBet annulera tout pari / pari s'il détermine, à son entière discrétion, qu'un tel pari / enjeux a eu lieu.</p>" +
      "<p>5.4 Lorsque le site Web contient des liens vers des sites Web des tiers et des ressources, ces liens sont fournis à titre informatif uniquement. OneBet n'a aucun contrôle sur le contenu de ces sites ou ressources et décline toute responsabilité à leur égard ou pour toute perte ou dommage pouvant résulter de votre utilisation de ceux-ci. L'inclusion d'un lien vers un site Web tiers ne constitue pas une approbation du site Web, des produits ou des services de ce tiers (le cas échéant).</p>" +
      '<h3>Erreur</h3>' +
      "<p>6.1 OneBet ne sera pas responsable des erreurs concernant les paris, y compris lorsque: (i) OneBet a incorrectement indiqué le montant des chances / spreads / handicap / totaux pertinents; (ii) OneBet continue d'accepter les paris sur des marchés fermés ou suspendus; (iii) OneBet calcule ou paie incorrectement un montant de règlement; ou (iv) toute erreur se produit dans un générateur de nombres aléatoires ou des tables de paiement inclus, incorporés ou utilisés dans tout jeu ou produit.</p>" +
      "<p>6.2 Prix incorrect - Avant le début d'un événement, en jeu ou après l'événement, lorsqu'une erreur évidente est identifiée, tous les paris seront maintenus et réglés au prix révisé OneBet. Lorsqu'un prix révisé est jugé inférieur à 1,01, les paris seront nuls.</p>" +
      "<p>Lorsqu'il reste suffisamment de temps avant le début d'un événement, OneBet s'efforcera de contacter le client et pourra autoriser la possibilité d'annuler le pari à notre entière discrétion.</p>" +
      "<p>6.3 Compte / Ligne / Spread / Handicap / Total incorrect - Avant le début d'un événement, en jeu ou après l'événement, lorsqu'une erreur évidente est identifiée, tous les paris seront maintenus et réglés au décompte, à la ligne, à l'écart, au handicap ou total pris au prix révisé OneBet sauf dans les situations suivantes</p>" +
      "<p>i) Lorsqu'un prix révisé est jugé inférieur à 1,01, les paris seront nuls.</p>" +
      "<p>ii)Si le résultat est connu au moment du placement d'un pari, tous les paris sur le décompte, la ligne, l'écart, le handicap ou le total seront annulés. </p>" +
      "<p>6.4 Lorsqu'il reste suffisamment de temps avant le début d'un événement, OneBet s'efforcera de contacter le client et pourra, à notre entière discrétion, autoriser la possibilité d'annuler le pari.</p>" +
      '<p>6.5 Match incorrect - Lorsque le mauvais joueur ou équipe est cité dans un nom de match, tous les paris seront annulés. Une telle détermination relève de la discrétion absolue de OneBet.</p>' +
      '<p>6.6 Mauvais participant - Si un mauvais participant est cité pour un match ou un événement, les paris placés sur ce participant seront annulés; les autres participants peuvent également être nuls. Une telle détermination relève de la discrétion absolue de OneBet.</p>' +
      "<p>6.7 Paris tardifs - Si, pour une raison quelconque, un pari pré-événement est accepté par inadvertance après le début d'un match ou d'un événement, les paris seront réglés comme suit:</p>" +
      "<p>i) Si l'événement et le marché sont couverts en jeu, les paris resteront au prix révisé au moment où le pari a été placé (lorsqu'un prix révisé est considéré comme inférieur à 1,01, les paris seront alors nuls), à moins que le résultat ne soit déjà connu dans lequel au cas où ces paris seraient annulés.</p>" +
      "<p>ii)Si l'événement ou le marché n'est pas couvert en jeu, le pari sera valable tant que le participant ou l'équipe sélectionné (e) n'aura pas obtenu d'avantage matériel (par exemple, un score, un renvoi pour l'autre équipe, etc.). Lorsqu'un avantage matériel a été obtenu, OneBet se réserve le droit d'annuler le pari, de gagner ou de perdre. Tout pari placé dont le résultat est déjà connu, y compris en jeu, sera annulé.</p>" +
      "<p>6.9Erreur évidente - Gains maximums - Le montant maximum qui peut être gagné pour un pari placé lorsqu'il y a une erreur Évidente et un prix révisé est de 5000 USD ou son équivalent, à moins que le montant de gain attendu du pari initial soit supérieur à 5000 USD ou équivalent. Dans de telles circonstances, le montant gagnant du pari placé au prix révisé sera égal à celui du pari initial et toute mise excédentaire sera annulé.</p>" +
      '<h3>Autre</h3>' +
      "<p>7.1 OneBet surveille activement le trafic vers et du site Web. OneBet se réserve le droit, à sa seule discrétion, de bloquer l'accès lorsque des preuves indiquant une activité automatisée ou robotique sont trouvées.</p>" +
      "<p>7.2OneBet se réserve le droit de restreindre l'accès à tout ou à certaines parties du site Web à l'égard de certaines juridictions.</p>" +
      '<p>7.3OneBet peut changer ou modifier les produits proposés via le site Web à tout moment et pour quelque raison que ce soit.</p>' +
      "<p>7.4De temps à autre, tout ou partie du site Web peut être indisponible pour votre utilisation en raison de notre maintenance du site Web et / ou du changement ou de la modification de l'un des produits du site Web.</p>" +
      '<h2>F. NOTRE RESPONSABILITÉ</h2>' +
      '<p>OneBet décline toute responsabilité pour les dommages, responsabilités ou pertes qui sont réputés ou présumés avoir découlé de ou en relation avec le site Web ou son contenu (y compris les retards ou interruptions de fonctionnement ou de transmission, la perte ou la corruption de données , défaillance de la communication ou des lignes, utilisation abusive par quiconque du site Web ou de son contenu ou toute erreur ou omission dans le contenu).</p>' +
      "<p>Bien que OneBet s'efforce de garantir que les informations sur le site Web sont correctes, OneBet ne garantit pas l'exactitude ou l'exhaustivité des informations et du matériel sur le site Web. Le site Web peut contenir des erreurs typographiques ou d'autres inexactitudes, ou des informations qui sont surannées. OneBet n'a aucune obligation de mettre à jour ce matériel. Les informations et le matériel sur le site Web sont fournis «tels quels», sans aucune condition, garantie ou autre condition de quelque matière que ce soit. En conséquence, dans la mesure maximale autorisée par la loi, OneBet vous fournit le site Web sur la base du fait que OneBet exclut toutes les représentations, garanties expresses ou implicites, conditions et ils pourraient avoir un effet en relation avec le site Web pour ces conditions générales</p>" +
      '<p>La responsabilité totale de OneBet envers vous en vertu ou en relation avec ces Conditions générales ne dépasse</p>' +
      '<p>(a) la valeur des paris que vous avez placés via votre compte en ce qui concerne le pari concerné ou le produit qui a donné lieu à la responsabilité correspondante;</p>' +
      '<p>(b) le montant des sommes applicables, lorsque ces sommes ont été placé par erreur par nous.</p>' +
      '<p>(c) 5 000 USD (ou son équivalent) pour toute autre responsabilité.</p>' +
      "<p>OneBet ne sera pas responsable, contractuellement, délictuellement (y compris la négligence) ou pour manquement à une obligation légale ou de toute autre manière pour l'un des éléments suivants (qu'ils soient encourus directement ou indirectement)</p>" +
      '<p>(a) perte de bénéfices;</p>' +
      "<p>(b) perte d'activité;</p>" +
      '<p>(c) perte de revenus;</p>' +
      "<p>(d) perte d'opportunité;</p>" +
      '<p>(e) perte de données;</p>' +
      '<p>(f) perte de clientèle ou de réputation; ou </p>' +
      '<p>(g) toute perte spéciale, indirecte ou consécutive,</p>' +
      '<p>Que ces pertes soient ou non envisagées par les parties à la date des présentes Conditions générales</p>' +
      '<h2>G. NOS DROITS DE PROPRIÉTÉ INTELLECTUELLE</h2>' +
      "<p>Le contenu du site Web est protégé par les lois internationales sur les droits d'auteur et autres droits de propriété intellectuelle. Le propriétaire de ces droits est OneBet, ses sociétés affiliées ou d'autres concédants de licence tiers.</p>" +
      "<p>Tous les noms et logos de produits et d'entreprises mentionnés sur le site Web sont des marques de commerce, des marques de service ou des noms commerciaux de leurs propriétaires respectifs, y compris OneBet.</p>" +
      "<p>Sauf dans la mesure où il est nécessaire d'utiliser un produit dans le but de placer des paris, aucune partie du site Web ne peut être reproduite ou stockée, modifiée, copiée, republiée, téléchargée, publiée, transmise ou distribuée, de quelque manière que ce soit, inclus dans tout autre site Web ou ou des systèmes ou services privés de récupération électronique, y compris du texte, des graphiques, des vidéos, des messages, des codes et / ou des logiciels.</p>" +
      "<p>Si vous utilisez une fonctionnalité qui vous permet de télécharger du matériel, des informations, des commentaires, des publications ou tout autre contenu sur le site Web (\\ \"Contenu d'utilisateur \\\"), le Contenu d'utilisateur sera considéré comme non confidentiel et non exclusif et OneBet a le droit d'utiliser, de copier, de distribuer et de divulguer à des tiers tout contenu d'utilisateur à quelque fin que ce soit. OneBet a également le droit de divulguer votre identité à tout tiers qui prétend que tout contenu d'utilisateur publié ou téléchargé par vous sur le site Web constitue une violation de ses droits de propriété intellectuelle ou de son droit à la vie privée. OneBet a le droit de supprimer, de modifier ou de rédiger tout contenu d'utilisateur que vous créez sur le site Web</p>" +
      '<p>Toute utilisation ou exploitation commerciale du site Web ou de son contenu est strictement interdite</p>' +
      '<h2> H. AUTRES DISPOSITIONS</h2>' +
      "<p>Les Conditions Générales, la Politique de Confidentialité, la Politique des Cookies et tout document qui y est expressément mentionné et toutes les directives ou règles publiées sur le site Web constituent l'intégralité de l'accord et de la compréhension des parties et remplacent tout accord antérieur entre les parties concernant à leur sujet. Vous reconnaissez et acceptez qu'en concluant et en acceptant ces Conditions générales, la Politique de Confidentialité, la Politique des Cookies et tout document auquel ils font expressément référence et toutes les directives ou règles publiées sur le Site Web sur lesquelles vous ne comptez pas et recours à l'égard de toute déclaration, représentation, garantie, entente, promesse ou assurance (qu'elle soit faite par négligence ou innocemment) de toute personne (qu'elle soit partie à cet accord ou non) autre que ce qui y est expressément indiqué. Rien dans cette clause ne doit avoir pour effet de limiter ou d'exclure toute responsabilité en cas de fraude ou de fausse déclaration frauduleuse.</p>" +
      "<p>En aucun cas, un retard, un échec ou une omission (en tout ou en partie) dans l'application, l'exercice ou la poursuite de tout droit, pouvoir, privilège, réclamation ou recours conférés par ou découlant de ces Conditions générales ou par la loi, ne sera réputé être ou interprété comme une renonciation à ce droit ou à tout autre droit, pouvoir, privilège, réclamation ou recours à l'égard des circonstances en question, ou agir de manière à empêcher l'application de ce droit, pouvoir, privilège, réclamation ou recours , dans tout autre cas à tout moment ou à un moment ultérieur.</p>" +
      "<p>Les droits et recours prévus par les Conditions générales sont cumulatifs et (sauf disposition contraire des présentes conditions générales) n'excluent aucun autre droit ou recours disponible dans la loi. </p>" +
      "<p>Si une disposition des Conditions générales est jugée invalide ou inapplicable par un tribunal ou un organe administratif de la juridiction compétente, cette invalidité ou inapplicabilité n'affectera pas les autres dispositions des présentes conditions générales qui resteront pleinement en vigueur et effet.</p>" +
      "<p>Vous devez exécuter ou faire exécuter tous les documents et faire ou faire exécuter tous les autres actes et choses conformes aux Conditions générales que OneBet peut de temps à autre raisonnablement exiger afin d'acquérir et de sécuriser à OneBet le plein bénéfice des droits et avantages devant être transférés ou accordés à OneBet en vertu des Conditions générales et pour la protection et l'application de celles-ci et autrement pour donner plein effet aux Conditions générales.</p>" +
      "<p>Sauf indication contraire expresse dans ces Conditions générales, rien dans ces Conditions générales ne doit établir ou être réputé établir une relation de partenariat, de coentreprise ou d'agence entre les deux parties, et aucune des parties n'a le droit de restreindre de quelque manière que ce soit une autre partie.</p>" +
      "<p>Si le retard ou l'échec est causé par un événement, une situation ou une raison échappant à son contrôle raisonnable, OneBet ne violera pas ces Conditions générales, ni ne sera responsable du retard ou du manquement à l'exécution de toute obligation, y compris (mais sans s'y limiter) )) Toute panne du réseau de télécommunications, panne de courant, panne de matériel informatique ou de logiciel tiers, incendie, foudre, explosion, inondation, intempéries, conflits industriels ou arrêts, activités terroristes et actes du gouvernement ou d'autres autorités compétentes. Dans ce cas, le délai d'exécution devrait être prolongé de la période équivalente au retard ou au non-respect de l'obligation.</p>" +
      "<p>OneBet peut céder, transférer, facturer, sous-licencier ou traiter de toute autre manière les Conditions générales, ou sous-traiter l'un de ses droits et obligations en vertu des Conditions générales, à toute partie, y compris toute société du Groupe OneBet. </p>" +
      "<p>Toute notification à donner en vertu des Conditions générales doit être faite par écrit, en anglais et peut être signifiée par remise en main propre, par courrier de première classe, par courrier recommandé ou par courrier recommandé ou par avion, par courrier électronique ou par fax à: (a) dans le dans le cas de OneBet, l'adresse de la société OneBet concernée telle que définie au début des Conditions générales ou telle qu'affichée sur le site Web; et (b) en ce qui concerne les notifications que OneBet vous a envoyées, conformément à la procédure d'enregistrement du client (y compris toute modification des informations que vous avez notifiées à OneBet). Tout avis est réputé avoir été reçu: (a) s'il est remis en main propre, au moment de la livraison; (b) s'il est envoyé par courrier de première classe, courrier recommandé ou recommandé, à 9 h 30 (GMT) le deuxième jour franc après la date d'envoi; (c) en cas d'envoi par courrier recommandé prépayé, à 9 h 30 (GMT) le cinquième jour franc après la date d'envoi; (d) s'il est envoyé par courrier électronique, au moment de l'envoi; et (e) s'il est envoyé par télécopie, au moment de la transmission par l'expéditeur.</p>" +
      "<p> Les annexes, la Politique de Confidentialité et tout document qui y sont explicitement mentionnés et toutes les directives ou règles publiées sur le site Web font partie intégrante de ces Conditions générales, et auront plein effet dans le texte intégral de cet accord. En cas d'incohérence entre l'objet des présentes conditions générales et l'annexe, la Politique de Confidentialité et / ou tout document qui y est explicitement mentionné dans celle-ci, et toute directive ou règle publiée sur le site Web, sauf indication contraire, le sujet prévaudra . </p>" +
      '<h2>I. PLAINTES, LITIGES, LOI APPLICABLE ET JURIDICTION</h2>' +
      "<p>Si des transactions passées ou en cours entraînent des réclamations ou des litiges, veuillez nous contacter.Si OneBet ne peut pas résoudre le litige, OneBet transférera le litige à l'arbitre. La décision de l'arbitre sera définitive (sans compter les erreurs évidentes), mais elle doit être pleinement représentée par les parties concernées. À moins que OneBet ne soit pas en mesure d'appliquer la décision d'arbitrage, tout litige concernant un pari / enjeux n'entraînera pas de litige, de procédure judiciaire ou d'opposition à la licence ou au perrmis du revendeur (y compris la licence d'opérateur distant ou la licence personnelle).</p>" +
      "<p>Règlement des paris sur les sports américains: Dans tous les cas, les paris sur les sports américains seront réglés à l'aide des statistiques et des résultats fournis par l'instance dirigeante de chaque sport (sauf erreurs manifestes). Les organes directeurs concernés sont les suivants: NFL, NCAAF, CFL, NBA, NCAAB, NHL, MLB, NASCAR, MLS et le circuit de la PGA.</p>" +
      "<p>Sous réserve du paragraphe B.3.1 ci-dessus, les présentes Conditions Générales et tout litige ou réclamation découlant de ou en relation avec lui ou son objet, qu'il soit de nature contractuelle ou non contractuelle, seront régis et interprétés par conformément aux lois de l'Ouganda.</p>" +
      "<p>En acceptant les Conditions Générales et / ou en plaçant des paris ou des enjeux et / ou en utilisant (que ce soit autorisé ou non) des installations offertes par OneBet (que ce soit via le site Web ou autrement), vous acceptez irrévocablement que les tribunaux de l'Ouganda aura la compétence exclusive pour régler tout litige pouvant découler de ou en relation avec ces Conditions Générales. Nonobstant ce qui précède, OneBet est en droit de porter plainte contre un client devant le tribunal du pays de domicile du client.</p>" +
      '<h2>Annexe</h2>' +
      '<h3>Annexe un</h3>' +
      '<p>OPTIONS DE DEVISES DISPONIBLES SUR OneBet</p>' +
      '<p>Shillings ougandais (XAF)</p>' +
      '<h3>Annexe deux</h3>' +
      '<p>DISPOSITIONS DE PARI</p>' +
      '<p>Paris sportifs et événements spéciaux</p>' +
      "<p>Nous acceptons les paris / enjeux sur les événements sportifs et autres événements spéciaux annoncés sur le site Web. Tous ces paris / enjeux sont soumis aux règles applicables à chaque sport, par exemple, Football, tennis, boxe, etc. Dans un match entre deux équipes où les participants sont nommés, si un joueur est remplacé avant le début du match, tous les paris sur le match placés avant le changement seront nuls, gagnants ou perdants. Nos règles générales de paris s'appliqueront à toutes les situations non couvertes par les règles spéciales.</p>" +
      "<p>Le résultat d'un match ou d'un événement sera déterminé au jour de sa conclusion à des fins de paris, sous réserve de confirmation par l'instance dirigeante du sport concerné. Toute enquête ultérieure pouvant entraîner une décision annulée ne sera pas reconnue par OneBet et le règlement initial des paris sera maintenu.</p>" +
      "<p>Si le lieu d'un événement sportif est modifié, tous les paris placés sur la base du lieu d'origine seront annulés et les mises seront remboursées, sauf indication contraire.</p>" +
      '<p>Montant minimum des paris</p>' +
      "<p>Le montant minimum des paris pour chaque commande correspond à la valeur pertinente définie ci-dessous en fonction de la devise du compte de l'utilisateur: - 200XAF.</p>" +
      '<p>Gains maximum</p>' +
      "<p>Les gains maximums pour chaque pari correspondent à la valeur pertinente définie ci-dessous en fonction de la devise du compte de l'utilisateur: -1 000 000XAF .</p>" +
      '<p>Paris de contingence associés</p>' +
      "<p>Les paris multiples combinant différentes sélections au sein du même événement ne sont pas acceptés lorsque le résultat de l'un affecte ou est affecté par l'autre.</p>" +
      '<p>Par exemple, dans un match de football impliquant Arsenal et Everton:</p>' +
      '<p>Si les chances pour le paiement final de Manchester United à domicile contre Tottenham sont de 2,00 et que les chances de score correctes pour le paiement final de Manchester United 1-0 sont de 8,00, en ayant le pari multiple du paiement final de Manchester United et le score correct à 1 -0, un client obtiendrait 16,00 pour un pari qui devrait avoir une chance de 8,00. comme si Manchester United gagnait 1-0, ils auraient automatiquement gagné le match.</p>' +
      "<p>Une exception à cette règle est lorsque des chances spéciales sont offertes pour l'éventualité combinée, par exemple:le premier joueur à gagner le Score/ le Score correct, connu sous le nom de Scorecast.</p>" +
      "<p>Lorsque les parties liées d'un pari sont résolues à des moments différents mais toujours dans le même tournoi, le pari sera réglé comme indiqué, le prix de la deuxième sélection ou de la sélection suivante étant déterminé à chaque étape individuelle.</p>" +
      '<p>Par exemple, un pari multiple de:</p>' +
      '<p>Paiement final de à la demi-finale de Wimbledon;</p>' +
      '<p>Paiement final de Nadal au tournoi de Wimbledon.</p>' +
      '<p>Comme les chances de la deuxième sélection dépendent du résultat de la première, les chances de Nadal de gagner le tournoi au moment où le pari a été placé ne peuvent pas être utilisées pour calculer le pari multiple, et les chances correctes après la sélection initiale sont terminé et sera attribué contrairement </p>' +
      "<p>Les paris multiples combinant différentes sélections au sein de différents événements ne sont pas non plus acceptés lorsque le résultat de l'un affecte ou est affecté par l'autre.</p>" +
      '<p>Par exemple, un pari multiple séletionnant</p>' +
      '<p>Paiement final de Formosa des 2000 Guinées; et</p>' +
      '<p>Paiement final de Formosa au Derby.</p>' +
      "<p>Comme les chances pour le paiement final de Formosa au Derby dépendent du fait qu'elle remporte les 2000 Guinées, les chances pour son paiement final au Derby au moment où le pari a été lancé ne peuvent pas être utilisées pour calculer le pari multiple. Contrairement,un prix spécial pour gagner les deux courses sera proposé</p>" +
      "<p>Dans le cas de tous les multiples, y compris des sélections avec des résultats connexes, si un pari est pris par inadvertance, OneBet se réserve le droit d'annuler une partie ou la totalité du pari.</p>"
  },
  aboutus: {
    title: 'À propos de nous',
    content:
      "<p>OneBet, une plateforme de paris sportifs et de casino en ligne de premier plan au monde, jouit d'un prestige en Afrique,avec une machine à sous virtuelle incorporée ici, on peut placer ses paris sur l'application mobile disponible, ici retourne sur l'application.OneBet applique sa technologie haut de gamme en introduisant de nouvelles façons de parier à une multitude de fans de football passionnés, selon la commodité. </p>" +
      "<p>OneBet soutient la société en créant une plate-forme de paris où une technologie précise et un service appréciable sont incorporés, sur quoi l'application mobile de jeu retient beaucoup d'attention après son lancement. La mission de OneBet est de fournir aux clients des jeux de casino d'un bon rapport qualité-prix d'une manière qui contribue au développement de la culture des paris.</p>" +
      "<p>OneBet est une société enregistrée située à Johannesburg, en Afrique du Sud, sous l'enregistrement de OneBet Limited, par conséquent, le droit d'interprétation finale de toute divergence est mérité par la société.</p>" +
      '<p>Vous pouvez compter sur OneBet pour des conseils et des solutions:</p>' +
      '<p>Mail:{mail}</p>'
  },
  giftModal: {
    title: 'Reçu les cadeaux cash! | les cadeaux cash pas utilisés!',
    art: "l'utiliser à votre grille de paris",
    view: 'Profil',
    betNow: 'PARIER MAINTENANT',
    reminder: "Qu'est-ce qu'un cadeau en cash?"
  },
  download: {
    site: 'OneBet.cm',
    download: 'Télécharger gratuitement',
    android: 'pour android 4.03 or plus avancé',
    art: 'Gagnez Gros dans votre jeu de sport préféré'
  },
  privacy: {
    title1: 'Politique de Confidentialité',
    art1: "Cette politique de confidentialité est convenue entre vous et les entités corporatives de OneBet («OneBet», «Nous», «Nous» ou «Notre» selon le cas).OneBet ne traitera vos données personnelles qu'aux fins pour lesquelles il les a collectées, soit pour vous fournir un service de paris en ligne.",
    art2: "OneBet ne partage normalement pas vos données avec d'autres tiers;Cependant, la loi ou une procédure judiciaire nous oblige parfois à divulguer vos informations personnelles.Nous pouvons également divulguer des informations vous concernant si nous estimons que la divulgation est nécessaire dans l'intérêt public.",
    art3: "Vous avez le droit d'accéder à vos données et de demander qu'elles soient modifiées ou supprimées sans frais pour vous.Vous avez également le droit de ne plus recevoir d'informations marketingVous pouvez le faire en supprimant simplement la coche dans la page de Compte lorsque vous vous connectez.",
    art4: "En nous soumettant vos informations et en utilisant le site Web, vous confirmez votre consentement à l'utilisation de vos informations personnelles comme indiqué dans la présente Politique de Confidentialité. Si vous n'acceptez pas les conditions de cette politique de confidentialité, veuillez ne pas utiliser le site Web ou nous fournir vos informations personnelles par d'autres moyens.",
    title2: 'Introduction',
    art5: 'Votre vie privée est importante pour OneBet.Nous suivons de près les lois et garantissons la légalité. Nous nous efforçons de protéger vos informations personnelles à tout moment en mettant en œuvre des contrôles techniques et organisationnels adéquats. Veuillez prendre un moment pour lire la politique suivante pour savoir comment nous traitons vos informations personnelles, car votre utilisation de nos services indiquera votre acceptation de son contenu .',
    title3: 'But de la collecte',
    art6: "Nous recueillons et utilisons vos informations personnelles pour satisfaire aux exigences légales et réglementaires;à des fins historiques et statistiques;pour la sécurité et le contrôle et pour la bonne prestation de nos services.De temps à autre, nous pouvons également utiliser vos informations personnelles pour vous contacter par courrier, e-mail, téléphone ou téléphone portable pour vous présenter nos produits ou tout événement, activité, projet, plan, développement, engagement et offre spéciale en cours, étant promu ou soutenu par OneBet. Les données que vous avez fournies lors de votre inscription en ligne ou par la suite seront conservées par OneBet et seront uniquement utilisées pour déterminer la légalité de l'inscription et de l'activité sur le site Web. En nous fournissant vos informations, vous confirmez que vous ne considérez pas l'utilisation de vos informations conformément à la présente Politique de Confidentialité comme une violation de vos droits en vertu de la «Loi».,Nous vous encourageons à nous contacter à tout moment et à vous rappeler votre droit de refuser à tout moment de recevoir tout matériel promotionnel ou marketing de notre part.",
    title4: 'Divulgation à des tiers',
    art7: "En tant que politique, OneBet ne divulguera aucune information personnelle à quiconque autre que les employés qui ont besoin d'accéder à vos données pour vous fournir un service. Cependant, nous pouvons être tenus par la loi ou une procédure judiciaire de divulguer vos informations personnelles aux autorités.",
    title5: 'Protection des informations',
    art8: 'OneBet protège la sécurité des données que vous nous fournissez avec des procédures physiques, électroniques et de gestion.Veuillez noter que nous ne pouvons garantir que les données transmises sur Internet sont entièrement sécurisées.En conséquence, nous vous encourageons à prendre toutes les précautions nécessaires pour protéger vos données personnelles lorsque vous êtes sur Internet.',
    title6: 'Accès aux informations',
    art9: "La direction de PremeirBet ainsi que l'équipe Fraude auront le droit d'accéder aux informations personnelles soumises relatives aux joueurs inscrits. Vous avez toujours un droit d'accès aux informations que nous avons sur vous. Pour consulter et mettre à jour vos informations de contact personnelles, contactez simplement OneBet et vous recevrez des informations sur vos données personnelles que nous détenons.Si vous préférez, vous pouvez contacter notre service pour les clients en utilisant les coordonnées disponibles sur le site..De plus, vous avez le droit de corriger toutes les informations incorrectes et de les supprimer dans le cas échéant. Nous avons le droit de vous demander de nous fournir une demande écrite pour des informations que nous détenons .",
    title7: 'Engagement envers la confidentialité',
    art10:
      "Pour vous assurer que vos informations personnelles restent confidentielles; nous communiquons ces directives de confidentialité à chaque employé de OneBet. Le site Web de OneBet peut, de temps à autre, contenir des liens vers d'autres sites. OneBet ne partage pas vos informations personnelles avec ces sites Web et n'est pas responsable de leurs pratiques de confidentialité.Nous vous encourageons à vous renseigner sur les politiques de confidentialité de ces sociétés. Si nous allons utiliser vos informations personnelles différemment de celles indiquées au moment de la collecte, nous vous en informerons en conséquence. La Politique de Confidentialité de OneBet peut être modifiée à tout moment. Il est dans votre intérêt de consulter régulièrement la politique de confidentialité pour tout changement."
  },
  howToPlayTitle: 'Comment faire',
  howToPlay: [
    {
      title: 'Déposer',
      list: [
        {
          title: '1. Comment déposer?',
          art:
            'Step 1. cliquer sur le compte ' +
            '<br> Step 2. trouver le dépôt' +
            '<br> Step 3. entrer le montant que vous souhaitez déposer.' +
            '<br> Notice:' +
            '<br> 1. Avant de déposer, veuillez vous assurer que vous avez suffisamment de fonds sur le compte de votre portable.' +
            '<br> 2. Une fois que vous avez entré le montant que vous souhaitez déposer, une fenêtre contextuelle de demande de transaction apparaîtra sur votre téléphone. Ensuite, vous pouvez entrer votre code de PIN pour confirmer la transaction.' +
            "<br> 3. Si l'autorisation du code de PIN n'apparaît pas dans 30 secondes, veuillez composer manuellement #150*50# (ORANGER) ou *126# (MTN) pour l'autorisation."
        },
        {
          title: '2. Pourquoi un délai de dépôt existe?',
          art:
            "À cause de l'instabilité du réseau, vous pouvez rencontrer un certain retard de votre dépôt pour qu'il puisse être reflété sur votre compte. Mais ne vous inquiétez pas, il sera bientôt crédité.\n" +
            "Si votre dépôt n'a toujours pas été reflété dans une heure, vous pouvez contacter notre service en ligne pour obtenir de l'aide."
        },
        {
          title:
            '3. Quel est le montant minimum et maximum de dépôt par transaction?',
          art:
            'Le montant minimum de dépôt est de 50 XAF par transaction.' +
            '<br> Le montant maximum de dépôt est de 1000000 XAF par transaction.'
        }
      ]
    },
    {
      title: 'Retirer',
      list: [
        {
          title: '1. Comment déposer?',
          art:
            'Step 1. cliquer sur le compte' +
            '<br> Step 2. trouver le retrait' +
            '<br> Step 3. entrer le montant que vous souhaitez déposer' +
            '<br> Step 4. cliquer sur la demande de retrait.  ' +
            '<br> Notice: Vous devez compléter la confirmation en entrant le code de vérification que vous avez reçu de SMS pour votre premier retrait. '
        },
        {
          title: '2. Pourquoi un délai de retrait existe?',
          art: "À cause de l'instabilité du réseau, vous pouvez rencontrer un certain retard de retrait pour qu'il puisse être reflété sur votre compte de téléphone. Mais ne vous inquiétez pas, il sera bientôt crédité."
        },
        {
          title:
            '3. Quel est le montant de retrait minimum et maximum par jour?',
          art:
            'Le montant minimum de retrait est de 500 XAF par transaction. Le montant maximum de retrait est de 100,000 XAF par transaction.' +
            '<br> La valeur de transaction quotidienne maximale est de 1000000 XAF.'
        }
      ]
    },
    {
      title: 'Connexion',
      list: [
        {
          title: '1. Comment connecter?',
          art: "Vous pouvez trouver l'icône «connexion» dans le Menu- en haut à gauche de l'en-tête, cliquez dessus pour vous connecter avec succès."
        },
        {
          title: "2. Que se passera-t-il si j'ai oublié la connexion hier?",
          art: "Si vous avez oublié la connexion hier, vous ne recevrez pas les pièces d'hier. Veuillez vous assurer la connexionr tous les jours."
        }
      ]
    },
    {
      title: 'Roulette',
      list: [
        {
          title: 'Comment jouer à Roulete?',
          art: "“Roulette” se trouve sur le côté droit de l'en-tête supérieur. Il faut 20 pièces pour chaque tour. Les pièces ne peuvent être obtenues que par la connexion quotidienen. Si vous passez un cadeau ou Cadeau Cash, le montant sera immédiatement crédité sur votre solde ou partie de cadeau."
        }
      ]
    },
    {
      title: 'Jackpot Quotidien',
      list: [
        {
          title: '1. Comment jouer au jackpot quotidien?',
          art:
            'Habituellement, il y aura 8 à 13 matchs sélectionnés dans les ligues officielles.Faites vos propres pronostics sur les matchs ou vous pouvez choisir les options de sélection automatique, puis payer pour cela. Lorsque vous avez correctement pronostiqué tous les matchs, vous pouvez obtenir immédiatement un prix  de 1M XAF.' +
            '<br> Les Cadeaux ne sont pas disponibles pour le Jackpot Quotidien.'
        },
        {
          title:
            "2. Que se passera-t-il lorsque l'un des matchs sera reporté au Jackpot Quotidien?\n",
          art: "À la condition que l'un des matchs soit reporté, le Jackpot Quotidien sera annulé et tout l'argent de la mise sera remboursé sur votre solde."
        },
        {
          title: '3. Le temps du règlement du jJackpot Quotidien',
          art: 'Le temps du Daily Jackpot sera terminé dans les 24 heures suivant la fin de tous les matchs.  '
        }
      ]
    },
    {
      title: 'Pari Intime',
      list: [
        {
          title: '1. Comment jouer à Pari Intime?',
          art:
            'Le Pari Intime est un moyen de pari au succès sur notre site. Vous pouvez choisir un match, puis taper le numéro du marché (généralement le nombre est 8) sur le côté droit du match. Ensuite, les détails du marché apparaîtront. En fait, il y a 8 questions sur le match et il suffit de choisir la bonne en laquelle vous croyez. Vous pouvez au moins choisir un choix.' +
            '<br> Les Cadeaux ne sont pas disponibles pour le Pari Intime.'
        },
        {
          title:
            "2. Que se passera-t-il lorsque l'un des matchs sera reporté au Jackpot Quotidien?",
          art: "Si le match du Pari Intime sur lequel vous avez parié a été reporté ou annulé, l'argent de la mise sera remboursé directement sur votre solde."
        },
        {
          title: '3. Le temps du règlement du Jackpot Quotidien',
          art: 'Le temps du Pari Intime sera terminé dans les 24 heures suivant la fin de tous les matchs. '
        }
      ]
    },
    {
      title: 'Faire un pari',
      list: [
        {
          title: '1. Comment parier?',
          art: 'Vous pouvez faire différentes sortes de paris: paris simples, multiples et de systèmes (combinés). Après avoir fait vos choix, vous devez cliquer sur la grille de paris pour les payer. La mise minimum est de 50 XAF par pari.'
        },
        {
          title: '2. Puis-je annuler un pari?',
          art: "Oui, vous pouvez annuler votre pari à condition que tous les matchs que vous pariez n'aient pas commencé. Ensuite, l'argent de la mise sera remboursé sur votre solde en quelques minutes."
        },
        {
          title: '3. Le temps du règlement',
          art: 'Tous les règlements de match sont basés sur le résultat à la fin du temps habituel. '
        },
        {
          title: '4. Où puis-je voir mes paris sportifs et mes résultats?',
          art:
            'Veuillez vérifier «Mes Paris» directement où vous pouvez trouver une liste de tous les paris que vous avez faits.' +
            "<br> Les résultats sont à l'intérieur de «tout» dans la partie «Mon Paris». Vous pouvez cliquer dans le match pour voir les détails des résultats de votre ticket."
        }
      ]
    },
    {
      title: 'Cadeau',
      list: [
        {
          title: "1.Qu'est-ce qu'un cadeau?",
          art: 'Le cadeau ne peut être utilisé que dans votre grille de paris et il peut être déduit de votre paiement total. Les cadeaux peuvent être utilisés pour les sports et les paris en direct. Les cadeaux ne sont pas disponibles dans le Jackpot, Jackpot Quotidien et Pari Intime. '
        },
        {
          title: '2. Comment utiliser le cadeau?',
          art:
            "Avant d'utiliser un cadeau, veuillez vous assurer de son exigence de mise et de cotes." +
            '<br> e.x.: ' +
            '<br> un cadeau cash de 100 nécessite une mise de 500 ou plus, cote totale> 3,2; \n' +
            "Vous devez choisir un match avec une cote> 3,2 et placer une mise de 500 ou plus avant d'utiliser ce cadeau."
        },
        {
          title: '3. Comment obtenir un cadeau?',
          art: "Vous pouvez obtenir des cadeaux de la promotion de premier dépôt de bienvenue, de roulette et d'autres promotions sur le site."
        }
      ]
    }
  ],
  giftHowToUse: {
    button: 'Utiliser le cadeau maintenant',
    title: 'HOU À utiliser un cadeau?',
    title1: 'comment utiliser le cadeau?',
    step1: 'Étape1, Confirmez les requis de vos cadeau!',
    account: 'Compte> Cadeaux',
    art1:
      'Comme nous pouvons voir:' +
      "<br> ce cadeau a besoin d'un 600 ou plus; Cotes>3.2; Seulement pour les paris sportifs." +
      "<br> le cadeau peut être utilisé lorsque l'heure de début commence",
    step2:
      "Étape2, appuyez sur le bouton Utiliser pour entrer dans la page d'accueil et choisir le match pour parier.",
    step3:
      "Étape3,entreeBetslippour confirmersiVotre pieu et la cotes ont atteint l'exigence du cadeau.",
    'art3-1':
      "Vous pouvez également choisir le cadeau utiliserSi vous avez 2 cadeaux ou plus dans votre compteaprès l'arrivée de votre don.",
    'art3-2':
      "Habituellement, notre système choisira automatiquement le cadeau approprié pour vous si l'exigence a étéatteinte.",
    title2: 'Comment obtenir du cadeau?',
    art4: "TVoici 2 façons d'obtenir des cadeaux: ",
    'art4-1':
      '1.une manière pieres; Vous pouvez quotidiennement collecter des pièces de monnaie pour jouer aux pièces de sints pour obtenir des cadeaux.',
    'art4-2':
      "2.une manière est en participantOnebetPromotions pour obtenir des cadeaux; tel que l'invitationcopainspromotion."
  },
  giftGuide: {
    title: "QU'EST-CE QUE LE CADEAU?",
    art1: "Le cadeau est un autre type d'ARGENT que vous pouvez utiliser pour réduire votre montant de paiement tandis que le montant du pari ne changera pas sur OneBet.",
    title1: 'COMMENT UTILISER UN CADEAU?',
    step1:
      'Les cadeaux disponibles seront affichés dans votre geille de paris, choisissez un cadeau pour continuer.',
    step2:
      "Les cadeaux peuvent être utilisés pour le sport et les paris en direct. Les cadeaux peuvent avoir des conditions d'utilisation, veuillez vous assurer que votre cadeau sélectionné respecte les conditions d'utilisation.",
    step3:
      'Le montant de votre cadeau sélectionné sera automatiquement déduit de la commande lorsque vous passez une commande.',
    title2: 'COMMENT PUIS-JE OBTENIR DES CADEAUX?',
    list2: [
      '<span style="font-weight: bold">1.</span> 100% GET 50,000 CASH GIFT after register successful!',
      '<span style="font-weight: bold">2.</span> Play COIN SPIN to get CASH GIFT. Menu  -->  Get Cash <span style="color: #009A44; font-weight: bold;text-decoration: underline">Get Now</span>',
      '<span style="font-weight: bold">3.</span> OneBet Promotions.  Learn more on PROMOTIONS page'
    ],
    title3: 'QUESTIONS LES PLUS POSÉES',
    list: [
      {
        title: '1. Les «cadeaux» expirent-ils ?',
        art: 'Les cadeaux peuvent avoir une période pendant laquelle ils sont valides et après laquelle les cadeaux expireront.'
      },
      {
        title: '2. Puis-je utiliser simultanément différents "cadeaux"?',
        art: 'Un seul «cadeau» peut être utilisé par transaction.'
      },
      {
        title: '3. Est-il possible de retirer un "Cadeau"?',
        art: "Non, ce n'est pas possible."
      }
    ]
  },
  agent: {
    title: 'En contact avec nous',
    name: 'Nom',
    email: 'Email',
    mobile: 'Téléphone portable',
    contactUs: 'Nous contacter'
  },
  validate: {
    title:
      "Vous pouvez utiliser la fonction de dépôt ou de retrait <br> par vérification d'identité.",
    firstName: "Prénom (tel qu'il apparaît sur votre pièce d'identité)",
    surname: "Nom (tel qu'il apparaît sur votre pièce d'identité)",
    location: 'Emplacement',
    idType: [
      {
        id: 0,
        name: "Numéro d'identification national"
      },
      {
        id: 1,
        name: 'Passport'
      }
    ],
    reminder: {
      national: 'Veillez entrer votre ID nationale',
      passport: 'Veillez entrer votre numéro de passeport'
    },
    nationality: 'Nationalité',
    submit: 'Soumettre',
    notNow: 'Pas maintenant'
  },
  welcomeBonus: {
    button: 'Aquérir maintenant'
  },
  firstDeposit: {
    title: 'PRIME DE BIENVENUE',
    conspicuous:
      "Obtenez jusqu'à <span>100,000 XAF</span> cadeaux de pari gratuits sur votre premier dépôt",
    time: "L'accord se termine dans",
    deposit: 'Dépôt',
    get: 'Obtenir un supplément ',
    cash: 'recevoir les Cadeaux',
    buttonReminder:
      'Dépôt {deposit} pour obtenir un supplément {get} des cadeaux cash maintenant.',
    button: 'Déposer {money} Maintenant',
    title1: 'Que se passe-t-il ensuite?',
    art1: 'Vous recevrez une demande sur votre téléphone pour confirmer le paiement.',
    art2: 'Après cela, les fonds apparaîtront immédiatement sur votre compte.',
    title2: 'Attention',
    art3: '1. Seuls les clients MTN et ORANGE peuvent participer à cette promotion. Veuillez vous assurer que le solde de votre compte mobile est suffisant.',
    art4: "2. La fenêtre contextuelle est un outil d'autorisation principal au cas où le réseau aurait un service intermittent. Il se peut que la fenêtre contextuelle ne parvienne pas à envoyer la fenêtre contextuelle, vous devrez alors approuver manuellement la transaction #150*50# (ORANGE) or *126# (MTN)",
    terms: 'Conditions générales:',
    termsList: [
      "1. Chaque compte ne peut recevoir ces cadeaux cash qu'une seule fois.",
      '2. Faites votre premier dépôt de 500 / 1000 / 10000 / 50000 XAF , et vous obtenez des cadeaux cash valus de 1000 / 2000 / 20000 / 100000 XAF.',
      '3. Vous recevrez le cadeau une fois le premier dépôt effectué.',
      '4. cadeaux cash ne peuvent être utilisés que dans votre grille de paris.',
      '5. OneBet se réserve le droit final de ces cadeaux cash.'
    ],
    footer: '©2022 OneBet',
    reminder: {
      unLogin:
        'Vous pouvez déposer après vous être connecté ou vous être inscrit.',
      already:
        'Vous avez déjà participé à cette promotion auparavant, veuillez effectuer un dépôt dans le centre de dépôt. Le centre fait des dépôts.',
      success:
        'Veuillez entrer le code PIN de service pour autoriser le dépôt.',
      submit:
        "Soumettez avec succès. L'autorisation du code PIN ne s'affiche pas depuis 30 secondes, composez manuellement #150*50# (ORANGE) or *126# (MTN) pour l'autoriser. Sinon, vous devez réessayer en appuyant sur le bouton de dépôt."
    },
    login: "S'identifier",
    register: "S'enregistrer",
    continue: 'Continuer'
  },
  dailyJackpotIndex: {
    win: 'WIN UPTO XAF  ',
    marketList: ['GG/NG', '3 WAY']
  },
  dailyJackpotDetail: {
    back: 'Retour',
    marketList: ['GG/NG', '3 WAY'],
    expires: 'Expirations dans  ',
    win: 'GAGNER',
    stake: 'MISE',
    clear: 'Effacer tout',
    place: 'PLACER LE PARI',
    auto: 'Sélection automatique',
    pick: 'Matchs sélectionés pour {length}/{totalLength}'
  },
  hotTournaments: [
    {
      country_name: 'Angleterre',
      tournament_name: 'Premier League',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 17,
      color: '#C4ADF4',
      width: '2.77778rem'
    },
    {
      country_name: 'Espagne',
      tournament_name: 'LaLiga Santander',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 8,
      color: '#AEC0EA',
      width: '2.77778rem'
    },
    {
      country_name: 'Allemagne',
      tournament_name: 'Bundesliga',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 35,
      color: '#F8A6A8',
      width: '2.77778rem'
    },
    {
      country_name: 'Italie',
      tournament_name: 'Serie A',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 23,
      color: '#AEC0EA',
      width: '2.77778rem'
    },
    {
      country_name: 'France',
      tournament_name: 'Ligue 1',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 34,
      color: '#AEC0EA',
      width: '2.77778rem'
    },
    {
      country_name: 'International Clubs',
      tournament_name: 'UEFA Ligue des Champions',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 7,
      color: '#AEC0EA',
      width: '3.61111rem'
    },
    {
      country_name: 'International Clubs',
      tournament_name: 'UEFA Ligue Europa',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 679,
      color: '#B4B4B4',
      width: '3.61111rem'
    },
    {
      country_name: 'Angleterre',
      tournament_name: 'Championship',
      sport_id: 1,
      sport: 'Football',
      tournament_id: 18,
      color: '#B4B4B4',
      width: '2.77778rem'
    }
  ],
  inviteFriend: {
    title: 'Invitez vos amis sur OneBet!',
    art: 'Vous pouvez tous les deux obtenir des récompenses',
    CITitle: 'Revenu cumulé',
    IF: 'Amis invités',
    fp: 'FreeBet Paiement',
    rewards: 'Récompenses',
    rftf: "Parrainez un ami pour terminer l'inscription sur OneBet, vous pouvez tous les deux obtenir <span>100 XAF FreeBet</span>",
    rewardsStep: [
      'Parrainez des amis',
      "L'ami termine <br> l'inscription",
      'Les deux obtiennent <br> <span>100 XAF FreeBet</span>'
    ],
    sm: 'Médias sociaux',
    rdf: 'Parrainez un ami désigné',
    rec: 'Recommander',
    rh: 'Historique des récompenses',
    hisarr: ['Tout', 'À utiliser', 'Pour déverrouiller', 'Retirable', 'gagner'],
    up: 'Déverrouiller le paiement',
    wmta: 'Retirer au solde du compte',
    ifpn: "Entrez le numéro de téléphone de l'ami",
    ufp: 'Débloquez le paiement FreeBet',
    fa: "Compte d'amis",
    btn: [
      '',
      '',
      'En attente du résultat du ticket',
      '',
      'Déverrouiller',
      '',
      'Retirer au compte',
      'Utiliser'
    ],

    rules: [
      '1. Récompense',
      "Parrainez un ami pour terminer l'inscription sur OneBet, vous pouvez tous les deux obtenir un pari gratuit de 100 XAF. Vous pouvez consulter Compte —> Mon autorité —> Pari gratuit",
      '2. Pari gratuit',
      [
        'a.Chaque pari gratuit obtenu via cette promotion expirera dans 7 jours;',
        "b.Chaque paiement de pari gratuit réglé sera compensé après 7 jours si vous n'avez pas retiré le gain sur le solde de votre compte;",
        "c.Condition de déblocage: le montant de pari de l'invité sur OneBet doit atteindre 2,000 XAF",
        "d.Retrait: débloquez avec succès et demandez le retrait avant l'expiration, l'argent du paiement du pari gratuit sera crédité sur le solde de votre compte."
      ],
      "3. Pour bénéficier d'un cadeau de parrainage, le client parrainé doit être un nouveau client et ne détenir aucun compte chez OneBet.",
      '4. OneBet se réserve le droit final de cette promotion.'
    ],
    title1: 'VOUS AVEZ UN TOTAL DE <br> XAF <span>{gifts}</span>EN CADEAUX',
    viewMore: 'VOIR PLUS',
    title2: 'SUIVEZ LES ÉTAPES CI-DESSOUS<br> POUR OBTENIR VOS CADEAUX',
    item1:
      " 1. Cliquez sur partager pour partager un lien qui comprend votre code d'invitation.",
    share: 'PARTAGER',
    item2:
      "2. Une fois que votre ami fait des paris avec les mises dans le cadre d'une valeur totale de 2,000 XAF ou plus, Onebet créditera les deux comptes des participants. bonus peut être consulté en allant à",
    bonus: '"Mes Cadeaux"',
    terms: 'Conditions générales:',
    terms1:
      "1. Lorsqu'un client nouvellement invité fait des paris d'une valeur de 2,000 XAF ou plus, vous pouvez obtenir un bonus de 2,000 et votre ami invité peut obtenir un bonus de 1,000;",
    termsA:
      '   A. Un client nouvellement invité chez OneBet doit placer un montant total de mises avec toutes les chances de 2,0 ou plus, ce qui représente un total de 2,000 XAF ou plus (peut être placé à des moments différents).',
    termsB:
      '   B. Seules les mises réglées sont valables pour cette promotion.',
    termsC:
      '   C. Une mise réglée ne sera pas valable si une mise a été entièrement encaissée. Si une mise a été partiellement encaissée, la mise réglée sera calculée sur la base de la mise active restante.',
    Customer: 'Client',
    Invitor: 'Hôte',
    Invitee: 'Invité',
    Value: 'Valeur',
    Amount: 'Montant',
    requirement: 'Exigence de mises',
    Games: 'Jeux',
    terms2:
      "2. Pour se qualifier pour un Cadeau d'Invitation, le client invité doit être un nouveau client et ne détenir aucun compte sur OneBet.",
    terms3:
      '3. Une fois que le client nouvellement invité répond aux Conditions de Mise (A, B et C) pour obtenir un "Cadeau en Cash ", un "Cadeau en Cash" de 1,000 XAF sera automatiquement crédité au client nouvellement invité et un "Cadeau en cash" de 2,000 XAF sera crédité sur le compte du hôte.',
    terms4: '4. Chaque Cadeau obtenu de cette promotion sera valable 7 jours.',
    terms5: '5. Onebet se réserve le droit final de cette promotion.',
    terms6:
      "6. OneBet se réserve le droit de modifier, d'annuler, de réclamer ou de refuser toute promotion afin d'assurer l'égalité et l'équilibre des promotions à sa seule discrétion. Des promotions et des cadeaux sont créés afin de récompenser nos clients les plus précieux. En cas de suspicion de fraude ou d'abus de cette promotion par tout client, nous nous réservons le droit de supprimer les Cadeaux et les gains concernés d'un compte donné ou de tout compte concerné.",
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    sms: 'SMS',
    myFriends: 'Mes Amis',
    totalInvited: "Nombre Total d'Amis Invités: ",
    totalBonus: 'Cadeaux Totaux Retournés: XAF ',
    friend: 'Ami',
    Stake: 'Mise',
    Settled: 'Réglé',
    Registration: 'Enregistrement',
    continue: 'Continuez à inviter',
    noData1: "Vous n'avez encore invité aucun Ami. ",
    noData2: ' Commencez à inviter vos Amis maintenant!',
    invite: 'Invitez Maintenant',
    shareWords:
      'Je vous invite à vous joindre à OneBeti pour Gagner Gros! Inscrivez-vous maintenant pour recevoir 100,000 XAF cadeaux cash! Cotes élevées, paiements rapides, retraits gratuits, Jouissez du meilleur jeu de paris en direct via:',
    reminder:
      'Désolé, le PC ne peut pas envoyer de message, Veuillez utiliser votre téléphone pour réessayer',
    message:
      'Je vous invite à vous joindre à OneBeti pour Gagner Gros! Inscrivez-vous maintenant pour recevoir 100,000 XAF cadeaux cash! Cotes élevées, paiements rapides, retraits gratuits, Jouissez du meilleur jeu de paris en direct via: '
  },
  dailyBetRefund: {
    art1: 'GET 20% REFUND',
    art2: 'if your daily first bet without winning!',
    conditions: 'Must Meet Following Conditions:',
    conditions1: '1. Daily first Ticket betting amount ≥ XAF 10,000',
    conditions2: '2. Daily first Ticket Odds ≥ 3.20',
    betNow: 'Bet Now',
    valid: 'Valid Time: Oct. 30 - Nov. 8',
    terms: 'Terms et Conditions',
    termsList: [
      '1. This promotion only available for daily first Ticket; ',
      "2. Jackpot, Daily Jackpot et Intimate Bet's Ticket are not available for this promotion; ",
      "3. The 20% refund is according to your daily first betting amount ( Gift won't be counted in your betting amount); ",
      '4. The 20% bet amount will refund to your Onebet Balance;',
      '5. This promotion only available for sports ( Prematch, Live ); ',
      '6. OneBet reserves itself the right to amend, cancel, reclaim or refuse any promotion in order to ensure equality et the balance of promotions at its own discretion. Promotions et Gifts are created in order to reward our most valued customers. Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the right to remove Gifts et associated winnings from a given account or any associated accounts.'
    ]
  },
  liveMatchs: {
    0: [
      {
        name: 'My Favorite',
        matchId: '',
        teams: []
      },
      {
        name: '1X2',
        matchId: [1],
        teams: ['1', 'X', '2']
      }
    ],
    1: [
      {
        name: 'My Favorite',
        matchId: '',
        teams: []
      },
      {
        name: 'For You',
        matchId: [1, 18, 10, 60, 8],
        teams: []
      },
      {
        name: '1X2',
        matchId: [1],
        teams: ['1', 'X', '2']
      },
      {
        name: 'Over/Under',
        matchId: [18],
        teams: ['Goals', 'Over', 'Under']
      },
      {
        name: 'Next Goal',
        matchId: [8],
        teams: ['1', 'None', '2']
      },
      {
        name: 'Double chance',
        matchId: [10],
        teams: ['12', 'X2', '1X']
      },
      {
        name: '1st 1X2',
        matchId: [60],
        teams: ['1', 'X', '2']
      },
      {
        name: '2nd 1X2',
        matchId: [83],
        teams: ['1', 'X', '2']
      },
      {
        name: 'Home Over/Under',
        matchId: [19],
        teams: ['Goals', 'Over', 'Under']
      },
      {
        name: 'Away Over/Under',
        matchId: [20],
        teams: ['Goals', 'Over', 'Under']
      }
    ],
    dateName: {
      0: "Aujourd'hui",
      1: 'Demain'
    }
  },
  popularMatches: [
    {
      name: '1X2',
      matchId: 1,
      teams: ['1', 'X', '2']
    },
    {
      name: 'Over/Under',
      matchId: 18,
      teams: ['Goals', 'Over', 'Under']
    },
    {
      name: 'Double chance',
      matchId: 10,
      teams: ['12', 'X2', '1X']
    },
    {
      name: 'Both teams to score',
      matchId: 29,
      teams: ['Yes', 'No'] // yes no
    },
    {
      name: '1st half - total',
      matchId: 68,
      teams: ['Goals', 'Over', 'Under']
    },
    {
      name: '1st half - 1x2',
      matchId: 60,
      teams: ['1', 'X', '2']
    }
  ],
  storeModal: {
    add: 'Ajouté avec succès',
    cancel: 'Annulation réussie'
  },
  betSharing: {
    art: 'Onebet Bet-Share is a promotion that enables one to share bets placed with friends, families or colleagues. This can be done directly through social media platforms such as WhatsApp, Facebook or SMS. Participants in this promotion stand a chance of winning up to 10,000,000 XAF.',
    rank: 'MY RANK',
    play: 'PLAY NOW',
    title1: 'How dose it work',
    list1: [
      "1. In order to participate in this promotion, visit our website et click on either ‘Register' (if you are a new Onebet customer) or login.",
      '2. Place a bet et then share by clicking on the share button in your ticket.',
      '3. Recipient of the shared bet should then click on the link et place a bet.',
      '4. This promotion is ONLY applicable to normal Pre-match et live bets.',
      '5. Jackpots bets, Daily Jackpot et Intimate bet are NOT considered in this promotion.'
    ],
    title2: 'How are the payouts done?',
    list2: [
      '1. The prize will be awarded to the top 10 bet-share participants with the highest number shared bets clicked et bets placed on them in 2 work days after this promotion over.',
      '2. The Leader Board is ultimately subject to settled markets.',
      '3. The leader Board is updated every day at 00:00 AM.',
      '4. The first winner will receive 10,000,000 XAF.',
      '5. The second winner will receive 1,000,000 XAF.',
      '6. The third winner will receive 500,000 XAF (250,000 XAF Cash Gift + 250,000 cash).',
      '7. Winners from 4th to 10th winner will each receive 100,000 XAF (50,000 XAF cash + 50,000 Cash Gift).',
      '8. The money will be directly credited to your Account balance.',
      '9. OneBet reserves the final right of this promotion.'
    ],
    title3: 'How to share?',
    list3: [
      "Way 1. Choose market et place your bet, Click <span style='font-weight: bold'>SHARE NOW</span> on your bet successful page",
      "Way 2. Go to 'My Bets', enter your ticket et click <span style='font-weight: bold'>SHARE BET</span> button."
    ]
  },
  betSharingRank: {
    title: '#LeaderBoardofShareBet',
    time: 'Ends on Sunday 2020-11-29 11:59:59 PM',
    rank: 'My Rank',
    art: 'You are only one step away from success <br> Place your bet et share now!',
    art1:
      "Congratulations! You are now in the {rank}th place on today's Leader Board! \n" +
      'You are only one step away from 10,000,000 XAF. Place your Bet et share now!',
    art2:
      "Congratulations! You are now in the 1st place on today's Leader Board!\n" +
      'Keep it! The 10,000,000 XAF is almost in your pocket!',
    art3: 'You did not participate this promotion yet, place a bet et Share to join now!',
    place: 'PLACE BET',
    final: 'Your Final Ranking:',
    tableTitle: 'Bets Placed From Shared Links',
    terms: 'Terms et Conditions',
    winner: 'Winners 4 – 10: 50,000 XAF'
  },
  winAdModal: {
    title: 'Vous avez gagné',
    art: 'De ID {id} du ticket de sports réels',
    detail: 'détails'
  },
  appDownload: {
    btn: 'télécharger gratuitement',
    app: 'APP Utilisateur Exclusif',
    install:
      "<span style='font-weight: bold;'>INSTALLER L'APPLICATION ONEBET MAINTENANT!</span><br> et obtenez <span style='color: #FCFF00;font-weight: bold;'>2,000 XAF</span> - Cadeaux!",
    listOne: ['rapide & léger', 'simple & sûr', 'enregistrer <br> les Bundles'],
    listTwo: ['Casino', 'Virtual']
  },
  downloadActivity: {
    row1: "Obtenir <span style='color: #FD4505'>1,000 cadeaux en espèces pour</span><br>la première connexion après le téléchargement",
    row2: "Jusqu'à <span style='color: #FD4505'>100,000 Cash</span> pour le premier pari réussi quotidien dans l'APP",
    terms: 'Termes et Conditions',
    list: [
      "1.Cadeau en espèces après le premier téléchargement de  l'APP créditera dans votre compte immédiatement;",
      "2.Chaque appareil ou IP n'a qu'une fois pour 1,000 de cadeau en espèces du téléchargement;",
      "3.Avantages exclusifs de l'app (Cash/Cadeau en espèces/ Pari gratuit) seront directement reversés sur votre compte.;",
      "4.OneBet se réserve le droit de l'interprétation finale pour cette Promotion."
    ]
  },
  newbieExclusive: {
    betNow: 'Pariez maintenant',
    boxList: [
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>50 Paris Gratuits</span><br>donnés après un pari réussi quotidien",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>20% montant du pari</span><br>sera retourné si le premier pari quotidien a échoué",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>5,000 Cadeau en espèces pour</span><br>le registre pendant 7 jours consécutifs",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>Obtenir un bonus en espèces</span><br> inattendu par un pari consécutif pendant une semaine",
      "<span style='color: #FF602F;font-weight: 800; font-size: 0.33333334rem'>Jusqu'à 100,000 Cadeau en espèces pour</span><br>le premier dépôt"
    ],
    terms: [
      '1.50 paris gratuits donnés pour seulement un premier pari réussi chaque jour;',
      "2.20% du pari sera retourné seulement si la cote totale du premier Ticket par jour est supérieure ou égale à 5,5 et que le prix n'est pas gagné;",
      '3.Il faut seulement se connecter  pendant 7 jours consécutifs pour 5,000 Cadeaux en espèces;',
      '4.Bonus(Cash / Cadeau en espèces / Pari gratuit) obtenu en pariant pendant une semaine sera directement versé sur votre compte Onebet;',
      "5.Nouveaux utilisateurs peuvent profiter de cette politique d'activité dans les 10 jours après l'inscription réussie;",
      '6.DURÉE: 20/01/2021 ~20/02/2021;',
      "7. OneBet se réserve le droit de modifier, d'annuler, de réclamer ou de refuser toute promotion afin d'assurer l'égalité et l'équilibre des promotions à sa propre discrétion. Des promotions et des cadeaux sont créés afin de récompenser nos clients les plus précieux. En cas de soupçon de fraude ou d'abus de cette promotion par tout client, nous nous réservons le droit de supprimer les cadeaux et les gains associés d'un compte donné ou de tout compte associé."
    ]
  },
  freeBet: {
    activity: 'Place 2 Bets or more get 1 FreeBet',
    title: 'Free Bet',
    free: 'Parier gratuitement',
    predict: "Prédites un jeu au moins une fois, gagnez jusqu'à ",
    money: '500,000,000 XAF',
    name: 'Freebet',
    login: 'Login to Bet',
    pick: 'Picked {select}/{length} Matches',
    noFree: `No free bet, <span style='color:${mainThemeColor}'>get now!</span>`,
    unlockReminder: `You have some locked Freebet, <span style='color: ${mainThemeColor}'>check now!</span>`
  },
  freeBetList: {
    title: 'Voir le pari gratuit',
    more: 'Sur les matchs de {number} ou plus',
    useNow: 'Utiliser'
  },
  freeBetPromotion: {
    claim: 'Réclamer Freebet',
    get: 'Obtenir plus freebet',
    first: "Premier pariez sur l'application",
    invite:
      'Invitez un ami à inscrire et placer des paris, Vérifier vos amis invités en invitation Promotion',
    upperBtn: 'Pariez maintenant',
    lowerBtn: 'inviter',
    how: 'Comment utiliser Freebet?',
    step: 'Étape',
    step1:
      'Appuyez sur <Freebet> dans le menu moyen pour entrer dans la section Freebet',
    step2: 'Choisissez les jeux que vous voulez parier (au moins 6 jeux)',
    step3: 'Confirmez et appuyez sur Bier endroit pour terminer',
    title: 'Comment utiliser Freebet?',
    list: [
      '1. Chaque compte ne peut que demander 10 000 XAF Freebet par jour;',
      '2. Chaque Freebet sera expiré après 3 jours à compter de la date à laquelle vous le prétend;',
      '3. Chaque invitation et vous avez avec succès avec vous un seul freebet;',
      "4. Chaque numéro de téléphone / périphérique ne peut obtenir que Freebet tandis que le premier pari sur l'application;",
      '5. Tout le Freebet vous obtenez cette promotion sera crédité directement à votre compte ONEBET;',
      '6. La promotion est valide au 26 février 2021 - 31 mars 2021.;',
      '7. Pari intime ne sera pas compté dans cette activité;',
      "8. Onebet se réserve le droit de modifier, d'annuler, de récupérer ou de refuser toute promotion afin d'assurer l'égalité et le solde des promotions à sa propre discrétion. Les promotions et les cadeaux sont créés afin de récompenser nos clients les plus appréciés. Sous suspect de la fraude ou de l'abus de cette promotion par un client, nous nous réservons le droit d'éliminer les cadeaux et les gains associés d'un compte donné ou de tous les comptes connexes."
    ]
  },
  betRefused: {
    title: 'le pari a échoué',
    detail: 'Détails',
    reBet: 'Reparier',
    extra:
      "Ajoutez  <span style='color: #E62D0E'>{number}</span> autres sélections et obtenez <span style='color: #E62D0E'>{percent}%</span> bonus gagnés."
  },
  betslipBonusNew: {
    bonus: 'Méga-Bonus de Onebet',
    terms: 'Conditions Générales',
    art: "OneBet Méga-Bonus offre une excellente chance de gagner un bonus jusqu'à 600% sur les paris sur OneBet. Cette offre s'applique aux retours sur tous les événements, tous les marchés du sport et des paris en direct avec 3 sélections ou plus avec une cote de 1,2 ou plus. Si votre pari gagne, les bonus suivants seront ajoutés à vos retours:",
    termsList: [
      "1. Cette offre s'applique aux retours de tous les événements, tous les marchés du sports et des paris en direct avec 3 ou plus avec une cote de 1.2 ou plus.",
      '2. Le taux de bonus est séléctioné selon le nombre de sélections avec une cote de 1.2 ou plus.',
      "3. Formule de Calcul du Bonus: mise*cote totale*taux de bonus. Par exemple: si un joueur choisit 5-Fois, avec 5 cotes telles que 1,54, 2,3, 2, 12, 1,15 et la mise est de 100, alors le bonus maximum sera: 100 * (1,54 * 2,3 * 2 * 12 * 1,15 ) * 5% (dans ce cas, seules 4 sélections atteignent l'exigence de cotes, le taux de bonus maximum sera calculé sur la base de 4 fois comme la liste ci-dessus).",
      "4. Le bonus ne s'appliquera pas si une mise a été entièrement encaissée. Si une mise a été partiellement encaissée, le bonus sera calculé sur la base de la mise active restante.",
      '5. Une partie de bonus des retours sera ajoutée au compte du client après le règlement des commandes du client.',
      "6. Dans le cas d'une sélection reportée / annulée, le bonus s'appliquera toujours, mais les cotes seront calculées à 1,0. Par exemple: Si un joueur choisit 6-Fois, avec 6 cotes telles que 1,54, 2,3, 2, 12, 1,15, 2 et la mise est de 100, alors le bonus sera: 100 * (1,54 * 2,3 * 2 * 12 * 1,15 * 2) * 10%. Lorsque la dernière sélection est annulée, le bonus sera de 100 * (1,54 * 2,3 * 2 * 12 * 1,15 * 1) * 5%. Notez que le taux de bonus passe également de 10% à 5% car il n'y a que 4 sélections avec des cotes supérieures à 1,2 maintenant.",
      "7. En cas de violation d'une condition de l'offre ou de la promotion ou en cas de preuve d'une série de paris placés par un client ou une groupe de clients, qui car le bonus de dépôt, de paiements améliorés, de paris gratuits, de paris sans risque ou de toute autre offre promotionnelle se traduit par des bénéfices clients garantis quel que soit le résultat, que ce soit individuellement ou en groupe, OneBet se réserve le droit de récupérer l'élément bonus de ces offres et, à son entière discrétion, soit de régler les paris à la cote correcte, d'annuler le gratuit et sans risque paris ou annuler tout pari financé par le bonus de dépôt.",
      "Onebet se réserve le droit de modifier, d'annuler, de réclamer ou de refuser toute promotion à sa discrétion.\n"
    ]
  },
  betslipApp: {
    gift: "Cadeau exclusif de l'App",
    open: 'Ouvrir',
    con: 'Félicitations!',
    get: "<span style='color: #FEEF00'>{number}</span> {type} obtenus",
    use: 'Utiliser',
    giftList: ['pièces', 'cadeaux en espèces', 'pari gratuit']
  },
  jackpotUpdate: {
    title: 'Poue nos chers  clients:',
    art1: "Nous sommes en train d'améliorons votre Jackpots/Jackpot Quotidien/Pari Intime préféré pour améliorer votre expérience de jeu. Nous nous excusons beaucoup de vous donner  les inconvénients causés par le renouveau.",
    art2: 'Pour vous assurer de continuer à bénéficier de la meilleure expérience de jeu sur notre site Web, OneBet sera toujours le même.',
    art3: 'Veuillez attendre le 21 février 2021.'
  },
  depositSuccess: {
    title: 'Dépôt de dépôt',
    art1: 'Vous recevrez une demande sur votre téléphone, pour confirmer le paiement. Après avoir fait cela, les fonds apparaîtront immédiatement dans votre compte.',
    art2: "Le spectacle est l'outil d'autorisation primaire au cas où le réseau dispose d'un service intermittent. Ils peuvent ne pas envoyer l'appareil photo apparemment, vous avez besoin de manière manuellement pour approuver la transaction. # 150 * 50 # (orange) ou * 126 # (MTN)",
    art3: "Si vous avez un problème lors du dépôt, obtenez l'aide via:",
    try: 'Essai',
    complete: 'Complet'
  },
  withdrawSuccess: {
    title: 'Retrait soumis',
    art1: 'Votre retrait sera crédité à votre argent mobile immédiatement',
    back: 'De retour à la maison',
    art2: "Si vous n'avez pas reçu votre retrait après 1 heure, veuillez obtenir l'aide via:"
  },
  progress: {
    loading: 'Loading',
    play: 'PLAY GAME',
    free: 'FREE MODE'
  },
  bettingIncentives: {
    more: '<span style="color: #FFF16C;font-weight: 700;font-size: 40rem/108;">{times}</span> paris supplémentaire pour activer une autre chance gratuite',
    more2:
      '{times} paris supplémentaire pour activer une autre chance gratuite',
    free: 'Il vous reste <span style="color: #FFF16C;font-weight: 700;font-size: 40rem/108;">{award}</span> parties gratuites',
    rules: 'Règles',
    rulesItem:
      '1. Un client peut participer 3 fois par jour;<br>2. Placez 2 paris (cotes ≥ 1.50 ， mise ≥ 500) vous rapportera une chance gratuite',
    rewards: 'Récompenses',
    rewardsItem:
      '<span style="color: #FFF16C;">Premier prix</span> - Samsung Galaxy S21 + 5G, 6.7 - Argent PHOTM;<br><span style="color: #FFF16C;">Deuxième prix</span> - 50,000 Airtime<br><span style="color: #FFF16C;">Troisième prix</span> - 5 G Mbs<br><span style="color: #FFF16C;">Quatrième prix</span> - 100 Freebet;<br><span style="color: #FFF16C;">Cinquième prix</span> - 100 cadeau de caisse;<br><span style="color: #FFF16C;">Sixième prix</span> - 50 Freebet;<br><span style="color: #FFF16C;">Septième prix</span> - 50 cadeau de caisse;',
    rewardsDes:
      'Si vous remportez le premier prix, veuillez contacter notre service client en ligne et laisser votre adresse de livraison dès que vous gagnez le prix afin que nous puissions expédier la récompense.<br>Il y a un total de 3 Premiers prix (Samsung Galaxy S21 x 3) préparés pour les clients pendant cette promotion et ce prix sera annulé après avoir été distribué.',
    monday: 'La liste de récompense sera annoncée tous les lundis',
    last: 'Liste gagnante de la semaine dernière',
    terms:
      "1. Cette promotion est disponible pendant 2021.03.11 ~ 2021.03.31;<br>2. Jackpots, pari intime!, Jackpot quotidien et Freebet ne comptera pas dans cette promotion;<br>3. Vous pouvez immédiatement rejoindre cette promotion après avoir réussi à réussir;<br>4. Prechtry & Live Bet ne peut pas être annulé après avoir pari avec succès;<br>5. OneBet se réserve le droit de modifier, d'annuler, de réclamer ou de refuser toute promotion afin d'assurer l'égalité et l'équilibre des promotions à sa seule discrétion. Des promotions et des cadeaux sont créés afin de récompenser nos clients les plus précieux. En cas de suspicion de fraude ou d'abus de cette promotion par tout client, nous nous réservons le droit de supprimer les cadeaux et les gains associés d'un compte donné ou de tout compte associé.",
    first: 'Samsung Galaxy S21 + 5G, 6.7 - Argent PHOTM',
    second: 'Airtime',
    third: 'Mbs',
    cash: 'cadeau de caisse',
    freebet: 'Freebet',
    small: '50',
    big: '100',
    noChance: 'La chance gratuite est épuisée',
    con: 'Toutes nos félicitations! Vous avez gagné {quantity} {kind} !<br>Déjà crédité sur votre compte {kind}.'
  },
  betReduction: {
    back: 'Retour',
    betNow: 'Parier maintenant',
    rule: 'Règles de réduction de par',
    bet: 'Pari <span> (ou plus)</span>',
    odds: 'Chances <span> (ou plus)</span>',
    reduction: 'Réduction',
    terms: 'Termes et conditions',
    termsList: [
      '1. Chaque utilisateur enregistré peut rejoindre cette promotion;',
      "2. Le cadeau n'est pas disponible dans cette activité;",
      "3. Votre pari placé ne sera pas capable d'être annulé si vous participez à cette promotion;",
      '4. Durée: 20 mars ~ 31 mars;',
      '5. OneBet se réserve le droit de modifier, annuler, récupérer ou refuser toute promotion à sa propre discrétion.'
    ]
  },
  freebetBonus: {
    theme: 'Mon bonus',
    rules: 'Rules',
    claim: 'Réclamation',
    over: 'Plus de',
    activate: 'Activer',
    used: 'Utilisé',
    use: 'Utiliser maintenant',
    terms:
      "1. Jackpots et pari intime! N'est pas disponible pour cette promotion;<br>2. Le nombre de vos paris sera effacé tous les matins;<br>3. Cette promotion est disponible jusqu'à Juin 08, 2021;<br>4. Tout le ticket de cette promotion ne peut être annulé;<br>5. Onebet se réserve le droit de modifier, d'annuler, de récupérer ou de refuser toute promotion afin d'assurer l'égalité et le solde des promotions à sa propre discrétion. Les promotions et les cadeaux sont créés afin de récompenser nos clients les plus appréciés. Sous suspect de la fraude ou de l'abus de cette promotion par un client, nous nous réservons le droit d'éliminer les cadeaux et les gains associés d'un compte donné ou de tous les comptes connexes.",
    panicBuying:
      'Commencer à demander au PM 6:00 et 1000 Freebet Limited tous les jours',
    claimAfter: 'Réclamer après',
    bet: 'Placer {number} paris pour activer. Montant de paris> {amount}, Cotes> 1.50 par pari',
    appBet:
      "Placez {number} paris sur l'application pour l'activer. Montant du pari> {amount}, cote> 1,50 par pari",
    invite: 'Invitez des amis à vous inscrire et placer un pari pour activer',
    claimOver:
      "Désolé, le FreeBet d'aujourd'hui a été réclamé, revenez demain.",
    success: 'Félicitations! Vous avez reçu FreeBet avec succès.'
  },
  topMsgPop: {
    freebetExpired: 'Votre FreeBet inutilisé sera bientôt expiré',
    giftExpired: 'Vos cadeaux en espèces inutilisés seront bientôt expirés',
    congrat: "Félicitations! Vous gagnez 1,400 FreeBet aujourd'hui",
    activate:
      "Activez votre <span style='color: #FF0000'>1,400</span> FreeBet et utilisez-le maintenant!",
    freebetExpiredDate: 'Votre {amount} FreeBet expirera le {date}',
    giftExpiredDate: 'Votre cadeau de {amount} espèces expirera le {date}'
  },
  gamesHall: {
    back: 'Jeux',
    play: 'jouer'
  },
  casino: {
    modal: {
      title:
        'Amusez-vous avec ces jeux? Voudrez-vous jouir plus de jeux fluides, meilleure expérience et plus de plate-forme professionnelle? Découvrez sur OneGame!',
      later: 'Après',
      go: 'Aller Maintenant'
    }
  },
  onebetLeague: {
    totalPayout: 'Paiement Total',
    left: '(gauche)',
    betStake: 'Parier{left} Mise',
    rulesT: 'Règles de retrait',
    rules: [
      "Afin de permettre au client d'obtenir le revenu le plus élevé en fonction de l'état actuel du match, Onebet publie une nouvelle fonction - Cashout, avec laquelle les clients peuvent encaisser leurs paris avant la fin du calcul.  Cela signifie qu'il n'est pas nécessaire d'attendre la fin de votre jeu de pari pour obtenir un bonus ou diminuer votre perte.",
      `<b>Fourchette de montant de retrait:</b> Onebet calculera une fourchette de montant de retrait en temps réel en fonction du statut du match et du montant des paris des clients.
        <br>-- montant minimum de retrait 20 XAF
        <br>-- La fonction de retrait ne sera pas disponible lorsque votre montant gagnant est inférieur à 50 XAF`,
      '<b>Montant du repos après Cashout:</b> le montant restant sera pris en compte comme votre nouvelle mise et réglé après que tout le match se soit terminé sur votre ticket.',
      'Après avoir généré le retrait, la gamme de retrait sera verrouillée en 10s. La plage de retrait sera modifiée en fonction du statut du match dans votre billet et devra être générée à nouveau.'
    ],
    sct: 'Demande de retrait soumise',
    scs: 'Votre demande de retrait est en cours de traitement. Veuillez vérifier vos billets sous peu.',
    strObj: [
      "Êtes-vous sûr d'encaisser {amount} XAF? Le montant restant {restNum} XAF sera votre nouvelle mise dans ce ticket après le retrait. Cette opération est irréversible!",
      "Êtes-vous sûr d'encaisser tous les Stake {amount} XAF de ce ticket ? Cette opération est irréversible!"
    ],
    co: 'Offre Cahout',
    rc: 'Demande de retrait',
    coe: 'Offre de retrait expirée',
    remaining: 'restant',
    ra: 'Montant Resté',
    batc: 'Le plus gros montant à retirer',
    cashout: 'retrait',
    toWin: 'Pour Gagner',
    ended: 'FIN',
    live: 'LIVE',
    result: 'Résultats',
    matchDay: 'Match',
    start: 'commence dans',
    status: ['Perdre', 'gagner', 'attendant'],
    standing: 'Classement',
    matchDays: 'Programme',
    season: 'Saison',
    onebetLeague: 'Onebet League',
    matches: 'Matchs'
  },
  virtualFreebet: {
    title: 'FreeBet pour OneBet League',
    mybet: 'Mon pari - Market:',
    pick: 'Choisir:',
    login: 'Connecter pour parier',
    continue: 'Continuer paris',
    place: 'Parier',
    stake: 'Montant',
    payout: 'Dépense finale',
    myFreebets: 'Mes FreeBets',
    view: 'Voir',
    number: 'Plus de {number} bets dans OneBet League pour 1 FreeBet',
    getNow: 'Obtenez-les ',
    title1: 'Comment obtenir FreeBet',
    list1:
      " 1. 10 bets dans OneBet League pour un FreeBet aléatoire, jusqu'à 5 Freebets max quotidiens. Tout est aléatoire.<br>\n" +
      "        2. Participez à l'activité d'OneBet",
    title2: 'Comment utiliser FreeBet',
    list2:
      'Étape 1. Choisissez un résultat que vous préférez à partir de la page actuelle ;<br>\n' +
      '        Étape 2. Le système OneBet choisira automatiquement un de vos FreeBets;<br>\n' +
      '        Étape 3. Cliquez sur « Placer un pari » pour continuer;<br>\n' +
      '        Étape 4. Le match commencera et calculera votre bonus gagnant après que vous ayez confirmé<br>\n' +
      "        Remarque : OneBet déduira le montant du FreeBet et créditera le reste de l'argent gagné sur votre compte\n",
    title3: 'Termes et conditions',
    list3:
      "1. Le FreeBet obtenu sur OneBet League n'est utilisé qu'ici; <br>\n" +
      '        2. Tous les matchs de OneBet League sont des jeux virtuels, veuillez placer vos paris; <br>\n' +
      "        3. OneBet se réserve l'interprétation finale.",
    stakeEnough:
      "Désolé, il n'y a pas de FreeBet utilisable dans votre compte. Veuillez lire 'Comment obtenir FreeBet'",
    later: 'Après',
    betSuccess:
      'Parié avec succès!Le match va commencer et votre argent gagnant sera directement crédité sur votre compte OneBet.',
    con: 'Félicitations!',
    conWord:
      'Le résultat est {home_score}:{away_score}, votre gain de {win} XAF a été crédité sur votre compte OneBet.',
    higher: 'Marchés à cotes gagnantes plus élevées',
    betslip1: 'Encore {number} paris pour un FreeBet',
    betslip2:
      "Vous avez obtenu un FreeBet,<span style='text-decoration: underline; color: #2750CA'>vérifie maintenant</span>"
  },
  uefaHall: {
    title1: "Roi d'Europe",
    word: "Prédisez qui est le roi d'Europe et partagez <br> le million de cash ensemble",
    predict: 'Rejoindre',
    homeTeam: 'Votre équipe à domicile est:',
    predictPeople: 'Nombre de participants',
    title2: "Distribution des bénéfices quotidiens de la Coupe d'Europe",
    li1: "1. Obtenez <span style='color: #FDD445;font-weight: bold;'>5% de bonus</span> supplémentaire sur chaque billet gagnant pour le pari prématch/en direct",
    li2: "2. Finissez les activités ci-dessous, vous obtiendrez <span style='color: #FDD445;font-weight: bold;'>100 Bonus</span>.",
    checkIn: 'connecter',
    checkedIn: 'Connecté',
    completed: 'Complété',
    playSpin: 'Jouer à la roulette',
    playNow: 'jouer maintenant',
    bet: 'Parier 2 sur prématch/en direct',
    li3: '3. Prédire UEFA EURO 2020 matchs pour gagner Cadeaux Gratuits!',
    choose: 'Obtenez Cadeaux Gratuits',
    terms: 'Termes et conditions:',
    termsList: [
      "1. La date de l'activité de la Coupe d'Europe 2021.06.12 - 2021.07.12.",
      "2. La prédiction du Roi d'Europe ne peut se faire qu'en phase de top 16.",
      "3. Les activités de bien-être quotidiennes réinitialisent le statut d'achèvement de la tâche chaque jour, veuillez recevoir le bonus le jour même.",
      "4. Onebet se réserve le droit d'interprétation final"
    ],
    reminder1:
      "Félicitations! Vous avez fini la tâche quotidienne d'EURO 2020 et obtenez 100 bonus.",
    reminder2:
      "Félicitations! Vous gagnez XAF 100 pour votre équipe choisie d'EURO 2020 gagnant."
  },
  uefaToday: {
    word: "Vous pouvez choisir une équipe que vous soutenez gratuitement, si elle gagne la partie, nous vous donnerons <span style='color: #FDD445;font-weight: bold;'>100 bonus</span>",
    title: 'Vous voulez obtenir plus de bonus?',
    word1:
      "Nous proposons plus d'événements de Coupe d'Europe parmi lesquels vous pouvez choisir, afin que vous puissiez obtenir plus de bonus. Vous n'avez qu'à parier <span style='color: #FDD445;font-weight: bold;'>XAF 10,000</span> dans n'importe quel jeu.",
    support: 'Choisir',
    confirm: 'Déterminer',
    bonus: "Bonus ne s'arrêtent pas!",
    word2:
      "Dans les matchs de Coupe d'Europe suivants d'aujourd'hui, vous pouvez obtenir un cadeau de <span style='color: #FDD445;font-weight: bold;'>100 XAF</span> en pariant sur un match, et vous pouvez obtenir un cadeau de  pour chaque match.",
    termsList: [
      '1. Promotion valide: 2021.06.12 - 2021.07.12.',
      "2. Participez à tous les paris sur les matchs de la Coupe d'Europe, vous recevrez 100 XAF cadeau.",
      '3. Un cadeau sera offert pour le premier pari sur chaque événement.',
      '4. Un seul cadeau pour chaque commande.',
      "5. Onebet se réserve le droit d'interprétation final"
    ],
    success:
      ' Vous avez choisi {country} comme équipe à domicile, en attendant de partager le grand prix.'
  },
  uefaChampion: {
    title: "Qui est le roi d'Europe",
    final: 'Heure finale: 11/07 20:00',
    title1:
      "Choisissez votre roi d'Europe et partagez <br> <span style='color: #FC6F12;font-weight: bold;'> le million de prix</span>",
    confirm: 'Déterminer',
    termsList: [
      "1. La durée de l'activité est 2021.06.12 - 2021.07.02;",
      "2. Chaque personne ne peut choisir qu'une seule équipe, et n'a pas de chance de la modifier.",
      "3. Une fois l'UEFA Champions League décidée, les utilisateurs sélectionnés partageront le bonus de manière égale.",
      "4. Nous réglerons le montant du gain dans un délai d'un jour ouvrable après l'apparition du championnat, et vous pourrez le vérifier sur votre compte;",
      "5. Onebet se réserve le droit d'interprétation final"
    ],
    success1: "Félicitations, le championnat de la Coupe d'Europe est {name}",
    success2:
      "Vous avez partagé <span style='color: #FDD445;font-weight: bold;'>{amount} XAF</span> au total",
    failed1: "Malheureusement, le champion de la Coupe d'Europe est {name}",
    failed2:
      'Votre équipe à domicile a été éliminée, merci pour votre participation et votre attention',
    list: {
      title: 'Liste des gagnants',
      word: "Il y a <span style='color: #FF2626;font-weight: bold;'>3,550</span> personnes qui prédisent correctement pendant le Champion de l'Euro 2020 qu'elles se partageront <span style='color: #FF2626;font-weight: bold;'>2,000,000 XAF</span> ! Vérifiez si vous êtes dans la liste !\n",
      modalTitle: "Champion de l'Euro 2020",
      modalWord: '2,000,000 XAF  <br> ont été offerts ! Vérifiez-le!\n',
      button: 'Vérifiez-le'
    }
  },
  dailyGiveaway: {
    yesterday: 'Retraits réussis hier',
    check: 'vérifier',
    taskTitle: 'Complétez les tâches ci-dessous pour partager ',
    task1: 'Enregistrement quotidien',
    task2: 'Place un pari sur les sports réels',
    task3: 'Jouer à la Ligue OneBet',
    completed: 'Terminé',
    checkIn: 'connecter',
    betNow: 'Parier maintenant',
    playNow: 'Jouer maintenant',
    terms: 'Termes et conditions',
    termsList: [
      "1. Chaque client ne peut se retirer qu'une fois par jour;",
      "2. Seuls les nouveaux clients qui n'ont pas créé de compte sur OneBet peuvent vous aider à augmenter votre trésorerie ;",
      "3. L'argent sera effacé si vous n'avez pas atteint le montant de retrait dans le temps; ",
      "4. Le retrait de l'argent sera crédité à votre solde OneBet directement, vous pouvez l'utiliser pour mettre parier ou retirer votre compte MMA;",
      '5. Le montant du pari de vos invités doit arriver à la moitié de votre montant partagé avant que vous puissiez retirer ;',
      '6. Vos amis invités doivent accomplir toutes les tâches pour vous aider à augmenter le montant du retrait ;',
      '7. OneBet se réserve la juste explication de cette promotion.'
    ],
    congra: 'Félicitations!',
    finishTask: 'Vous avez terminé toutes les tâches!',
    share:
      "Diviser <span style='font-size: 0.6667rem;font-weight: bold'>5,000,000</span> XAF",
    clipReminder: 'Choisissez une carte pour obtenir votre bonus',
    winModal: {
      title: 'Félicitations!',
      content:
        'Vous obtenez <span style="font-size: 0.80556rem;font-weight: bold;color: #FF452C">{amount} </span> <span style="font-size: 0.5556rem;font-weight: bold;color: #FF452C">CASH</span>, seulement <span style="color: #FF452C">{left_amount} XAF</span> à retirer !',
      button: 'Accepter'
    },
    withdraw: {
      title: 'Mon argent',
      deal: 'Fals se termine en',
      word: "Vous n'êtes que {left_amount} XAF loin de retirer {withdraw} XAF, partagez cette promotion à vos amis pour obtenir.",
      share: 'Partager',
      friends: 'Amie',
      betting: 'Montant de paris',
      increase: 'Augmenter le montant',
      art: 'Montant du retrait:',
      unlock: "Déverrouiller l'admissibilité au retrait",
      button: 'RETIRER',
      amount: '100 - 200',
      reminder:
        "Invitez plus d'amis pour vous aider à déverrouiller cette fonction",
      inviteModal:
        "Vous n'êtes que <span style='color: #FF452C;font-weight: bold'>{left_amount} XAF</span> à l'arrière pour se retirer! Invitez des amis à rejoindre cet événement pour vous aider à casser",
      inviteButton: 'Inviter des amis',
      shareTitle: 'Partager quotidien 5,000,000 XAF',
      shareContent: 'Invitez vos amis à partager 5,000,000 XAF'
    },
    canWithdraw: {
      title: 'Félicitations!',
      word: 'Vous êtes en mesure de se retirer',
      withdraw: 'RETIRER',
      art: "L'argent sera crédité à votre compte ONEBET directement, vous pouvez l'utiliser un pari ou retirer de votre compte MMA."
    },
    successWithdraw: 'Retrait avec succès!',
    successReminder:
      "Vous avez déjà partagé les 5 000 000 XAF d'aujourd'hui, revenez demain"
  },
  giveawayShare: {
    title: 'Mon montant de retrait',
    share: 'Partager',
    art: 'Invitez vos amis à rejoindre Onebet et partagez aussi  <span style="color: #FFEA00;font-weight: bold">5,000,000 XAF</span>!'
  },
  giveawayInvite: {
    shareTitle: 'Cadeau quotidien de 5 000 000 XAF | OneBet',
    shareContent:
      "Pour accomplir seulement 3 tâches, vous pouvez partager 5 000 000 XAF sur OneBet ! Inscrivez-vous pour obtenir de l'argent maintenant!",
    title: 'Partager quotidien',
    join: 'Inscrivez-vous',
    item1: {
      amount: '500.00',
      name: 'Alex',
      word: "Ça marche vraiment! J'ai mon argent !\n",
      content1:
        "<span style='color: #333333;font-weight: bold'>Joan:</span>Merci pour mon aide :)",
      content2:
        "<span style='color: #333333;font-weight: bold'>Alex</span> a répondu <span style='color: #333333;font-weight: bold'>Joan</span> Ouais, j'aimerais t'aider, ma chère !"
    },
    item2: {
      amount: '1,000.00',
      name: 'Michael',
      word: "J'ai retiré 1,000 XAF avec succès!\n",
      content1:
        "<span style='color: #333333;font-weight: bold'>Kadhafi:</span>Wow! Moi seulement retiré 300 xa aujourd'hui",
      content2:
        "<span style='color: #333333;font-weight: bold'>Jayson:</span>Essayons demain :)",
      content3:
        "<span style='color: #333333;font-weight: bold'>Hillary:</span>Est-ce vrai? Je suis nouveau ici.",
      content4:
        "<span style='color: #333333;font-weight: bold'>Michael:</span> a répondu <span style='color: #333333;font-weight: bold'>Hillary:</span>100 pour cent vrai ! Au moins j'ai eu l'argent avec succès"
    },
    item3: {
      amount: '500.00',
      name: 'Andasio',
      word: "2 minutes d'argent en espèces 500 XAF",
      content1:
        "<span style='color: #333333;font-weight: bold'>James:</span>Hahah, moi aussi. J'aime Onebet!",
      content2:
        "<span style='color: #333333;font-weight: bold'>Tony:</span>comment ??? Aidez-moi!"
    },
    item4: {
      amount: '300.00',
      name: 'Johnson',
      word: "Pas de chance aujourd'hui, j'invite 6 personnes seulement 2 m'ont aidé. Et je ne reçois que XAF 300.",
      content1:
        "<span style='color: #333333;font-weight: bold'>Rashida:</span> L'argent n'est pas facile à gagner, n'est-ce pas ?\n",
      content2:
        "<span style='color: #333333;font-weight: bold'>Gérard:</span> Partager sur Facebook est beaucoup plus facile pour obtenir de l'aide, les gens m'ont tous aidé de FB.",
      content3:
        "<span style='color: #333333;font-weight: bold'>Morris:</span> Vous pouvez essayer Watsapp là où beaucoup de gens aimeraient essayer"
    }
  },
  makka: {
    word: "Le pari XAF 300 est une chance d'être le gagnant d'aujourd'hui, bonne chance!",
    prizes: 'Prix:',
    art1: '— Les quotidiens de 1000 jours de XAF 2,000 chacun.',
    art2: '— Grand gagnant de XAF 80,000 / = le 9 août 2021.',
    open: 'Ouvert à tous les clients nouveaux et existants:',
    li1: '1.Les clients seront tenus de placer un pari en espèces sur au moins un ou plusieurs matches de la ligue ONEBET (OneBet Virtual Games)  en utilisant une participation de 300 / = ou plus. Ils entrent automatiquement dans le tirage pour gagner des prix quotidiens. Continus paris 7 jours dans Onebet League sera automatiquement entré dans le dessin pour gagner des grands prix.',
    li2: '2.Onebet crée un argent gagnant à votre solde OneBet directement et vous informera par le message SMS',
    li3: '3.Les poils sont choisis au hasard par un système de promotion Onebet Lauage à 8:00 le lendemain.',
    footer: "Promo s'exécute le 30 juillet 2021 au 9 août 2021.",
    footer1: "Les termes et conditions générales d'ONEBET s'appliquent.",
    button: 'Jouer maintenant'
  },
  freebetHow: {
    title: 'Comment utiliser le Freebet?',
    art: "Il y'a deux endroits où vous pouvez vérifier votreFreebet: ",
    art1: '1. Compte > Freebet',
    'art1-1':
      "Ici vous pouvez voir votreFreebet l'Détails: " +
      "<br> Date d'expiration et combien de correspondances Vous avez pari." +
      '<br> Certains FreeBet doivent atteindre des conditions pointues pour se débloquer\n' +
      "<br> FreeBet peut être utilisé lorsque l'heure de début commence\n",
    art2: "2. Page d'accueil>Freebet Columb ",
    'art2-1':
      'Vous pouvez utiliser votre Freebet Pour contacter gratuitement ici',
    title1: 'Comment recevoir Freebet?',
    art3: "Pareil comme le  cadeau, il y a 2 façons d'obtenir Freebet: les pièces de roulette et les  Promotions Onebet."
  },
  mybetCasinoBanner: {
    // pengding
    1: {
      up: 'Toujours en attente de résultats de paris?',
      down: "essayons d'abord les jeux de casino!"
    },
    // Lose
    2: {
      up: "Vous n'avez pas l'air très chanceux?",
      down: 'Pourquoi ne pas essayez nos jeux de casino!'
    },
    // won
    3: {
      up: "Vous avez l'air chanceux?",
      down: 'Essayez encore des jeux de casino!'
    }
  },
  cardPacks: {
    title: 'Félicitations!',
    art: "Vous obtenez le(s) pack(s) de cartes de récompense d'aujourd'hui",
    button: 'Ouvrez maintenant'
  },
  christmas: {
    back: 'OneBet Noël de Noël',
    title1: 'Bonus de premier dépôt de premier guidage',
    word1:
      "Obtenez <span style='color: #FFEF3D;font-size: 0.55556rem;'>50%</span> de paiement en cas de caisse",
    deposit: 'Déposer',
    title2: 'Parier pour obtenir un cadeau de Noël',
    word2: 'Le montant de paris plus élevé que vous avez, le bonus supérieur!',
    button2: 'Spin pour gagner',
    title3: 'Bonus de Noël pour Jackpot',
    word3:
      "Obtenez un bonus de Noël <br> supplémentaire de <span style='color: #FFEF3D;font-size: 0.55556rem;'>5%</span>",
    button3: 'Parier maintenant',
    art3: 'Cette bonus supplémentaire de 5% uniquement disponible pour les personnes qui ont placé sur Jackpot pendant cette promotion.',
    title4: 'Onebet League va sauvage',
    learnMore: 'Jouer maintenant ❯',
    word4:
      'Tous les 10 paris dans OneBet League peuvent vous donner une chance gratuite de jouer avec des pièces de monnaie, on ne peut obtenir que 5 tours gratuits par jour.',
    termsTitle: 'Termes et conditions',
    termsList: [
      '1. Tout le bonus que vous gagnez sera crédité à votre compte ONEBET;',
      "2. Cadeau et Freebet ont tous deux une date d'expiration, n'oubliez pas d'utiliser les avant appel non valides;",
      '3. Seul le montant pari du marché est réglé sur cette promotion;',
      '4. Bonus de Noël Jackpot sera crédité à votre compte dès que tous les matchs de Jackpot ont été réglés;',
      '5. OneBet se réserve tous les droits!'
    ],
    coinsReminder:
      'Vous obtenez une chance libre de jouer aux pièces de sin.You can spin now or convert it to coins.Vous pouvez tourner maintenant ou le convertir en pièces.',
    spin: 'Spin maintenant',
    convert: 'Convertir en 20 pièces',
    shareBet:
      "Partagez votre ticket,jusqu'à 50% de réduction sur le montant des paris!",
    ChristmasSale: 'Vente de Noël',
    completeInfo:
      "L'avatar complet et le surnom pour porter votre propre décoration de Noël et obtenir <span class='money'>500 XAF</span> FreeBet!"
  },
  christmas_preheat: {
    countdown: 'Countdown de Noël de Noël',
    title1: 'Comment rejoindre',
    word1_1: '1. Pariez tout match pendant ces promotions;',
    word1_2: '2. Montant de paris / Temps de paris Atteindre les exigences;',
    word1_3: "3. Vous pouvez obtenir des cadeaux, Freebet et l'argent.",
    word1:
      "Ne manquez pas la chance d'obtenir un cadeau de Noël à Onebet. Maintenant, inviter les amis à rejoindre vous fera un cadeau mystérieux!",
    button: 'Inviter des amis',
    title2: 'Bonus de Noël',
    word2:
      "Spin gratuit pour <br> gagner jusqu'à <br><span style='color: #FFEF3D;font-size: 0.55556rem;'>XAF 100,000</span>",
    word3:
      "Remboursement de cadeau de <span style='color: #8B201C;font-size: 0.55556rem;'>50%</span> de trés, Uniquement pour le premier dépôt de première journée",
    word4:
      "Obtenez un bonus de Noël supplémentaire de <span style='color: #FFEF3D;font-size: 0.55556rem;'>5%</span>",
    invite:
      'Je vous invite à me rejoindre sur OneBet - la plateforme de paris sportifs la plus légère et la plus rapide pour obtenir votre cadeau de Noël OneBet ! 20 000 cadeaux de Noël vous attendent ! Maintenant obtenir:'
  },
  christmas_spin: {
    betting: 'Votre montant de paris',
    increase:
      "Augmentez votre pari d'invité en invitant les gens à rejoindre Onebet",
    invite: 'Invitez des amis maintenant',
    line: [500, 1000, 5000],
    termsTitle: 'Règles',
    termsList: [
      '1. Il y a plus de 3 roues à spin ici, vous devez les débloquer avec la quantité de paris de demande; ',
      'XAF 500 Le premier niveau ≤ XAF 999,',
      'XAF 1,000 ≤ le deuxième niveau ≤ XAF 4,999,',
      'le troisième niveau ≥ XAF 5,000.',
      '2. Chaque utilisateur peut jouer à ce Spin Wheel 3 fois par jour pendant cette promotion, uniquement si le montant de son pari a atteint la demande;',
      '3. La roue de spin permet à mise à niveau automatique du niveau suivant lorsque votre montant de paris a atteint la demande;',
      "4. Vous obtiendrez 20% de votre parent de l'invitation des personnes pour ajouter votre propre montant de paris;",
      "5. Seul un nouvel utilisateur qui ne s'est pas créé sur OneBet avant peut augmenter votre quantité de paris;",
      '6. Le montant de paris sera effacé à 24 heures du matin tous les jours;',
      '7. Onebet se réserve la juste explication du droit.'
    ],
    noTimes:
      'Votre montant de pari ne correspond pas aux exigences requises augmenter en premier lieu à votre montant de paris.',
    noTimesLeft: 'Augmenter',
    hasTimes:
      'Toutes nos félicitations! Vous avez gagné un tour gratuit ! Appuyez sur PLAY pour gagner votre cadeau de Noël.',
    prizeTitle: 'Félicitations!',
    prize: 'Vous gagnez {amount} {type}',
    noWin: 'NO WIN. Bonne chance la prochaine fois.',
    updateTitle: 'Roue de rotation améliorée',
    update:
      " Roue de rotation de niveau {level} déverrouillée !  Plus de cadeaux et plus d'argent vous attendent.",
    complete:
      "Désolé, vos 3 tours gratuits ont été utilisés aujourd'hui !  Merci de revenir demain !"
  },
  christmas_first_deposit: {
    dailyDeposit:
      "Vous obtenez déjà le remboursement du premier dépôt d'aujourd'hui. Accédez à la page de dépôt pour continuer à recharger.",
    termsList: [
      '1. Chaque client peut obtenir un remboursement de cadeau sur le premier dépôt de Quicaminal;',
      '2. Ne déposez que le montant 4 décrit ci-dessus peut obtenir un remboursement de cadeau;',
      '3. Onebet se réserve tous les droits.'
    ]
  },
  orange: {
    title: 'Exclusivité {operator} ',
    claimSuccess: 'recevoir le succès',
    claimed: 'vous avez déjà reçu',
    only: "cette promotion n'est disponible que pour les utilisateurs Orange",
    word1:
      "Afin de remercier le grand soutien d'{operator}, l'utilisateur d'{operator} recevra <span style='color: #F45F1C; font-weight: bold;'>6</span> bonus exclusifs.",
    word2:
      "Ce n'est que si vous êtes un utilisateur {operator} que vous pouvez obtenir un bonus ci-dessous:",
    word3:
      "Vous n'êtes pas un utilisateur {operator}, être un utilisateur {operator} pour obtenir un bonus exclusif!",
    claim: 'réclamer maintenant',
    register: "S'inscrire maintenant ",
    daily:
      "Un pari quotidien supérieur à 2,000 XAF en PreMatch/Live vous rapportera <span style='color: #F45F1C; font-weight: bold;'>200 XAF</span> Freebet.",
    get: 'Maintenant obtenir',
    check: 'Vérifiez au freebet',
    betOnly:
      "ne pariez que <span style='color: #F45F1C; font-weight: bold;'>5</span> (<s>10</s>) fois dans la onebet league (Sports virtuels) pour obtenir un pari gratuit pour la onebet league.",
    freebet: 'Freebet de Onebet League:',
    deposit1:
      "1. Le montant du dépôt quotidien ≥ 2,000 XAF peut vous rapporter un cadeau en espèces de  <span style='color: #F45F1C; font-weight: bold;'>200XAF</span> sur OneBet;",
    deposit2:
      "2. Le montant du dépôt hebdomadaire ≥ 20,000 XAF peut vous rapporter un cadeau en espèces de <span style='color: #F45F1C; font-weight: bold;'>2,000 XAF</span> sur OneBet.",
    deposit: 'Dépôt maintenant',
    tips: "Conseils: Le bonus dans cette promotion ne influencera pas d'autres bonus de promotion",
    rules: 'Règles',
    list: [
      "1. Afin de remercier le soutien d'MTN, cette promotion n'est disponible que pour les utilisateurs MTN;",
      "2. Toutes les pièces, cadeaux et freebet dans cette promotion seront directement crédités à votre compte ONEBET, veuillez vérifier et l'utiliser dans le temps;",
      '3. OneBet se réserve la juste explication du droit.'
    ],
    depositReminder:
      "Dépôt avec {operator} Vous pouvez obtenir des bonus supplémentaires, <span style='text-decoration: underline; color: #447ED9'>vérifiez les détails</span>",
    registerReminder:
      "Inscrivez-vous avec le numéro d'{operator} vous obtiendrez 6 Bonus exclusif, <span style='text-decoration: underline; color: #447ED9'>consultez maintenant</span>",
    orangeReminder:
      "Cette promotion est uniquement pour l'utilisateur MTN, vous êtes un utilisateur Orange. Connectez votre compte MTN pour obtenir gratuitement Freebet?",
    coutinue: 'Aller sur le pari',
    changeAccount: 'Changer de profil'
  },
  sharePoster: {
    title: 'Affiche gagnante',
    via: 'Partagez votre affiche gagnante via',
    gallery: 'Galerie',
    fail: "Échec de la génération de l'affiche, veuillez réessayer.",
    cancel: 'Annuler',
    cut: 'Couper',
    next: 'suivante'
  },
  weekly: {
    Ends: 'SE TERMINE DANS'
  },
  epl_terms: {
    title1: 'Prédiction',
    art1: 'On peut déverrouiller la qualification de prédiction seulement après avoir placé un pari sur les jeux EPL;',
    art2: 'On peut déverrouiller la qualification modifiée uniquement après que ses amis invitants placent un pari sur les jeux EPL;',
    art3: 'La récompense sera directement crédité à votre compte ONEBET après le joueur;',
    art4: "On ne peut prédire qu'une fois en un match et peut modifier la prédiction en invitant des amis pour déverrouiller la qualification;",
    art5: 'Les invités doivent placer sur les jeux EPL pour débloquer la qualification prédiction des invitateurs;',
    art6: "Les parjresses live EPL multiplieront votre victoire jusqu'à 1.2 fois;",
    art7: 'Seulement prédiction 8, 9, 10 matches peuvent obtenir une récompense dans la prédiction de match;',
    art8: 'Correctement prédire 8 matches: UPTO 1/9 CADA POOL-POINT;',
    art9: 'Correctement prédire 9 matches: UPTO 2/9 CADA POOL-POINT;',
    art10: 'Correctement prédire 10 matches: UPTO 1/3 CADA POOL-POINT;',
    art11:
      'Si plusieurs personnes prédisent 8, 9 et 10 matches en même temps, ils divisent le prix correspondant pour 8, 9 et 10 également.',
    art12:
      'par ex. 4:3 4 Peu importe les 10 poches à la tour 32, ces 4 joueurs divisent 1/3 trésorerie du total des espèces en espèces.',
    art13:
      "S'il n'y a personne à prédire correctement 10 matches dans ce tour, l'argent de récompense de 10 matches sera ajouté au pool de trésorerie pour le tour suivant.",
    art14:
      'Toutes les prédictions en prédiction simple doivent être justes vous donne une chance de partager le pool de trésorerie 1/3',
    title2: 'Trésorerie commune',
    art16: 'La prédiction de match prend 2/3 du pool de caisse;',
    art17: 'La prédiction simple prend 1/3 du pool de caisse;',
    art18:
      'Des bonus indivis seront accumulés au pool de trous de la saison suivant.',
    title3: 'Général',
    art20:
      'Cette offre ne peut pas être utilisée en conjonction avec les autres offres.',
    art21:
      "Nous nous réservons le droit de voider, ou ne pas payer un prix, où tout ou partie du score résulte de toute erreur erronée, erreur ou faute technique (y compris les paiements de jeu incorrects) étant si causés par une machine ou une erreur humaine à l'égard de l'un des jeux participants.",
    art22:
      "Nous nous réservons en outre au droit de voider les scores, ou ne pas payer un prix où, à notre avis, tout ou partie du score résulte de la triche ou de la collusion avec d'autres joueurs.",
    art23:
      'Nous nous réservons le droit de retirer et / ou de changer ces termes et conditions promotionnels à notre seule discrétion, et toute décision en ce qui concerne les gains offerts.',
    art24:
      'Nous pouvons, à notre seule discrétion, exclure tout client de recevoir des promotions sélectionnées et de toute autre promotion et offres.',
    art25: "Le général T&C s'applique."
  },
  epl: {
    season: 'Saison 2021-22',
    matchday: 'Matchday {round} sur 38',
    my: 'Mes prédictions',
    winners: 'Vainifs de prédiction',
    match: 'Prédication de match',
    simple: 'Prédiction simple',
    submit: 'Soumettre',
    note: 'Remarque:',
    note1:
      'Placer au moins un pari sur les jeux EPL pour débloquer des qualifications',
    terms:
      "En participant à cette promotion, vous vous retournez volontairement par les <span style='color: #53FE8B;'>les termes et conditions</span>",
    modify: 'Modifier la prédiction',
    modification: 'Modifications',
    unlock: 'Comment débloquer les droits modifiér',
    step1: 'Inviter des amis',
    step2: 'Les amis paris EPL',
    step3: 'Déverrouiller la modification',
    unlockArt:
      'Débloquez vos droits de modification en invitant des amis pour parier sur ce tour de jeux EPL',
    share: 'Lire le lien copié avec succès',
    via: 'Ou via',
    con: 'Félicitations!',
    unlockSucc: 'Vous déverrouillez la qualification modifiée avec succès',
    modifyNow: 'Modifier maintenant',
    later: "Tout à l'heur",
    choice: 'Vous devez modifier au moins un choix avant de soumettre!',
    predict: 'Veuillez prédire tous les matchs!',
    simplePredict: 'Veuillez prédire toutes les questions!',
    already: 'Vous avez déjà soumis.',
    subSucc: 'Soumettre avec succès!',
    closed:
      'Le jeu est sur le point de commencer, le canal de prédiction est fermé!',
    next: 'La prochaine prédiction de la match matinale sera démarrée après ',
    betlive: 'Pari en direct',
    liveNote: 'Bet Live Obtenez 1.2 fois récompense de votre prédiction',
    amount: 'Montant gagnant:',
    scores: 'Total des scores:',
    total: 'Montant gagnant total:',
    first: 'Première place:',
    check: 'Voir plus',
    winner: 'Gagnants',
    prediction: 'Prédiction',
    player: 'Lecteur',
    winning: 'Gagnant',
    art1: 'Seulement montrez 10 meilleurs gagnants du dernier jour',
    other: 'Prédire tout bien partagera 1/3 du pool de trésorerie',
    gameResult: 'Résultat du jeu',
    yourChoice: 'Votre choix',
    live: 'Live',
    noData: 'Pas encore de statistiques',
    notJoinSimple: "Vous n'avez pas participé simple prédiction",
    notJoinMatch: "Vous n'avez pas participé à la prédiction de match",
    liveNotPredict:
      'La prédiction de ce tour est terminée, revenez au prochain tour ou pariez des matchs en direct.',
    livePredict:
      'Vous avez déjà fait des pronostics dans ce tour ! Pariez en direct pour multiplier votre gain à 1,2 fois.',
    shareArt:
      'Je vous ai invité à me rejoindre pour partager GRATUITEMENT 1,000,000 XAF sur OneBet ! Pariez sur les matchs EPL pour débloquer votre qualification maintenant :',
    predictTitle: 'Débloquez EPL Predict avec succès !',
    predictContent:
      'Vous pouvez maintenant prédire EPL gratuitement et avoir une chance de gagner 1,000,000 XAF.',
    predictButton: 'Prédire gratuitement maintenant'
  },
  hottestTickets: {
    learnMore: "Plus d'information",
    noContent: 'Le contenu ne peut pas être vide.',
    title: 'Billets les plus chauds',
    Reward: 'Récompense',
    Rules: 'Règles',
    bigCake: ['1,000,000 bonus XAF', 'pour chaque semaine!'],
    bgList: ['Top quotidien 3', 'top 10 hebdomadaire', '50% de remboursement'],
    button: 'Partager Le Pari Maintenant',
    loadCode: 'Charger le code',
    totalOdds: 'Cotes Totale',
    Matches: 'Matchs',
    type: 'Le Type',
    downMore: 'glisser pour charger plus',
    followBet: 'Suivre pour parier',
    noBets: "Il n'y a pas encore de pari, placez un pari maintenant!",
    weeklyTop: 'Top 10 hebdomadaire',
    week: 'Semaine',
    topList: ['Téléphone', 'Total Suivez les paris', 'Récompense'],
    yesterdayTop: "Top 3 d'hier",
    details: 'Details',
    detailsList: [
      {
        title:
          "1. <span style='font-weight: bold;'>Top quotidien 3</span> Les plus récents des paris les utilisateurs récompenses:",
        list: [
          "1er place, <span style='font-weight: bold;'>1,000 XAF cash</span>;",
          "2e place, <span style='font-weight: bold;'>800 XAF cash</span>;",
          "3ème place, <span style='font-weight: bold;'>500 XAF cash</span>;"
        ]
      },
      {
        title:
          "2. <span style='font-weight: bold;'>Top 10 hebdomadaire</span> des utilisateurs suivi des paris",
        list: [
          "1 ~ 3 places, <span style='font-weight: bold;'>2,000 XAF cash + 2,000 XAF Freebet + 6,000 XAF gift</span>;",
          "4 ~ 6 places, <span style='font-weight: bold;'>1,000 XAF cash + 1,000 XAF Freebet + 3,000 XAF gift</span>;",
          "7 ~ 10 places, <span style='font-weight: bold;'>500 XAF cash + 500 XAF Freebet + 1,000 XAF gift</span>;"
        ]
      },
      {
        title:
          '3. La récompense quotidienne sera crédité à votre compte à portage 00:00 le lendemain, la récompense hebdomadaire sera crédité à votre compte à 00:00 le lundi prochain;'
      },
      {
        title:
          "4. Si le billet de partage perdu  a plus de 3 personnes ont suivi à Bien, vous obtiendrez jusqu'à <span style='font-weight: bold;'>50%</span> de remboursement de la mise;"
      },
      {
        title:
          "5. Tous les joueurs ayant partagé des tickets recevront un cadeau de <span style='font-weight: bold;'>100 XAF</span> dans la journée ;"
      },
      {
        title: "6. OneBet se réserve les droits d'explication finale."
      }
    ],
    rulesList: [
      "1. Toutes les données sont soumises aux statistiques d'OneBET;",
      "2. Seuls les utilisateurs qui partagent sur les médias sociaux et le site Web peuvent participer à l'activité de partage de liquidités;",
      "3. Les récompenses de cette promotion comprennent l'argent, le freebet et le don;",
      '4. Les récompenses pour les trois premières places le jour seront distribuées tôt le lendemain;',
      '5. Les dix premières récompenses de la semaine en cours seront distribuées au début du lundi prochain;',
      '6. Toutes les récompenses seront rechargées directement à tous vos comptes ONEBET, veuillez les vérifier et les utiliser dans le temps;',
      "7. Lorsqu'il y a un match commence dans votre ticket, il est retiré de l'interface d'affichage;",
      "8. OneBet se réserve les droits d'explication finale."
    ],
    share: 'Partager aux médias sociaux et au site',
    congratulations: 'Toutes nos félicitations',
    winningPopUp: [
      'Vous êtes récompensé',
      'XAF',
      'en partageant votre billet',
      'hier!',
      'laste!'
    ],
    cashBackPopUp:
      'Vous obtenez 50% de paris remboursé de votre billet de sitage',
    codeWrong: 'Mauvais code betslip! Veuillez entrer un code betslip correct!',
    bannerCopywriting:
      'Partagez votre pari pour gagner 1,000,000 XAF chaque semaine',
    followMe: 'Suivez-moi de gagner grand sur OneBet! Parier avec moi via:',
    mustTakeItDown:
      "C'est un coup sûr de gagner du billet! Pariez avec moi pour gagner gros!",
    noTickets:
      "Il n'y a pas encore de ticket partageable, placez un pari à partager maintenant!",
    betslipTips: `Partager un billet pour gagner <span style='color:${mainThemeColor}'>1,000,000 XAF</span> chaque semaine!`,
    followCount: 'Suivis :'
  },
  sportsPromos: {
    title: 'Promotions sportives',
    prizes: ['FreeBet', 'Onebet League FreeBet', 'Gifts'],
    item_title: 'Gagnez {prize} sur {unit} {amount}',
    modal_prize:
      "Obtenez <span style='color:#FCFF00'> {unit} {amount}</span> {prize}",
    stake: 'Mise minimale {unit} {num}',
    odd: 'Cote minimale de {num}',
    folds: 'Plis minimum de {num}',
    expire: 'Expirant le {time}',
    optIn: "S'inscrire",
    come: 'Remplir la condition de récompense?',
    completed: 'Complété',
    more: 'Montre plus',
    list_art: 'Si {art} dans {match}',
    detail_art:
      "Si {art} dans {match} {league} à {time} et que toutes les conditions d'activation ont été remplies, vous serez récompensé {amount} {unit} {prize}",
    terms: [
      '1. Seuls les paris PreMatch/Live with Cash peuvent participer à cette promotion (les paris Gift, FreeBet et Jackpot ne seront pas pris en compte).',
      "2. Vous pouvez participer à de nombreuses promotions sportives, mais un billet multiple ne peut remplir qu'une seule promotion sportive (selon l'heure à laquelle vous rejoignez les promotions).",
      "3. One Sports Promo ne peut être participé qu'une seule fois;",
      '4. La récompense sera créditée sur votre compte OneBet une fois la promotion réglée;',
      "5. OneBet se réserve les droits d'explication finale ;"
    ],
    status: {
      optedIn: 'Inscrit',
      unsettled: 'Instable',
      settled: 'réglé',
      failed: 'Manqué',
      expired: 'Expiré'
    },
    reminderList: {
      expired:
        "Désolé, vous n'avez pas rempli les conditions de cette promotion.",
      unsettled:
        'Vous avez rempli toutes les conditions.  La promo sera bientôt réglée, veuillez faire attention à votre compte OneBet.',
      settled:
        'La récompense a été créditée sur votre compte OneBet, veuillez vérifier.',
      failed:
        "Cette Promo n'a pas atteint les conditions du tirage, merci pour votre participation.",
      complete:
        'Toutes les conditions ont été remplies !  La promo sera réglée dès la fin du match, veuillez faire attention à votre compte OneBet.',
      goBet:
        '"{condition}" n\'est pas rempli, pariez pour remplir la ou les conditions de récompense maintenant!'
    },
    success: 'Inscrit avec succès',
    betslip: `Toutes les conditions de Sports Promo( {team} ) ont été remplies.  <span style='color:${mainThemeColor}'>Vérifiez plus>></span>`
  },
  backup: {
    select: `Aucun numéro de secours,<span style='color:${mainThemeColor}'>configurez-le maintenant</span>`,
    modify:
      "Modifier votre numéro alternatif,<span style='color:#2750CA;'>configurez-le maintenant ></span>",
    title: ' Configurer un autre numéro',
    code: 'le code de vérification',
    art: 'Vous pouvez ajouter un numéro alternatif, un compte peut ajouter au maximum 1 numéro de téléphone MTN et 1 numéro de téléphone Orange.',
    sendCode: 'envoyer le code',
    success: 'soumettre avec succès',
    alternate: 'Autre numéro',
    withdraw:
      "La fonction de retrait MTN n'est pas disponible temporairement, veuillez utiliser un autre numéro pour vous retirer.",
    notSet: 'Ajouter un autre numéro de téléphone'
  },
  influencerChannelActivities: {
    title: 'Bonus de Fingon Tralala',
    middleTitle: '10,000 cadeaux exclusifs XAF',
    rulesTitle: 'Termes et conditions',
    rulesList: [
      '1. Ce cadeau exclusif provient de Fingon Tralala;',
      '2. 10,000 XAF cadeau/pari gratuit ont été crédités sur votre compte, veuillez les vérifier et les utiliser à temps;',
      '3. Vous pouvez améliorer le montant et le nombre de vos paris gratuits/cadeaux débloqués dans le bonus gonflé;',
      "4. OneBet se réserve les droits d'explication finale."
    ],
    InflatedBonus: 'Bonus <br> gonflé',
    InflatedTitle: 'Bonus gonflé',
    drawerTip:
      "Il n'y a pas de pari gratuit / cadeau disponible, veuillez aller pour déverrouiller et revenir pour réessayer.",
    illustrate:
      "Vous pouvez utiliser au hasard un cadeau/pari gratuit pour tirer dans ce jeu afin d'améliorer son nombre et son montant.",
    start: 'Commencer',
    tips: "Conseils: Vous ne pouvez jouer à ce jeu qu'une fois par jour",
    notice:
      " L'un de vos {qnumber} XAF pari {type} a été gonflé à {number} x {hnumber} XAF pari {type}.",
    typeTitle: [' Taper', 'Montant', 'Numéro'],
    pageRulesList: [
      [
        "<div class='ask'>1.Q: Qu'y a-t-il dans Fingon Tralala 10,000 XAF Exclusive Bonus?</div>",
        'R:',
        '1. Il contient 3 000 XAF FreeBet et 7 000 Gift XAF.',
        '2. Freebet: 100 XAF x 5 + 150 XAF x 10 + 200 XAF x 5 = 3,000 XAF',
        '3. Gift: 100 XAF x 15 + 250 XAF x 10 + 500 XAF x 6 = 7,000 XAF'
      ],
      [
        "<div class='ask'>2.Q: Qu'est-ce que Gift?</div>",
        "R: Allez à <span class='FingonTralalaActivityRuleLink'>Comment utiliser les Gift</span> pour vérifier."
      ],
      [
        "<div class='ask'>3.Q: Qu'est-ce que Freebet?</div>",
        "R: Allez à <span class='FingonTralalaActivityRuleLink'>Comment utiliser Freebet</span> pour vérifier."
      ],
      [
        "<div class='ask'>4.Q: Pourquoi certains des Gift et des Freebet ne peuvent pas être utilisés, le bouton d'utilisation est gris?</div>",
        "R: Chaque Gift / Freebet a une heure d'utilisation, veuillez confirmer l'heure de début et attendre pour l'utiliser."
      ],
      [
        "<div class='ask'>5.Q: Pourquoi mon Freebet est-il verrouillé?</div>",
        "R: Vous devez atteindre la condition de déverrouillage de chaque Freebet avant de pouvoir l'utiliser."
      ],
      [
        "<div class='ask'>6.Q: Pourquoi ne puis-je pas dessiner?</div>",
        'R:',
        '1. Veuillez vérifier si vous avez un Gift / Freebet disponible.',
        "2. Avez-vous déjà dessiné aujourd'hui, tout le monde ne peut jouer qu'une fois par jour."
      ],
      [
        "<div class='ask'>7.Q: Pourquoi mon Freebet / Gift a-t-il disparu avant que je ne l'utilise?</div>",
        "R: Chaque Gift / Freebet a une heure valide, veuillez le confirmer et l'utiliser à temps."
      ],
      [
        "<div class='ask'>8.Q: Où puis-je obtenir plus de Freebet / Gift?</div>",
        'R:',
        '1. Participate first deposit promotion to get 200% deposit bonus;',
        '2. Jouez à Coins Spin pour obtenir;',
        '3. Rejoignez nos promotions et pariez sur OneBet.'
      ]
    ]
  },
  a2hs: {
    titleQ: "Ennuyeux d'entrer des URL?",
    titleA: "Ajoutez OneBet à votre écran d'accueil.",
    step1: 'Copiez le lien et ouvrez-le dans Chrome;',
    step2: {
      safari: 'Utiliser Safari,',
      tap: 'Appuyez sur',
      andC: 'et choisissez',
      add: "Ajouter à l'écran d'accueil"
    }
  },
  worldCup: {
    title: 'Coupe du Monde'
  },
  fourLeague: {
    title: 'Gagner toutes les quelques minutes'
  },
  announcement: {
    title: 'Avis de mise à niveau',
    recoveryWord: 'Temps de récupération estimé',
    wait: 'Veuillez patienter',
    maintenanceWord: 'Temps de maintenance du système',
    countdownWord: "Compte à rebours d'entretien"
  },
  rushHour: {
    rushHourTitle: 'Heure de pointe',
    rushHourPlayNow: ' joue maintenant',
    rushHourRules1:
      'Jouez à Crash Game 20, 50, 100 et 200 fois pendant chaque heure de pointe pour obtenir un bonus ;',
    rushHourRules2:
      'Jouez au jeu Crash pendant ces périodes spécifiées et vous pourrez obtenir un bonus supplémentaire;',
    rushHourRules3:
      "On peut obtenir un bonus illimité jusqu'à épuisement du bonus pendant l'heure de pointe ;",
    rushHourRules4: "Le bonus est limité et attribué dans l'ordre d'arrivée ;",
    rushHourRules5: "OneBet se réserve le droit d'expliquer le bonus définitif."
  },
  commissionCenter: {
    remindWord:
      "Vous gagnez lentement et vous ne voulez pas prendre de risque ? Invitez des amis à jouer ensemble, obtenez au moins 3 % du montant de son pari sous forme de commission et d'autres bonus !",
    IFBN: 'Apprendre encore plus'
  },
  saveMoneyCasino: {
    hotGames: 'Jeux chauds',
    title: "Carte d'économie de casino",
    bgTitle:
      "Rejoignez-vous pour obtenir <span style='color: #F79B00;'>1232</span> XAF cadeaux ",
    notStartTitle: 'Casino Disques disponibles, plus haut sauvegarder ',
    notStartTotal: 'Total 114 cadeaux',
    betOver: 'Enjeux plus de ',
    claim: 'Obtenir',
    bet: 'Utiliser maintenant',
    used: 'Utilisé',
    expired: 'Expiré',
    notice: 'Les cadeaux revendiqués seront expirés après 24 heures',
    notice1: 'Remarque',
    notice2:
      "Lieu 1 XAF sur un OneBet Casino Egal 1 point OnebetC, les points d'OneBetC accumulés au cours des des 31 derniers jours >/= 500",
    notice3: ", vous pouvez ouvrir une carte d'épargne",
    top1: "Salut, votre point de l'OnebetC ",
    top2: 'argent cumulé sauvé',
    top3: 'OneBet Casino points',
    top4: 'Expiration le',
    top5: 'Expiré on',
    art1: 'XAF peuvent être réclamés dans ce mois',
    art2: 'Affirmé dans cette période',
    card1: 'Forfait mensuel',
    card2: 'Premier mois 0 XAF',
    card3: 'Disponible 31 jours',
    card4: 'XAF 56',
    card5:
      "Capable de se joindre après les points d'OnebetC plus de 500; <span>Place 1xaf Enjeu dans casino = 1 point OneBetC</span>",
    card6: 'Bet',
    card7: 'Actuellement OneBetC Prévis:',
    card8: 'Essai 0 XAF',
    card9: 'Obtenir maintenant',
    payment1: 'Paiement réussia',
    payment2: "Votre carte d'économie de casino Onebet a ouvert ses fonctions.",
    payment3:
      'Casino XAF disponible Les cadeaux peuvent être revendiqués pendant la période!',
    noGift: "Il n'y a pas de cadeau disponibles, veuillez contacter en premier",
    noUse: "Il n'y a pas de cadeau d'occasion",
    noExpire: "Il n'y a pas de cadeau expiré",
    middle1: 'Une presse pour réclamer un cadeau',
    middle2: "cadeaux restants aujourd'hui",
    middle3: 'Utilisez 50 cadeaux pour déverrouiller 59 cadeaux',
    renewal1:
      "Tous les cadeaux de cette période ont été revendiqués, renouvellement maintenant pour obtenir une autre période de <span style='color: #F79B00;'>1232</span> XAF la prochaine période",
    renewal2: 'Renouveler maintenant',
    renewal3:
      "la carte d'épargne du casino a été renouvelée,<br>" +
      "La prochaine fois que vous distribuerez des cadeaux, c'est le ",
    payError1: 'Insufficient Balance',
    payError2: "Balance insuffisante, s'il vous plaît dépôt d'abord",
    payError3: 'Dépôt maintenant',
    payError4: 'Abandon 1232 XAF',
    payError5: "Réseau d'erreur",
    payError6: 'Le réseau est pauvre, essayez de nouveau plus tard',
    payError7: 'Réessayer',
    payError8: 'Annuler',
    payError9: 'Paiement a échoué',
    payError10:
      "Le paiement a échoué, veuillez contacter notre service clientèle pour l'aide",
    payError11: 'Contacter le service client',
    payError12: 'Proche',
    claimSuccess: 'Réclamez avec succès',
    keepClaim: 'Continuez à réclamer',
    goUse: 'Allez utiliser',
    claim1:
      "Réclamez avec succès, les cadeaux {amount} sont toujours disponibles aujourd'hui",
    claim2:
      "Réclamez avec succès, tous les cadeaux d'aujourd'hui ont demandé vide",
    claim3: "5 cadeaux ont été revendiqués aujourd'hui, viennent bavard demain",
    claim4:
      'Tous les cadeaux de cette période ont été revendiqués, viennent bien revenir la prochaine période',
    casino1:
      "<span>{x} XAF</span> n'a pas encore été réclamé au cours de cette période, a expiré dans <span>{y}</span> jours",
    casino2:
      'Les cadeaux <span>{w}</span> seront bientôt expirés, veuillez les utiliser à temps.',
    casino3:
      '<span>{m}</span>  économisés accumulés, renouveler pour obtenir <span>1232 XAF</span> supplémentaires',
    casinoRemark: 'Disponible pour',
    nextStep: "L'étape suivante",
    guide: [
      "Appuyez sur 'Réclamation' pour obtenir des cadeaux",
      "Faites glisser vers la gauche ou la droite pour vérifier plus de cadeaux ; appuyez sur 'Réclamation' pour obtenir des cadeaux.",
      "Appuyez sur 'Disponible' pour vérifier les cadeaux réclamés",
      "Choisissez n'importe quel jeu ci-dessous pour utiliser des cadeaux"
    ],
    v2art1:
      "Il reste encore <span  style='color: #FFE89F;'>56 XAF</span> à réclamer aujourd'hui",
    v2art2:
      "Il reste encore <span  style='color: #FFE89F;'>{x} XAF</span> à utiliser aujourd’hui",
    v2art3: "Total économisé <span  style='color: #FFE89F;'>{x} XAF</span>",
    v2art4:
      "Total économisé <span  style='color: #FFE89F;'>{x} XAF</span>, Renouveler pour obtenir <span  style='color: #FFE89F;'>1232 XAF</span> supplémentaires",
    v2art5:
      "Renouveler pour obtenir <span  style='color: #FFE89F;'>1232 XAF</span> supplémentaires",
    v2art6: 'Utiliser',
    v2art7: 'Réclamation',
    v2art8: 'Cadeaux expirés',
    v2art9: 'Cadeaux utilisés',
    v2art10: 'cadeaux disponibles',
    v2art11: 'fois collecter à gauche',
    v2art12: 'Capable de collecter {x} fois',
    v2art13: 'Reviens demain',
    v2art14:
      "<span  style='color: #FFE89F;'>{x} XAF</span> déjà économisé,  vous pouvez obtenir <span  style='color: #FFE89F;'>56 XAF</span> supplémentaires demain",
    v2art15: 'Débloquez 12 fois la collecte après avoir utilisé 50 cadeaux',
    v2art16:
      '<span style="color: #F79B00">{r_use}</span> cadeaux ont été utilisés, <span style="color: #F79B00">{r_left}</span> cadeaux  <br> doivent être utilisés pour débloquer\n'
  },
  timeLimitedActivity: {
    joined: 'Rejoint',
    value: 'Valeur',
    title1: 'Bonus à durée limitée',
    title2: 'Joueurs participants :',
    left: 'Gauche',
    total: 'Total',
    chooseNum:
      "Choisissez au hasard <span style='color:#000000'>{num}</span> joueurs",
    conditions: 'Conditions de participation',
    unaccomplished: 'Unaccomplished',
    accomplished: 'Réalisé',
    waitingResults: 'En attendant les résultats...',
    clickJoin: 'Un clic pour rejoindre',
    participated: 'Participated',
    deposit: 'Dépôt sur OneBet',
    register: 'Inscrivez-vous en tant que membre OneBet',
    congratulations:
      "Toutes nos félicitations! Vous gagnez<br/> <span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>{num}</span> {rewardType}",
    checkReward: 'Vérifier le dossier de récompense',
    close: 'fermé',
    notWinner:
      "Désolé!<br/> Vous n'avez rien gagné cette fois. La liste des gagnants s'affiche comme ci-dessous :",
    participateBetting: 'Participer aux paris sur {bettingName}',
    stake: 'Miser',
    matches: 'Matchs',
    odds: 'cotes',
    freeJoin: 'Free to Join',
    rules: [
      "Le 'Bonus à durée limitée' comprend espèces,OneBet Freebet, OneBet sports gifts, OneBet Casino Gifts, OneBet Leauge Freebet, les pièces de monnaie et etc. Veuillez lire attentivement les règles pour connaître la récompense désignée. Toute la récompense sera automatiquement créditée sur le compte du joueur.",
      "Règles du 'Bonus à durée limitée', un système purement aléatoire sera utilisé pour tirer les prix de manière juste et équitable parmi les utilisateurs qui participent à l'événement et remplissent les conditions préalables au tirage au sort.",
      "Il n'y aura aucun frais de service pour cette promotion. Les joueurs qui remplissent les conditions préalables au tirage au sort et cliquent sur le bouton en un clic pour rejoindre pendant la période de l'événement seront éligibles pour participer au tirage au sort.",
      "La récompense du 'Bonus à durée limitée' sera tirée au sort dès la fin de la promotion. Les joueurs peuvent voir le résultat du tirage directement sur la fenêtre contextuelle. Si l'on a manqué l'heure du tirage au sort, il peut vérifier le résultat dans la boîte de réception du compte.",
      'Il y aura différentes promotions sur plusieurs pages en même temps, les joueurs peuvent participer à plusieurs promotions simultanément.',
      "OneBet se réserve le droit d'explication finale de la promotion 'Bonus à durée limitée'"
    ]
  },
  newUserBenefits: {
    title: 'exclusif pour les nouveaux utilisateurs',
    claimUp:
      "Réclamez jusqu'à 600 XAF Gift dans les 30 premiers jours d'inscription",
    claimAfter: 'Réclamation après inscription',
    betDays: 'Réclamez après pari {num} jours',
    registerNow: "S'inscrire maintenant",
    claimDuring: 'Capable de réclamer pendant ',
    claim: 'Réclamer',
    useItNow: 'Utilise le maintenant',
    alreadyUsed: 'Déjà utilisé',
    claimTomorrow: 'Réclamez demain',
    expired: 'Expiré',
    expireAfter: 'Expire après ',
    activityExpired:
      "L'inscription est terminée depuis 30 jours, la promotion n'est plus disponible !",
    failedClaim: 'Échec de la réclamation. Veuillez réessayer plus tard.',
    oneCan:
      'On peut prétendre au maximum à 1 {category} exclusif par jour, merci de revenir demain.',
    OK: 'OK',
    accumulated: 'Pari accumulé {num} jour pour réclamer ce {category}.',
    goToBet: 'Aller au pari',
    directions: '2.Directions',
    directionsList: [
      "1. Les conditions de réclamation d'un {category} se trouvent en bas, par exemple : « Parier 3 jours pour réclamer » signifie que vous avez besoin d'une mise accumulée de 3 jours pour réclamer ce {category} ;",
      '2. {category} exclusif pour les nouveaux utilisateurs uniquement disponible pour les paris sportifs ;',
      "3. L'utilisateur peut réclamer au maximum 1 {category} exclusif pour nouvel utilisateur par jour ;",
      '4. Le {category} exclusif pour nouvel utilisateur expirera après 24 heures ;',
      '5. Tous les {category} non réclamés seront désactivés 30 jours après votre inscription.'
    ],
    congratulations: "Pari d'aujourd'hui terminé !",
    sendsGift: 'OneBet vous a envoyé',
    exclusiveGift: '{category} exclusif pour nouvel utilisateur',
    claimNow: 'Réclamez maintenant',
    checkMoreDetails: 'Vérifiez plus de détails>',
    claimSuccessful: 'Réclamation réussie',
    hours: "Veuillez l'utiliser dans les 24 heures.",
    stakes: 'enjeux >= ',
    odds: 'chances >= ',
    market: 'marché >= ',
    gift: 'cadeau',
    betNow:
      "demain vous pourrez réclamer<br/> <span style='color: #ED2136'>{num} XAF</span> en {category}.",
    betNow2:
      "Pariez maintenant pour réclamer un {category}<br/> de <span style='color: #ED2136'>{num} XAF</span>.",
    checkMore: 'Vérifiez plus >',
    whatGiftsTitle1: "1.Qu'est-ce que les cadeaux",
    whatGiftsContent1:
      "Les cadeaux peuvent être utilisés pour réduire vos mises lorsque vous pariez. <span style='color: #4C50FA;text-decoration-line: underline;'>Comment utiliser les cadeaux ?</span>.",
    whatGiftsTitle2: "1.Qu'est-ce que le Freebet",
    whatGiftsContent2:
      "Freebet peut être utilisé pour parier gratuitement sur la page Freebet. <span style='color: #4C50FA;text-decoration-line: underline;'>Comment utiliser le Freebet ?</span>.",
    betNowAndTomorrow0: 'Pariez maintenant pour réclamer',
    betNowAndTomorrow1: 'Pariez demain pour réclamer'
  },
  claimCom: {
    time1: "Veuillez l'utiliser dans les <span>{time}</span> jours",
    time2: 'Capable de réclamer dans un délai <span>{time}</span>',
    title1: 'Réclamation réussie',
    title2: 'Subventions exclusives limitées dans le temps',
    giftname: 'Cadeau sport disponible',
    more: '<span>{num}</span> {name} peuvent prétendre',
    exday: 'Expire dans {time} jours',
    extime: 'Expire après {time}'
  },
  forgotPsd: {
    verificationCode: 'Le code de vérification',
    send: 'Envoyer',
    change: 'changer',
    tryAgain: 'Code incorrect, veuillez réessayer.',
    joinSuccess: 'Rejoignez-nous avec succès',
    savePsd: "N'oubliez pas de sauvegarder votre compte et votre mot de passe",
    saveFile: 'Enregistrer sous fichier',
    saveImg: 'Enregistrer sous image',
    saveEmail: 'Envoyer par e-mail',
    sendedEmail:
      'Le mot de passe et le compte ont été envoyés à votre E-mail avec succès !',
    inputEmail: 'Saisissez votre e-mail',
    enterAmount: 'Entrez le montant de votre dépôt',
    save: 'Sauvegarder',
    inputPhoneResetPsd:
      'Saisissez le numéro de téléphone pour réinitialiser votre mot de passe',
    enterCodeModifyPsd:
      'Un code à 4 chiffres a été envoyé au {num}. Entrez le code pour modifier votre mot de passe.',
    enterCodeModifyPsdTip:
      'Conseils : Vous pouvez également vérifier le code dans votre e-mail : ',
    inputNewPsd: 'Saisir un nouveau mot de passe',
    enterCode: 'Entrez le code',
    saveNewPsd: 'Enregistrer le nouveau mot de passe',
    txid: 'Txid',
    noFoundTxid:
      "Nous avons constaté que le dépôt Txid : {num1} n'a pas été effectué par le compte : {num2}, veuillez saisir un Txid correct pour réessayer.",
    enterTransactionIDModifyPsd:
      'Saisissez tout dépôt réussi. ID de transaction du compte : {num} pour modifier son mot de passe.',
    enterTransactionID: "Entrez l'ID de la transaction",
    enterVerificationCode:
      'Saisissez le message de dépôt réussi envoyé par {phone}',
    fullMessage:
      "Entrez l'ID de transaction de {phone} ou le message complet ici",
    modifyPsdSuccess: 'Modifier le mot de passe avec succès',
    website: 'Site web',
    smcCode: 'SMS Code',
    emailErrorTip: "S'il vous plaît, mettez une adresse email valide",
    captchaErrorTip: 'Veuillez entrer un code à 4 chiffres valide',
    beforeSending:
      'Accédez au compte {num} Code de vérification du message SMS. Entrez le code de vérification pour changer votre mot de passe'
  },
  fiveLeague: {
    prizesQuiz: 'Devinettes primées',
    topFive: 'Qui sera le top cinq de l’{epl} cette saison ?',
    correctlyPredict:
      "Prédisez correctement le classement des 5 meilleures équipes de l'{epl} cette saison, vous obtiendrez <span style='color: #FF6C00;'>{num}</span>",
    notStarted:
      "Cette activité n'a pas encore commencé. L'heure de début est le {time}",
    submit: 'Soumettre',
    submitted: 'Soumis',
    predictionIncorrect: 'Prédiction incorrecte',
    claimRewards: 'Réclamez des récompenses',
    claimed: 'Revendiqué',
    finished: 'Fini',
    termsConditions: 'Termes et conditions',
    list: [
      '1. Les joueurs peuvent faire une prédiction du classement des 5 meilleures équipes des ligues majeures dans un temps spécifié, prédire correctement et réclamer une récompense ;',
      '2. Un dépôt/pari quotidien peut prédire avec succès la gratuité.'
    ],
    submitSuccess: 'Soumission réussie',
    predictedSubmit:
      "Vous avez prédit le classement des 5 meilleures équipes de l'{epl} ! Veuillez attendre les résultats.",
    congratulations:
      'Toutes nos félicitations! Vous prédisez correctement le classement des 5 meilleures équipes de l’{epl} et gagnez {num}.',
    failureMeetConditions:
      "Dépôt / Pari à pronostiquer gratuitement. Veuillez d'abord aller sur Dépôt / Parier.",
    waitPatiently: 'Veuillez attendre patiemment le règlement'
  },
  noFound: {
    oops: 'Oops!',
    pageNotFound: 'Page non trouvée',
    pageNotFound2:
      'La page que vous avez demandée est introuvable.Nous y travaillons maintenant:)',
    betOnebet: 'Pariez sur Onebet:'
  },
  registerFreebet: {
    success: 'réussir',
    successArt:
      'Le compte a été enregistré avec succès! <br> XAF 100 Pari gratuit avec succès, vérifiez le billet maintenant?',
    failed: 'Le pari a échoué',
    failedArt:
      'Le compte a été enregistré avec succès! <br> XAF 100 Freebet bet a échoué, utilisez-le pour parier à nouveau maintenant?'
  }
}
