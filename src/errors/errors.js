export function notFound(resource = "Item") {
    return {
        type: "notFound", 
        message: `${resource} não foi encontrado`
    }
}

export function conflict(resource) {
    return {
        type: "conflict", 
        message: `${resource ? resource : "Item"} já existe!`
    }
}

export function insufficientStock() {
    return {
        type: "insufficientStock", 
        message: "Este jogo nao tem estoque suficiente"
    }
}

export function notFineshed() {
    return {
        type: "notFineshed", 
        message: "Este aluguel ainda nao foi finalizado"
    }
}

export const errors = {notFound, conflict, insufficientStock, notFineshed}