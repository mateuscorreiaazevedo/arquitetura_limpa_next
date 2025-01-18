module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // nível de severidade (2 é erro)
      'always', // aplicar a regra sempre
      [
        'feat', // Novas funcionalidades
        'fix', // Correções de bugs
        'wip', // Trabalho em progresso
        'chore', // Atualizações menores e manutenção
        'refactor', // Refatoração de código
        'style', // Alterações de estilo (semântico ou visual)
        'docs', // Atualizações de documentação
      ],
    ],
  },
}
