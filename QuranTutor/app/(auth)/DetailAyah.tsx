import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export default function DetailAyah() {
  const { ayah, surah, text, surahName } = useLocalSearchParams();
  const soundRef = useRef<Audio.Sound | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const userId = '6834589dcdc6a073d8d0b8ee';

  const playAyahAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const paddedSurah = (surah as string).padStart(3, '0');
      const paddedAyah = (ayah as string).padStart(3, '0');
      const uri = `https://everyayah.com/data/Hani_Rifai_64kbps/${paddedSurah}${paddedAyah}.mp3`;

      const { sound } = await Audio.Sound.createAsync({ uri });
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Erreur lors de la lecture de l’audio :', error);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Autorisation du micro requise.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors du démarrage de l’enregistrement :', error);
      Alert.alert('Erreur', 'Impossible de démarrer l’enregistrement.');
    }
  };

  const stopRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri || null);
      recordingRef.current = null;
      setIsRecording(false);

      if (uri) await uploadRecording(uri);
    } catch (error) {
      console.error('Erreur lors de l’arrêt de l’enregistrement :', error);
    }
  };

  const uploadRecording = async (uri: string) => {
    try {
      setUploading(true);

      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileName = fileInfo.uri.split('/').pop() || 'audio.m4a';
      const fileType = 'audio/m4a';

      const formData = new FormData();
      formData.append('file', {
        uri: fileInfo.uri,
        name: fileName,
        type: fileType,
      } as any);

      formData.append('userId', userId);
      formData.append('ayah', ayah as string);
      const ip = window.location.hostname;
      const response = await fetch(`http://${ip}:5000/api/upload/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Échec de l’envoi :', result);
        Alert.alert('Échec de l’upload', result?.error || 'Erreur inconnue.');
        return;
      }

      console.log('✅ Upload réussi :', result.url);
      Alert.alert('Succès', 'Votre enregistrement a été envoyé.');
    } catch (error) {
      console.error('Erreur d’upload :', error);
      Alert.alert('Erreur', 'Impossible d’envoyer le fichier.');
    } finally {
      setUploading(false);
    }
  };

  const playUserRecording = async () => {
    try {
      if (!recordingUri) return;

      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      await sound.playAsync();
    } catch (error) {
      console.error('Erreur lecture user recording :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سورة {surahName}</Text>
      

      <View style={styles.textWrapper}>

      
        <View style={styles.ayahBox}>
          <Text style={styles.ayahText}>
            {text} ﴿{ayah}﴾
          </Text>
        </View>

        <View style={styles.feedbackBox}>
          <Text style={styles.instructionText}>
            Tap the mic and start your recitation when you're ready!
          </Text>
        </View>


      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <Ionicons
            name={isRecording ? 'stop-circle' : 'mic-circle'}
            size={34}
            color={isRecording ? '#e74c3c' : '#8e44ad'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playAyahAudio}>
          <Ionicons name="play-circle" size={34} color="#8e44ad" />
        </TouchableOpacity>

        {recordingUri && (
          <TouchableOpacity onPress={playUserRecording}>
            <Ionicons name="play-back-circle" size={34} color="#8e44ad" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => Alert.alert('À venir', 'Fonction de favoris bientôt disponible.')}>
          <Ionicons name="bookmark" size={28} color="#8e44ad" />
        </TouchableOpacity>
      </View>

      {uploading && <Text style={{ textAlign: 'center', marginBottom: 10 }}>Téléversement en cours...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5e2a84',
    marginTop: 20,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  ayahBox: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  ayahText: {
    fontSize: 24,
    writingDirection: 'rtl',
    textAlign: 'right',
    color: '#333',
    lineHeight: 38,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  feedbackBox: {
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
  padding: 16,
  marginTop: 20,
  borderWidth: 1,
  borderColor: '#ddd',
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
feedbackTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#5e2a84',
  marginBottom: 16,
  textAlign: 'center',
},
feedbackScore: {
  fontSize: 16,
  fontWeight: '600',
  color: '#27ae60',
  marginBottom: 10,
  textAlign: 'left',
},
progressBarBackground: {
  height: 10,
  backgroundColor: '#eee',
  borderRadius: 10,
  overflow: 'hidden',
  marginBottom: 10,
},

progressBarFill: {
  height: '100%',
  backgroundColor: '#27ae60',
  borderRadius: 10,
},

feedbackAdvice: {
  fontSize: 15,
  color: '#333',
  marginTop: 12,
  textAlign: 'left',
  fontStyle: 'italic',
},
reciteIntro: {
  marginBottom: 20,
  backgroundColor: '#eee',
  padding: 16,
  borderRadius: 10,
  borderColor: '#cce1f2',
  borderWidth: 1,
},

instructionText: {
  fontSize: 16,
  color: '#2c3e50',
  textAlign: 'center',
  fontWeight: '500',
}

});
