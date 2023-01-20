const config: MyServerConfig = {
    port: 3000,
    mode: process.env.PROD ? "production" : "development",
};

export default config;
