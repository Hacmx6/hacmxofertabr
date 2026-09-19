// HacmxOfertaBR — Fase 1 (sem backend, sem banco de dados)
// Lê produtos.json e monta a vitrine. Categorias e cliques são tratados aqui.

const grid = document.getElementById('produtos-grid');
const filtrosContainer = document.getElementById('filtros');

let produtos = [];
let categoriaAtiva = 'todas';

async function carregarProdutos() {
  try {
    const resposta = await fetch('produtos.json');
    if (!resposta.ok) throw new Error('Falha ao carregar produtos.json');
    produtos = await resposta.json();
    montarFiltros(produtos);
    renderizarProdutos();
  } catch (erro) {
    grid.innerHTML = `
      <p class="produtos-loading">
        Não consegui carregar os produtos. Se você abriu o arquivo direto (file://),
        rode um servidor local antes: no Termux, use <code>python -m http.server 8000</code>
        na pasta do site e abra http://localhost:8000 no navegador.
      </p>`;
    console.error(erro);
  }
}

function montarFiltros(lista) {
  const categorias = [...new Set(lista.map(p => p.categoria))];
  categorias.forEach(categoria => {
    const btn = document.createElement('button');
    btn.className = 'filtro-pill';
    btn.dataset.categoria = categoria;
    btn.textContent = categoria;
    btn.addEventListener('click', () => {
      categoriaAtiva = categoria;
      atualizarFiltroAtivo();
      renderizarProdutos();
    });
    filtrosContainer.appendChild(btn);
  });

  filtrosContainer.querySelector('[data-categoria="todas"]').addEventListener('click', () => {
    categoriaAtiva = 'todas';
    atualizarFiltroAtivo();
    renderizarProdutos();
  });
}

function atualizarFiltroAtivo() {
  filtrosContainer.querySelectorAll('.filtro-pill').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.categoria === categoriaAtiva);
  });
}

function renderizarProdutos() {
  const lista = categoriaAtiva === 'todas'
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtiva);

  if (lista.length === 0) {
    grid.innerHTML = '<p class="produtos-loading">Nenhuma oferta nessa categoria ainda.</p>';
    return;
  }

  grid.innerHTML = lista.map(produtoParaHtml).join('');

  // Rastreia cliques em links de afiliado (troque pelo seu Google Analytics/UTM real)
  grid.querySelectorAll('.produto-cta').forEach(link => {
    link.addEventListener('click', () => {
      const nome = link.dataset.nomeProduto;
      if (typeof gtag === 'function') {
        gtag('event', 'clique_afiliado', { produto: nome });
      } else {
        console.log('Clique em oferta:', nome);
      }
    });
  });
}

function produtoParaHtml(p) {
  return `
    <article class="produto-card">
      <div class="produto-imagem">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy"
             onerror="this.replaceWith(Object.assign(document.createElement('span'), {textContent: '${p.nome.replace(/'/g, "\\'")}'}))">
        ${p.desconto ? `<span class="produto-desconto">${p.desconto}</span>` : ''}
      </div>
      <div class="produto-corpo">
        <span class="produto-categoria">${p.categoria}</span>
        <h3 class="produto-nome">${p.nome}</h3>
        <p class="produto-descricao">${p.descricao}</p>
        <p class="produto-avaliacao"><strong>★ ${p.avaliacao}</strong> (${p.numAvaliacoes.toLocaleString('pt-BR')} avaliações)</p>
        <div class="produto-precos">
          <span class="produto-preco">${p.preco}</span>
          ${p.precoOriginal ? `<span class="produto-preco-original">${p.precoOriginal}</span>` : ''}
        </div>
        <a class="produto-cta" href="${p.linkAfiliado}" target="_blank" rel="nofollow sponsored noopener" data-nome-produto="${p.nome}">Ver oferta</a>
      </div>
    </article>`;
}

carregarProdutos();
