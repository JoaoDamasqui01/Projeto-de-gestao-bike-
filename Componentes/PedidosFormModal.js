import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const pagamentos = [
  { idPagamentos: 1, tipoPagamento: 'Dinheiro' },
  { idPagamentos: 2, tipoPagamento: 'Cartão de Crédito' },
  { idPagamentos: 3, tipoPagamento: 'Pix' },
  { idPagamentos: 4, tipoPagamento: 'Boleto' },
];

const funcionarios = [
  { idFuncionarios: 1, nomeFuncionario: 'Marlon Martins' },
  { idFuncionarios: 2, nomeFuncionario: 'Maria Oliveira' },
];

const clientes = [
  { idClientes: 1, nomeCliente: 'João Silva', CPF: '12345678901', email: 'joao@email.com', telefone: '11999998888', dataNasc: '1990-05-20' },
  { idClientes: 2, nomeCliente: 'Maria Souza', CPF: '98765432101', email: 'maria@email.com', telefone: '21988887777', dataNasc: '1985-11-15' }
];

// Exemplo de peças
const pecas = [
  {idPecas: 1, nomePeca: 'Corrente Shimano', codigo: 'CS-001', precoCompra: 55.50, estoque: 15},
  {idPecas: 2, nomePeca: 'Pneu Pirelli Scorpion', codigo: 'PS-002', precoCompra: 120.00, estoque: 10},
  {idPecas: 3, nomePeca: 'Freio a Disco Shimano', codigo: 'FD-003', precoCompra: 200.00, estoque: 8},
  {idPecas: 4, nomePeca: 'Pastilha de freio a disco', codigo: 'PFD-004', precoCompra: 45.90, estoque: 25},
  {idPecas: 5, nomePeca: 'Selim de gel', codigo: 'SG-005', precoCompra: 150.75, estoque: 12},
];

