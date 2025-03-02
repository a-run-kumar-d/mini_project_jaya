import fit from "@/assets/images/img4.jpg";
import fit1 from "@/assets/images/img5.jpg";
import fit2 from "@/assets/images/img6.jpg";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";

const RadioButton = (props) => {
  // Destructure the props
  const { label, isSelected, onSelectionChange } = props;

  return (
    // TouchableOpacity is used to handle the press event
    <TouchableOpacity style={styles1.radioButtonContainer} onPress={onSelectionChange}>
      <View style={styles1.radioButton}>
        {/* Render a smaller circle inside the outer circle when isSelected is true */}
        {isSelected ? <View style={styles1.radioButtonSelected} /> : null}
      </View>
      <Text style={styles1.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// Styles for the RadioButton component
const styles1 = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  radioButton: {
    height: 25,
    width: 25,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    //marginLeft: 25,
  },
  radioButtonSelected: {
    width: 25,
    height: 25,
    borderRadius: 7,
    //marginLeft: 10, 
    backgroundColor: 'blue',
  },
  radioButtonLabel: {
    fontSize: 30,          // Adjust text size for better readability
    fontWeight: 'bold',    // Bold text
    color: 'white',      // Dark gray for a modern look
    //marginLeft: 10,        // Space between radio button and text
    fontFamily: 'Roboto',  // Use a custom font if available
    letterSpacing: 1,      // Slight spacing between letters
    textTransform: 'uppercase', // Convert text to uppercase
  },
});

const Gender = () => {
  const navigation = useNavigation();
   // useState hook to manage the selected option
   const [selectedOption, setSelectedOption] = useState(null);

   // Function to handle selection change
   const handleSelectionChange = (option) => {
     setSelectedOption(option);
   };
  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image1}>
        <Text style={styles.title}>Gender</Text>
        <View style={styles.radioGroup}>
        <View style={styles.radio}>
      <Image source={fit1} style={styles.image} />
      <RadioButton 
    label="MALE"
    isSelected={selectedOption === 'male'}
    onSelectionChange={() => handleSelectionChange('male')}
  />
    </View>
    <View style={styles.radio}>
    <Image source={fit2} style={styles.image} />
  <RadioButton
    label="FEMALE"
    isSelected={selectedOption === 'female'}
    onSelectionChange={() => handleSelectionChange('female')}
  />
</View>
</View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('bmi')}>
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
  image1: { width: '100%', height: '100%', flex: 1, resizeMode: 'cover', justifyContent: 'center' },
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
  radio:{
    width: '50%',
    padding: 7,
    justifyContent: 'space-between',
  },
  image:{
    width: 200,
    borderRadius: 40,
  },
  label: { 
  flex: 1,
  position: 'absolute', 
  flexDirection: 'row', 
  alignItems: 'center',
  fontWeight: 'bold', 
  fontSize: 5,
},
radioGroup: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%', // Adjust based on layout
  marginBottom: 20,
  fontSize: 25,
  color: 'white',
},
  switchContainer: { position: 'absolute', flexDirection: 'row', alignItems: 'center', marginBottom: 20, right: 25 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default Gender;
