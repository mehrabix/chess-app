import React, { forwardRef } from 'react';
import { Alert, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGame, startNewGame } from '../../store/slices/gameSlice';

interface ModernDrawerNavigationProps {
  children: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.8;

const menuItems = [
  { id: 'new-game', label: 'New Game', icon: '🆕', color: '#4CAF50' },
  { id: 'computer', label: 'vs Computer', icon: '🤖', color: '#2196F3' },
  { id: 'reset', label: 'Reset Game', icon: '🔄', color: '#FF9800' },
  { id: 'settings', label: 'Settings', icon: '⚙️', color: '#9C27B0' },
  { id: 'exit', label: 'Exit', icon: '🚪', color: '#F44336' },
];

export const ModernDrawerNavigation = forwardRef<DrawerLayout, ModernDrawerNavigationProps>(({ children }, ref) => {
  const dispatch = useAppDispatch();
  const { isGameActive } = useAppSelector((state) => state.game);

  const handleItemPress = (itemId: string) => {
    switch (itemId) {
      case 'new-game':
        dispatch(startNewGame({ mode: 'local' }));
        (ref as any)?.current?.closeDrawer();
        break;
      case 'computer':
        dispatch(startNewGame({ mode: 'computer', difficulty: 'medium' }));
        (ref as any)?.current?.closeDrawer();
        break;
      case 'reset':
        if (isGameActive) {
          dispatch(resetGame());
          (ref as any)?.current?.closeDrawer();
        }
        break;
      case 'settings':
        // TODO: Navigate to settings
        (ref as any)?.current?.closeDrawer();
        break;
      case 'exit':
        (ref as any)?.current?.closeDrawer();
        // Show exit confirmation dialog
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
        break;
    }
  };

  const renderNavigationView = () => (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chess Menu</Text>
        <TouchableOpacity 
          onPress={() => (ref as any)?.current?.closeDrawer()} 
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              item.id === 'reset' && !isGameActive && styles.disabledMenuItem
            ]}
            onPress={() => handleItemPress(item.id)}
            disabled={item.id === 'reset' && !isGameActive}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
              <Text style={styles.menuIconText}>{item.icon}</Text>
            </View>
            <Text style={[
              styles.menuLabel,
              item.id === 'reset' && !isGameActive && styles.disabledMenuLabel
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Chess App v1.0.0</Text>
      </View>
    </View>
  );

  return (
    <DrawerLayout
      ref={ref}
      drawerWidth={DRAWER_WIDTH}
      drawerPosition="left"
      drawerType="front"
      drawerBackgroundColor="#fff"
      renderNavigationView={renderNavigationView}
      drawerLockMode="unlocked"
      edgeWidth={20} // Enable edge swipe from left edge
      minSwipeDistance={50} // Minimum distance to trigger drawer
      onDrawerStateChanged={(newState) => {
        // Optional: Handle drawer state changes
        console.log('Drawer state changed:', newState);
      }}
    >
      {children}
    </DrawerLayout>
  );
});

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // @ts-ignore - Web compatibility
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  menuItems: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  disabledMenuItem: {
    opacity: 0.3,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 18,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  disabledMenuLabel: {
    opacity: 0.3,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
