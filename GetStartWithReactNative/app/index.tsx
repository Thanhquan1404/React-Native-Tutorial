import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  View,
} from 'react-native';
import SearchInput from './components/SearchInput';

interface AppState {
  location: string;
}

export default class App extends React.Component<any, AppState> {
  state: AppState;

  constructor(props: any) {
    super(props);

    this.state = {
      location: 'San Francisco',
    };
  }

  handleLocationSubmit = (location: string): void => {
    this.setState({ location });
  };

  render() {
    const { location } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground style={styles.imageContainer} resizeMode="cover">
          <View>
            <Text style={[styles.largeText, styles.textStyle]}>
              {location}
            </Text>

            <Text style={[styles.smallText, styles.textStyle]}>
              Light Cloud
            </Text>

            <Text style={[styles.largeText, styles.textStyle]}>
              24°
            </Text>

            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleLocationSubmit}
            />
          </View>
        </ImageBackground>
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
  imageContainer: {
    flex: 1,
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
