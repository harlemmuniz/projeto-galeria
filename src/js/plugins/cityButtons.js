import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 100

function filterByCity(city) { // função filtrar por cidade recebe cidade
    $('[wm-city]').each(function (i, e) { // vai procurar elementos que possuem o parametro wm-city e em cada um
        const isTarget = $(this).attr('wm-city') === city // verificar se o elemento, o atributo wm-city é uma cidade
            || city === null // ou se é nulo
        if (isTarget) { // se for uma cidade
            $(this).parent().removeClass('d-none') // e remove a classe para reorganizar as fotos
            $(this).fadeIn(duration) // mostra aqueles que contem a cidade
        } else { // se não
            $(this).fadeOut(duration, () => { // esconde
                $(this).parent().addClass('d-none') // e adiciona a classe d-none para reorganizar todas as fotos
            })
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set // cidade vai criar um novo Set (Set não tem repetição) e vai colocar uma vez o botão da cidade associada
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city')) // e adicionar ao elemento cities, todos os elementos
    })

    const btns = Array.from(cities).map(city => { // vai converter o Set pra um array, e vai fazer um map pra transformar o city em botões
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city) // vai criar o botão com as classes btn e btn-info e adicionar ao texto dela a cidade
        btn.click(e => filterByCity(city)) // ao clicar no botão, atribui a cidade ao FilterByCity e executa o fadeIn
        return btn // e retorna o botao
    })

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas') // botão Todas (as cidades) foi criado, recebendo classes e estando sempre ativo
    btnAll.click(e => filterByCity(null)) // ao clicar atribui ao filterByCity null, com isso executa o fadeOut
    btns.push(btnAll) // adiciona no fim o botão Todas

    const btnGroup = $('<div>').addClass(['btn-group']) // grupo de botões criado dentro de uma div que recebe a classe btn-group
    btnGroup.append(btns) // adicionou botões dentro da div

    $(this).html(btnGroup)
    return this
}
//
onLoadHtmlSuccess(function () {
    $('[wm-city-buttons]').cityButtons()
})
