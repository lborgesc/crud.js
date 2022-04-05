const form = document.querySelectorAll('.modal-field');
const btnSalvar = document.querySelector('.salvar');

const getLocalStorage = () => JSON.parse(localStorage.getItem('clientes')) || [];
const setLocalStorage = (dbClientes) => localStorage.setItem('clientes', JSON.stringify(dbClientes));


const openModal = () => {

    document.getElementById('modal').classList.add('active')
    document.querySelector('.modal-header h2').innerHTML = "Novo Cliente";
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    limparModal();
}


document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)





const capturarDados = () => {
    btnSalvar.addEventListener('click', () => {
        if (document.querySelector('.modal-header h2').innerHTML === "Novo Cliente") {
            const dbClientes = getLocalStorage();
            dbClientes.push(clienteDados());
            setLocalStorage(dbClientes);
            update();
            closeModal();
        }
    })
}

const editarApagar = () => { 

    
    window.addEventListener('click', (event) => {
        const [action, index] = event.target.id.split('-');
        if(event.target.type === 'button'){
            if (action === 'editar') {
                editarDados(index);
            }
            
            if(action === 'excluir'){
                const response = confirm(`Deseja realmente excluir ?`)
                if (response) {
                    deletarCadastro(index)
                    update()
                }
            }
        }
    })
} 

editarApagar();
capturarDados();

const deletarCadastro = (index) => {
    const dbClientes = getLocalStorage();

    dbClientes.splice(index, 1);
    setLocalStorage(dbClientes)  
}


const editarDados = (index) =>{

    const dbClientes = getLocalStorage();
    document.getElementById('modal').classList.add('active')
    document.querySelector('.modal-header h2').innerHTML = "Atualizar Cadastro";
    
    abriCadstro(dbClientes[index]);
    editaCadastro(index)
}

const editaCadastro = (id) =>{

    const dbClientes = getLocalStorage();

    btnSalvar.addEventListener('click', ( ) => {

        if(document.querySelector('.modal-header h2').innerHTML === "Atualizar Cadastro"){

            form.forEach((dados) => {

                switch (dados.getAttribute("placeholder")) {
                    
                case "Nome do Cliente":
                    dbClientes[id].nome = dados.value; 
                    break;
    
                case "e-mail do Cliente":
                    dbClientes[id].email = dados.value;
                    break;
    
                case "Celular do Cliente":
                    dbClientes[id].celular = dados.value;
                    break;
    
                case "Cidade do Cliente":
                    dbClientes[id].cidade = dados.value;
                    break;
                }
            })
        }
        console.log(dbClientes)
        atualizaTabela(dbClientes);
    })
} 

const atualizaTabela = (dados) => {

    setLocalStorage(dados);
    update()
    document.querySelector('#modal').classList.remove('active');
}

const abriCadstro = (cliente) => {
    form.forEach(dados => {
        switch (dados.getAttribute("placeholder")) {

            case "Nome do Cliente":
                dados.value = cliente.nome;
                break;

            case "e-mail do Cliente":
                dados.value = cliente.email;
                break;

            case "Celular do Cliente":
                dados.value = cliente.celular;
                break;

            case "Cidade do Cliente":
               dados.value =  cliente.cidade;
                break; 
        }
    })
}

const limparTabela = () => {
    const row = document.querySelectorAll("tbody>tr");
    row.forEach(row => row.parentNode.removeChild(row));
}

const update = () => {

    const dbClientes = getLocalStorage();
    limparTabela();

    dbClientes.forEach((cliente, index) => {
        cliente.id = index;
        criarElemento(cliente);
    })
}


const criarElemento = (cliente) => {
    return document.querySelector("tbody").innerHTML += `
        <tr class="tabelCliente" id="${cliente.id}">
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button id="editar-${cliente.id}" type="button" class="button green">editar</button>
                <button id="excluir-${cliente.id}" type="button" class="button red">excluir</button>
            </td>
        </tr>
    `;
};

update();




const clienteDados = () => {
    const dadosCliente = {};
    form.forEach(dados => {
        switch (dados.getAttribute("placeholder")) {

            case "Nome do Cliente":
                dadosCliente.nome = dados.value;
                break;

            case "e-mail do Cliente":
                dadosCliente.email = dados.value;
                break;

            case "Celular do Cliente":
                dadosCliente.celular = dados.value;
                break;

            case "Cidade do Cliente":
                dadosCliente.cidade = dados.value;
                break;
            }
        })
        return dadosCliente;
}

const limparModal = () => {
    form.forEach(dados => dados.value = '');
}
