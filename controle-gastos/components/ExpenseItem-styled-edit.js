// Importa React e o hook useState para controle de estado
import React, { useState} from 'react';

// Importa os componentes nativos para construição de interface
import{
    View, // Container de Layout
    TextInput, // Campo de entrada de texto
    Text, // Exibição de Texto
    TouchableOpacity, //Botão personalizavel
    FlatList, //Lista de rolagem eficiente
    StyleSheet, //Estilização
    Alert //Exibição de alertas
} from 'react-native';

export default HomeScreen(){
    //Estado para os campos de formulario
    const [descricao, setDescricao] = useState("");     //Descrição do gasto
    const [valor, setValor] = useState("");             //Valor do Gasto
    const [gastos, setGastos] = useState("");           //Lista de Gasto
    const [editandoId, setEditandoId] = useState("");   //Id do item sendo editado
    (null); //Id do Item Sendo editado

    // Função para adicionar um novo gasto ou atualizar um existente
    const adicionarOuAtualizarGasto = () =>{

        // Validação campos não podem estar vazios
        if(!descricao || !valor){
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
            
        }
    }
}