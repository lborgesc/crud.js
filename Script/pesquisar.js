function pesquisar (    ) {
    const inputFiltro =  document.querySelector('.pesquisar').value;
    const cadastros =  document.querySelectorAll('tbody tr');
    const tipoDoFiltro = document.querySelector('select');

    if (!!inputFiltro) {
        cadastros.forEach(cadastro => {

            const tdFiltro = cadastro.querySelector(`.${tipoDoFiltro.value}`)
            const expressao = new RegExp(inputFiltro, "i"); 

            if (!expressao.test(tdFiltro.innerHTML)) {
                cadastro.classList.add("invisivel")
            }else{
                cadastro.classList.remove("invisivel")
            }
        })
    } else {
        cadastros.forEach(cadastro => {
            cadastro.classList.remove("invisivel")
        })
    }
}

