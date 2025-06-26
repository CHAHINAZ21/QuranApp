import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import surahs from "@/data/Surahs";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const SurahItem = ({ surah }: { surah: any }) => {
  const router = useRouter();
  const goToSurahDetail = (surahNumber: number) => {
    router.push(`/SurahDetail?surahNumber=${surahNumber}`);
  };
  return (
    <TouchableOpacity
      style={styles.surahItem}
      activeOpacity={0.8}
      onPress={() => goToSurahDetail(surah.number)}
    >

    <View style={styles.iconContainer}>
      <Image
        source={require('@/assets/images/icon-number.png')} 
        style={styles.iconImage}
        resizeMode="contain"
      />
      <Text style={styles.numberInside}>{surah.number}</Text>
    </View>

      <View style={styles.textContainer}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.nameText}>{surah.nameEnglish}</Text>
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{surah.type}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{surah.verses} VERSES</Text>
              </View>
            </View>
          </View>

          <Text style={styles.nameArabic}>{surah.nameArabic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SurahList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => <SurahItem surah={item} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  surahItem: {
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

export default SurahList;
