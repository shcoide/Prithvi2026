module.exports = {
    apps: [
        {
            name: 'prithvi2026',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: '/var/www/Prithvi2026', // Make sure this matches your folder name capitalization
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            autorestart: true,
            max_memory_restart: '512M',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                // Do NOT put keys here. PM2 will pull them from the .env file 
                // when you run with the --update-env flag.
            },
        },
    ],
};