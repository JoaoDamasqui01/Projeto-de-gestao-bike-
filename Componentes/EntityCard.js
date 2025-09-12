// Componentes/EntityCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EntityCard = ({ title, fields, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {fields.map((field, index) => (
        <View key={index} style={styles.fieldRow}>
          <Text style={styles.cardFieldLabel}>{field.label}:</Text>
          <Text style={[styles.cardFieldValue, field.valueStyle]}>{field.value}</Text>
        </View>
      ))}
      <View style={styles.actions} >
        <TouchableOpacity style={styles.editButton} padding={30} onPress={onEdit}>
          <Icon name="edit" size={20} color="#fff" /> 
          <Text style={{ color: '#fff'}}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Icon name="delete" size={20} color="#fff" />
          <Text style={{ color: '#fff'}}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  cardFieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 5,
  },
  cardFieldValue: {
    fontSize: 14,
    color: '#666',
  },
actions: {
    flexDirection: 'row', // Alinha os botões lado a lado
    justifyContent: 'space-between', // Distribui o espaço entre os botões
    marginTop: 15, // Espaço acima dos botões
  },
  actionButtonBase: { // Estilos base para ambos os botões
    flexDirection: 'row', // Ícone e texto na mesma linha
    alignItems: 'center', // Alinha verticalmente no centro
    justifyContent: 'center', // Alinha horizontalmente no centro
    paddingVertical: 10, // Aumenta a altura do botão
    paddingHorizontal: 15, // Aumenta a largura do botão (útil com flex: 1)
    borderRadius: 8, // Borda arredondada
    flex: 1, // Faz com que o botão ocupe o espaço disponível
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    marginRight: -20 ,
    width: '48%',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
     width: '48%',
  },
});

export default EntityCard;