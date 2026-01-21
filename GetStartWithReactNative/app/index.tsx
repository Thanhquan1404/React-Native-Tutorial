import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={[styles.largeText, styles.textStyle]}>
          San Francisco
        </Text>

        <Text style={[styles.smallText, styles.textStyle]}>
          Light Cloud
        </Text>

        <Text style={[styles.largeText, styles.textStyle]}>
          24°
        </Text>

        <SearchInput placeholder='Type here'/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
});
