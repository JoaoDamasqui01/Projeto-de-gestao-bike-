import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from '../Componentes/EstilosUniversal'; // Certifique-se que o caminho está correto
import ActionButton from '../Componentes/ActionButton';
import EntityCard from '../Componentes/EntityCard';
import PedidosFormModal from '../Componentes/PedidosFormModal';

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
  pecas: [
    {idPecas: 1, nomePeca: 'Corrente Shimano', codigo: 'CS-001', precoCompra: 55.50, estoque: 15},
    {idPecas: 2, nomePeca: 'Pneu Pirelli Scorpion', codigo: 'PS-002', precoCompra: 120.00, estoque: 10},
    {idPecas: 3, nomePeca: 'Freio a Disco Shimano', codigo: 'FD-003', precoCompra: 200.00, estoque: 8},
    {idPecas: 4, nomePeca: 'Pastilha de freio a disco', codigo: 'PFD-004', precoCompra: 45.90, estoque: 25},
    {idPecas: 5, nomePeca: 'Selim de gel', codigo: 'SG-005', precoCompra: 150.75, estoque: 12},
  ]
};

const PedidosScreen = () => {
  const [pedidos, setPedidos] = useState([
    {
      idPedidos: 1,
      idClientes: 1,
      idFuncionarios: 2,
      idPagamentos: 1,
      itensPecas: [
        { idPeca: 2, quantidade: 1 },
        { idPeca: 4, quantidade: 2 },
      ],
      observacao: 'Troca de pneu e pastilhas',
      valor: 211.80,
      dataEntrega: '2024-06-10',
    },
    {
      idPedidos: 2,
      idClientes: 2,
      idFuncionarios: 1,
      idPagamentos: 3,
      itensPecas: [
        { idPeca: 1, quantidade: 1 },
        { idPeca: 3, quantidade: 1 },
      ],
      observacao: 'Revisão completa com troca de corrente e freio',
      valor: 255.50,
      dataEntrega: '2024-06-15',
    },
    {
      idPedidos: 3,
      idClientes: 1,
      idFuncionarios: 1,
      idPagamentos: 2,
      itensPecas: [
        { idPeca: 5, quantidade: 1 },
      ],
      observacao: 'Troca do selim',
      valor: 150.75,
      dataEntrega: null,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);

  // Funções para buscar nomes a partir dos IDs
  const getClienteName = (idCliente) => DADOS_SIMULADOS.clientes.find(c => c.idClientes === idCliente)?.nomeCliente || 'Não encontrado';
  const getFuncionarioName = (idFuncionario) => DADOS_SIMULADOS.funcionarios.find(f => f.idFuncionarios === idFuncionario)?.nomeFuncionario || 'Não encontrado';
  const getPagamentoTipo = (idPagamento) => DADOS_SIMULADOS.pagamentos.find(p => p.idPagamentos === idPagamento)?.tipoPagamento || 'Não encontrado';

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'R$ 0,00';
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  const getPedidosPecaNames = (itens) => {
    if (!itens || itens.length === 0) return 'Nenhuma peça';
    return itens  
      .map(item => {
        const peca = DADOS_SIMULADOS.pecas.find(p => p.idPecas === item.idPeca);
        return peca ? `${peca.nomePeca} (x${item.quantidade})` : 'Peça não encontrada';
      }
      )
      .join(', ');
  }

  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return dateString.split('-').reverse().join('/');
    } catch {
      return 'Formato inválido';
    }
  };

  const handleSavePedido = (pedido) => {
    if (pedido.idPedidos) {
      setPedidos(pedidos.map(p => p.idPedidos === pedido.idPedidos ? pedido : p));
    } else {
      const novoId = Math.max(0, ...pedidos.map(p => p.idPedidos)) + 1;
      setPedidos([...pedidos, { ...pedido, idPedidos: novoId }]);
    }
    setModalVisible(false);
  };

  const handleDeletePedido = (id) => {
    setPedidos(pedidos.filter(p => p.idPedidos !== id))
    console.log("Pedido deletado com ID:", id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedidos</Text>

      <ActionButton
        title="Novo Pedido"
        onPress={() => {
          setCurrentPedido(null);
          setModalVisible(true);
        }}
        icon="add-shopping-cart"
      />

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.idPedidos.toString()}
        renderItem={({ item }) => (
          <EntityCard
            title={`Pedido #${item.idPedidos}`}
            fields={[
              { label: 'Cliente', value: getClienteName(item.idClientes) },
              { label: 'Funcionário', value: getFuncionarioName(item.idFuncionarios) },
              { label: 'Pagamento', value: getPagamentoTipo(item.idPagamentos) },
              { label: 'Valor', value: formatCurrency(item.valor) },
              { label: 'Peças', value: getPedidosPecaNames(item.itensPecas) },
              { label: 'Data de Entrega', value: formatDateDisplay(item.dataEntrega) },
              { label: 'Observação', value: item.observacao },
            ]}
            onEdit={() => {
              setCurrentPedido(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeletePedido(item.idPedidos)}
          />
        )}
      />

      <PedidosFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePedido}
        pedidos={currentPedido}
        title={currentPedido ? 'Editar Pedido' : 'Novo Pedido'}
      />
    </View>
  );
};

export default PedidosScreen;
