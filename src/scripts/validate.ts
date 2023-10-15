#!/usr/bin/env node

import { getConfig } from "../config.js";

async function main() {

    const config = await getConfig();
    console.log(config);
}

main().catch(console.error);

// @todo update this so that failed validations will create default config files.