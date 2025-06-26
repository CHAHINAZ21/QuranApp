import React, { useState, useEffect , useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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

export default function QuranPage() {
  const router = useRouter();
  const { page } = useLocalSearchParams();
  const currentPage = parseInt(page as string) || 1;
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const filtered = ayahsData.filter((ayah: Ayah) => ayah.page === currentPage);
    setAyahs(filtered);

    // Unload audio when leaving component
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentPage]);

  const goToPage = (newPage: number) => {
    router.push(`/QuranPage?page=${newPage}`);
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
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => goToPage(currentPage + 1)} >
          <Ionicons name="arrow-back-circle" size={40} color="#5e2a84" />
        </TouchableOpacity>
        <Text style={styles.pageNumber}>الصفحة {currentPage}</Text>
        <TouchableOpacity onPress={() => goToPage(currentPage - 1) } disabled={currentPage <= 1}>
          <Ionicons name="arrow-forward-circle" size={40} color={currentPage <= 1 ? '#ccc' : '#5e2a84'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ayahs}
        keyExtractor={(item, index) => `${item.surah}-${item.ayah}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.ayahContainer}>
            <Text style={styles.surah}>{item.surahName}</Text>
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
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e2a84',
  },
  ayahContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  surah: {
    fontSize: 16,
    color: '#8e44ad',
    fontWeight: 'bold',
    textAlign: 'right',
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
