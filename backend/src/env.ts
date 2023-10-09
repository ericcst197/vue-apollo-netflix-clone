import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGODB: string | undefined;
    MONGODB_PASSWORD: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    MONGODB: string;
    MONGODB_PASSWORD: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.VUE_APP_NODE_ENV,
        PORT: process.env.VUE_APP_PORT ? parseInt(process.env.VUE_APP_PORT) : undefined,
        MONGODB_PASSWORD: process.env.VUE_APP_MONGODB_PASSWORD,
        MONGODB: process.env.VUE_APP_MONGODB
    };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;