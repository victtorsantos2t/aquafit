
// Define o tempo máximo de armazenamento em minutos
const MAX_STORAGE_TIME = 120;

// Função para obter o timestamp atual
function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

// Função para salvar os dados do card no localStorage
function saveCardData(cardId, borderColor, buttonText, messageShown) {
  const timestamp = getCurrentTimestamp();
  const data = { borderColor, buttonText, messageShown, timestamp };
  localStorage.setItem(`card${cardId}`, JSON.stringify(data));
}

// Função para carregar os dados do card do localStorage
function loadCardData(cardId) {
  const data = localStorage.getItem(`card${cardId}`);
  if (data) {
    const { borderColor, buttonText, messageShown, timestamp } = JSON.parse(data);
    const currentTimestamp = getCurrentTimestamp();
    const elapsedMinutes = (currentTimestamp - timestamp) / 60;
    // Verifica se o tempo de armazenamento máximo não foi excedido
    if (elapsedMinutes < MAX_STORAGE_TIME) {
      const card = document.getElementById(`card${cardId}`);
      const button = card.querySelector('button');
      card.style.borderColor = borderColor;
      button.innerHTML = buttonText;
      const message = card.querySelector('.message');
      if (messageShown) {
        if (!message) {
          const newMessage = document.createElement('div');
          newMessage.innerHTML = 'Treino Realizado';
          newMessage.className = 'message';
          card.appendChild(newMessage);
        }
      } else {
        if (message) {
          card.removeChild(message);
        }
      }
    } else {
      localStorage.removeItem(`card${cardId}`);
    }
  }
}

// Função para atualizar o card quando a borda é alterada
function changeBorderColor(cardId, button) {
  const card = document.getElementById(cardId);
  const message = card.querySelector('.message');
  if (card.style.borderColor !== 'orange') {
    card.style.borderColor = 'orange';
    if (!message) {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = 'Treino Realizado';
      newMessage.className = 'message';
      card.appendChild(newMessage);
    }
    button.innerHTML = 'Recomeçar';
    // Salva as informações do card no localStorage
    saveCardData(cardId, 'orange', 'Recomeçar', true);
  } else {
    card.style.borderColor = '';
    if (message) {
      card.removeChild(message);
    }
    button.innerHTML = 'Finalizar exercicio';
    // Salva as informações do card no localStorage
    saveCardData(cardId, '', 'Finalizar exercicio', false);
  }
}

// Carrega os dados dos cards do localStorage quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 4; i++) {
    loadCardData(i);
  }
});

// Função para exibir o alerta de confirmação
function showConfirmAlert() {
    return "Tem certeza que deseja sair? As alterações não salvas serão perdidas.";
  }
  
  // Adiciona o evento beforeunload à janela
  window.addEventListener('beforeunload', (event) => {
    // Cancela a atualização da página se o usuário não confirmar o alerta
    if (!confirm(showConfirmAlert())) {
      event.preventDefault();
      event.returnValue = '';
    }
  });



