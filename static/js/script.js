const recieveAudioEndpoint = "http://127.0.0.1:8086/recieveAudio/"

function sendFileToServer()
{
    let fileElement = document.getElementById("audioFile")
    let file = fileElement.files[0]
    if(!file)
    {
        return
    }

    let formData = new FormData()
    formData.append('file',formData)

    fetch(recieveAudioEndpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData//JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.text()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("baller")
        })
        .catch(error => {
            console.error("There was a problem with the fetch", error);
        });
}