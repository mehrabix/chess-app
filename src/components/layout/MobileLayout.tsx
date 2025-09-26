import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { ModernDrawerNavigation } from '../navigation/ModernDrawerNavigation';
import { TopBar } from '../navigation/TopBar';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const drawerRef = useRef<DrawerLayout>(null);

  const handleMenuPress = () => {
    drawerRef.current?.openDrawer();
  };

  return (
    <ModernDrawerNavigation ref={drawerRef}>
      <View style={styles.container}>
        <TopBar onMenuPress={handleMenuPress} />
        
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </ModernDrawerNavigation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 10,
  },
});
