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
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Exibe o total de gastos */}
            <Text style={styles.total}>
                Total: R$ {totalGastos}
            </Text>
        </View>
    );
}

// Estilos para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 25,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#334155',
        marginBottom: 12,
        // Sombra leve para o input (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        // Sombra para Android
        elevation: 1,
    },
    button: {
        backgroundColor: '#0284c7',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#0284c7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    item: {
        fontSize: 16,
        color: '#334155',
        fontWeight: '500',
        flex: 1,
        paddingRight: 10,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#eab308',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    actionText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#15803d',
        textAlign: 'right',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#e2e8f0',
    }
});