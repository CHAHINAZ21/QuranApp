import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const ip = window.location.hostname;
      console.log("Detected IP or hostname:", ip);
      const response = await fetch(`http://${ip}:5000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Échec de la connexion', data.msg || 'Identifiants invalides.');
        return;
      }

      // 🔐 Stocker le token
      await AsyncStorage.setItem('token', data.token);

      // ✅ Redirection
      router.push({
        pathname: '/(tabs)/home',
        params: { firstname: data.user.firstname },
      });

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue. Réessayez plus tard.');
    }
  };

  const goToSignUp = () => {
    router.push('/(auth)/signup');
  };
  const goToHome = () => {
    router.push('/(tabs)/home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={goToSignUp}>
          Sign up
        </Text>
      </Text>
      <Text style={styles.signupText} onPress={goToHome}>
          Skip
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#672CBC',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#672CBC',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  signupLink: {
    color: '#672CBC',
    fontWeight: 'bold',
  },
});
