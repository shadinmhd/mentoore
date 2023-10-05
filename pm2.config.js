{
    "apps": [
        {
            "name": "backend",
            "script": "./server/dist/main.js",
            "watch": true,
            "ignore_watch": ["node_modules"]
        },
        {
            "name": "frontend",
            "script": "npm run dev",
            "watch": true,
            "ignore_watch": ["node_modules"]
        }
    ]
}