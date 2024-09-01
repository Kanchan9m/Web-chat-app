let mediaRecorder;
let recordedBlobs;

const startRecording = () =>{
    if (!stream){
        alert("no current feed");
        return
    }
    console.log("start recording");
    recordedBlobs = []; //hold blobs
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = e=>{
        console.log("Data is available for the media recorder")
        recordedBlobs.push(e.data)
    }
    mediaRecorder.start();
    changeButtons([
        'green','green','blue','blue','green','blue','grey','blue'       
     ])
     console.log("start recording end   ")
}
const stopRecording = () =>{
    if (!mediaRecorder){
        alert("Please record")
        return
    }
    console.log("stop Recording")
    mediaRecorder.stop();
    changeButtons([
        'green','green','blue','blue','green','green','blue','blue'       
     ])
}

const playRecording = () =>{
    console.log("Play Recording")
    if (!recordedBlobs){
        alert("No recording here")
        return
    }
    const superBuffer = new Blob(recordedBlobs)
    const recordedVideo = document.querySelector("#other-video");
    recordedVideo.src = window.URL.createObjectURL(superBuffer)
    recordedVideo.controls = true;
    recordedVideo.play();
    changeButtons([
        'green','green','blue','blue','green','green','green','blue'       
     ])
}
