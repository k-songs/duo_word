/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';

// react-native-screens 초기화
import { enableScreens } from 'react-native-screens';
enableScreens();

AppRegistry.registerComponent(appName, () => App);
