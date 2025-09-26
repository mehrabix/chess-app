import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';
import { Sidebar } from '../navigation/Sidebar';
import { TopBar } from '../navigation/TopBar';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  const { width } = useResponsive();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 60 : 280;
  const contentWidth = width - sidebarWidth;

  return (
    <View style={styles.container}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <View style={[styles.content, { width: contentWidth, marginLeft: sidebarWidth }]}>
        <TopBar />
        <View style={styles.mainContent}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
});
