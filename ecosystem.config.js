module.exports = {
    apps : [{
        name: "super bing api",
        script: "./index.js",
        exec_mode: "cluster",
        instances: "max",
        env_production: {
            NODE_ENV: "production",
            PORT: "8080"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}
