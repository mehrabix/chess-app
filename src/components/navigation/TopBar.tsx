import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';

export const TopBar: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      <View style={styles.leftSection}>
        <Text style={[styles.title, isMobile && styles.mobileTitle]}>Chess Master</Text>
      </View>
      
      <View style={styles.rightSection}>
        {!isMobile && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    // @ts-ignore - Web compatibility
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  mobileContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mobileTitle: {
    fontSize: 20,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2196f3',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
