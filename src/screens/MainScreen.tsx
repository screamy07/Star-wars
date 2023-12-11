import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import Characters from '../components/Characters.tsx';
import {ScrollView} from 'react-native-virtualized-view';

const MainScreen: FC = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Characters />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
