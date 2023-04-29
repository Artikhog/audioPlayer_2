class Visualization {
    constructor() {
        this.canvas = document.getElementById('visualisation');
        this.ctx = this.canvas.getContext('2d');
        this.name_array = [];
        this.init();
        this.radius = 287
        this.bars = 500
        this.rads = 0
        this.centerX = 756
        this.centerY = 387;
        this.frequencyArray = []
        this.analyser = '';
        this.mode = 0;
        this.name_space = document.getElementById('track_name');
    }
    init() {
        this.canvas.width = 2000;
        this.canvas.height = 2000;

        this.name_array.push('Markul - Phantom');
        this.name_array.push('BlackWay - Whats Up Danger');
        this.name_array.push('Bolevar Depo - White Trash');
    }
    start_animation(audio, mode) {
        this.mode = mode;
        this.name_space.innerHTML = this.name_array[mode];
        var audio_context = new AudioContext();
        this.analyser = audio_context.createAnalyser();
        var source = audio_context.createMediaElementSource(audio);
        source.connect(this.analyser);
        this.analyser.connect(audio_context.destination);
        var frequencyArray = new Uint8Array(this.analyser.frequencyBinCount);

        this.frequencyArray = frequencyArray

        setInterval(() => {
            this.visualization();
        }, 25);
    }
    visualization() {
        this.ctx.clearRect(0, 0, 2000, 2000);
        this.analyser.getByteFrequencyData(this.frequencyArray);
        let barHeight = 0;
        let x = 0;
        let y = 0;
        let xEnd = 0;
        let yEnd = 0;
        for (let i = 0; i < this.bars; i++) {
            this.radius = 290;
            this.rads = (Math.PI * 2) / this.bars;
            barHeight = this.frequencyArray[i] * 0.4;

            x = this.centerX + Math.cos(this.rads * i) * this.radius;
            y = this.centerY + Math.sin(this.rads * i) * this.radius;
            xEnd = this.centerX + Math.cos(this.rads * i) * (this.radius + barHeight);
            yEnd = this.centerY + Math.sin(this.rads * i) * (this.radius + barHeight);

            this.drawBar(x, y, xEnd, yEnd, 2, this.frequencyArray[i]);
        }
    }
    drawBar(x1, y1, x2, y2, width, frequency) {
        switch (this.mode) {
            case 0:
                var lineColor = "rgb(" + 255 + ", " + frequency + ", " + frequency + ")";
                this.name_space.style.color = "rgb(" + 205 + ", " + frequency * 1.1 + ", " + frequency * 1.1 + ")";
                this.name_space.style.left = "15%";
                break;
            case 1:
                var lineColor = "rgb(" + frequency + ", " + 255 + ", " + frequency + ")";
                this.name_space.style.color = "rgb(" + frequency + ", " + 255 + ", " + frequency + ")";
                this.name_space.style.left = "2%";
                break;
            case 2:
                var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
                this.name_space.style.color = "rgb(" + frequency * 0.5 + ", " + frequency * 0.5 + ", " + 205 + ")";
                this.name_space.style.left = "3%";
                break;
        }
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}
