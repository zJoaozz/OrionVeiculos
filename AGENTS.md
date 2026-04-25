## Regras operacionais do agente

### Finalizar sessão

- Quando o usuário escrever exatamente `Finalizar sessão`, o agente deve executar automaticamente o fechamento da sessão sem pedir confirmação.
- Nesse encerramento, o agente deve ler o contexto da sessão atual e registrar apenas o que realmente foi feito.
- Nesse fluxo, o agente pode atualizar somente:
- `AGENTS.md`
- `docs/regras-do-projeto.md`
- `docs/contexto-atual.md`
- `docs/registros-sessoes.md`
- `AGENTS.md` deve ser atualizado apenas quando houver mudança relevante em regras de trabalho, fluxo do projeto, estrutura principal ou comportamento esperado do agente.
- O agente não deve recriar arquivos do zero se eles já existirem.
- O agente não deve apagar histórico relevante.
- O agente deve sempre preservar histórico e acrescentar novas informações de forma organizada.
- O agente não deve inventar informações sobre a sessão.
- Ao final do comando `Finalizar sessão`, o agente deve responder com resumo curto do que foi atualizado.
