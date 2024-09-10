let recorder
let chunks = []
let isRecording = false
let recordButton = document.getElementById("recordButton")
let audioPreview = document.getElementById("audioPreview")
let audioFile = document.getElementById("audioFile")

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
        audioPreview.src = window.URL.createObjectURL(blob)
        audioFile.src = window.URL.createObjectURL(blob)
    }
}
AudioSetup()

function uploadAudio()
{
    audioFile.click()
}

function micToggle()
{
    if(isRecording)
    {
        isRecording = !isRecording
        recorder.stop()
        recordButton.classList.remove("isRecording")
        return
    }
    recorder.start()
    recordButton.classList.add("isRecording")
    isRecording = !isRecording

}

audioFile.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const audio = event.target.result;
            audioFile.src = audio
            audioPreview.src = audio
        };
        reader.readAsDataURL(file);
    }
  });