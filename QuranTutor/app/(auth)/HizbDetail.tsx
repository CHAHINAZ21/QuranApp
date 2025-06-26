import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ayahsData from '@/assets/quran_ayahs.json';
import hizbs from '@/data/hizbs';
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

export default function HizbDetail() {
  const router = useRouter();
  const { hizb } = useLocalSearchParams();
  const currentHizb = parseInt(hizb as string) || 1;

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [title, setTitle] = useState<string>('');
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const hizbInfo = hizbs.find((h) => h.hizb === currentHizb);

    if (!hizbInfo) return;

    const { startSurahNumber, startAyahNumber, endSurahNumber, endAyahNumber } = hizbInfo;

    const filteredAyahs = ayahsData.filter((ayah: Ayah) => {
      if (ayah.surah < startSurahNumber || ayah.surah > endSurahNumber) return false;
      if (ayah.surah === startSurahNumber && ayah.ayah < startAyahNumber) return false;
      if (ayah.surah === endSurahNumber && ayah.ayah > endAyahNumber) return false;
      return true;
    });

    setAyahs(filteredAyahs);
    setTitle(`الحزب ${currentHizb}`);

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentHizb]);

  const goToHizb = (newHizb: number) => {
    router.push(`/HizbDetail?hizb=${newHizb}`);
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
        <TouchableOpacity onPress={() => goToHizb(currentHizb + 1)} disabled={currentHizb >= 60}>
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color={currentHizb >= 60 ? '#ccc' : '#5e2a84'}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={() => goToHizb(currentHizb - 1)} disabled={currentHizb <= 1}>
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={currentHizb <= 1 ? '#ccc' : '#5e2a84'}
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
            <Text style={styles.number}>الآية {item.ayah} - {item.surahName}</Text>
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
    marginBottom: 20,
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
    fontSize: 20,
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
