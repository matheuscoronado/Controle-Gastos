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

        // Validação para verificar valor númerico no campo valor
        if(isNaN(parseFloat(valor))){
            Alert.alert('Erro', 'Digite um valor númerico');
            return;
        }

        if(editandoId){
            const gastosAtualizados = gastos.map(item =>
            // Atualiza o gasto existente com base no ID
            item.id === editandoId 
            ? { ...item, descricao, valor: parseFloat(valor).toFixed(2)} : item);  // Atualiza o item com nova descrição e valor formatado
            setGastos(gastosAtualizados);
            setEditandoId(null); // Limpa o estado de edição
        } else {
            const novoGasto = {
                id: Date.now().toString(), // Gera um ID único
                descricao,                 // Usa a descrição do estado
                valor: parseFloat(valor).toFixed(2) // Formata o valor
            };
            setGastos([...gastos, novoGasto]); // Adiciona o novo gasto à lista
        }
    }
}