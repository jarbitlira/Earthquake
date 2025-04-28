import { DarkTheme, LightTheme } from './colors';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';
import { Appearance } from 'react-native';

const getTheme = (mode: ColorSchemeName = Appearance.getColorScheme()) => {
  return mode === 'light' ? LightTheme : DarkTheme;
};

export default getTheme;
