import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';
import { TabletLayout } from './TabletLayout';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const { screenSize } = useResponsive();

  const renderLayout = () => {
    try {
      switch (screenSize) {
        case 'desktop':
          return <DesktopLayout>{children}</DesktopLayout>;
        case 'tablet':
          return <TabletLayout>{children}</TabletLayout>;
        case 'mobile':
        default:
          return <MobileLayout>{children}</MobileLayout>;
      }
    } catch (error) {
      console.error('Error rendering layout:', error);
      // Fallback to mobile layout
      return <MobileLayout>{children}</MobileLayout>;
    }
  };

  return (
    <View style={styles.container}>
      {renderLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
