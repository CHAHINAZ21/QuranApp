import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen() {
  const router = useRouter();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (pwd: string): boolean => pwd.length >= 8;

  const handleSignUp = async () => {
  if (!firstname || !lastname || !email || !password) {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  if (!isValidEmail(email)) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    return;
  }

  if (!isValidPassword(password)) {
    Alert.alert('Weak Password', 'Password must be at least 8 characters long.');
    return;
  }

  try {
    
    const ip = window.location.hostname;
    const response = await fetch(`http://${ip}:5000/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert('Error', data.message || 'Signup failed');
      return;
    }

    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    console.log('Signup successful, redirecting...');
    router.replace('/(auth)/login');
 
  } catch (err) {
    console.log('Signup error:', err);
    Alert.alert('Error', 'Something went wrong');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#ccc"
        value={firstname}
        onChangeText={setFirstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#ccc"
        value={lastname}
        onChangeText={setLastname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 8 characters)"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#672CBC',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#672CBC',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#672CBC',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});
