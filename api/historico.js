import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const response = await fetch('https://api.jogosvirtual.com/jsons/historico_baralho_footballstudio.json?' + Date.now());
    if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.status}`);
    }
    const data = await response.json();
    
    // Configura os cabeçalhos para permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).send(data);

  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).send({ error: 'Erro ao buscar dados da API externa.' });
  }
};
