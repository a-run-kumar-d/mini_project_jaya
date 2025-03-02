import fit from "@/assets/images/img1.jpg";
import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';


const app = () =>{
  return (
    <View style={styles.container}>
      <ImageBackground
        source={fit}
        resizeMode="cover"
        style={styles.image}
      >
      <Text style={styles.title}>Fitness APP</Text>
      <View style={styles.flex}>
      <Link href="/sign_in" style={styles.link}>SIGN IN</Link>
      <Link href="/name_age" style={styles.link}>SIGN UP</Link>
      </View>
      </ImageBackground>
    </View>
  )
}
export default app

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  title:{
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
  },
  image:{
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  flex:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  link: {
    flexDirection: 'row',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    marginBlock: 15,
    borderColor: 'white',
    padding: 6,
  }
})