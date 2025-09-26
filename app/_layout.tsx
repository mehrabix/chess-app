import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../src/store';

// Configure Reanimated to suppress strict mode warnings
import { useEffect } from 'react';
import { Alert, BackHandler, LogBox } from 'react-native';
import { configureReanimatedLogger } from 'react-native-reanimated';

// Disable Reanimated strict mode warnings
configureReanimatedLogger({
  strict: false,
});

// Ignore all Reanimated warnings and shadow deprecation warnings
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render',
  '[Reanimated]',
  '"shadow*" style props are deprecated. Use "boxShadow".',
]);

export default function RootLayout() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the chess app?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
            style: 'destructive',
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
}
