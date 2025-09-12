import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Seus dados fixos já fornecidos
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

// Exemplo de serviços (você deve definir essa lista correta)
const servicos = [
  { idServicos: 1, nome: 'Troca de óleo'},
  { idServicos: 2, nome: 'Alinhamento' },
  { idServicos: 3, nome: 'Balanceamento' },
];

const OrdensFormModal = ({ visible, onClose, onSave, ordem, title,
}) => {
  const [idFuncionarios, setIdFuncionarios] = useState(funcionarios[0]?.idFuncionarios.toString());
  const [idClientes, setIdClientes] = useState(clientes[0]?.idClientes.toString());
  const [idPagamentos, setIdPagamentos] = useState(pagamentos[0].idPagamentos.toString());
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');

  // Estado para vários itens de pedido (serviços e quantidade)
  const [itensOrdens, setItensOrdens] = useState([]); 

  // Ao carregar a ordem para edição, preencher os itens também
  useEffect(() => {
    if (ordem) {
      setIdFuncionarios(ordem.idFuncionarios?.toString() || '');
      setIdClientes(ordem.idClientes?.toString() || '');
      setIdPagamentos(ordem.idPagamentos?.toString() || pagamentos[0].idPagamentos.toString());
      setValor(ordem.valor?.toString() || '');
      setDataEntrega(ordem.dataEntrega || '');
      setObservacao(ordem.observacao || '');
    

      // Carregar os itens da ordem caso existam
      if (ordem.itensOrdens) {
        setItensOrdens(ordem.itensOrdens);
      } else {
        setItensOrdens([]);
      }
    } else {
      setIdFuncionarios('');
      setIdClientes('');
      setIdPagamentos(pagamentos[0].idPagamentos.toString());
      setValor('');
      setDataEntrega('');
      setObservacao('');
      setItensOrdens([]);
      
    }
  }, [ordem]);

  // Função para adicionar um novo item de serviço na lista
  const adicionarItem = () => {
    setItensOrdens([
      ...itensOrdens,
      { idServico: '', quantidade: '1' }
    ]);
  };

  // Função para atualizar um item específico da lista
  const atualizarItem = (index, campo, valor) => {
    const novosItens = [...itensOrdens];
    novosItens[index][campo] = valor;
    setItensOrdens(novosItens);
  };

  // Função para remover um item da lista
  const removerItem = (index) => {
    const novosItens = itensOrdens.filter((_, i) => i !== index);
    setItensOrdens(novosItens);
  };

  const validarItens = () => {
    if (itensOrdens.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um item de serviço.');
      return false;
    }
    for (let i = 0; i < itensOrdens.length; i++) {
      const item = itensOrdens[i];
      if (!item.idServico) {
        Alert.alert('Erro', `Selecione o serviço no item ${i + 1}.`);
        return false;
      }
      if (!item.quantidade || isNaN(item.quantidade) || parseInt(item.quantidade) < 1) {
        Alert.alert('Erro', `Informe uma quantidade válida no item ${i + 1}.`);
        return false;
      }
    }
    return true;
  }

  const handleSave = () => {
    if (!idFuncionarios || !idClientes || !idPagamentos || !valor) {
      Alert.alert(
        'Erro',
        'Por favor, preencha todos os campos obrigatórios (marcados com *).'
      );
      return;
    }

    if (!validarItens()) {
      return;
    }

    const ordemToSave = {
      ...ordem,
      idFuncionarios: parseInt(idFuncionarios, 10),
      idClientes: parseInt(idClientes, 10),
      idPagamentos: parseInt(idPagamentos, 10),
      valor: parseFloat(valor).toFixed(2),
      observacao,
      itensOrdens: itensOrdens.map(item => ({
        idServico: parseInt(item.idServico, 10),
        quantidade: parseInt(item.quantidade, 10),
      })),
      dataEntrega: dataEntrega || null,
    };
    onSave(ordemToSave);
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

            {/* Lista de itens (serviços + quantidade) */}
            <Text style={[styles.label, { marginTop: 10 }]}>Ordem de Serviço(s) *</Text>
            {itensOrdens.length === 0 && <Text style={{ fontStyle: 'italic', color: '#555' }}>Nenhum item adicionado</Text>}
            {itensOrdens.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.pickerContainerItem}>
                  <Picker
                    selectedValue={item.idServico}
                    onValueChange={(val) => atualizarItem(index, 'idServico', val)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione um serviço" value="" />
                    {servicos.map(servico => (
                      <Picker.Item
                        key={servico.idServicos}
                        label={servico.nome}
                        value={servico.idServicos.toString()}
                      />
                    ))}
                  </Picker>
                </View>
                
                <TouchableOpacity style={styles.buttonRemoveItem} onPress={() => removerItem(index)}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.buttonAddItem} onPress={adicionarItem}>
              <Text style={styles.buttonText}>Adicionar Item</Text>
            </TouchableOpacity>

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

            // {/* Data de Entrega */}
            <Text style={styles.label}>Data de Entrega *</Text>
            <TextInput
              style={styles.input}
              value={dataEntrega}
              onChangeText={setDataEntrega}
              placeholder="AAAA-MM-DD"
              keyboardType="numeric" // Pode ser texto padrão ou data picker se implementar
            /> 

            {/* Valor */}
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

            {/* Botões */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{ordem ? 'Salvar Alterações':'Cadastrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={styles.buttonText}>{ordem ? 'Cancelar Alterações' : 'Cancelar'}</Text>
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
    color: '#fff',
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
  buttonRemoveItem: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
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

export default OrdensFormModal;
