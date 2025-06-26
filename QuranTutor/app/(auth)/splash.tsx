// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCustomPage = () => {
    router.push('/login');  
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quran Tutor</Text>

      <Text style={styles.subtitle}>
        Learn Quran and{'\n'} Recite once everyday
      </Text>

      <Image source={require('@/assets/images/splash.png')}
         resizeMode='contain'
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToCustomPage}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
    backgroundColor:'#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#672CBC',
    marginBottom:10,
  },
  subtitle:{
    fontSize:18,
    color:'#8789A3',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: +45, // Puts half the button inside the image
    backgroundColor: '#F9B091',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const options = {
    headerShown: false,
  };
  