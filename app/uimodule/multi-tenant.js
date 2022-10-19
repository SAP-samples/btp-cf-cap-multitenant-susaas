/*
    This files serves the multi-tenant usage of the repo-mock. 
    
    It allows to inject a custom default-env.json file as the standard repo-mock takes the VCAP services from 
    the process.env variable and does not take default-env.json files in the same directory into account. 
*/

const repoMock = require('@sap/html5-repo-mock');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const env = require(args['defaultEnv']);

process.env.VCAP_SERVICES=JSON.stringify(env.VCAP_SERVICES);
process.env.MOCK_DIR=path.resolve(args['mockDir'])
process.env.AR_DIR=path.resolve(args['workDir']),
process.env.AR_BASE=args['baseURL']
repoMock.start();