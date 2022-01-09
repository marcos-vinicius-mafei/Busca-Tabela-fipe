import{tipo,marca,modelo,button,selecionaTipo,selecionaMarca,selecionaModelo,montaModal} from './api/search.js'


selecionaTipo()

tipo.addEventListener('blur', selecionaTipo)
marca.addEventListener('blur', selecionaMarca)
modelo.addEventListener('blur', selecionaModelo)
button.addEventListener('click', montaModal)
