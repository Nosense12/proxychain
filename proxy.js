const ProxyChain = require('proxy-chain');
const chalk = require('chalk');

isHttp = false

var username = "vpnbook"
var password = "6b7wEa7"
var host = "de4.vpnbook.com"

const server = new ProxyChain.Server({

    port: 8000,

    verbose: true,
    isHttp: false,
    // valores dos recursos do proxychain
    // Aunteticação de proxychain.
    // :
    // { requestAuthentication: Boolean, upstreamProxyUrl: String }
    // * request      - o provedor do conector de ProxyChain
    //                  http pro protocolo ssl
    // * username     - O Username do proxychain
    // * password     - a senha para autorização de proxy
    // * hostname     - Hospedagem do proxy
    // * port         - Porta do server
    // * isHttp       - ve se é http ou ssl
    //                  outros protocolos
    prepareRequestFunction: ({ request, username, password, host, port, isHttp, connectionId }) => {
        return {
            // Require clients to authenticate with username 'bob' and password 'TopSecret'
            requestAuthentication: username !== 'bob' || password !== 'TopSecret',

            // Sets up an upstream HTTP proxy to which all the requests are forwarded.
            // If null, the proxy works in direct mode, i.e. the connection is forwarded directly
            // to the target server. This field is ignored if "requestAuthentication" is true.
            upstreamProxyUrl: `http://username:password@proxy.example.com:3128`,

            // If "requestAuthentication" is true, you can use the following property
            // to define a custom error message instead of the default "Proxy credentials required"
            failMsg: 'Bad username or password, please try again.',
        };
    },
});

// configuração do proxychain

server.listen(() => {
  console.log((chalk.blue(`Proxy server is listening on port ${server.port} using ` + username + ` to name and ` + password + ` to authentication and using host ` + host)));
});

// quando funciona

// Emitted when HTTP connection is closed
server.on('connectionClosed', ({ connectionId, stats }) => {
  console.log((chalk.yellow(`Connection ${connectionId} closed`)));
  console.dir(stats);
});


//quando fecha a conexão

// Emitted when HTTP request fails
server.on('requestFailed', ({ request, error }) => {
  console.log((chalk.red(`Request ${request.url} failed`)));
  console.error((chalk.red(error)));
});
// quando falha o proxy!!!
