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
        type: "conflict", 
        message: "Este jogo nao tem estoque suficiente"
    }
}

export const errors = {notFound, conflict}