// App.js (versão corrigida e organizada)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Componentes/EstilosUniversal.js'; 
import React from 'react';

// Importa todas as telas
import ClientesScreen from './Telas/ClientesScreen';
import FuncionariosScreen from './Telas/FuncionariosScreen';
import PecasScreen from './Telas/PecasScreen';
import PedidosScreen from './Telas/PedidosScreen';
import OrdensScreen from './Telas/OrdensScreen';
import ActionButton from './Componentes/ActionButton';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    { title: 'Clientes', icon: 'people', screen: 'Clientes', color: '#3498db' },
    { title: 'Funcionários', icon: 'engineering', screen: 'Funcionarios', color: '#9b59b6' },
    { title: 'Peças', icon: 'build', screen: 'Pecas', color: '#e67e22' },
    { title: 'Pedidos', icon: 'list-alt', screen: 'Pedidos', color: '#2ecc71' },
    { title: 'Ordens de Serviço', icon: 'receipt', screen: 'Ordens', color: '#1abc9c' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestão de Bicicletaria</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#7f8c8d' }}>Selecione o módulo desejado</Text>
      </View>
      
      {menuItems.map((item, index) => (
        <ActionButton
          key={index}
          title={item.title}
          onPress={() => navigation.navigate(item.screen)}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Funcionarios" component={FuncionariosScreen} />
        <Stack.Screen name="Pecas" component={PecasScreen} />
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Ordens" component={OrdensScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;