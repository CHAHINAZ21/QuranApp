import React, { useState }from 'react';
import { View, StyleSheet } from 'react-native';
import SurahList from '@/components/Liste/SurahList';
import Header from '@/components/Header/Header';
import { useLocalSearchParams } from 'expo-router';
import FilterHeader from '@/components/Liste/FilterHeader';
import PageList from '@/components/Liste/PageList';
import HizbQuarterList from '@/components/Liste/HizbQuareterList';
import HizbList from '@/components/Liste/HizbList';
type Params = {
  firstname?: string;
};

export default function Home() {
  const { firstname } = useLocalSearchParams<Params>();
  const [selectedOption, setSelectedOption] = useState("Surah");
  return (
    <View style={styles.container}>
      <Header firstname={firstname ?? 'Guest'} />
      <FilterHeader selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      {selectedOption === "Surah" && <SurahList />}
      {selectedOption === "Page" && <PageList />}
      {selectedOption === "Hizb" && <HizbList />}
      {selectedOption === "Quarter" && <HizbQuarterList />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  
});
