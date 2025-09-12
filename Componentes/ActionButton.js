// Componentes/ActionButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './EstilosUniversal';

const ActionButton = ({ title, onPress, icon, color = '#3498db' }) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor: color }]} 
    onPress={onPress}
  >
    <Icon name={icon} size={22} color="white" />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ActionButton;