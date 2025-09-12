import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from '../Componentes/EstilosUniversal'; // Importa os estilos
import ActionButton from '../Componentes/ActionButton';
import EntityCard from '../Componentes/EntityCard';
import OrdensFormModal from '../Componentes/OrdensFormModel'; // Importa o novo modal

const DADOS_SIMULADOS = {
  pagamentos: [
    { idPagamentos: 1, tipoPagamento: 'Dinheiro' },
    { idPagamentos: 2, tipoPagamento: 'Cartão de Crédito' },
    { idPagamentos: 3, tipoPagamento: 'Pix' },
    { idPagamentos: 4, tipoPagamento: 'Boleto' },
  ],
  funcionarios: [
    { idFuncionarios: 1, nomeFuncionario: 'Marlon Martins' },
    { idFuncionarios: 2, nomeFuncionario: 'Maria Oliveira' },
  ],
  clientes: [
    { idClientes: 1, nomeCliente: 'João Silva', CPF: '12345678901', email: 'joao@email.com', telefone: '11999998888', dataNasc: '1990-05-20' },
    { idClientes: 2, nomeCliente: 'Maria Souza', CPF: '98765432101', email: 'maria@email.com', telefone: '21988887777', dataNasc: '1985-11-15' }
  ],
  servicos: [
    { idServicos: 1, nomeServico: 'Revisão Completa', descricao: 'Revisão completa da bicicleta, incluindo troca de óleo, ajuste de freios e verificação geral.', preco: 150.00 },
    { idServicos: 2, nomeServico: 'Troca de Pneus', descricao: 'Substituição dos pneus dianteiro e traseiro por modelos novos.', preco: 80.00 },
    { idServicos: 3, nomeServico: 'Ajuste de Marchas', descricao: 'Ajuste fino das marchas para garantir trocas suaves e precisas.', preco: 40.00 },
    { idServicos: 4, nomeServico: 'Limpeza e Lubrificação', descricao: 'Limpeza completa da bicicleta e lubrificação das partes móveis para melhor desempenho.', preco: 60.00 },
    { idServicos: 5, nomeServico: 'Instalação de Acessórios', descricao: 'Instalação de acessórios como bagageiro, luzes, campainha, entre outros.', preco: 30.00 },
  ]
};

const OrdensScreen = ({ navigation }) => {
  const [ordens, setOrdens] = useState([
    {
      idOrdens: 1,
      idFuncionarios: 1,
      idClientes: 1,
      itensServicos: [1, 2], // IDs dos serviços relacionados
      idPagamentos: 1,
      dataEntrega: '2024-06-20',
      observacao: 'Troca de pneus',
      valor: 80,
    },
    {
      idOrdens: 2,
      idFuncionarios: 2,
      idClientes: 2,
      itensServicos: [3, 4],
      idPagamentos: 2,
      dataEntrega: '2024-06-22',
      observacao: 'Ajuste de freios',
      valor: 45,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrdem, setCurrentOrdem] = useState(null);

  const getClienteName = (idCliente) => DADOS_SIMULADOS.clientes.find(c => c.idClientes === idCliente)?.nomeCliente || 'Não encontrado';
  const getFuncionarioName = (idFuncionario) => DADOS_SIMULADOS.funcionarios.find(f => f.idFuncionarios === idFuncionario)?.nomeFuncionario || 'Não encontrado';
  const getPagamentoTipo = (idPagamento) => DADOS_SIMULADOS.pagamentos.find(p => p.idPagamentos === idPagamento)?.tipoPagamento || 'Não encontrado';

  const getServicoNames = (ids) => {
    if (!ids || ids.length === 0) return 'Nenhum serviço';
    return ids
      .map(id => DADOS_SIMULADOS.servicos.find(s => s.idServicos === id)?.nomeServico || 'Serviço não encontrado')
      .join(', ');
  };

  const handleSaveOrdem = (ordem) => {
    if (ordem.idOrdens) {
      setOrdens(ordens.map(o => (o.idOrdens === ordem.idOrdens ? ordem : o)));
    } else {
      const novoId = Math.max(0, ...ordens.map(o => o.idOrdens)) + 1;
      setOrdens([...ordens, { ...ordem, idOrdens: novoId }]);
    }
    setModalVisible(false);
  };

  const handleDeleteOrdem = (id) => {
   setOrdens(ordens.filter(o => o.idOrdens !== id))
   console.log("Ordem deletada com ID:", id);
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) {
      return 'R$ 0,00';
    }
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ordens de Serviço</Text>

      <ActionButton
        title="Nova Ordem"
        onPress={() => {
          setCurrentOrdem(null);
          setModalVisible(true);
        }}
        icon="add-task"
      />

      <FlatList
        data={ordens}
        keyExtractor={(item) => item.idOrdens.toString()}
        renderItem={({ item }) => (
          <EntityCard
            title={`Ordem #${item.idOrdens}`}
            fields={[
              { label: 'Cliente', value: getClienteName(item.idClientes) },
              { label: 'Funcionário', value: getFuncionarioName(item.idFuncionarios) },
              { label: 'Pagamento', value: getPagamentoTipo(item.idPagamentos) },
              { label: 'Serviços', value: getServicoNames(item.itensServicos) },
              {label: 'Data de Entrega', value: item.dataEntrega ? item.dataEntrega.split('-').reverse().join('/') : 'N/A' },
              { label: 'Observação', value: item.observacao },
              { label: 'Valor', value: formatCurrency(item.valor) },
            ]}
            onEdit={() => {
              setCurrentOrdem(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeleteOrdem(item.idOrdens)}
          />
        )}
      />

      <OrdensFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveOrdem}
        ordem={currentOrdem}
        title={currentOrdem ? 'Editar Ordem' : 'Nova Ordem'}
      />
    </View>
  );
};

export default OrdensScreen;
