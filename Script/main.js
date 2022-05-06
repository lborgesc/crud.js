const form = document.querySelectorAll('.modal-field');
let indexItem = 0; 

const getDatabase = () => JSON.parse(localStorage.getItem('clientes')) || [];
const setDatabase = (dbClientes) => localStorage.setItem('clientes', JSON.stringify(dbClientes));

function openModal ( ) {document.getElementById('modal').classList.add('active')};

function closeModal ( )  {
    document.getElementById('modal').classList.remove('active');
    document.querySelector('header h2').innerHTML = "Novo Cliente"
    limparModal();
}


function cadastrarCliente ( ) {
    const database = getDatabase();
    titulo = document.querySelector('.modal-header h2');
    if (titulo.innerHTML === "Novo Cliente") {
        if (capturarDados()) {
            database.push(capturarDados());
            setDatabase (database);
            atualizarTela();
            limparModal();
            closeModal();
        }
    }
    if (titulo.innerHTML === "Atualizar Cadastro") {
        if (atualizarCadastro( indexItem ) === 'valido') {
            atualizarCadastro( indexItem );
            atualizarTela();
            limparModal();
            closeModal();
        }
    }
}

function capturarDados ( ) {
    const dadosCliente  = {}
    let dadosVazio = 0;
    let celValido = true; 
    form.forEach(dados => { 
        if (!dados.value) {
            dadosVazio++
        }
        switch (dados.getAttribute("placeholder")) {
            case "Nome do Cliente":
                dadosCliente.nome = dados.value;
            break;`
                `
            case "e-mail do Cliente":
                dadosCliente.email = dados.value;
            break;    
            case "Celular do Cliente":
                dadosCliente.celular =  maskCel ( dados.value )  == ""? celValido = false : maskCel ( dados.value );
            break;
            case "Cidade do Cliente":
                dadosCliente.cidade = dados.value;
            break;
        }       
    })
    if (dadosVazio != 0) {
        alert('Preencha todos os campos!!!');
    }else if(celValido === false){
        alert('Celular deve conter apenas números!!!');
    }else{
        return dadosCliente; 
    }  
}

function atualizarCadastro( index ){
    let dadosVazio = 0;
    let celValido = true; 
    const database = getDatabase();
    form.forEach(dados => { 
        if (!dados.value) {
            dadosVazio++
        }
            switch (dados.getAttribute("placeholder")) {
                case "Nome do Cliente":
                    database[index].nome = dados.value;
                break;`
                    `
                case "e-mail do Cliente":
                    database[index].email = dados.value;
                break;    
                case "Celular do Cliente":
                    database[index].celular = maskCel ( dados.value )  == ""? celValido = false : maskCel ( dados.value );
                break;
                case "Cidade do Cliente":
                    database[index].cidade = dados.value;
                break;   
        }
    })
    if (dadosVazio != 0) {
        alert('Preencha todos os campos!!!');
    }else if(celValido === false){
        alert('Celular deve conter apenas números!!!');
    }else{
        setDatabase (database);
        return 'valido'; 
    } 
}

function criarElemento (cliente, id) {
    let trItem = document.createElement('tr');
    trItem.classList.add('tabelCliente'); 
    trItem.id = id; 
    trItem.innerHTML = `
    <tr class="tabelCliente" id="${id}">
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.cidade}</td>
        <td>
            <button id="editar" type="button" class="button green" data-index="${id}" onclick="editarItem(this)">editar</button>
            <button id="excluir" type="button" class="button red" data-index="${id}" onclick="removerItem(this)">excluir</button>
        </td>
    </tr>
`
    document.querySelector("tbody").appendChild(trItem);
};

function editarItem( index ) {
    indexItem = index.dataset.index;
    const database = getDatabase();
    document.querySelector('header h2').innerHTML = "Atualizar Cadastro"
    openModal( );
    database[indexItem]
    carregarDados(database[indexItem]);
}

function carregarDados( dadosCliente ) {
    form.forEach(dados => { 
        switch (dados.getAttribute("placeholder")) {
            case "Nome do Cliente":
                dados.value = dadosCliente.nome;
            break;`
                `
            case "e-mail do Cliente":
                dados.value = dadosCliente.email;
            break;    
            case "Celular do Cliente":
                dados.value = dadosCliente.celular;
            break;
            case "Cidade do Cliente":
                dados.value = dadosCliente.cidade;
            break;
        }       
    })
}

function removerItem( index ) {
    const database = getDatabase();
    const id = index.dataset.index;
    database.splice(id, 1);
    setDatabase (database);
    atualizarTela();
}

function atualizarTela ( ) {
    limparItems();
    const database = getDatabase();
    database.forEach((dados, index) => criarElemento(dados, index))
}

function limparModal ( ) {
    form.forEach(dados => dados.value = '');
}

function limparItems ( ) {
    const item = document.querySelector("tbody");
    while (item.firstChild){
        item.removeChild(item.lastChild);
    }
}


function maskCel ( cel ) {
    
    return cel
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
}

atualizarTela();


