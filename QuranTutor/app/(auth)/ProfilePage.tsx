import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        setImage(parsed.profileImage || null); // à adapter selon ta DB
      }
    };

    loadUser();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // ici on envoie les données modifiées vers le backend
    try {
      const ip = window.location.hostname;
      const response = await fetch(`http://${ip}:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, profileImage: image }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditing(false);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={image ? { uri: image } : require('@/assets/images/profile.jpg')}
          style={styles.image}
        />
        <Text style={styles.editImageText}>Change Profile Image</Text>
      </TouchableOpacity>

      {editing ? (
        <>
          <TextInput
            style={styles.input}
            value={user.firstname}
            onChangeText={(text) => setUser({ ...user, firstname: text })}
          />
          <TextInput
            style={styles.input}
            value={user.lastname}
            onChangeText={(text) => setUser({ ...user, lastname: text })}
          />
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.name}>{user.firstname} {user.lastname}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#672CBC',
    marginBottom: 16,
  },
  editImageText: {
    color: '#672CBC',
    marginBottom: 16,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#672CBC',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
