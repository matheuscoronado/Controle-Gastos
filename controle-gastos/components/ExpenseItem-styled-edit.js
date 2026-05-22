// Importa React e o hook useState para controle de estado
import React, { useState } from 'react';

// Importa os componentes nativos para construição de interface
import {
    View, // Container de Layout
    TextInput, // Campo de entrada de texto
    Text, // Exibição de Texto
    TouchableOpacity, //Botão personalizavel
    FlatList, //Lista de rolagem eficiente
    StyleSheet, //Estilização
    Alert //Exibição de alertas
} from 'react-native';

export default function HomeScreen() {
    //Estado para os campos de formulario
    const [descricao, setDescricao] = useState("");     //Descrição do gasto
    const [valor, setValor] = useState("");             //Valor do Gasto
    const [gastos, setGastos] = useState("");           //Lista de Gasto
    const [editandoId, setEditandoId] = useState("");   //Id do item sendo editado
    (null); //Id do Item Sendo editado

    // Função para adicionar um novo gasto ou atualizar um existente
    const adicionarOuAtualizarGasto = () => {

        // Validação campos não podem estar vazios
        if (!descricao || !valor) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;

        }

        // Validação para verificar valor númerico no campo valor
        if (isNaN(parseFloat(valor))) {
            Alert.alert('Erro', 'Digite um valor númerico');
            return;
        }

        if (editandoId) {
            const gastosAtualizados = gastos.map(item =>
                // Atualiza o gasto existente com base no ID
                item.id === editandoId
                    ? { ...item, descricao, valor: parseFloat(valor).toFixed(2) } : item);  // Atualiza o item com nova descrição e valor formatado
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
        // Limpa os campos após adicionar ou atualizar
        setDescricao("");
        setValor("");
    };

    // Função para remover um gasto da lista
    const removerGasto = (id) => {
        setGastos(gastos.filter(item => item.id !== id)); // Remove o gasto com o ID correspondente

        // Verifica se o item a ser removido está sendo editado. Se estiver, cancelar a operação
        if (editandoId === id) {
            setEditandoId(null); // Sai do modo de edição
            setDescricao(""); // Limpa o campo de descrição
            setValor(""); // Limpa o campo de valor
        }
    };

    // Função para preencher o formulário com os dados do item a ser editado
    const editarGasto = (item) => {
        setDescricao(item.descricao); // Preenche descrição
        setValor(item.valor);         // Preenche valor
        setEditandoId(item.id);       // Armazena o ID
    };

    // Cálculo do total de gastos
    const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0).toFixed(2);  // Soma os valores dos gastos e formata para 2 casas decimais

    // Retorna os elementos visuais da interface
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Controle de Gastos</Text>


            {/* Campo para entrada de descrição */}
            <TextInput
                style={styles.input}
                placeholder="Descrição do gasto"
                value={descricao}
                onChangeText={setDescricao}
            />

            {/* Campo para entrada de valor */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Valor do gasto"
                value={valor}
                onChangeText={setValor}
            />

            {/* Botão para adicionar o valor a lista */}
            <TouchableOpacity style={styles.button} onPress={adicionarOuAtualizarGasto}>
                <Text style={styles.buttonText}>
                    {editandoId ? "Atualizar Gasto" : "Adicionar Gasto"}
                </Text>
            </TouchableOpacity>

            {/* Lista de gastos exibidos na FlatList */}
            <FlatList
                data={gastos}                                                   // Fonte de dados
                keyExtractor={(item) => item.id}                                // Extrai a chave única de cada item    
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>

                        {/* Exibe a descrição e o valor*/}
                        <Text style={styles.item}>
                            {item.descricao} - R$ {item.valor}
                        </Text>

                        {/* Botões para editar e remover o gasto */}
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => editarGasto(item)} style={styles.editButton}>
                                <Text style={styles.actionText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removerGasto(item.id)} style={styles.deleteButton}>
                                <Text style={styles.actionText}>
                                    Remover
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    );
}

// Estilos para os componentes
const styles = StyleSheet.create({
    container: {

    },
    title: {

    },
    input: {

    },
    button: {

    },
    buttonText: {

    },
    actions: {

    },
    editButton: {

    },
    deleteButton: {

    },
    actionText: {

    }
})