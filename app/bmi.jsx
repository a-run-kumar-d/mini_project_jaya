import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Circle, Line, Path, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');

const Bmi = () => {
  const navigation = useNavigation();

  // Default values for height and weight
  const height = 184; // in cm
  const weight = 105; // in kg

  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    calculateBMI();
  }, []);

  const calculateBMI = () => {
    const h = height / 100;
    const w = weight;
    const bmiValue = (w / (h * h)).toFixed(2);
    setBmi(parseFloat(bmiValue));

    if (bmiValue < 18.5) setStatus('Underweight');
    else if (bmiValue < 25) setStatus('Normal');
    else if (bmiValue < 30) setStatus('Overweight');
    else setStatus('Obese');
  };

  const minBMI = 10, maxBMI = 40;
  const normalizedBmi = Math.max(minBMI, Math.min(bmi || minBMI, maxBMI));
  const bmiAngle = ((normalizedBmi - minBMI) / (maxBMI - minBMI)) * 90; // Map BMI to 180 degrees

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      {/* Display Default Values */}
      <Text style={styles.defaultValues}>Height: {height} cm</Text>
      <Text style={styles.defaultValues}>Weight: {weight} kg</Text>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>BMI: {bmi} ({status})</Text>

          {/* Semi-Circle Chart with Needle */}
          <View style={styles.chartContainer}>
            <Svg width={width * 0.8} height={200} viewBox="0 0 200 100">
              {/* Semi-circle background */}
              <Path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="#ddd" strokeWidth="15" />

             {/* BMI Zones (Revised Arc Paths for Correct Design) */}
             <Path d="M10,100 A90,90 0 0,1 45,30" fill="none" stroke="#ADD8E6" strokeWidth="15" /> {/* Underweight (Blue) */}
              <Path d="M45,30 A96,120 0 0,1 100,10" fill="none" stroke="#90EE90" strokeWidth="15" /> {/* Normal (Green) */}
              <Path d="M100,10 A90,90 0 0,1 145,23" fill="none" stroke="#FFA07A" strokeWidth="15" /> {/* Overweight (Orange) */}
              <Path d="M145,23 A130,95 0 0,1 180,120" fill="none" stroke="#FF6347" strokeWidth="15" /> {/* Obese (Red) */}

              {/* Needle */}
              <Line 
                x1="100" y1="100"
                x2={100 + 80 * Math.cos((bmiAngle - 90) * (Math.PI / 90))}
                y2={100 + 80 * Math.sin((bmiAngle - 90) * (Math.PI / 90))}
                stroke="black" strokeWidth="3"
              />
              <Circle cx="100" cy="100" r="5" fill="black" />
            </Svg>
          </View>
        </View>
      )}

      {/* Next Button */}
      <Button mode="contained" onPress={() => navigation.navigate('hard')} style={styles.nextButton}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  defaultValues: { fontSize: 18, marginBottom: 5, fontWeight: 'bold' },
  resultContainer: { alignItems: 'center', marginTop: 20 },
  result: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  chartContainer: { alignItems: 'center', marginTop: 10 },
  nextButton: { marginTop: 20, backgroundColor: '#6200ea' }
});

export default Bmi;
