# Ohm Repo Duplication Action

This is a custom action to duplicate a repo with no history for a candidate assessment

## Code in Main

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```
> Changes to this action must be built, packaged and committed to take effect in the repo

### Troubleshooting

If you get an error like
```
opensslErrorStack: [
    'error:03000086:digital envelope routines::initialization error',
    'error:0308010C:digital envelope routines::unsupported'
  ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
```

you may have a newer version of node.js. This [StackOverflow post](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e) has a good description but the long and short is run the following and try again:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```