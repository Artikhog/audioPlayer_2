var track_selector, play_btn, pause_btn, next_btn, previous_btn, phantom_btn, whatsapp_btn, white_trash_btn, time,
    volume

function start() {
    track_selector = new Track_Selector();

    init_btn();
    add_listeners();
}
function init_btn() {
    play_btn = document.getElementById('play');
    pause_btn = document.getElementById('pause');
    previous_btn = document.getElementById('previous');
    next_btn = document.getElementById('next');
    phantom_btn = document.getElementById('phantom_button');
    whatsapp_btn = document.getElementById('whatsapp_button');
    white_trash_btn = document.getElementById('white_trash_button');
    time = document.getElementById('time_controller');
    volume = document.getElementById('volume_controller');
}

function add_listeners() {
    play_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.play_current();
    });

    pause_btn.addEventListener('click', () => {
        play_pause(false);
        track_selector.pause_current();
    });

    next_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.next_track();
    });

    previous_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.previous_track();
    });

    phantom_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.select_track(0);
    })

    whatsapp_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.select_track(1);
    })

    white_trash_btn.addEventListener('click', () => {
        play_pause(true);
        track_selector.select_track(2);
    })

    time.addEventListener('change', () => {
        track_selector.update_time(time.value);
    });

    setInterval(() => {
        time.value = track_selector.current_track.currentTime / track_selector.current_track.duration * 100
    }, 50);

    volume.addEventListener('change', () => {
        track_selector.update_volume(volume.value);
    })

    document.getElementById('phantom_audio').addEventListener('ended', () => {
        track_selector.next_track();
    })

    document.getElementById('whatsapp_audio').addEventListener('ended', () => {
        track_selector.next_track();
    })

    document.getElementById('white_trash_audio').addEventListener('ended', () => {
        track_selector.next_track();
    })

}

function play_pause(play_mode) {
    if (play_mode) {
        play_btn.style.display = 'none';
        pause_btn.style.display = 'block';
    } else {
        play_btn.style.display = 'block';
        pause_btn.style.display = 'none';
    }
}
