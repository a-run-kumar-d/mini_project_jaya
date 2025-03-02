import fit from "@/assets/images/img4.jpg";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      {/*<View style={[styles.radioButton, selected && styles.radioButtonSelected]} />&*/}
      <Text style={[styles.radioButtonLabel, selected ? styles.radioButtonLabelSelected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const goal = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle selection change
  const handleSelectionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>What is your primary goal?</Text>

        <RadioButton
           label="Build Muscle Mass & Size"
           selected={selectedOption === '1'}
           onPress={() => handleSelectionChange('1')}
         />
        <RadioButton
          label="Lose Weight & Burn Fat"
          selected={selectedOption === '2'}
          onPress={() => handleSelectionChange('2')}
        />
        <RadioButton
          label="Increase Strength & Lift More Weight"
          selected={selectedOption === '3'}
          onPress={() => handleSelectionChange('3')}
        />
        <RadioButton
          label="Tone Up - Gain Muscle & Lose Fat"
          selected={selectedOption === '4'}
          onPress={() => handleSelectionChange('4')}
        />
        <RadioButton
          label="Get Fitter & Feel Healthy"
          selected={selectedOption === '5'}
          onPress={() => handleSelectionChange('5')}
        />
        <RadioButton
          label="Train For Tactical Readliness"
          selected={selectedOption === '6'}
          onPress={() => handleSelectionChange('6')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('hard')}
          disabled={!selectedOption} // Disable button if no option is selected
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: 'orange',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioButtonLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Roboto',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  radioButtonLabelSelected: {
    color: 'orange',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    opacity: 0.7, // Make it semi-transparent when disabled
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
});

export default goal;