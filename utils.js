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

const findLeftBower = (trump) => {
  switch (trump){
    case 'D':
      return ['J', 'H']
    case 'H':
      return ['J', 'D']
    case 'S':
      return ['J', 'C']
    default:
      return ['J', 'S']
  }
}

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


const followSuit = (cards, suitLead) => {
  return cards.some(card => card[1] === suitLead)
}

const trumpIt = (cards, trump) => {
  if (cards.includes(findLeftBower(trump))) {
    return true
  } else {
    return cards.some(card => card[1] === trump)
  }
}

// export const playCard = (cards, suitLead, trump, cardWinning) => {
//   let left = findLeftBower(trump)
//   let hasLeft = cards.includes(left)
//   let playObj = {
//     restOfHand: []
//   }
//   if (withoutBower.length === 4){
//     if (followSuit(withoutBower, suitLead)){
//       for (let i = 0; i < withoutBower.length; i++){
//         let card = withoutBower[i]
//         if (card[1] === suitLead && !playObj.cardToPlay){
//           playObj.cardToPlay = card
//         } else {
//           playObj.restOfHand.push(card)
//         }
//       }
//       return playObj
//     } else if (trumpIt(withoutBower, trump)){

//     }
//   }
//   else if (followSuit(cards, suitLead)){
//     const cardToPlay = cards.find(c => c[1] === suitLead)
//     const restOfHand = (cards.filter(c => c !== cardToPlay))
//   }
//   else if (trumpIt(cards, trump)){
//     cards.filter(c => c[1] === trump)
//   }

// }

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

