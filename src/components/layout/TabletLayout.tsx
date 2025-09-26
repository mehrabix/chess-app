import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation } from '../navigation/BottomNavigation';
import { TopBar } from '../navigation/TopBar';

interface TabletLayoutProps {
  children: React.ReactNode;
}

export const TabletLayout: React.FC<TabletLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('game');

  return (
    <View style={styles.container}>
      <TopBar />
      
      <View style={styles.content}>
        {children}
      </View>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});
