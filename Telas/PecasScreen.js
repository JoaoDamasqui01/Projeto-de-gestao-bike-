import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from '../Componentes/EstilosUniversal';
import ActionButton from '../Componentes/ActionButton';
import EntityCard from '../Componentes/EntityCard';
import PecasFormModal from '../Componentes/PecasFormModel'; // Importa o novo modal

const PecasScreen = ({ navigation }) => {
  const [pecas, setPecas] = useState([
    { idPecas: 1, nomePeca: 'Câmbio Shimano', codigo: 'SHI-001', precoCompra: 95.00, estoque: 15 },
    { idPecas: 2, nomePeca: 'Freio a Disco', codigo: 'FRD-002', precoCompra: 72.50, estoque: 8 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPeca, setCurrentPeca] = useState(null);

  const handleSavePeca = (peca) => {
    if (peca.idPecas) {
      setPecas(pecas.map(p => p.idPecas === peca.idPecas ? peca : p));
    } else {
      setPecas([...pecas, { ...peca, idPecas: pecas.length + 1 }]);
    }
    setModalVisible(false); // Fecha o modal após salvar
  };

  const handleDeletePeca = (id) => {
    setPecas(pecas.filter(p => p.idPecas !== id))
    console.log("Peça deletada com ID:", id);
  };

  const formatCurrency = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Peças</Text>
      
      <ActionButton
        title="Adicionar Peça"
        onPress={() => {
          setCurrentPeca(null);
          setModalVisible(true);
        }}
        icon="add-shopping-cart"
      />
      
      <FlatList
        data={pecas}
        keyExtractor={(item) => item.idPecas.toString()}
        renderItem={({ item }) => (
          <EntityCard
            title={item.nomePeca}
            fields={[
              { label: 'Código', value: item.codigo },
              { label: 'Preço de Compra', value: formatCurrency(item.precoCompra) },
              { label: 'Estoque', value: item.estoque.toString() },
            ]}
            onEdit={() => {
              setCurrentPeca(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeletePeca(item.idPecas)}
          />
        )}
      />

      {/* Renderiza o modal fora do FlatList */}
      <PecasFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePeca}
        peca={currentPeca}
        title={currentPeca ? 'Editar Peça' : 'Nova Peça'}
      />
    </View>
  );
};

export default PecasScreen;