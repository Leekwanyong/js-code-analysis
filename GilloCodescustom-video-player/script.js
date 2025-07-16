// dom 가져오기
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// 비디오 플레이, 정지
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 비디오 아이콘 업데이트 정지, 플레이 상태 일 떄
function updatePlayIcon() {
    if (video.ended) {
        play.innerHTML = '<i class="fa fa-redo fa-2x"></i>';
    } else if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// 비디오 시간
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // 시간 분
    let mins = Math.floor(video.currentTime / 60);
    if (mins < video.duration) {
        mins = "0" + String(mins);
    }

    // 시간 초
    let secs = Math.floor(video.currentTime % 60);
    if (secs < video.duration) {
        secs = "0" + String(secs);
    }
    // 현재 재생 위치를 mm:ss 형식으로 표시
    timestamp.innerHTML = `${mins}:${secs}`;
}

// 비디오 플레이 시간 바
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// 비디오 정지
function stopVideo() {
    video.currentTime = 0;
    video.pause();
    timestamp.innerHTML = "00:00";
}

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", updatePlayIcon);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
