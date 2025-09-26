import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'game', label: 'New Game', icon: '♟️' },
  { id: 'computer', label: 'vs Computer', icon: '🤖' },
  { id: 'online', label: 'Online Play', icon: '🌐' },
  { id: 'puzzles', label: 'Puzzles', icon: '🧩' },
  { id: 'analysis', label: 'Analysis', icon: '🔍' },
  { id: 'history', label: 'Game History', icon: '📜' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <View style={[styles.container, collapsed && styles.collapsedContainer]}>
      <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
        <Text style={styles.toggleIcon}>{collapsed ? '→' : '←'}</Text>
      </TouchableOpacity>

      {!collapsed && (
        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Chess Master</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {collapsed && (
        <View style={styles.collapsedMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.collapsedMenuItem}>
              <Text style={styles.collapsedMenuIcon}>{item.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    // @ts-ignore - Web compatibility
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    zIndex: 1000,
  },
  collapsedContainer: {
    width: 60,
  },
  toggleButton: {
    position: 'absolute',
    top: 20,
    right: -15,
    width: 30,
    height: 30,
    backgroundColor: '#2196f3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  toggleIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 20,
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  collapsedMenu: {
    paddingTop: 60,
    alignItems: 'center',
  },
  collapsedMenuItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  collapsedMenuIcon: {
    fontSize: 18,
  },
});
