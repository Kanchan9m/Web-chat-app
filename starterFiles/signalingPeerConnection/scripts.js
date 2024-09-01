const userName = "Rob-"+Math.floor(Math.random()*100000);
const password = "x";
document.querySelector('#user-name').innerHTML = userName;


const socket = io.connect('https://localhost:8181/', {
    auth: {
        userName,password
    }
});

const localvideoel = document.querySelector('#local-video')
const remotevideoel = document.querySelector('#remote-video')

let localStream;
let remoteStream;
let peerConnection;

let peerConfiguration = {
    iceServers:[
        {
            urls:[
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}

const call = async e=>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    })
    localvideoel.srcObject = stream;
    localStream = stream;

    await createPeerConnection();

    //create offer time!
    try{
        console.log("Creating offer...")
        const offer = await peerConnection.createOffer();
        console.log(offer);
        peerConnection.setLocalDescription(offer);
        socket.emit('newOffer',offer);
    }catch(err){
        console.log(err)
    }
}

const createPeerConnection = ()=>{
    return new Promise(async(resolve, rejects) =>{
        peerConnection = await new RTCPeerConnection(peerConfiguration)
        localStream.getTracks().forEach(track=>{
            peerConnection.addTrack(track, localStream);
        })
        
        peerConnection.addEventListener('icecandidate', e=>{
            console.log('......Ice condidate found!......')
            console.log(e)
        })
        resolve();
    })
}

document.querySelector('#call').addEventListener('click',call)
