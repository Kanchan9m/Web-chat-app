const fs = require('fs')
const https = require('https')
const express = require('express')
const app = express();
const socketio = require('socket.io');
const { generateId } = require('base64id');
const { MockInterceptor } = require('undici-types/mock-interceptor');
const { Socket } = require('socket.io-client');
app.use(express.static(__dirname))

// we need a key and cert to run https
// we generated them with mkcert 
// $ mlcert create-ca
// $ mlcert create-cert
const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const expressServer = https.createServer({key, cert}, app);

const io = socketio(expressServer);
expressServer.listen(8181);

const offers = [
    //offer
    //offerIceCandidate
];
const connectedSockets = [
    //username socketid
];

io.on('connection',(socket)=>{
    const userName = socket.handshake.auth.userName;
    const password = socket.handshake.auth.password;

    if (password !== "x"){
        socket.disconnect(true);
        return;
    }
    connectedSockets.push({
        socketId: socket.id,
        userName
    })
    socket.on('newOffer', newOffer=>{
        offers.push({
            offerUserName: userName,
            offer: newOffer,
            offerIceCandidates: [],
            answerUserName: null,
            answer: null,
            answererIceCandidates: []
        })
        socket.broadcast.emit('newOfferAwaiting',offers.slice(-1))
    })
})