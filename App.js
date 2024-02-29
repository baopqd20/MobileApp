import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const WeatherApp = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = '71e0ab3171efc4530bccfa50d53647c9'; // Thay thế bằng API key thực tế của bạn
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await response.json();
      console.log(data.main)
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter latitude"
        value={latitude}
        onChangeText={(text) => setLatitude(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter longitude"
        value={longitude}
        onChangeText={(text) => setLongitude(text)}
      />

      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{`Temperature: ${weatherData.main.temp}`}</Text>
          <Text style={styles.weatherText}>{`Condition: ${weatherData.main.feels_like}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default WeatherApp;
