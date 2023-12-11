import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-virtualized-view';
import Character from './Character.tsx';
import BlackHeart from '../assets/BlackHeart.tsx';
import SearchIcon from '../assets/SearchIcon.tsx';
import Fans from './Fans.tsx';

interface ICharacter {
  name: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string;
  height: string;
  mass: string;
}

const Characters: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maleFans, setMaleFans] = useState(0);
  const [femaleFans, setFemaleFans] = useState(0);
  const [otherFans, setOtherFans] = useState(0);
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);

  const getAllCharacters = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`,
      );

      const charactersWithDetails = await Promise.all(
        response.data.results.map(async (character: ICharacter) => {
          const homeworldResponse = await axios.get(character.homeworld);
          const homeworld = homeworldResponse.data.name;

          let species: string[] = [];

          if (Array.isArray(character.species)) {
            const speciesPromises = character.species.map(
              async (speciesUrl: string) => {
                const speciesResponse = await axios.get(speciesUrl);
                return speciesResponse.data.name;
              },
            );
            species = await Promise.all(speciesPromises);
          }

          return {
            ...character,
            homeworld,
            species,
          };
        }),
      );

      setCharacters(charactersWithDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPages = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      return Math.ceil(response.data.count / 10);
    } catch (error) {
      console.error('Error fetching total pages:', error);
      return 1;
    }
  };

  useEffect(() => {
    const fetchTotalPages = async () => {
      const total = await getTotalPages();
      setTotalPages(total);
    };

    fetchTotalPages();
  }, []);

  useEffect(() => {
    getAllCharacters(currentPage);
  }, [currentPage]);

  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleFavorite = (gender: string, name: string) => {
    setLikedCharacters(prevLikedCharacters => {
      const isLiked = prevLikedCharacters.includes(name);

      if (isLiked) {
        if (gender === 'male') {
          setMaleFans(prevFans => Math.max(prevFans - 1, 0));
        } else if (gender === 'female') {
          setFemaleFans(prevFans => Math.max(prevFans - 1, 0));
        } else {
          setOtherFans(prevFans => Math.max(prevFans - 1, 0));
        }

        return prevLikedCharacters.filter(character => character !== name);
      } else {
        if (gender === 'male') {
          setMaleFans(prevFans => prevFans + 1);
        } else if (gender === 'female') {
          setFemaleFans(prevFans => prevFans + 1);
        } else {
          setOtherFans(prevFans => prevFans + 1);
        }

        return [...prevLikedCharacters, name];
      }
    });
  };

  const memoizedList = useMemo(() => {
    return (
      <FlatList
        data={filteredCharacters}
        renderItem={({item}) => (
          <Character
            character={item}
            isLiked={likedCharacters.includes(item.name)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        keyExtractor={item => item.name}
      />
    );
  }, [filteredCharacters, likedCharacters]);

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = currentPage === totalPages ? 82 : currentPage * 10;

  return (
    <>
      <Fans
        maleFans={maleFans}
        femaleFans={femaleFans}
        otherFans={otherFans}
        clearFans={() => {
          setLikedCharacters([]);
          setMaleFans(0);
          setFemaleFans(0);
          setOtherFans(0);
        }}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
        </View>
        <View style={styles.listContainer}>
          <View style={styles.itemRow}>
            <View style={styles.iconColumn}>
              <BlackHeart />
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.textDefault}>Name</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.textDefault}>Birth Year</Text>
            </View>
            <View style={styles.genderColumn}>
              <Text style={styles.textDefault}>Gender</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.textDefault}>Home World</Text>
            </View>
            <View style={styles.speciesColumn}>
              <Text style={styles.textDefault}>Species</Text>
            </View>
          </View>
          <ScrollView>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : searchTerm && filteredCharacters.length === 0 ? (
              <Text style={styles.noResultsText}>No results found</Text>
            ) : (
              memoizedList
            )}
          </ScrollView>
        </View>
        <View style={styles.pageRow}>
          <View style={styles.paginationText}>
            <Text>{`${startIndex}-${endIndex} of 82`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handlePagination('prev')}
            disabled={currentPage === 1}
            style={styles.paginationButton}>
            <Text style={{color: currentPage === 1 ? 'gray' : 'black'}}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePagination('next')}
            disabled={currentPage === totalPages}
            style={styles.paginationButton}>
            <Text
              style={{color: currentPage === totalPages ? 'grey' : 'black'}}>
              {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 4,
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
    borderColor: 'lightgray',
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
    marginVertical: 10,
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
  paginationText: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  paginationButton: {
    marginLeft: 10,
  },
});

export default Characters;
