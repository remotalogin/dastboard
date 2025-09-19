import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const response = await fetch('https://api.jogosvirtual.com/jsons/historico_baralho_footballstudio.json?' + Date.now());
    const data = await response.json();
    
    // Configura os cabeçalhos para permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Envia os dados da API original como resposta
    res.status(200).send(data);

  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar dados da API externa.' });
  }
};
