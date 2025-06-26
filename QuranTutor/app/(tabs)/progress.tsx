import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const progressData = [
  { date: '11/05/2025', surah: 'الفاتحة', correct: 5, errors: 2 },
  { date: '10/05/2025', surah: 'الإخلاص', correct: 4, errors: 0 },
  { date: '09/05/2025', surah: 'الفلق', correct: 4, errors: 1 },
];

export default function ProgressScreen() {
  const total = progressData.reduce((acc, item) => acc + item.correct + item.errors, 0);
  const totalCorrect = progressData.reduce((acc, item) => acc + item.correct, 0);
  const totalErrors = progressData.reduce((acc, item) => acc + item.errors, 0);
  const accuracy = total ? ((totalCorrect / total) * 100).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 التقدّم في التلاوة</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>عدد الآيات: {total}</Text>
        <Text style={styles.statsText}>✅  صحيحة: {totalCorrect}</Text>
        <Text style={styles.statsText}>❌  أخطاء: {totalErrors}</Text>
        <Text style={styles.statsText}>📊  الدقة: {accuracy}%</Text>
      </View>

      <Text style={styles.historyTitle}>🕓 سجل المحاولات</Text>

      <FlatList
        data={progressData}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
     
            <View style={styles.topRow}>
            <Text style={styles.dateText}>📅 {item.date}</Text>
            <Text style={styles.surahText}>{item.surah}</Text>
            </View>
            <Text style={styles.detailText}>✅ {item.correct} - ❌ {item.errors}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5e2a84',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#5e2a84',
    fontWeight: '600',
    textAlign: 'right',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e2a84',
    marginBottom: 16,
    textAlign:'center'
  },
  historyItem:
   {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
  },
  topRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 6,
  },

  surahText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8e44ad',
    marginBottom: 4,
    textAlign: 'right',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    textAlign: 'left',
  },
  detailText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#444',
  },
});
