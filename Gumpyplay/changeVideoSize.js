const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstraints);

const changeVideoSize = ()=>{
    stream.getVideoTracks().forEach(track=>{
        const height = document.querySelector('#vid-height').value
        const width = document.querySelector('#vid-width').value
        const vConstraints = {
            height: height,
            weight: width,
        }
        track.applyConstraints(vConstraints)
    })
    // stream.getTracks().forEach(track=>{
    //     const Capabilities = track.getCapabilities()
    //     console.log(Capabilities);
    // })
}