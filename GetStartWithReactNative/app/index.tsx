import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import SearchInput from './components/SearchInput';
import { fetchCoordinates, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

interface AppState {
  location: string;
  loading: boolean;
  error: boolean;
  temperature: number;
  weather: string;
  description: string;
}


export default class App extends React.Component<any, AppState> {

  state: AppState = {
    location: 'San Francisco',
    loading: false,
    error: false,
    temperature: 0,
    weather: 'Clear',
    description: '',
  };

  componentDidMount() {
    this.handleUpdateLocation(this.state.location);
  }

  handleUpdateLocation = async (city: string) => {
    if (!city) return;

    this.setState({ loading: true, error: false });

    try {
      const { lat, lon, name, country } =
        await fetchCoordinates(city);

      const weatherData =
        await fetchWeather(lat, lon);

      this.setState({
        location: `${name}, ${country}`,
        temperature: weatherData.temperature,
        weather: weatherData.weather,
        description: weatherData.description,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  render() {
    const { loading, error, location, weather, temperature, description } = this.state;
    const imageUrl = getImageForWeather(weather);

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error ? (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try again.
                  </Text>
                ) : (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>

                    <Text style={[styles.smallText, styles.textStyle]}>
                      {description}
                    </Text>

                    <Text style={[styles.temperatureText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>

                  </View>
                )}
              </View>
            )}

            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation}
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
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  image: {
    resizeMode: 'cover',
  },

  detailsContainer: {
    backgroundColor: 'rgba(0,0,0,0.35)', 
    marginHorizontal: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },

  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'Roboto',
  },

  largeText: {
    fontSize: 48,
    letterSpacing: 1,
  },

  smallText: {
    fontSize: 18,
    marginTop: 5,
    opacity: 0.9,
  },

  temperatureText: {
    fontSize: 64,
    fontWeight: '300',
    marginTop: 10,
  },

  errorText: {
    color: '#ffb3b3',
    fontSize: 16,
    textAlign: 'center',
  },
});

