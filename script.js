const EMOJIS = {
    'V': { emoji: '🔴', colorClass: 'emoji-V' },
    'A': { emoji: '🔵', colorClass: 'emoji-A' },
    'T': { emoji: '🟠', colorClass: 'emoji-T' }
};

let ultimoValor = null;
const resultsContainer = document.getElementById('results-container');

async function checarNovos() {
    try {
        const response = await fetch('/api/historico?' + Date.now());
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }
        const data = await response.json();

        const ultimaSessao = data.ultima_sessao;
        const baralhos = data.baralhos;

        if (!baralhos[ultimaSessao] || !baralhos[ultimaSessao].length) {
            console.log('Sem dados para a última sessão.');
            return;
        }

        const cartas = baralhos[ultimaSessao];
        const novoValor = cartas[cartas.length - 1];

        if (novoValor !== ultimoValor) {
            ultimoValor = novoValor;

            const tipo = novoValor.charAt(0);
            const emojiInfo = EMOJIS[tipo] || { emoji: '', colorClass: '' };

            const agora = new Date().toLocaleTimeString();

            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <span class="result-emoji ${emojiInfo.colorClass}">${emojiInfo.emoji}</span>
                <span class="result-text">${novoValor}</span>
                <span class="result-time">[${agora}]</span>
            `;

            if (resultsContainer.firstChild) {
                resultsContainer.insertBefore(resultItem, resultsContainer.firstChild);
            } else {
                resultsContainer.appendChild(resultItem);
            }

            if (resultsContainer.children.length > 1 && resultsContainer.querySelector('p')) {
                resultsContainer.querySelector('p').remove();
            }
        }

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        resultsContainer.innerHTML = `<p style="color: red;">Erro ao carregar dados: ${error.message}</p>`;
    }
}

setInterval(checarNovos, 3000);
checarNovos();
