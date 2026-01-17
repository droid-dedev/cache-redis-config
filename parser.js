const fs = require('fs');
const path = require('path');

class Parser {
  constructor(configFile) {
    this.configFile = configFile;
  }

  async readConfigFile() {
    try {
      const data = await fs.promises.readFile(this.configFile, 'utf8');
      return data;
    } catch (error) {
      throw new Error(`Failed to read config file: ${error.message}`);
    }
  }

  parseConfig(data) {
    try {
      const config = JSON.parse(data);
      return config;
    } catch (error) {
      throw new Error(`Failed to parse config file: ${error.message}`);
    }
  }

  validateConfig(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid config format');
    }

    if (!config.redis || !config.redis.host || !config.redis.port) {
      throw new Error('Redis host and port are required');
    }

    if (!config.cache || !config.cache.ttl) {
      throw new Error('Cache TTL is required');
    }
  }

  async parse() {
    const data = await this.readConfigFile();
    const config = this.parseConfig(data);
    this.validateConfig(config);
    return config;
  }
}

module.exports = Parser;