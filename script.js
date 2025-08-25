document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlist = document.getElementById('playlist');
    const currentTrackTitle = document.getElementById('current-track-title');
    const artworkImg = document.getElementById('artwork-img');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    let tracks = [];
    let currentTrackIndex = -1;
    let isPlaying = false;

    fetch('file_list.json')
        .then(response => {
            if (!response.ok) throw new Error("Không tìm thấy file_list.json. Hãy chạy script python để tạo file.");
            return response.json();
        })
        .then(data => {
            tracks = data;
            renderPlaylist();
        })
        .catch(error => {
            console.error(error);
            playlist.innerHTML = `<li>Lỗi: ${error.message}</li>`;
        });

    function renderPlaylist() {
        playlist.innerHTML = '';
        if (tracks.length === 0) {
            playlist.innerHTML = '<li>Không có file âm thanh nào.</li>';
            return;
        }
        tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = track.filename.replace(/\.mp3|\.wav|\.m4a|\.ogg/i, '');
            li.dataset.index = index;
            li.addEventListener('click', () => loadTrack(index));
            playlist.appendChild(li);
        });
    }

    function loadTrack(trackIndex) {
        if (trackIndex >= 0 && trackIndex < tracks.length) {
            const track = tracks[trackIndex];
            audioPlayer.src = `data/audio/${track.filename}`;
            artworkImg.src = track.artwork ? `data/audio/${track.artwork}` : 'images/default-artwork.svg';
            currentTrackTitle.textContent = track.filename.replace(/\.mp3|\.wav|\.m4a|\.ogg/i, '');
            
            document.querySelectorAll('#playlist li').forEach((item, idx) => {
                item.classList.toggle('playing', idx === trackIndex);
            });

            currentTrackIndex = trackIndex;
            playTrack();
        }
    }

    function playTrack() {
        isPlaying = true;
        audioPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }

    function pauseTrack() {
        isPlaying = false;
        audioPlayer.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }

    function playPauseToggle() {
        if (currentTrackIndex === -1 && tracks.length > 0) {
            loadTrack(0);
        } else {
            isPlaying ? pauseTrack() : playTrack();
        }
    }

    function nextTrack() {
        let newIndex = currentTrackIndex + 1;
        if (newIndex >= tracks.length) newIndex = 0;
        loadTrack(newIndex);
    }

    function prevTrack() {
        let newIndex = currentTrackIndex - 1;
        if (newIndex < 0) newIndex = tracks.length - 1;
        loadTrack(newIndex);
    }

    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = isNaN(progressPercent) ? 0 : progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', playPauseToggle);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    audioPlayer.addEventListener('ended', nextTrack);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audioPlayer.duration);
    });
    progressBar.addEventListener('input', (e) => {
        const duration = audioPlayer.duration;
        if (!isNaN(duration)) {
            audioPlayer.currentTime = (e.target.value / 100) * duration;
        }
    });
});
