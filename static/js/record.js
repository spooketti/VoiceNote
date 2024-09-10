let recorder
let chunks = []


function AudioSetup()
{
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    {
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false
        })
        .then(StreamSetup)
        .catch(err => {
            console.error(err)
        })

    }
}

function StreamSetup(stream)
{
    recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e =>
    {
        chunks.push(e.data)
    }

    recorder.onstop = e =>
    {
        const blob = new Blob(chunks, {type: "audio/wav; codecs=opus"})
        chunks = []
        
    }
}