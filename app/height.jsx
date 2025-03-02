import fit from "@/assets/images/img4.jpg";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";

const Height = () => {
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const navigation = useNavigation();

  // Convert height & weight based on unit system
  const convertHeight = (value, isMetric) => {
    if (!value) return ''; // Handle empty input
    return isMetric ? value : (parseFloat(value) * 0.393701).toFixed(2); // cm to inches
  };

  const convertWeight = (value, isMetric) => {
    if (!value) return ''; // Handle empty input
    return isMetric ? value : (parseFloat(value) * 2.20462).toFixed(2); // kg to lbs
  };

  const handleHeightChange = (value) => {
    if (!value) return setHeight('');
    setHeight(isMetric ? value : (parseFloat(value) / 0.393701).toFixed(2)); // Inches to cm
  };

  const handleWeightChange = (value) => {
    if (!value) return setWeight('');
    setWeight(isMetric ? value : (parseFloat(value) / 2.20462).toFixed(2)); // lbs to kg
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Switch for Unit Toggle */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>lb/in</Text>
          <Switch
            value={isMetric}
            onValueChange={() => setIsMetric(!isMetric)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={isMetric ? '#fff' : '#f4f3f4'}
          />
          <Text style={styles.label}>kg/cm</Text>
        </View>

        {/* Height Input */}
        <TextInput
          style={styles.input}
          placeholder={isMetric ? 'Enter height (cm)' : 'Enter height (in)'}
          keyboardType="numeric"
          value={convertHeight(height, isMetric)}
          onChangeText={(value) => handleHeightChange(value)}
        />

        {/* Weight Input */}
        <TextInput
          style={styles.input}
          placeholder={isMetric ? 'Enter weight (kg)' : 'Enter weight (lb)'}
          keyboardType="numeric"
          value={convertWeight(weight, isMetric)}
          onChangeText={(value) => handleWeightChange(value)}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('gender')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 42, fontWeight: 'bold', textAlign: 'center', marginBottom: 100 },
  input: {
    width: '100%',
    height: 50,
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
  },
  image: { width: '100%', height: '100%', flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '25%',
    alignItems: 'center',
  },
  label: { fontWeight: 'bold', fontSize: 27 },
  switchContainer: { position: 'absolute', flexDirection: 'row', alignItems: 'center', marginBottom: 20, right: 25 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default Height;
