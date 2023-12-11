import React, {FC} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

interface IFans {
  maleFans: number;
  femaleFans: number;
  otherFans: number;
  clearFans: () => void;
}

const Fans: FC<IFans> = ({maleFans, femaleFans, otherFans, clearFans}) => {
  return (
    <View style={styles.container}>
      <View style={styles.fansRow}>
        <View style={styles.fans}>
          <Text style={styles.fansText}>Fans</Text>
        </View>
        <TouchableOpacity style={styles.clearFansButton} onPress={clearFans}>
          <Text style={styles.clearFansButtonText}>Clear Fans</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fansGenderRow}>
        <View style={styles.fansGenderContainer}>
          <Text style={styles.fansText}>{femaleFans}</Text>
          <Text style={styles.fansGenderText}>Female Fans</Text>
        </View>
        <View style={styles.fansGenderContainer}>
          <Text style={styles.fansText}>{maleFans}</Text>
          <Text style={styles.fansGenderText}>Male Fans</Text>
        </View>
        <View style={styles.fansGenderContainer}>
          <Text style={styles.fansText}>{otherFans}</Text>
          <Text style={styles.fansGenderText}>Others</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  fansRow: {
    flexDirection: 'row',
  },
  fans: {
    flex: 1,
  },
  fansText: {
    fontSize: 20,
  },
  clearFansButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 4,
  },
  clearFansButtonText: {
    color: 'red',
  },
  fansGenderRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  fansGenderContainer: {
    width: '30%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderColor: '#f1f5f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2, // Elevation for Android
    marginRight: 18,
  },
  fansGenderText: {
    fontSize: 10,
  },
});

export default Fans;
