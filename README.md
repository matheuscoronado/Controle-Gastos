# 💰 Projeto: Controle de Gastos em React Native

Este é um guia de estudos detalhado sobre o desenvolvimento de um aplicativo de finanças pessoais utilizando **React Native** e **React Hooks**. O projeto é um CRUD completo baseado em estado local, ideal para revisão de conceitos práticos e teóricos em avaliações de desenvolvimento mobile.

---

## 📌 Sumário de Conceitos Práticos para Provas

Se você precisar explicar o funcionamento deste código em uma avaliação, os pilares principais são:

1. **Manipulação de Estado Imutável:** O uso do operador *Spread* (`...`) e métodos que geram novos arrays (`filter`, `map`) sem mutar o estado original.
2. **Gerenciamento de Fluxo Unificado:** Uma única função (`adicionarOuAtualizarGasto`) gerencia tanto a criação de novos registros quanto a atualização de registros existentes com base no estado `editandoId`.
3. **Renderização de Listas Dinâmicas:** Uso do componente nativo `FlatList` focado em performance, evitando renderizações desnecessárias na memória do dispositivo.
4. **Agregação de Dados:** Uso do método acumulador `.reduce()` para computar o valor total em tempo real com base no estado atual da lista.

---

## 🛠️ Detalhamento Técnico do Código

### 1. Inicialização e Definição de Estados (Hooks)
*   **`descricao` e `valor`:** Strings simples para capturar os dados em tempo real dos componentes `TextInput`.
*   **`gastos`:** Estado centralizado inicializado obrigatoriamente como um *Array* vazio `[]` para que métodos de vetor funcionem sem estourar erros de execução.
*   **`editandoId`:** Estado de controle de fluxo. Se for `null`, o app sabe que o usuário quer criar um gasto. Se contiver uma string de ID, o app entra no modo de edição.

### 2. Validações de Segurança
Antes de persistir qualquer dado no estado, o código executa duas checagens cruciais:
*   **Campos Vazios:** `if (!descricao || !valor)` impede que itens sem título ou sem preço quebrem a interface visual ou os cálculos matemáticos.
*   **Tipo de Dado:** `isNaN(parseFloat(valor))` garante que strings puras não numéricas sejam rejeitadas, protegendo o método `.reduce()` que virá a seguir.

### 3. Logica de Persistência e Atualização (CRUD)

*   **Create (Adicionar):**
    
```javascript
    setGastos([...gastos, novoGasto]);
    ```
    Usa o *spread operator* para copiar todos os elementos anteriores e concatenar o novo objeto no final do array, mantendo o princípio de **imutabilidade do React**.
*   **Update (Editar):**
    
```javascript
    const gastosAtualizados = gastos.map(item => item.id === editandoId ? { ...item, descricao, valor } : item);
    ```
    O método `.map()` percorre a lista. Quando encontra o ID correspondente ao item selecionado, substitui suas propriedades pelas novas informadas nos inputs. Os demais itens permanecem intactos.
*   **Delete (Remover):**
    
```javascript
    setGastos(gastos.filter(item => item.id !== id));
    ```
    O método `.filter()` gera um novo array contendo apenas os elementos que passarem no teste lógico (ter um ID diferente daquele que foi clicado para exclusão).

### 4. O Cálculo do Totalizador
```javascript
const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0).toFixed(2);