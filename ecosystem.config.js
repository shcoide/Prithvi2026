// PM2 Ecosystem config — prithvi2026.com on DigitalOcean (206.189.140.159)
// Start: pm2 start ecosystem.config.js
// Reload: pm2 reload ecosystem.config.js --update-env
// Status: pm2 status
// Logs:   pm2 logs prithvi2026

module.exports = {
    apps: [
        {
            name: 'prithvi2026',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: '/var/www/prithvi2026',
            instances: 1,
            exec_mode: 'fork',               // single Droplet — fork is fine
            watch: false,
            autorestart: true,
            max_memory_restart: '512M',

            env: {
                NODE_ENV: 'production',
                PORT: 3000,

                // ── MongoDB Atlas ─────────────────────────────────────────────
                MONGODB_URI: 'mongodb+srv://Prithvi_data:dbDataPrithvi26@prithvidata.fgtw4p2.mongodb.net/prithvi2026?appName=PrithviData',

                // ── Zoho Mail ─────────────────────────────────────────────────
                ZOHO_SMTP_USER: 'registration.prithvi.iitkgp@zohomail.in',
                ZOHO_SMTP_PASS: 'zzYUuFjm038j',

                // ── Admin Panel ───────────────────────────────────────────────
                // ⚠️  Change these before first deploy!
                ADMIN_PASSWORD: 'PrithviAdmin@2026',
                ADMIN_JWT_SECRET: 'prithvi-admin-jwt-8f92ha02',

                // ── User JWT ──────────────────────────────────────────────────
                JWT_SECRET: 'prithvi-user-jwt-9k31mb77',

                // ── Google Sheets ─────────────────────────────────────────────
                GOOGLE_SERVICE_ACCOUNT_EMAIL: 'shivam@angular-spider-488011-p8.iam.gserviceaccount.com',
                GOOGLE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCiHJDr2tkRx5DU\ni3xDLzI1WOSMca7N9GBVS7fH+jidVMtMZqeiL6B1FpbpnjUVYuD0iMq92MOtisml\nnHIY79sqpMrcexIaMTuzIMcKQ4znP4F9g/x9UDBssDzXYDskpC7tMnjMJmSN9Z2y\nNKadKUkZ0f2Zlf6Xma7MGQuUI8Jkzj63SMULrI6+wQlvnDHoQLLGiKQeRqJQQyNW\nZLIwjQLP9eH22gMVJKGVTaE6nkcoNXfSWncF5E/5i/HZyCxwT68b2QUkdX4H1U/T\nLNfzFv5p4vMymbP4Kk4Ji3RtTqFLU7XaBEKqSjstDCHjLmrCmwekNaFc2/VG+jda\nc7OhFs7VAgMBAAECggEAGWFYjRyH1KFGewhVjZ0zgqemrJhV0lfaxy/iF5SEzZkL\ndSwzPZCwUfSV7wB+dhkzeAV8nGl2BVMPy/Zo5J+U1CHVwtwf0ur3Wk2c6+30fvXx\n24lQ+/uUgUe8VsnxqIRt9mPrBqdSIemc5VwZ48wlbj3ystuJbwm4FKstJWXN1wM1\ngDRGBt+RWK3+xn7ckwRye9+RZIfl6/wHC19m3c4v/GyKX3HnfksmJm/l+13WOXd8\n1gR1gjfmd3TicDWBI1Yb0x2JCdJsK3ZEl2bFtQkh8RrEDQiyTxcezj1zuqYMbhlF\ntQ5Qn/bdDNSrkStbdDyAei3plgS1IkLfEJxZbXky1wKBgQDP1cILXdMFZV4kQXaW\nqWqv7W1uyRlcGM19Yuc+5EiSuIv46qCYHlMkaGqgK5FpOR4JFDu4r6Yc3FgQ/xhs\nUYWawvsSbclTcPsv/TYl/4nhYnm4H2X9o+ZFzzNWdhApzk7wrfYJ74zw1YfzFGp6\niH0HmVagtWyBiAXMYZBD/ScFMwKBgQDHriwWptyDN76//hCSYPRjRaNBG094McwT\nEpqmAPRKgF2Nez6/B0TyXROYrHPCOCcIArzjhUBKdVraWjhbFslm3SSnF/D3YdWx\nw7DunBfC6nnuUjg7awWfR2yQe+iy8M6InDFovSW7H6wxW0k0vM6BBGlrN6oOVlOb\nTQjcNwbL1wKBgHQsPxgNbPwyKkpH0Vrr/jeylp37iNJjBtIUq8AK6MoioBMWS4hc\nQwsx1pALam+PvstCZROaE1dEj3GItgUuGGlmneMyPPwIRlAP0OmyikbSvcj+vAro\nR7oz1LV6rxQ/Pv7nroTlQzoHkcN9YPt3ObQ6sSKJ5soM13jj/DkU02/jAoGBAISA\nLwFY+DqaYxlDnfuEGqdFLm+lj7ZSVPjS/4voVjKZu3qGrbxVNosc+EP3K1lVqZDH\nQFA5u8+sz/zUoVDQbhSz6f53BI8jfInZMS8kpR/SN9bM+EN1YOWwn3nAv0j+Qg6k\nlqTJ3p+tBLY7vPgh0WYLZ2ieJ1ocLp5/H8IBQaFBAoGAarKs2E7wtsVuoVMMvQ6w\nu7mTEl701afEgWzQUReYF27YgurS5nmrWbxgVha+ZwXaZMffw+0zdgJl0HBbVPMi\nD8MuJwPkMOiiN99TREqBBG0b7t+nGf7XnHPR7OqSxPQ3PLnH/P2V35s32xDF3JOZ\n5edNd9GakFl/OSADmpOPTbY=\n-----END PRIVATE KEY-----\n",
            },
        },
    ],
};
