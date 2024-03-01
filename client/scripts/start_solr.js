const { exec } = require('child_process');

const solrBinPath = 'C:/Users/HP/Downloads/solr-8.11.2/solr-8.11.2/bin';

const solrProcess = exec(`${solrBinPath}/solr start -p 8983`);

solrProcess.stdout.on('data', (data) => {
  console.log(`Solr: ${data}`);
});

solrProcess.stderr.on('data', (data) => {
  console.error(`Solr Error: ${data}`);
});

solrProcess.on('close', (code) => {
  console.log(`Solr process exited with code ${code}`);
});
