
const tipo = document.querySelector('#tipos')
const marca = document.querySelector('#marcas')
const modelo = document.querySelector('#modelos')
const ano = document.querySelector('#ano')
const modal = document.querySelector('.modal')
const button = document.querySelector('#btn')

let padrao = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas`

let currentModel = ''
let currentYear = ''
let currentCode = ''

function selecionaTipo() {
    marca.innerHTML = ''
    padrao = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas`
    let atual = padrao
    fetch(atual)
        .then(res => res.json())
        .then(resposta => resposta.forEach(function (element) {
            const option = document.createElement('option')
            option.innerText = element.nome
            option.value = element.codigo
            marca.appendChild(option)
        }))
}

function selecionaMarca() {
    modelo.innerHTML = ''
    currentModel = `/${marca.value}/modelos`
    let atual = padrao + currentModel
    fetch(atual)
        .then(res => res.json())
        .then(resposta => resposta.modelos.forEach(function (element) {
            const option = document.createElement('option')
            option.innerText = element.nome
            option.value = element.codigo
            modelo.appendChild(option)
        }))
}

function selecionaModelo() {
    ano.innerHTML = ''
    currentYear = `/${modelo.value}/anos`
    let atual = padrao + currentModel + currentYear
    fetch(atual)
        .then(res => res.json())
        .then(resposta => resposta.forEach(function (element) {
            const option = document.createElement('option')
            option.innerText = element.nome
            option.value = element.codigo
            ano.appendChild(option)
        }))
}

function montaModal(e) {
    e.preventDefault()
    modal.classList.add('none')
    modal.innerHTML = ''
    currentCode = `/${ano.value}`
    let atual = padrao + currentModel + currentYear + currentCode
    fetch(atual)
        .then(res => res.json())
        .then(resposta => {
            const { AnoModelo, CodigoFipe, Combustivel, Marca, MesReferencia, Modelo, Valor } = resposta
            const h2 = document.createElement('h2')
            h2.innerText = 'Resultados da pesquisa:'
            const title = document.createElement('h3')
            const simpleModel = Modelo.split(' ').slice(0, 4).join(' ').replace('-','').replace('/','')
            title.innerText = `${Marca} ${simpleModel}`
            const anoVeiculo = document.createElement('span')
            if (AnoModelo === 32000) {
                anoVeiculo.innerText = `Ano do veículo: ${MesReferencia.split(' ')[2]}`
            } else {
                anoVeiculo.innerText = `Ano do veículo: ${AnoModelo}`
            }

            const combustivel = document.createElement('span')
            combustivel.innerText = `Combustível do veículo: ${Combustivel}`
            const mes = document.createElement('span')
            mes.innerText = `Mês de referência: ${MesReferencia}`
            const valor = document.createElement('h3')
            valor.innerText = `Valor do veículo: ${Valor}`
            modal.appendChild(h2)
            modal.appendChild(title)
            modal.appendChild(anoVeiculo)
            modal.appendChild(combustivel)
            modal.appendChild(mes)
            modal.appendChild(valor)
            modal.classList.remove('none')
            fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${Marca}%20${simpleModel}%20${AnoModelo}&count=2`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
                    "x-rapidapi-key": "cd4930c49amsh639ca7544311196p10bf98jsn0bcb8e71d893"
                }
            })
                .then(resposta => resposta.json())
                .then(res => {
                    const url = res.value[0].contentUrl
                    const vehicleImg = document.createElement('img')
                    vehicleImg.src = url
                    vehicleImg.alt = 'Imagem do veículo'
                    vehicleImg.classList.add('image')
                    modal.appendChild(vehicleImg)
                })
                .catch(err => {
                    console.error(err);
                });
        })
}



export { tipo, marca, modelo, button, selecionaTipo, selecionaMarca, selecionaModelo, montaModal }