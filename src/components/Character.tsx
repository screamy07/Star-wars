import React, {FC, memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RedHeart from '../assets/RedHeart.tsx';
import EmptyRedHeart from '../assets/EmptyRedHeart.tsx';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TypeCharactersParamList} from '../../App.tsx';

interface ICharacterProps {
  character: {
    name: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    species: string;
    height: string;
    mass: string;
  };
  isLiked: boolean;
  onToggleFavorite: (gender: string, name: string) => void;
}

const Character: FC<ICharacterProps> = ({
  character,
  isLiked,
  onToggleFavorite,
}) => {
  const navigation =
    useNavigation<StackNavigationProp<TypeCharactersParamList>>();

  const navigateTo = () => {
    navigation.navigate('CharacterScreen', {characterData: character});
  };

  const toggleFavorite = useCallback(() => {
    onToggleFavorite(character.gender, character.name);
  }, [character.gender, character.name, onToggleFavorite]);

  return (
    <View style={styles.itemRow}>
      <View style={styles.iconItemColumn}>
        <TouchableOpacity onPress={toggleFavorite}>
          {isLiked ? <RedHeart /> : <EmptyRedHeart />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nameItemColumn} onPress={navigateTo}>
        <Text style={styles.textDefault}>{character.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoItemColumn}>
        <Text style={styles.textDefault}>{character?.birth_year}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.genderItemColumn}>
        <Text style={styles.textDefault}>{character?.gender}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoItemColumn}>
        <Text style={styles.textDefault}>{character?.homeworld}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.speciesItemColumn}>
        <Text style={styles.textDefault}>{character?.species}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#f1f5f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2, // Elevation for Android
  },
  listContainer: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  textDefault: {
    fontSize: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    margin: 5,
    paddingLeft: 10,
  },
  itemRow: {
    flexDirection: 'row',
  },
  pageRow: {
    flexDirection: 'row',
  },
  iconColumn: {
    width: '8%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: 'lightgrey',
    marginVertical: 8,
    marginLeft: 5,
  },
  nameColumn: {
    width: '22.5%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: 'lightgrey',
    marginVertical: 8,
    marginLeft: 5,
  },
  infoColumn: {
    width: '17.5%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: 'lightgrey',
    marginVertical: 8,
    marginLeft: 5,
  },
  genderColumn: {
    width: '12.5%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: 'lightgrey',
    marginVertical: 8,
    marginLeft: 5,
  },
  speciesColumn: {
    width: '17.5%',
    justifyContent: 'center',
    marginLeft: 5,
  },
  iconItemColumn: {
    width: '8%',
    justifyContent: 'center',
    marginLeft: 5,
    marginVertical: 8,
  },
  nameItemColumn: {
    width: '22.5%',
    justifyContent: 'center',
    marginLeft: 5,
    marginVertical: 8,
  },
  infoItemColumn: {
    width: '17.5%',
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 5,
  },
  genderItemColumn: {
    width: '12.5%',
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 5,
  },
  speciesItemColumn: {
    width: '17.5%',
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 5,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: 'grey',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: 'grey',
  },
});

export default memo(Character);
