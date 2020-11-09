const ProxyChain = require('proxy-chain');
 
const server = new ProxyChain.Server({ port: 8000 });
 
server.listen(() => {
    console.log(`Proxy server is listening on port ${8000}`);
    cls
});