import { SafeAreaView } from 'react-native-safe-area-context';
import { GameView } from '../src/components/game/GameView';
import { ResponsiveLayout } from '../src/components/layout/ResponsiveLayout';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ResponsiveLayout>
        <GameView />
      </ResponsiveLayout>
    </SafeAreaView>
  );
}

