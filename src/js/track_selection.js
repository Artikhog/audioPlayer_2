class Track_Selector{
    constructor() {
        this.audio_array = [];
        this.init();
        this.current_track = this.audio_array[0];
        this.track_count = 0;
        this.visualization = new Visualization();

    }
    init() {
        this.audio_array.push(document.getElementById('phantom_audio'));
        this.audio_array.push(document.getElementById('whatsapp_audio'));
        this.audio_array.push(document.getElementById('white_trash_audio'));
    }
    update() {
        this.audio_array.forEach(element => {
            element.currentTime = 0;
        })
    }
    play_current() {
        this.current_track.play();
        this.visualization.start_animation(this.current_track, this.track_count % 3);
    }
    pause_current() {
        this.current_track.pause();
    }
    next_track() {
        this.update();
        this.current_track.pause();
        this.track_count++;
        this.current_track = this.audio_array[this.track_count % 3];
        this.current_track.play();
        this.visualization.start_animation(this.current_track, this.track_count % 3);
    }
    previous_track() {
        this.update();
        this.current_track.pause();
        this.track_count+=this.audio_array.length-1;
        this.current_track = this.audio_array[this.track_count % 3];
        this.current_track.play();
        this.visualization.start_animation(this.current_track, this.track_count % 3);
    }
    select_track(count) {
        this.update();
        this.current_track.pause();
        this.track_count = count;
        this.current_track = this.audio_array[this.track_count % 3];
        this.current_track.play();
        this.visualization.start_animation(this.current_track, this.track_count % 3);
    }
    update_time(value) {
        this.current_track.currentTime = this.current_track.duration * value / 100
    }
    update_volume(value) {
        this.audio_array.forEach(audio => {
            audio.volume = value / 100
        })
    }
}

