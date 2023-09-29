export function getTypes(type: string) {
  if (type.includes('camisa tailandesa')) return types.camisaTailandesa

  if (type.includes('camisa premium')) return types.camisaPremium

  if (type.includes('tailandesa feminina')) return types.camisaTailandesaFem

  if (type.includes('edição especial')) return types.edicaoEspecial

  if (type.includes('moletom')) return types.moletomPremium

  if (type.includes('corta vento')) return types.cortaVento
}

export const types = {
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
    type: 'Camisa tailandesa',
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
}
