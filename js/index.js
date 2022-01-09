import{tipo,marca,modelo,button,selecionaTipo,selecionaMarca,selecionaModelo,montaModal} from './api/search.js'



console.log('maoba')

selecionaTipo()

tipo.addEventListener('click', selecionaTipo)
marca.addEventListener('click', selecionaMarca)
modelo.addEventListener('click', selecionaModelo)
button.addEventListener('click', montaModal)
