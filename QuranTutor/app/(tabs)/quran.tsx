import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, I18nManager, ImageBackground } from 'react-native';

// Forcer l'écriture de droite à gauche
I18nManager.forceRTL(true);

// Texte de la sourate Al-Fatiha
const ayahs = [
  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  "الرَّحْمَٰنِ الرَّحِيمِ",
  "مَالِكِ يَوْمِ الدِّينِ",
  "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
  "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
  "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
];

export default function Quran() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={require('@/assets/images/zakhrafa.png')} // ton image carrée ici
        style={styles.zakhrafaBackground}
      >
        {/* Contenu de la page par-dessus l’image */}
        <View style={styles.container}>
          {/* En-tête avec image et nom de la sourah */}
          <View style={styles.surahHeader}>
            <Image
              source={require('@/assets/images/sourahDesign.png')}
              style={styles.sourahImage}
            />
            <Text style={styles.surahName}>سُورَةُ ٱلْفَاتِحَةِ</Text>
          </View>

          {/* Texte du Coran */}
          <View style={styles.quranTextContainer}>
            <Text style={styles.quranText}>
              {ayahs.map((ayah, index) => (
                <Text key={index}>
                  {ayah + ' '}
                  <View style={styles.ayahWrapper}>
                    <Image
                      source={require('@/assets/images/iconAyah.png')}
                      style={styles.ayahIcon}
                    />
                    <Text style={styles.ayahNumber}>{index + 1}</Text>
                  </View>{' '}
                </Text>
              ))}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  zakhrafaBackground: {
    flex: 1,
    backgroundColor:'#fff',
    width: '100%',
    height: 630, // tu peux ajuster selon la hauteur désirée
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  surahHeader: {
    position: 'relative',
    top: 10,
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  sourahImage: {
    width: 320,
    height: 80,
    resizeMode: 'contain',
  },
  surahName: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  quranTextContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quranText: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 40,
    width: '85%',
    fontFamily: 'Amiri', // ou 'KFGQPC Uthmanic Script HAFS' si tu as installé le خط العثماني
  },
  ayahWrapper: {
    width: 28,
    height: 28,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
  },
  ayahIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  ayahNumber: {
    position: 'absolute',
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
