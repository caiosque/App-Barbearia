import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const URL_BARB = 'https://raw.githubusercontent.com/caiosque/cortes/refs/heads/main/local.json';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [barbearias, setBarbearias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarBarbearias() {
      const response = await fetch(URL_BARB);
      const dados = await response.json();
      setBarbearias(dados);
      setCarregando(false);
    }

    buscarBarbearias();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Details', {
          nome: item.nome,
          endereco: item.endereco
        })
      }
    >
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.endereco}>{item.endereco}</Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={barbearias}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 12
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  endereco: {
    fontSize: 14,
    color: '#777',
    marginTop: 4
  },

});
