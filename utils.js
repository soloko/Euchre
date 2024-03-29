/* eslint-disable complexity */
/* eslint-disable guard-for-in */

// DECK RELATED FUNCTIONS
class Deck {
  constructor() {
    this.deck = [];
    this.shuffle()

    const suits = ['H', 'S', 'C', 'D'];
    const values = ['9', '10', 'J', 'Q', 'K', 'A'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push([values[value], suits[suit]]);
      }
    }
  }
  shuffle () {
    const { deck } = this;
    let m = deck.length, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }
    return this;
  }
  deal () {
    const homeOne = this.deck.slice(0, 5)
    const homeTwo = this.deck.slice(5, 10)
    const awayOne = this.deck.slice(10, 15)
    const awayTwo = this.deck.slice(15, 20)
    const topKitty = this.deck[21]

    return {
      homeOne,
      awayOne,
      homeTwo,
      awayTwo,
      topKitty
    }
  }
}

export const fullDeck = new Deck();

export const suitToIcon = (letter) => {
  switch (letter) {
    case 'D':
      return 'cards-diamond'
    case 'C':
      return 'cards-club'
    case 'H':
      return 'cards-heart'
    case 'S':
      return 'cards-spade'
    default:
      return null
  }
}

// TURNS
export const nextTurn = (index) => {
  return index === 3 ? 0 : index + 1
}

export const turnOrderArray = (playerLead) => {
  switch (playerLead){
    case 'awayOne':
      return ['homeTwo', 'awayTwo', 'homeOne']
    case 'homeTwo':
      return ['awayTwo', 'homeOne', 'awayOne']
    case 'awayTwo':
      return ['homeOne', 'awayTwo', 'homeTwo']
    default:
      return ['awayOne', 'homeTwo', 'awayTwo']
  }
}

// EVALUATE CARDS
const trumpRankings = (trumpSuit, card) => {
  let val = 7
  switch (trumpSuit) {
    case 'D':
      val += '9D10DQDKDADJHJD'.indexOf(card.join(''))
      return val
    case 'C':
      val += '9C10CQCKCACJSJC'.indexOf(card.join(''))
      return val
    case 'H':
      val += '9H10HQHKHAHJDJH'.indexOf(card.join(''))
      return val
    case 'S':
      val += '9S10SQSKSASJCJS'.indexOf(card.join(''))
      return val
    default:
      return val
  }
}

const findLeftBower = (trump) => {
  switch (trump){
    case 'D':
      return 'JH'
    case 'H':
      return 'JD'
    case 'S':
      return 'JC'
    default:
      return 'JS'
  }
}

const cardRankings = (card, suitLead, trump) => {
  if (card[1] === trump || card.join('') === findLeftBower(trump)){
    return trumpRankings(trump, card)
  } else if (card[1] !== suitLead){
    return 0
  } else {
    switch (card[0]){
      case '9':
        return 1
      case '10':
        return 2
      case 'J':
        return 3
      case 'Q':
        return 4
      case 'K':
        return 5
      case 'A':
        return 6
      default:
        return 0
    }
  }
}

export const isNextCardWinning = (cardWinning, nextCard, suitLead, trump) => {
  if (cardRankings(nextCard, suitLead, trump) > cardRankings(cardWinning, suitLead, trump)){
    return true
  }
  return false
}

// COMPUTER PLAY CARD
const findTrumpInHand = (cards, trumpSuit) => {
  let hand = {
    trump: [],
    nonTrump: []
  }
  let left = []

  switch (trumpSuit) {
    case 'D':
      left = ['J', 'H']
      cards.forEach(card => {
        if (card[0] === left[0] && card[1] === left[1]){
          hand.trump.push(card)
        } else if (card[1] === trumpSuit){
          hand.trump.push(card)
        } else {
          hand.nonTrump.push(card)
        }
      })
      return hand
    case 'C':
      left = ['J', 'S']
      cards.forEach(card => {
        if (card[0] === left[0] && card[1] === left[1]){
          hand.trump.push(card)
        } else if (card[1] === trumpSuit){
          hand.trump.push(card)
        } else {
          hand.nonTrump.push(card)
        }
      })
      return hand
    case 'H':
        left = ['J', 'D']
        cards.forEach(card => {
          if (card[0] === left[0] && card[1] === left[1]){
            hand.trump.push(card)
          } else if (card[1] === trumpSuit){
            hand.trump.push(card)
          } else {
            hand.nonTrump.push(card)
          }
        })
        return hand
    case 'S':
      left = ['J', 'C']
      cards.forEach(card => {
        if (card[0] === left[0] && card[1] === left[1]){
          hand.trump.push(card)
        } else if (card[1] === trumpSuit){
          hand.trump.push(card)
        } else {
          hand.nonTrump.push(card)
        }
      })
      return hand
    default:
      return cards
  }
}

const followSuit = (cards, suitLead) => {
  return cards.some(card => card[1] === suitLead)
}

export const playCard = (cards, suitLead, trump) => {
  // so we know what the next function returns
  let sortedHand = {
    trump: [],
    nonTrump: [],
  }
  sortedHand = findTrumpInHand(cards, trump)
  let playObj = {
    restOfHand: [],
    cardToPlay: []
  }
  // must play trump
  if (suitLead === trump && sortedHand.trump.length){
    const tempCard = sortedHand.trump.splice(0, 1)
    playObj.cardToPlay = tempCard[0]
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
  // must follow suit if you have any off suit
  else if (followSuit(sortedHand.nonTrump, suitLead)){
    playObj.cardToPlay = sortedHand.nonTrump.find(card => card[1] === suitLead)
    const otherNons = sortedHand.nonTrump.filter(card => card !== playObj.cardToPlay)
    playObj.restOfHand = [...otherNons, ...sortedHand.trump]
    return playObj
  }
  // trump the current lead
  else if (sortedHand.trump.length){
    const tempCard = sortedHand.trump.splice(0, 1)
    playObj.cardToPlay = tempCard[0]
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
  // just play anything
  else {
    const tempCard = sortedHand.nonTrump.splice(0, 1)
    playObj.cardToPlay = tempCard[0]
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
}

// PLEASE GO SLOWER, AI
export const communicationText = (dealer, turnIndex, turnOrder, trump, calledBy) => {
  // you called diamonds
  // your call
  //
  console.log(dealer)
  console.log(turnIndex)
  console.log(turnOrder)
  console.log(trump)
  console.log(calledBy)
}

export const pleaseWait = (func) => {
  setTimeout(func, 500)
}

export const randomPhrase = () => {
  const titles = [
    'If euchred see me now',
    'If euchred turn back time',
    'Euchred go your own way',
    'Euchred be the one',
    'Hi, Im Bob Uecker, and welcome to The Bob Euchre Invitational',
    'My lovely lady trumps',
    'Who is Jack Bower?',
    'Wait, whats trump?',
    'Show us your jacks',
    'Eucher? I hardly know her!',
    'I feel so alone...',
    'What a loner',
    'If only this was poker...',
    'Are nines trump?',
    'That was heartless',
    'Thank God its Friday night and I just just just just just got spade',
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

