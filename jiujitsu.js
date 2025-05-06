let carrinho = [];

// Função para adicionar produtos ao carrinho
function adicionarCarrinho(nome, preco) {
  // Adiciona o produto ao carrinho
  carrinho.push({ nome, preco });
  
  // Atualiza o carrinho na interface
  atualizarCarrinho();
}

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById('itensCarrinho');
  const totalCarrinho = document.getElementById('totalCarrinho');

  // Limpa o carrinho atual
  itensCarrinho.innerHTML = '';

  // Adiciona os itens ao carrinho
  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    itensCarrinho.innerHTML += `
      <div>
        <span>${item.nome} - R$${item.preco}</span>
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
  });

  // Atualiza o total
  totalCarrinho.textContent = total.toFixed(2);
}

// Função para remover itens do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1); // Remove o item do carrinho
  atualizarCarrinho(); // Atualiza a interface
}

// Função para finalizar a compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
  } else {
    alert('Compra finalizada com sucesso! Agora é só retirar o seu produto.');
    carrinho = []; // Limpa o carrinho após a compra
    atualizarCarrinho(); // Atualiza a interface
  }
}

// Função para cadastrar o aluno
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
  
  // Mensagem de sucesso
  alert('Aluno cadastrado com sucesso!');
  
  document.getElementById('formAluno').reset();
}

// Função para remover o cadastro de um aluno
function removerAluno(button) {
  const aluno = button.parentElement; // Encontrar o elemento pai (o "div" do aluno)
  aluno.remove(); // Remover o aluno da lista
}

// Função para validar o formulário
function validarFormulario() {
  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value.trim(), 10);
  const faixa = document.getElementById('faixa').value.trim();
  const modalidade = document.getElementById('modalidade').value.trim();
  
  // Validação de nome
  if (!nome || !/^[a-zA-Z\s]+$/.test(nome)) {
    alert('Nome inválido. Por favor, insira um nome válido (somente letras e espaços).');
    return false;
  }
  
  // Validação de idade
  if (isNaN(idade) || idade < 4) {
    alert('Idade inválida. A idade mínima é 4 anos.');
    return false;
  }
  
  // Validação de faixa
  if (!faixa) {
    alert('Por favor, selecione uma faixa.');
    return false;
  }
  
  // Validação de modalidade
  if (!modalidade) {
    alert('Por favor, selecione uma modalidade.');
    return false;
  }
  
  return true;
}

// Função para calcular o tempo para a próxima faixa
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

  
