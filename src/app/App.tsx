import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { Colors, Spacing } from '../styles';
import { Logger, Scale } from '../utils';

import { LabelsChallenge } from '../features/';
import {
  MainButton,
  LoadingHeader,
  CustomSafeAreaView,
  ActivityLabel,
  Title,
} from '../components';

import Lottie from 'lottie-react-native';

export default function App() {

  const [selection, setSelection] = useState('');

  useEffect(() => {
    Logger.log('mount labels challenge screen');
    return () => {
      Logger.log('unmount labels challenge screen');
    };
  }, []);

  function onCompleted(val: string) {
    setSelection(val)
  }

  return (
    <CustomSafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={styles.mainGrap}>
        <View>
          <LoadingHeader />
          <ActivityLabel type={'newWord'} />
          <Title label={'Traduce esta oración'} />

          <Lottie
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
          />

          <Lottie
            style={{ height: Scale.s(80), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/Sad_Emoji.json')}
            autoPlay
            loop
          />
          <Lottie
            style={{ height: Scale.s(80), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/Red_success.json')}
            autoPlay
            loop
          />

          <Lottie
            style={{ height: Scale.s(50), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/loading.json')}
            autoPlay
            loop
          />

          <Lottie
            style={{ height: Scale.s(70), left: -10, bottom: -Scale.s(10) }}
            resizeMode={'contain'}
            autoSize
            source={require('../../assets/lotties/1750831759353.json')}
            autoPlay
            loop
          />


          <LabelsChallenge
            onCompleted={onCompleted}
            label={'componentes de duolingo para react native'}
            extraWords={'los'}
          />
        </View>
        <MainButton
          disabled={selection === ''}
          label={'COMPROBAR'}
          callback={() => {
            console.log(' press out');
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    flex: 1,
    padding: Spacing.l,
    justifyContent: 'space-between',
  },
});
