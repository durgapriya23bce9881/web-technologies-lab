// Audio time display
const audio = document.getElementById("audioPlayer");
const audioTime = document.getElementById("audioTime");

audio.addEventListener("timeupdate", () => {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    if (seconds < 10) seconds = "0" + seconds;
    audioTime.textContent = minutes + ":" + seconds;
});

// Video time display
const video = document.getElementById("videoPlayer");
const videoTime = document.getElementById("videoTime");

video.addEventListener("timeupdate", () => {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) seconds = "0" + seconds;
    videoTime.textContent = minutes + ":" + seconds;
});
