const recieveAudioEndpoint = "http://127.0.0.1:8086/recieveAudio/"

function sendFileToServer()
{
    const formData = new FormData();
    formData.append("why",bridgeBlob)
    formData.append("test","test")
    console.log(formData)

    fetch(recieveAudioEndpoint,
        {
            method: "POST",
            body: formData//JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.text()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error("There was a problem with the fetch", error);
        });
}