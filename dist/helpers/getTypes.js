"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.getTypes = void 0;
function getTypes(type) {
    if (type.includes('camisa tailandesa') && !type.includes('feminina'))
        return exports.types.camisaTailandesa;
    if (type.includes('camisa premium'))
        return exports.types.camisaPremium;
    if (type.includes('tailandesa feminina'))
        return exports.types.camisaTailandesaFem;
    if (type.includes('edição especial'))
        return exports.types.edicaoEspecial;
    if (type.includes('moletom'))
        return exports.types.moletomPremium;
    if (type.includes('corta vento'))
        return exports.types.cortaVento;
}
exports.getTypes = getTypes;
exports.types = {
    camisaTailandesa: {
        sex: 'Masculino',
        type: 'Camisa tailandesa',
    },
    camisaPremium: {
        sex: 'Masculino',
        type: 'Camisa premium',
    },
    camisaTailandesaFem: {
        sex: 'Feminina',
        type: 'Camisa tailandesa feminina',
    },
    moletomPremium: {
        sex: 'unisex',
        type: 'Moletom premium',
    },
    cortaVento: {
        sex: 'Masculino',
        type: 'Corta vento tailandesa',
    },
    edicaoEspecial: {
        sex: 'Masculino',
        type: 'Camisa edição especial',
    },
};
