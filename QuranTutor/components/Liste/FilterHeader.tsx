import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FilterHeaderProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

const FilterHeader = ({ selectedOption, setSelectedOption }: FilterHeaderProps) => {
  const router = useRouter();

  const filterOptions = ['Surah', 'Page', 'Hizb', 'Quarter'];

  const navigateToSearchPage = () => {
    console.log('Clicked on search icon');
    router.push('/(auth)/Search');
  };

  return (
    <View style={styles.headerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {filterOptions.map((option) => (
          <TouchableOpacity key={option} onPress={() => setSelectedOption(option)}>
            <View style={[styles.optionContainer, selectedOption === option && styles.selectedOption]}>
              <Text style={[styles.optionText, selectedOption === option && styles.selectedOptionText]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={navigateToSearchPage}>
          <Ionicons name="search" size={24} color="#8789A3" style={styles.search} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  scrollView: {
    flexDirection: 'row',
  },
  optionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  optionText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  selectedOption: {
    borderBottomWidth: 2,
    borderBottomColor: '#672CBC',
  },
  selectedOptionText: {
    color: '#672CBC',
    fontWeight: '700',
  },
  search: {
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default FilterHeader;
