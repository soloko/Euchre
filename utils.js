import { CardSwiper } from "native-base";

/* eslint-disable complexity */
/* eslint-disable guard-for-in */
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

export const nextTurn = (index) => {
  return index === 3 ? 0 : index + 1
}

export const turnOrder = (playerLead) => {
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

export const trumpRankings = (trumpSuit, card) => {
  let val = 0
  switch (trumpSuit) {
    case 'D':
      val = 10 + [
        ['9', 'D'],
        ['10', 'D'],
        ['Q', 'D'],
        ['K', 'D'],
        ['A', 'D'],
        ['J', 'H'],
        ['J', 'D'],
      ].indexOf(card)
      return val
    case 'C':
      val = 10 + [
        ['9', 'C'],
        ['10', 'C'],
        ['Q', 'C'],
        ['K', 'C'],
        ['A', 'C'],
        ['J', 'S'],
        ['J', 'C'],
      ].indexOf(card)
      return val
    case 'H':
      val = 10 + [
        ['9', 'H'],
        ['10', 'H'],
        ['Q', 'H'],
        ['K', 'H'],
        ['A', 'H'],
        ['J', 'D'],
        ['J', 'H'],
      ].indexOf(card)
      return val
    case 'S':
      val = 10 + [
        ['9', 'S'],
        ['10', 'S'],
        ['Q', 'S'],
        ['K', 'S'],
        ['A', 'S'],
        ['J', 'C'],
        ['J', 'S'],
      ].indexOf(card)
      return val
    default:
      return val
  }
}

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

// don't think i neeed this anymore
// const findLeftBower = (trump) => {
//   switch (trump){
//     case 'D':
//       return ['J', 'H']
//     case 'H':
//       return ['J', 'D']
//     case 'S':
//       return ['J', 'C']
//     default:
//       return ['J', 'S']
//   }
// }

export const cardRankings = (card, suitLead, trump) => {
  if (trump === suitLead && card[1] !== trump){
     return 0
  } else if (card[1] === trump){
    return trumpRankings(trump, card)
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

// don't think i need this
// const trumpIt = (cards, trump) => {
//   if (cards.includes(findLeftBower(trump))) {
//     return true
//   } else {
//     return cards.some(card => card[1] === trump)
//   }
// }

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
    playObj.cardToPlay = sortedHand.trump.splice(0, 1)
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
  // must follow suit
  else if (followSuit(cards, suitLead)){
    playObj.cardToPlay = sortedHand.nonTrump.find(card => card[1] === suitLead)
    const otherNons = sortedHand.nonTrump.filter(card => card !== playObj.cardToPlay)
    playObj.restOfHand = [...otherNons, ...sortedHand.trump]
    return playObj
  }
  // trump the current lead
  else if (sortedHand.trump.length){
    playObj.cardToPlay = sortedHand.trump.splice(0, 1)
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
  // just play anything
  else {
    playObj.cardToPlay = sortedHand.nonTrump.splice(0, 1)
    playObj.restOfHand = [...sortedHand.trump, ...sortedHand.nonTrump]
    return playObj
  }
}

export const isNextCardWinning = (cardWinning, nextCard, suitLead, trump) => {
  if (cardRankings(nextCard, suitLead, trump) > cardRankings(cardWinning, suitLead, trump)){
    return true
  }
  return false
}

export const communicationText = (dealer, turnIndex, turnOrder, trump, calledBy) => {
  // you called diamonds
  // your call
  //
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

