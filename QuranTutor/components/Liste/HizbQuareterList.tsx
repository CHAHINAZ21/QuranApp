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
import hizbQuarters from "@/data/hizbQuarters";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const HizbQuarterItem = ({ item }: { item: any }) => {
  const router = useRouter();

  const goToHizbDetail = () => {
    router.push(
      `/HizbQuarterDetail?hizbQuarter=${item.hizbQuarterNumber}&startSurah=${item.startSurahNumber}&startAyah=${item.startAyahNumber}&endSurah=${item.endSurahNumber}&endAyah=${item.endAyahNumber}`
    );
  };

  return (
    <TouchableOpacity
      style={styles.hizbItem}
      activeOpacity={0.8}
      onPress={goToHizbDetail}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require("@/assets/images/icon-number.png")}
          style={styles.iconImage}
          resizeMode="contain"
        />
        <Text style={styles.numberInside}>{item.hizbQuarter}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.nameText}>Hizb Quarter {item.hizbQuarter}</Text>
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Surah {item.startSurahNumber}:{item.startAyahNumber} → {item.endSurahNumber}:{item.endAyahNumber}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.nameArabic} numberOfLines={1}>
            {item.startAyahText?.replace(/[۞]/g, '').slice(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HizbQuarterList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={hizbQuarters}
        keyExtractor={(item) => item.hizbQuarter.toString()}
        renderItem={({ item }) => <HizbQuarterItem item={item} />}
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
  hizbItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    width: screenWidth,
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconImage: {
    width: 48,
    height: 48,
  },
  numberInside: {
    position: "absolute",
    color: "#994EF8",
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 20,
    color: "#994EF8",
    fontFamily: "sans-serif",
    maxWidth: 120,
    textAlign: "right",
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
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },
});

export default HizbQuarterList;
