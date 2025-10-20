import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors, Spacing } from '../styles';
import { Logger, Scale } from '../utils';
import { LabelsChallenge } from '../features/';
import { RootStackParamList } from './App';

import {
  MainButton,
  LoadingHeader,
  CustomSafeAreaView,
  ActivityLabel,
  Title,
} from '../components';

import Lottie from 'lottie-react-native';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    Logger.log('mount labels challenge screen');
    return () => {
      Logger.log('unmount labels challenge screen');
    };
  }, []);

  function onCompleted(val: string) {
    setSelection(val);
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.mainGrap}>
        <View>
          <LoadingHeader />
          <ActivityLabel type={'newWord'} />
          <Title label={'Traduce esta31 oración'} />

   {/*        <Lottie
            style={{ height: Scale.s(80), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/path_falstaff_eating.json')}
            autoPlay
            loop
          />
          <Lottie
            style={{ height: Scale.s(80), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/shilver_medal.json')}
            autoPlay
            loop
          /> */}

          <Lottie
            style={{ height: Scale.s(80), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/Sad_Emoji.json')}
            autoPlay
            loop
          />

          <LabelsChallenge
            onCompleted={onCompleted}
            label={'componentes de duolingo para react native'}
            extraWords={'los'}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <MainButton
            disabled={selection === ''}
            label={'COMPROBAR'}
            callback={() => {
              console.log('press out');
            }}
          />
          <View style={styles.buttonSpacer} />
          <MainButton
            label={'🍭 캔디 크러쉬 게임'}
            callback={() => navigation.navigate('TestPage')}
          />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainGrap: {
    flex: 1,
    padding: Spacing.l,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    // 버튼들을 세로로 배치
  },
  buttonSpacer: {
    height: Spacing.s || 8,
  },
});
