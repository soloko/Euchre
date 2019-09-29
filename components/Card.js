/* eslint-disable no-use-before-define */

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const clubs = 'C'
const spades = 'S'
const hearts = 'H'
const diamonds = 'D'

export default function Card(props) {
  let teamColors = props.team ? styles.cardBacks : null
  let color = ''
  let suit = ''
  let rank = props.rank || null
  switch (props.suit) {
    case clubs:
      suit = 'cards-club'
      color = '#000000'
      break
    case spades:
      suit = 'cards-spade'
      color = '#000000'
      break
    case hearts:
      suit = 'cards-heart'
      color = '#fc4242'
      break
    case diamonds:
      suit = 'cards-diamond'
      color = '#fc4242'
      break
    default:
      suit = 'barley'
      color = '#d1cfcf'
  }
  const cardIcon = <Icon name={suit} size={40} />
  return (
    <View style={[styles.cardStyle, styles.container, teamColors]}>
      <Text style={{color: color, fontSize: 40}}>
        {rank}
      </Text>
      <Text style={{color: color, fontSize: 40}}>
        {cardIcon}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: '#fff',
  },
  cardBacks: {
    backgroundColor: '#fc4242',
    borderColor: '#d1cfcf',
  },
  cardStyle: {
    margin: 4,
    borderWidth: 3,
    borderColor: '#d1cfcf',
    borderRadius: 10,
    width: 67,
    height: 105,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
})
