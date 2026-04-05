# cache-redis-config

A lightweight library for managing Redis cache configuration with environment variables and default values.

## Features

*   Loads Redis connection parameters from environment variables.
*   Provides default values for fallback.
*   Supports Redis connection string (URI) configuration.
*   Simple and easy to use.

## Installation

```bash
npm install cache-redis-config
```

## Usage

```javascript
const { getRedisConfig } = require('cache-redis-config');

const redisConfig = getRedisConfig();

// redisConfig will contain:
// {
//   host: 'redis-host',
//   port: 6379,
//   username: 'redis-user',
//   password: 'redis-password',
//   db: 0,
//   tls: false,
// }

// Example using ioredis:
// const Redis = require('ioredis');
// const redis = new Redis(redisConfig);

// Example using redis:
// const redis = require('redis');
// const client = redis.createClient(redisConfig);
```

## Configuration

The library uses the following environment variables:

*   `REDIS_HOST`: Redis host (default: `localhost`).
*   `REDIS_PORT`: Redis port (default: `6379`).
*   `REDIS_USERNAME`: Redis username (optional).
*   `REDIS_PASSWORD`: Redis password (optional).
*   `REDIS_DB`: Redis database number (default: `0`).
*   `REDIS_TLS`: Enable TLS (default: `false`).  Set to `"true"` to enable.
*   `REDIS_URL`: Redis connection string (URI). If provided, all other Redis environment variables are ignored.  Example: `redis://user:password@host:port/db` or `rediss://user:password@host:port/db` for TLS.

## Example with Redis URL

```javascript
process.env.REDIS_URL = 'redis://user:password@redis-server:6379/1';

const { getRedisConfig } = require('cache-redis-config');
const redisConfig = getRedisConfig();

// redisConfig will contain:
// {
//   host: 'redis-server',
//   port: 6379,
//   username: 'user',
//   password: 'password',
//   db: 1,
//   tls: false,
// }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT