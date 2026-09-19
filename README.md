# HacmxOfertaBR — Fase 1 (MVP)

Site estático, sem login/painel/banco de dados, como combinado no plano.

## Arquivos
- `index.html` — estrutura da página
- `style.css` — visual (preto + vermelho, estilo tech, cards em formato de etiqueta)
- `script.js` — lê `produtos.json` e monta a vitrine
- `produtos.json` — seus 5 primeiros produtos (edite aqui pra trocar/adicionar ofertas)
- `img/` — pasta vazia pra você colocar as fotos dos produtos

## Rodar no Termux
Navegadores bloqueiam o `fetch()` de arquivos abertos direto (`file://`), então suba um servidor local:

```bash
cd hacmxofertabr
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador do celular. Se não tiver Python instalado: `pkg install python`.

## Antes de divulicar de verdade
1. Troque cada `linkAfiliado` no `produtos.json` pelo seu link de afiliado real da Shopee (mantendo os parâmetros `utm_source/utm_medium/utm_campaign` pra aparecer certinho no Google Analytics).
2. Coloque fotos reais dos 5 produtos na pasta `img/` com os nomes que já estão no JSON (ex: `produto-parafusadeira.jpg`). Sem foto, o card mostra o nome do produto no lugar — não quebra.
3. Configure o Google Analytics (ou similar) e troque o `console.log` do `script.js` pela chamada `gtag(...)` de verdade — já deixei o gancho pronto lá.
4. Pra ir ao ar, o jeito mais simples pra Fase 1 é GitHub Pages (grátis, sem precisar de VPS ainda).

## Próximos passos do plano
- Gravar 2–3 vídeos curtos divulgando esses 5 produtos com o link de afiliado direto.
- Validar se o tráfego converte antes de partir pro cadastro/painel/banco de dados.
