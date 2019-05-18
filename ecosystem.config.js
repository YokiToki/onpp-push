module.exports = {
  apps : [{
    name: 'ONPP Push service',
    cron_restart: "*/1 * * * *",
    exec_interpreter: "node",
    script: 'bin/index.js',
    args: '',
    instances: 1,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
