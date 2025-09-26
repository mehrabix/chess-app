import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { PanGestureHandler as RNGHPanGestureHandler, State } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGame, startNewGame } from '../../store/slices/gameSlice';

interface DrawerNavigationProps {
  isOpen: boolean;
  onClose: () => void;
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

export const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { isGameActive } = useAppSelector((state) => state.game);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleItemPress = (itemId: string) => {
    switch (itemId) {
      case 'new-game':
        dispatch(startNewGame({ mode: 'local' }));
        onClose();
        break;
      case 'computer':
        dispatch(startNewGame({ mode: 'computer', difficulty: 'medium' }));
        onClose();
        break;
      case 'reset':
        if (isGameActive) {
          dispatch(resetGame());
          onClose();
        }
        break;
      case 'settings':
        // TODO: Navigate to settings
        onClose();
        break;
      case 'exit':
        // Exit functionality is handled by the global back handler
        onClose();
        break;
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      
      if (translationX < -DRAWER_WIDTH / 2 || velocityX < -500) {
        // Close drawer
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -DRAWER_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onClose();
        });
      } else {
        // Snap back to open
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay, 
          { opacity: overlayOpacity }
        ]}
      >
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Drawer */}
      <RNGHPanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View 
          style={[
            styles.drawer, 
            { transform: [{ translateX }] }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Chess Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
        </Animated.View>
      </RNGHPanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 1000,
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 1001,
    // @ts-ignore - Web compatibility
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50, // Account for status bar
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
