import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';


// Exemplo de serviços (você deve definir essa lista correta)
const pecas = [
  {idPecas: 1, nomePeca: 'Corrente Shimano', codigo: 'CS-001', precoCompra: 55.50, estoque: 15},
  {idPecas: 2, nomePeca : 'Pneu Pirelli Scorpion', codigo: 'PS-002',precoCompra: 120.00, estoque: 10},
  {idPecas: 3, nomePeca: 'Freio a Disco Shimano', codigo: 'FD-003',precoCompra: 200.00, estoque: 8},
  {idPecas: 4, nomePeca: 'Pastilha de freio a disco', codigo: 'PFD-004',precoCompra: 45.90, estoque: 25},
  {idPecas: 5, nomePeca: 'Selim de gel', codigo: 'SG-005', precoCompra: 150.75, estoque: 12},
];

const PecasFormModal = ({ visible, onClose, onSave, peca, title }) => {
  const [nomePeca, setNomePeca] = useState('');
  const [codigo, setCodigo] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [estoque, setEstoque] = useState('');

  useEffect(() => {
    if (peca) {
      setNomePeca(peca.nomePeca || '');
      setCodigo(peca.codigo || '');
      setPrecoCompra(peca.precoCompra?.toString().replace('.', ',') || '');
      setEstoque(peca.estoque?.toString() || '');
    } else {
      setNomePeca('');
      setCodigo('');
      setPrecoCompra('');
      setEstoque('');
    }
  }, [peca]);

  const handleSave = () => {
    if (!nomePeca || !codigo || !precoCompra || !estoque) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const pecaToSave = {
      ...peca,
      nomePeca: nomePeca,
      codigo: codigo,
      precoCompra: parseFloat(precoCompra.replace(',', '.')),
      estoque: parseInt(estoque),
    };

    onSave(pecaToSave);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.label}>Nome da Peça:</Text>
            <TextInput style={styles.input} value={nomePeca} onChangeText={setNomePeca} placeholder="Ex: Câmbio, Pneu" />
            
            <Text style={styles.label}>Código:</Text>
            <TextInput style={styles.input} value={codigo} onChangeText={setCodigo} placeholder="Ex: SHI-001" />
            
            <Text style={styles.label}>Preço de Compra:</Text>
            <TextInput style={styles.input} value={precoCompra} onChangeText={setPrecoCompra} placeholder="0,00" keyboardType="numeric" />

            <Text style={styles.label}>Estoque:</Text>
            <TextInput style={styles.input} value={estoque} onChangeText={setEstoque} placeholder="0" keyboardType="numeric" />
            
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{pecas ? 'Salvar Alterações': 'Cadastrar'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.buttonText}>{pecas ? 'Cancelar Alterações': 'Cancelar'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
});

export default PecasFormModal;