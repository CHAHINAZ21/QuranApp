import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import ayahsData from '@/assets/quran_ayahs.json';

interface Ayah {
  surah: number;
  surahName: string;
  ayah: number;
  text: string;
  simpleText: string;
  page: number;
}

interface PageSurah {
  name: string;
  startAyah: number;
  endAyah: number;
}

interface PageItemData {
  pageNumber: number;
  surahs: PageSurah[];
}

const screenWidth = Dimensions.get("window").width;

const PageList = () => {
  const [pagesData, setPagesData] = useState<PageItemData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const pageMap = new Map<number, Map<string, number[]>>();

    ayahsData.forEach((ayah: Ayah) => {
      const { page, surahName, ayah: ayahNumber } = ayah;
      if (!pageMap.has(page)) {
        pageMap.set(page, new Map());
      }
      const surahsMap = pageMap.get(page)!;

      if (!surahsMap.has(surahName)) {
        surahsMap.set(surahName, []);
      }
      surahsMap.get(surahName)!.push(ayahNumber);
    });

    const result: PageItemData[] = Array.from(pageMap.entries()).map(
      ([pageNumber, surahEntries]) => ({
        pageNumber,
        surahs: Array.from(surahEntries.entries()).map(([name, ayahs]) => ({
          name,
          startAyah: Math.min(...ayahs),
          endAyah: Math.max(...ayahs),
        })),
      })
    );

    result.sort((a, b) => a.pageNumber - b.pageNumber);
    setPagesData(result);
  }, []);

  const renderItem = ({ item }: { item: PageItemData }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/QuranPage?page=${item.pageNumber}`)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/icon-number.png')}
          style={styles.iconImage}
          resizeMode="contain"
        />
        <Text style={styles.numberInside}>{item.pageNumber}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.nameText}>Page {item.pageNumber}</Text>
            <View style={styles.badgesContainer}>
              {item.surahs.map((surah, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {surah.name}: Ayahs {surah.startAyah} → {surah.endAyah}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.nameArabic}>صفحة {item.pageNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pagesData}
        keyExtractor={(item) => item.pageNumber.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    width: screenWidth,
    backgroundColor: "#fff",
  },
  numberContainer: {
    borderWidth: 2,
    borderColor: "#994EF8",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fond blanc
    shadowColor: "#994EF8", // Petit effet étoile
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Android shadow
  },
  
  numberText: {
    color: "#994EF8",
    fontWeight: "bold",
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 30,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
  },
  nameArabic: {
    fontSize: 24,
    color: "#994EF8",
    fontFamily: "sans-serif",
  },
  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#757575",
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D1D1",
    marginHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  }, 
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconImage: {
    width: 48,
    height: 48,
  },
  numberInside: {
    position: 'absolute',
    color: '#994EF8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PageList;