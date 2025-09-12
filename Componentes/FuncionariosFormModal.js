import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const FuncionariosFormModal = ({ visible, onClose, onSave, funcionario, title }) => {
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNasc, setDataNasc] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (funcionario) {
      setNomeFuncionario(funcionario.nomeFuncionario || '');
      setCpf(funcionario.cpf || '');
      setEmail(funcionario.email || '');
      setTelefone(funcionario.telefone || '');
      setDataNasc(new Date(funcionario.dataNasc) || new Date());
    } else {
      setNomeFuncionario('');
      setCpf('');
      setEmail('');
      setTelefone('');
      setDataNasc(new Date());
    }
  }, [funcionario]);

  const handleSave = () => {
    if (!nomeFuncionario || !cpf || !email || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const funcionarioToSave = {
      ...funcionario,
      nomeFuncionario: nomeFuncionario,
      cpf: cpf,
      email: email,
      telefone: telefone,
      dataNasc: dataNasc.toISOString().split('T')[0],
    };

    onSave(funcionarioToSave);
    onClose();
  };

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate || dataNasc;
    setShowDatePicker(false);
    setDataNasc(currentDate);
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

            <Text style={styles.label}>Nome do Funcionário:</Text>
            <TextInput style={styles.input} value={nomeFuncionario} onChangeText={setNomeFuncionario} placeholder="Nome Completo" />
            
            <Text style={styles.label}>CPF:</Text>
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="12345678901" keyboardType="numeric" />
            
            <Text style={styles.label}>E-mail:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="exemplo@email.com" keyboardType="email-address" />
            
            <Text style = {styles.label}>Status</Text>
            <select style={styles.input} value={funcionario?.ativo ? "Ativo" : "Inativo"} editable={false}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select> 

            <Text style={styles.label}>Telefone:</Text>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="(XX) XXXXX-XXXX" keyboardType="phone-pad" />

            <Text style={styles.label}>Data de Nascimento:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputButton}>
              <Text>{dataNasc.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker testID="dateTimePicker" value={dataNasc} mode="date" display="default" onChange={onChangeData} />
            )}
            
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{funcionario ? 'Salvar Alterações': 'Cadastrar'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.buttonText}>{funcionario ? 'Cancelar Alterações': 'Cancelar'}</Text>
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
  inputButton: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
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

export default FuncionariosFormModal;