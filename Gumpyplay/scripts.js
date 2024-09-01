const videol = document.querySelector('#my-video');
let stream = null
let mediaStream = null
const constraints = {
    audio: true,
    video: true,
}

const getMicAndCamera = async(e)=>{
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        getDevices();
        console.log(stream)
        changeButtons([
            'green','blue','blue','grey','grey','grey','grey','blue'       
         ])
        
    }catch(err){
        //user denied access to constraints
        console.log("user denied access to constraints")
        console.log(err)
    }
};

const showMyFeed = e=>{
    console.log("showMyFeed is working")
    if(!stream){
        alert("Stream Still Loading...")
        return;
    }
    videol.srcObject = stream; //set our video to mediastream
    const tracks = stream.getTracks();
    console.log(tracks);
    changeButtons([
        'green','green','blue','blue','blue','grey','grey','blue'       
     ])
}

const stopMyFeed = e=>{
    const tracks = stream.getTracks();
    tracks.forEach(track=>{
        track.stop();
    })
    changeButtons([
        'blue','grey','grey','grey','grey','grey','grey','grey'       
     ])
}


document.querySelector('#share').addEventListener('click',e=>getMicAndCamera(e))
document.querySelector('#show-video').addEventListener('click',e=>showMyFeed(e))
document.querySelector('#stop-video').addEventListener('click',e=>stopMyFeed(e))
document.querySelector('#change-size').addEventListener('click',e=>changeVideoSize(e))
document.querySelector('#start-record').addEventListener('click',e=>startRecording(e))
document.querySelector('#stop-record').addEventListener('click',e=>stopRecording(e))
document.querySelector('#play-record').addEventListener('click',e=>playRecording(e))
document.querySelector('#share-screen').addEventListener('click',e=>sharescreen(e))

document.querySelector('#audio-input').addEventListener('click',e=>changeAudioinput(e))
document.querySelector('#audio-output').addEventListener('click',e=>changeAudiooutput(e))
document.querySelector('#video-input').addEventListener('click',e=>changevideo(e))
