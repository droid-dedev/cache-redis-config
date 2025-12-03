const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async parse() {
    const fileContent = await fs.promises.readFile(this.filePath, 'utf8');
    const lines = fileContent.split('\n');
    const sections = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('[') && line.endsWith(']')) {
        const sectionName = line.slice(1, -1);
        sections[sectionName] = {};
      } else if (line.includes('=')) {
        const [key, value] = line.split('=', 2).map((str) => str.trim());
        const sectionName = Object.keys(sections)[sections.length - 1];
        sections[sectionName][key] = value;
      }
    }

    return sections;
  }
}

module.exports = Parser;