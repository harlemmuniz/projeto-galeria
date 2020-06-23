import $ from 'jquery'

// para executar funções dentro de páginas abertas via AJAX
const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) { // ao ter sucesso ao carregar todo o html, executa uma callback
    if(!loadHtmlSuccessCallbacks.includes(callback)) { //se a call back não estiver dentro do array loadHtmlSuccessCallbacks
        loadHtmlSuccessCallbacks.push(callback) // adicione
    }
}

// Incluir via AJAX as páginas
function loadIncludes(parent) {
    if(!parent) parent = 'body' // Se não existir um parent, o parent será o body
    $(parent).find('[wm-include]').each(function(i, e) { // procure em cada parent cada elemento que tiver um wm-include e execute uma função
        const url = $(e).attr('wm-include') // adicionou o atributo no elemento encontrado e armazenou em url
        $.ajax({ // fazendo a requisição via AJAX e jQuery
            url, // recebe a url (caminho da página)
            success(data) { // e se sucesso, carrega a data (conteudo)
                $(e).html(data) // adiciona o conteúdo
                $(e).removeAttr('wm-include') // e remove o wm-include para não chamar mais vezes

                // invocando cada uma das funções callbacks (que ha nos htmls) quando carregar os html com sucesso
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(e) // executa a função de incluir
            }
        })
    })
}

loadIncludes()