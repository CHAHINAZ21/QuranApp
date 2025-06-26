import React, { useState } from 'react'; 
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import ayahsData from '@/assets/quran_ayahs.json'; // Ajuste le chemin selon ton projet
import { useRouter } from 'expo-router';
interface Ayah {
  surah: number;
  surahName: string;
  ayah: number;
  text: string;
  simpleText: string;
  page: number;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ayah[]>([]);
  const router = useRouter();

  const goToPage = (pageNumber: number) => {
    // Vérifie si le paramètre 'page' est bien transmis dans l'URL
    router.push(`/QuranPage?page=${pageNumber}`);
  };
  

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = ayahsData.filter((ayah: Ayah) =>
      ayah.simpleText.includes(text)
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ابحث عن آية"
        onChangeText={handleSearch}
        value={query}
      />
      <Text style={styles.countText}>عدد النتائج: {results.length}</Text>
      <FlatList
      data={results}
      keyExtractor={(item, index) => `${item.surah}-${item.ayah}-${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => goToPage(item.page)}>
          <View style={styles.result}>
            <Text style={styles.surahTitle}>{item.surahName}</Text>
            <Text style={styles.ayahText}>{item.text}</Text>
            <Text style={styles.pageText}>
              الصفحة {item.page} - الآية {item.ayah}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    marginTop: 10,
    fontSize: 16,
  },
  countText: { marginBottom: 10, fontWeight: 'bold', color: '#5e2a84' },
  result: {
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  surahTitle: {
    color: '#8e44ad', // violet
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'right',
  },
  ayahText: {
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  pageText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
});
