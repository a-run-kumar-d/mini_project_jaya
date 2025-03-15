/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColor = "#FF8036";
const secondaryColor = "#256CD0";
const darkBackground = "#24262B";
const lightBackground = "#FFFFFF";
const darkText = "#ECEDEE";
const lightText = "#11181C";
const accentColor = "#F83E59";
const iconColor = "#393C43";

export const Colors = {
  light: {
    text: lightText,
    background: lightBackground,
    tint: primaryColor,
    icon: iconColor,
    tabIconDefault: iconColor,
    tabIconSelected: primaryColor,
  },
  dark: {
    text: darkText,
    background: darkBackground,
    tint: primaryColor,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryColor,
  },
};
