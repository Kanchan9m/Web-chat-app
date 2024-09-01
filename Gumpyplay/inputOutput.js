const audioinputEl = document.querySelector('#audio-input')
const audiooutputEl = document.querySelector('#audio-output')
const videoEl = document.querySelector('#video-input')

const getDevices = async() =>{
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices)
        devices.forEach(d=>{
            const option = document.createElement('option')
            option.value = d.deviceId
            option.text = d.label
            if(d.kind === "audioinput"){
                audioinputEl.appendChild(option)
            }else if(d.kind === "audiooutput"){
                audiooutputEl.appendChild(option)
            }else if(d.kind === "videoinput"){
                videoEl.appendChild(option)
            }
        })
    }catch(err){
        console.log(err);
    }
}
getDevices();

const changeAudioinput = async(e) =>{
    const deviceId = e.target.value;
    const newconstraints = {
        audio: {deviceId: {exact: deviceId}},
        video: true
    }
    try{
        stream = await navigator.mediaDevices.getUserMedia(newconstraints);
        console.log(stream);
        const tracks = stream.getAudioTracks();
        console.log(tracks);
    }catch(err){
        console.log(err)
    }
}

const changeAudiooutput = async(e) =>{
    await videol.setSinkId(e.target.value);
    console.log();
}

const changevideo = async(e) =>{
    const deviceId = e.target.value;
    const newconstraints = {
        audio: true,
        video: {deviceId: {exact: deviceId}},
    }
    try{
        stream = await navigator.mediaDevices.getUserMedia(newconstraints);
        console.log(stream);
        const tracks = stream.getVideoTracks();
        console.log(tracks);
    }catch(err){
        console.log(err)
    }
}