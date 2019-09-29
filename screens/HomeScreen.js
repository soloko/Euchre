/* eslint-disable complexity */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-use-before-define */
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  Alert,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card'
import {fullDeck, suitToIcon, randomPhrase} from '../utils'
import { thisTypeAnnotation } from '@babel/types';


export default class HomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      teamCalled: '',
      calledBy: '',
      trump: '',
      suitLead: '',
      topKitty: [],
      loner: false,
      whoLeads: 'homeOne',
      turnPointer: 0,
      turnOrder: ['homeOne', 'awayOne', 'homeTwo', 'awayTwo'],
      dealer: 0,
      tricks: {
        home: 0,
        away: 0
      },
      gamePoints: {
        home: 0,
        away: 0
      },
      currentCardWinning: {
        card: [],
        player: '',
        team: ''
      },
      // cards in hand
      homeOne: [],
      homeTwo: [],
      awayOne: [],
      awayTwo: [],
      // cards played
      homeOnePlayed: [],
      homeTwoPlayed: [],
      awayOnePlayed: [],
      awayTwoPlayed: [],
      quote: randomPhrase(),
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleDeal = this.handleDeal.bind(this)
    this.setTrump = this.setTrump.bind(this)

  }
  pause() {
    setTimeout(event => {
      console.log('pass')
    }, 2000)
  }
  componentDidMount () {
    const {homeOne, awayOne, homeTwo, awayTwo, topKitty} = fullDeck.shuffle().deal()
    this.setState({
      homeOne,
      awayOne,
      homeTwo,
      awayTwo,
      topKitty
    })
  }
  handleDeal () {
    const {homeOne, awayOne, homeTwo, awayTwo, topKitty} = fullDeck.shuffle().deal()
    this.setState({
      homeOne,
      awayOne,
      homeTwo,
      awayTwo,
      topKitty,
      homeOnePlayed: [],
      homeTwoPlayed: [],
      awayOnePlayed: [],
      awayTwoPlayed: [],
      trump: '',
      currentCardWinning: {
        card: [],
        player: '',
        team: ''
      },
    })
  }
  setTrump(){
    if (this.state.topKitty.length){
      this.setState({
        trump: this.state.topKitty[1],
        topKitty: []
      })
    } else {
    Alert.alert(
      'Choose Trump',
      null,
      [
        {text: '♥️', onPress: () => this.setState({trump: 'H', calledBy: 'homeOne'})},
        {text: '♣️', onPress: () => this.setState({trump: 'C', calledBy: 'homeOne'})},
        {text: '♦️', onPress: () => this.setState({trump: 'D', calledBy: 'homeOne'})},
        {text: '♠️', onPress: () => this.setState({trump: 'S', calledBy: 'homeOne'})},
        {
          text: 'Pass',
          onPress: () => this.setState({trump: 'H', calledBy: 'awayOne'}),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    )
  }
  }
  handlePlay(card) {
    const homeOne = this.state.homeOne.filter(e => e !== card)

    this.setState({
      homeOne: homeOne,
      homeOnePlayed: card,
      homeTwo: [],
      awayOne: [],
      awayTwo: []
    })
  }


  render(){
    const homeOne = this.state.homeOne
    const homeTwo = this.state.homeTwo
    const awayOne = this.state.awayOne
    const awayTwo = this.state.awayTwo

    return (
      <View style={styles.container}>
        <View
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

            <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>

                {this.state.trump && homeOne.length ?
                <MonoText style={[styles.codeHighlightText, styles.quoteText]}>
                  The trump is <Icon name={suitToIcon(this.state.trump)} color={(this.state.trump === 'D' || this.state.trump === 'H') ? '#fc4242' : '#000000'} />
                </MonoText>
                : null}

              <View style={[styles.developmentModeText, styles.partnerContainer]}>
              <View style={styles.leftPartner}>
                <Text>
                  Home: {this.state.gamePoints.home}
                </Text>
              </View>
              <View style={styles.rightPartner}>
                <Text>
                  Away: {this.state.gamePoints.away}
                </Text>
              </View>
              </View>
            </View>


          <View style={styles.homeTeammate}>
            <Card team="home" />
          </View>

          <View style={styles.partnerContainer} >
            <View style={styles.leftPartner}>
              <Card team="away" style={styles.card} />
            </View>


            <View style={styles.rightPartner}>
              <Card team="away" />
            </View>
          </View>

          <View style={styles.userCardPlayed}>
            { this.state.homeOnePlayed.length
              ? <Card rank={this.state.homeOnePlayed[0]} suit={this.state.homeOnePlayed[1]} />
              :
              <View>
                <Card rank={this.state.topKitty[0]} suit={this.state.topKitty[1]} style={styles.nextTo}/>
              </View>
            }
          </View>

          {this.state.trump ?
            this.state.homeOnePlayed ?
              <Card rank={this.state.homeOnePlayed[0]} suit={this.state.homeOnePlayed[1]} />
              : null
            :
            <View style={styles.callPassContainer}>
              <View style={styles.callPassButtons}>
                <Button title="Order Up" onPress={this.setTrump} />
              </View>
              <View style={styles.callPassButtons}>
                <Button title="Pass" onPress={() => this.setState({topKitty: []})} />
              </View>
            </View>
          }
        </View>

        <View style={styles.tabBarInfoContainer}>
          <View style={styles.userHandContainer}>
            {[...homeOne, ...homeTwo, ...awayOne, ...awayTwo].length === 0
              ?
              <Button title="Deal" onPress={this.handleDeal}>Hello</Button>
              :
              homeOne.map(card => (
              <TouchableOpacity key={card.join('')} onPress={() => this.handlePlay(card)} >
                <Card key={card.join('')} name={card.join('')} rank={card[0]} suit={card[1]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10
  },
  // card: {
  //   minHeight: 105,
  //   width: 67
  // },
  callPassContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 120
  },
  callPassButtons: {
    borderColor: '#0a85ff',
    borderRadius: 10,
    borderWidth: 3,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    flex: 3,
    justifyContent: 'space-around',
    backgroundColor: '#d1cfcf',
    textDecorationColor: 'white',
    shadowColor: '#0a85ff',
    shadowOffset: { width: 2, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  userCardPlayed: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 50,
    height: 120,
    bottom: 40
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  partnerContainer: {
    flex: 1,
    flexDirection: 'row',
    // flexShrink: 1,
    // flexGrow: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  leftPartner: {
    position: 'absolute',
    left: 0,
  },
  rightPartner: {
    position: 'absolute',
    right: 0,
  },
  userHandContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    flexShrink: 1,
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 10,
    height: 120
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homeTeammate: {
    alignItems: 'center',
    marginHorizontal: 50,
    height: 120,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
    alignSelf: 'center',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    textAlign: 'center'
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
