const axios = require('axios');

const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${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}`
};

function analyzeFile(fileData) {
  const data = {
    prompt: fileData,
    max_tokens: 5
  };
  
  return axios.post(apiEndpoint, data, { headers })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export default analyzeFile;
