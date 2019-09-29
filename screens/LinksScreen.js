/* eslint-disable no-use-before-define */
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { randomPhrase } from '../utils'
import { MonoText } from '../components/StyledText'


export default class LinksScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.optionsTitleText}>Resources</Text>

          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={this._handlePressDocs}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="ios-information-circle-outline" size={22} color="#ccc" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>How To Play Euchre</Text>
              </View>
            </View>
          </Touchable>

          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={this._handlePressWatch}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="logo-youtube" size={22} color="#ccc" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Watch a tutorial</Text>
              </View>
            </View>
          </Touchable>
          <View style={styles.container}>
            <Image
              source={require('../assets/images/bob.png')}
              style={{flex: 1, height: 250, width: 250}}
              />
            <MonoText style={styles.bobText}>"{randomPhrase()}"</MonoText>
          </View>
        </View>
      </ScrollView>
    )
  }

  _handlePressDocs = () => {
    WebBrowser.openBrowserAsync('https://bicyclecards.com/how-to-play/euchre/');
  };

  _handlePressWatch = () => {
    WebBrowser.openBrowserAsync('https://www.youtube.com/watch?v=c_AyDM3RLXc');
  };
}

LinksScreen.navigationOptions = {
  title: 'Learn Euchre',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
  bobText: {
    fontStyle: 'italic',
    textAlign: 'right',
    marginRight: 5,
    color: 'rgba(96,100,109, 0.8)',
    flex: 1,
    bottom: 200,
    width: 160,
    flexWrap: 'wrap',
    alignSelf: 'flex-end'
  }
});