const PedidosFormModal = ({ visible, onClose, onSave, pedidos, title }) => {
  const [idFuncionarios, setIdFuncionarios] = useState(funcionarios[0]?.idFuncionarios.toString());
  const [idClientes, setIdClientes] = useState(clientes[0]?.idClientes.toString());
  const [idPagamentos, setIdPagamentos] = useState(pagamentos[0].idPagamentos.toString());
  const [valor, setValor] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [observacao, setObservacao] = useState('');

  // Estado dos itens de peças do pedido
  const [itensPecas, setItensPecas] = useState([]);

  useEffect(() => {
    if (pedidos) {
      setIdFuncionarios(pedidos.idFuncionarios?.toString() || '');
      setIdClientes(pedidos.idClientes?.toString() || '');
      setIdPagamentos(pedidos.idPagamentos?.toString() || pagamentos[0].idPagamentos.toString());
      setValor(pedidos.valor?.toString() || '');
      setObservacao(pedidos.observacao || '');
      setDataEntrega(pedidos.dataEntrega || '');

      if (pedidos.itensPecas) {
        setItensPecas(pedidos.itensPecas);
      } else {
        setItensPecas([]);
      }
    } else {
      setIdFuncionarios(funcionarios[0]?.idFuncionarios.toString() || '');
      setIdClientes(clientes[0]?.idClientes.toString() || '');
      setIdPagamentos(pagamentos[0].idPagamentos.toString());
      setValor('');
      setObservacao('');
      setDataEntrega('');
      setItensPecas([]);
    }
  }, [pedidos]);

  // Manipular alteração dos itens
  const handleItemChange = (index, field, value) => {
    const newItens = [...itensPecas];
    newItens[index][field] = value;
    setItensPecas(newItens);
  };

  // Adicionar novo item
  const addItem = () => {
    setItensPecas([...itensPecas, { idPeca: '', quantidade: '' }]);
  };

  // Remover item
  const removeItem = (index) => {
    const newItens = itensPecas.filter((_, i) => i !== index);
    setItensPecas(newItens.length > 0 ? newItens : [{ idPeca: '', quantidade: '' }]);
  };

  const atualizarItem = (index, field, value) => {
    const novosItens = [...itensPecas];
    novosItens[index][field] = value;
    setItensPecas(novosItens);
  }

  // Validar itensPecas
  const validateItens = () => {
    if (itensPecas.length === 0) return false;
    for (let item of itensPecas) {
      if (!item.idPeca || !item.quantidade || Number(item.quantidade) <= 0) return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!idClientes || !idFuncionarios || !idPagamentos || !valor) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (!validateItens()) {
      Alert.alert('Erro', 'Por favor, adicione ao menos um item válido.');
      return;
    }

    const pedidosToSave = {
      ...pedidos,
      idClientes: parseInt(idClientes, 10),
      idFuncionarios: parseInt(idFuncionarios, 10),
      idPagamentos: parseInt(idPagamentos, 10),
      dataEntrega,
      valor: parseFloat(valor),
      observacao,
      itensPecas: itensPecas.map(item => ({
        idPeca: parseInt(item.idPeca, 10),
        quantidade: parseInt(item.quantidade, 10),
      })),
    };

    onSave(pedidosToSave);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{title}</Text>

            {/* Funcionário */}
            <Text style={styles.label}>Funcionário *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={idFuncionarios}
                onValueChange={(itemValue) => setIdFuncionarios(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um Funcionário" value="" />
                {funcionarios.map((funcionario) => (
                  <Picker.Item
                    key={funcionario.idFuncionarios}
                    label={funcionario.nomeFuncionario}
                    value={funcionario.idFuncionarios.toString()}
                  />
                ))}
              </Picker>
            </View>

            {/* Cliente */}
            <Text style={styles.label}>Cliente *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={idClientes}
                onValueChange={(itemValue) => setIdClientes(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um Cliente" value="" />
                {clientes.map((cliente) => (
                  <Picker.Item
                    key={cliente.idClientes}
                    label={cliente.nomeCliente}
                    value={cliente.idClientes.toString()}
                  />
                ))}
              </Picker>
            </View>

            {/* Pagamento */}
            <Text style={styles.label}>Pagamento *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={idPagamentos}
                onValueChange={(itemValue) => setIdPagamentos(itemValue)}
                style={styles.picker}
              >
                {pagamentos.map((pag) => (
                  <Picker.Item key={pag.idPagamentos} label={pag.tipoPagamento} value={pag.idPagamentos.toString()} />
                ))}
              </Picker>
            </View>

            {/* Itens do pedido */}
            <Text style={[styles.label, { marginTop: 10 }]}>Itens de Pedido(s) *</Text>
            {itensPecas.length === 0 && <Text style={{ fontStyle: 'italic', color: '#555' }}>Nenhum item adicionado</Text>}
            {itensPecas.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.pickerContainerItem}>
                  <Picker
                    selectedValue={item.idPeca}
                    onValueChange={(val) => atualizarItem(index, 'idPeca', val)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione uma Peça" value="" />
                    {pecas.map(peca => (
                      <Picker.Item
                        key={peca.idPecas}
                        label={peca.nomePeca}
                        value={peca.idPecas.toString()}
                      />
                    ))}
                  </Picker>
                </View>

                <TextInput
                  style={styles.inputQuantidade}
                  placeholder="Qtd"
                  keyboardType="numeric"
                  value={item.quantidade.toString()}
                  onChangeText={(value) => handleItemChange(index, 'quantidade', value)}
                />

                <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                  <Text style={{color: 'white', fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.buttonAddItem} onPress={addItem}>
              <Text style={styles.buttonText}>Adicionar Item</Text>
            </TouchableOpacity>

            // {/* Data de Entrega */}
            <Text style={styles.label}>Data de Entrega</Text>
            <TextInput
              style={styles.input}
              value={dataEntrega}
              onChangeText={setDataEntrega}
              placeholder="AAAA-MM-DD"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Valor *</Text>
            <TextInput
              style={styles.input}
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />

            {/* Observações */}
            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={observacao}
              onChangeText={setObservacao}
              multiline
              numberOfLines={4}
            />

            {/* Botões salvar/fechar */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{pedidos ? 'Salvar Alterações' : 'Cadastrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={styles.buttonText}>{pedidos ? 'Cancelar Alterações': 'Cancelar'}</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
  buttonClose: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },

  // Novos estilos para itens
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainerItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },
  inputQuantidade: {
    width: 60,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 8,
  },
  buttonAddItem: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  }
});

export default PedidosFormModal;
