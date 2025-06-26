import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ayahsData from '@/assets/quran_ayahs.json';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface Ayah {
  surah: number;
  surahName: string;
  ayah: number;
  text: string;
  simpleText: string;
  page: number;
}

export default function SurahDetail() {
  const router = useRouter();
  const { surahNumber } = useLocalSearchParams();
  const currentSurah = parseInt(surahNumber as string) || 1;

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surahName, setSurahName] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const filtered = ayahsData.filter((ayah: Ayah) => ayah.surah === currentSurah);
    setAyahs(filtered);
    if (filtered.length > 0) {
      setSurahName(filtered[0].surahName);
    }

    // Unload audio when leaving component
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentSurah]);

  const goToSurah = (newSurah: number) => {
    router.push(`/SurahDetail?surahNumber=${newSurah}`);
  };

  const playAudio = async (surah: number, ayah: number) => {
  try {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const paddedSurah = surah.toString().padStart(3, '0');
    const paddedAyah = ayah.toString().padStart(3, '0');

    const uri = `https://everyayah.com/data/Hani_Rifai_64kbps/${paddedSurah}${paddedAyah}.mp3`;

    const { sound } = await Audio.Sound.createAsync({ uri });
    soundRef.current = sound;
    await sound.playAsync();
  } catch (error) {
    console.error('Erreur lors de la lecture audio :', error);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => goToSurah(currentSurah + 1)} disabled={currentSurah >= 114}>
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color={currentSurah >= 114 ? '#ccc' : '#5e2a84'}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{surahName}</Text>

        <TouchableOpacity onPress={() => goToSurah(currentSurah - 1)} disabled={currentSurah <= 1 }>
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={currentSurah <= 1 ? '#ccc' : '#5e2a84'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ayahs}
        keyExtractor={(item, index) => `${item.surah}-${item.ayah}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.ayahContainer}>
            <View style={styles.ayahContent}>
               <Text style={styles.text}>{item.text}</Text>
               <TouchableOpacity onPress={() => playAudio(item.surah, item.ayah)}>
                <Ionicons name="play-circle" size={28} color="#5e2a84" />
              </TouchableOpacity>    
            </View>
            <Text style={styles.number}>الآية {item.ayah}</Text>      
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5e2a84',
    textAlign: 'center',
  },
  ayahContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  ayahContent: {
    flexDirection: 'row-reverse', // ← important pour l'arabe
    justifyContent: 'flex-start',
    alignItems: 'center',         // ou 'flex-start'
    gap: 8,    
  },
  text: {
    fontSize: 24,
    textAlign: 'right',
    marginVertical: 4,
    writingDirection: 'rtl', 
    flex: 1, 
    flexWrap: 'wrap',        // ← pour que le texte se replie
    alignSelf: 'flex-end',   // ← utile pour forcer à droite
  },
  number: {
    fontSize: 14,
    textAlign: 'right',
    color: '#666',
  },
});
