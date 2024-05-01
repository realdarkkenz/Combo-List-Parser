//Coded By : DARK KENZ

const fs = require('fs');
const readline = require('readline');

const comboListFilePath = 'combolist.txt';

function parseComboLine(line) {
  const [username, password] = line.split(':');
  const cleanedPassword = password ? password.slice(0, password.indexOf(' ')) : '';

  return cleanedPassword ? `${username}:${cleanedPassword}` : username;
}

function parseComboList() {
  const comboList = [];
  const lineReader = readline.createInterface({
    input: fs.createReadStream(comboListFilePath),
    crlfDelay: Infinity
  });

  lineReader.on('line', (line) => {
    const combo = parseComboLine(line);
    comboList.push(combo);
  });

  lineReader.on('close', () => {
    const outputFile = 'combolist.txt';
    const result = comboList.join('\n');
    
    fs.writeFile(outputFile, result, (err) => {
      if (err) {
        console.error('Hata oluştu: Dosya kaydedilemedi.');
      } else {
        console.log('Combo listesi dosyaya kaydedildi.');
      }
    });
  });
}

parseComboList();

//Coded By : DARK KENZ