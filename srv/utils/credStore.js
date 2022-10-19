/*
    Based on SAP Help document
    https://help.sap.com/docs/CREDENTIAL_STORE/601525c6e5604e4192451d5e7328fa3c/decad8fa526c40138d2a6843fb6a82bb.html
*/

const debug = require('debug')('srv:credStore');

module.exports = {
    readCredential: readCredential,
    readCredentialValue: readCredentialValue,
    writeCredential:writeCredential,
    deleteCredential:deleteCredential
};

const fetch = require('node-fetch');
const jose = require('node-jose');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

let services = new Object()
let binding = new Object(); 

if (cds.env.profiles.includes('production')) {
    services = xsenv.getServices({credStore: { tag: 'credstore' }});
    binding = services.credStore;
}

function checkStatus(response) {
    debug('credStore.checkStatus:', response.status, response.statusText, response.url);
    if (!response.ok) {
        throw Error('checkStatus: ' + response.status + ' ' + response.statusText);
    }
    return response;
}

async function decryptPayload(privateKey, payload) {
    const key = await jose.JWK.asKey(
        `-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`, 
        'pem', 
        {alg: "RSA-OAEP-256", enc: "A256GCM"}
    );
    const decrypt = await jose.JWE.createDecrypt(key).decrypt(payload);
    const result = decrypt.plaintext.toString();
    return result;
}

function headers(binding, namespace, init) {
    const result = new fetch.Headers(init);
    result.set('Authorization', `Basic ${Buffer.from(`${binding.username}:${binding.password}`).toString('base64')}`);
    result.set('sapcp-credstore-namespace', namespace);
    return result;
}

async function fetchAndDecrypt(privateKey, url, method, headers, body) {
    const result = await fetch(url, {method, headers, body})
        .then(checkStatus)
        .then(response => response.text())
        .then(payload => decryptPayload(privateKey, payload))
        .then(JSON.parse);
    return result;
}

async function fetchAndDecryptValue(privateKey, url, method, headers, body) {
    const result = await fetch(url, {method, headers, body})
        .then(checkStatus)
        .then(response => response.text())
        .then(payload => decryptPayload(privateKey, payload))
        .then(JSON.parse);
    return result.value;
}

async function readCredential(namespace, type, name) {
    return fetchAndDecrypt(
        binding.encryption.client_private_key,
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`, 
        "get", 
        headers(binding, namespace)
    );
}

async function readCredentialValue(namespace, type, name) {
    return fetchAndDecryptValue(
        binding.encryption.client_private_key,
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`, 
        "get", 
        headers(binding, namespace)
    );
}

async function writeCredential(binding, namespace, type, credential) {
    return fetchAndDecrypt(
        binding.encryption.client_private_key,
        `${binding.url}/${type}`,
        "post",
        headers(binding, namespace, { "Content-Type": "application/jose" }),
        await encryptPayload(binding.encryption.server_public_key, JSON.stringify(credential))
    );
}

async function deleteCredential(binding, namespace, type, name) {
    await fetch(
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`,
        {
            method: "delete",
            headers: headers(binding, namespace)
        }
    ).then(checkStatus);
}