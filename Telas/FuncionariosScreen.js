import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from '../Componentes/EstilosUniversal';
import ActionButton from '../Componentes/ActionButton';
import EntityCard from '../Componentes/EntityCard';
import FuncionariosFormModal from '../Componentes/FuncionariosFormModal';

const FuncionariosScreen = ({ navigation }) => {
  const [funcionarios, setFuncionarios] = useState([
    { idFuncionarios: 1, nomeFuncionario: 'Carlos Santos', cpf: '12345678901', email: 'carlos@email.com', telefone: '11987654321', dataNasc: '1992-03-10', ativo: true },
    { idFuncionarios: 2, nomeFuncionario: 'Ana Pereira', cpf: '98765432101', email: 'ana@email.com', telefone: '21912345678', dataNasc: '1988-07-25', ativo: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentFuncionario, setCurrentFuncionario] = useState(null);

  const handleSaveFuncionario = (funcionario) => {
    if (funcionario.idFuncionarios) {
      setFuncionarios(funcionarios.map(f => f.idFuncionarios === funcionario.idFuncionarios ? funcionario : f));
    } else {
      setFuncionarios([...funcionarios, { ...funcionario, idFuncionarios: funcionarios.length + 1 }]);
    }
    setModalVisible(false);
  };

  const handleDeleteFuncionario = (id) => {
    setFuncionarios(funcionarios.filter(f => f.idFuncionarios !== id))
    console.log("Funcionário deletado com ID:", id);
  };

  const getStatusStyle = (isActive) => {
    return {
      color: isActive ? 'green' : 'red',
      fontWeight: 'bold',
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Funcionários</Text>
      
      <ActionButton
        title="Adicionar Funcionário"
        onPress={() => {
          setCurrentFuncionario(null);
          setModalVisible(true);
        }}
        icon="person-add"
      />
      
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.idFuncionarios.toString()}
        renderItem={({ item }) => (
          <EntityCard
            title={item.nomeFuncionario}
            fields={[
              { label: 'CPF', value: item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') },
              { label: 'E-mail', value: item.email },
              { label: 'Telefone', value: item.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3') },
              { label: 'Data de Nascimento', value: item.dataNasc.split('-').reverse().join('/') },
              { label: 'Status', value: item.ativo ? 'Ativo' : 'Inativo', valueStyle: getStatusStyle(item.ativo) },
            ]}
            onEdit={() => {
              setCurrentFuncionario(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeleteFuncionario(item.idFuncionarios)}
          />
        )}
      />

      <FuncionariosFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveFuncionario}
        funcionario={currentFuncionario}
        title={currentFuncionario ? 'Editar Funcionário' : 'Novo Funcionário'}
      />
    </View>
  );
};

export default FuncionariosScreen;