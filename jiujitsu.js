let carrinho = [];

// Função para adicionar produtos ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });         // Adiciona item ao carrinho
  atualizarCarrinho();                    // Atualiza interface do carrinho
  document.getElementById("modalCarrinho").style.display = "block"; // Exibe modal
}

// Atualiza visualmente o carrinho
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById('itensCarrinho');
  const totalCarrinho = document.getElementById('totalCarrinho');

  itensCarrinho.innerHTML = ''; // Limpa os itens anteriores

  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    itensCarrinho.innerHTML += `
      <div>
        <span>${item.nome} - R$${item.preco},00</span>
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
  });

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remove um item do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Finaliza a compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  alert('Compra finalizada com sucesso! Agora é só retirar o seu produto.');
  carrinho = [];
  atualizarCarrinho();
  document.getElementById("modalCarrinho").style.display = "none";
}

// Função para cadastrar um aluno
function cadastrarAluno(event) {
  event.preventDefault();
  if (!validarFormulario()) return;

  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value.trim(), 10);
  const faixa = document.getElementById('faixa').value.trim();
  const modalidade = document.getElementById('modalidade').value.trim();
  const tempoParaProximaFaixa = calcularProgresso(faixa);

  const lista = document.getElementById('listaAlunos');
  const div = document.createElement('div');
  div.className = 'aluno';
  div.innerHTML = `
    <strong>Nome:</strong> ${nome} <br>
    <strong>Idade:</strong> ${idade} <br>
    <strong>Faixa:</strong> ${faixa} <br>
    <strong>Modalidade:</strong> ${modalidade} <br>
    <strong>Tempo estimado para próxima faixa:</strong> ${tempoParaProximaFaixa}
    <button onclick="removerAluno(this)">Remover</button>
  `;
  lista.appendChild(div);

  alert('Aluno cadastrado com sucesso!');
  document.getElementById('formAluno').reset();
}

// Remove um aluno cadastrado
function removerAluno(button) {
  button.parentElement.remove();
}

// Validação do formulário de cadastro
function validarFormulario() {
  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value.trim(), 10);
  const faixa = document.getElementById('faixa').value.trim();
  const modalidade = document.getElementById('modalidade').value.trim();

  if (!nome || !/^[a-zA-Z\s]+$/.test(nome)) {
    alert('Nome inválido. Use apenas letras e espaços.');
    return false;
  }

  if (isNaN(idade) || idade < 4) {
    alert('Idade inválida. A idade mínima é 4 anos.');
    return false;
  }

  if (!faixa) {
    alert('Por favor, selecione uma faixa.');
    return false;
  }

  if (!modalidade) {
    alert('Por favor, selecione uma modalidade.');
    return false;
  }

  return true;
}

// Tempo estimado para próxima faixa
function calcularProgresso(faixa) {
  const tempos = {
    'Branca': '6 a 12 meses',
    'Cinza': '1 ano',
    'Cinza e Preto': '1 ano',
    'Amarela': '1 ano',
    'Amarela e Preto': '1 ano',
    'Laranja': '1 ano',
    'Laranja e Preto': '1 ano',
    'Verde': '1 ano',
    'Verde e Preto': '1 ano',
    'Azul': '2 anos',
    'Roxa': '2 anos',
    'Marrom': '1.5 a 2 anos',
    'Preta': 'Nível mais alto (sem próxima faixa)'
  };

  return tempos[faixa] || 'Tempo indefinido';
}

// Assinatura de plano
function assinarPlano(plano) {
  let mensagem = '';

  switch(plano) {
    case 'Mensal':
      mensagem = 'Você escolheu o plano Mensal. O valor é R$ 258,00/mês.';
      break;
    case 'Semestral':
      mensagem = 'Você escolheu o plano Semestral. O valor é R$ 1.441,42 (6x R$ 240,24). Economize 10%!';
      break;
    case 'Anual':
      mensagem = 'Você escolheu o plano Anual. O valor é R$ 2.700,00 (12x R$ 225,00). Economize 15%!';
      break;
    default:
      mensagem = 'Selecione um plano válido.';
  }

  alert(mensagem);
}

// Fecha o modal ao clicar no botão X
document.querySelector(".close").onclick = function () {
  document.getElementById("modalCarrinho").style.display = "none";
};

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
  const modal = document.getElementById("modalCarrinho");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
