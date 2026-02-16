import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const URL_SERV = 'https://raw.githubusercontent.com/caiosque/cortes/refs/heads/main/servicos.json';

export default function DetailsScreen({ route }) {
  const { nome, endereco } = route.params;

  const [servicos, setServicos] = useState([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarServicos() {
      const response = await fetch(URL_SERV);
      const dados = await response.json();
      setServicos(dados);
      setCarregando(false);
    }

    buscarServicos();
  }, []);

  function adicionar(preco) {
    setTotal(total + preco);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>
      <Text style={styles.endereco}>{endereco}</Text>

      {servicos.map(servico => (
        <TouchableOpacity
          key={servico.id}
          style={styles.servico}
          onPress={() => adicionar(servico.preco)}
        >
          <Text>{servico.nome}</Text>
          <Text>R$ {servico.preco}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalTexto}>Total</Text>
        <Text style={styles.totalValor}>R$ {total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },

  endereco: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20
  },

  servico: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },

  totalBox: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },

  totalTexto: {
    fontSize: 16,
    color: '#777'
  },

  totalValor: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6C9EE5',
    marginTop: 4
  },

});

