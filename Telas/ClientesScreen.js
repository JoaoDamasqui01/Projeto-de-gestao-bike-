import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from '../Componentes/EstilosUniversal';
import ActionButton from '../Componentes/ActionButton';
import EntityCard from '../Componentes/EntityCard';
import ClientesFormModal from '../Componentes/ClientesFormModal'; // Importa o novo modal

const ClientesScreen = ({ navigation }) => {
  const [clientes, setClientes] = useState([
    { idClientes: 1, nomeClientes: 'João Silva', CPF: '12345678901', email: 'joao@email.com', telefone: '11999998888', dataNasc: '1990-05-20' },
    { idClientes: 2, nomeClientes: 'Maria Souza', CPF: '98765432101', email: 'maria@email.com', telefone: '21988887777', dataNasc: '1985-11-15' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  const handleSaveCliente = (cliente) => {
    if (cliente.idClientes) {
      setClientes(clientes.map(c => c.idClientes === cliente.idClientes ? cliente : c));
    } else {
      setClientes([...clientes, { ...cliente, idClientes: clientes.length + 1 }]);
    }
    setModalVisible(false); // Fecha o modal após salvar
  };

  const handleDeleteCliente = (id) => {
    setClientes(clientes.filter(c => c.idClientes !== id))
    console.log("Cliente deletado com ID:", id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes</Text>
      
      <ActionButton
        title="Adicionar Cliente"
        onPress={() => {
          setCurrentCliente(null);
          setModalVisible(true);
        }}
        icon="person-add"
      />
      
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.idClientes.toString()}
        renderItem={({ item }) => (
          <EntityCard
            title={item.nomeClientes}
            fields={[
              { label: 'CPF', value: item.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') },
              { label: 'E-mail', value: item.email },
              { label: 'Telefone', value: item.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3') },
              { label: 'Data de Nascimento', value: item.dataNasc.split('-').reverse().join('/') },
            ]}
            onEdit={() => {
              setCurrentCliente(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeleteCliente(item.idClientes)}
          />
        )}
      />

      {/* Renderiza o modal fora do FlatList */}
      <ClientesFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCliente}
        cliente={currentCliente}
        title={currentCliente ? 'Editar Cliente' : 'Novo Cliente'}
      />
    </View>
  );
};

export default ClientesScreen;