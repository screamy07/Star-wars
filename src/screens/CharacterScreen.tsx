import React, {FC} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TypeCharactersParamList} from '../../App.tsx';

const CharacterScreen: FC<{
  route: RouteProp<TypeCharactersParamList, 'CharacterScreen'>;
}> = ({route}) => {
  const characterData = route.params?.characterData;

  const navigation =
    useNavigation<StackNavigationProp<TypeCharactersParamList>>();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={goBack} style={styles.goBackContainer}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.charcterContainer}>
          <Text>{characterData?.name}</Text>
          <Text>Birth Year: {characterData?.birth_year}</Text>
          <Text>Gender: {characterData?.gender}</Text>
          <Text>Homeworld: {characterData?.homeworld}</Text>
          <Text>
            Species:{' '}
            {characterData?.species.length > 0
              ? characterData?.species
              : 'unknown'}
          </Text>
          <Text>Height: {characterData?.height} cm</Text>
          <Text>Mass: {characterData?.mass} kg</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  charcterContainer: {
    margin: 8,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderColor: '#f1f5f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2, // Elevation for Android
    alignItems: 'center',
  },
  goBackContainer: {
    marginLeft: 8,
  },
  goBackText: {
    color: '#007FFF',
    fontSize: 20,
  },
});

export default CharacterScreen;
