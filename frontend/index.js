'use strict';

$(document).ready(function() {
    let ws = new WebSocket("ws://127.0.0.1:5000")
    ws.onopen = function() {
    }

    ws.onmessage = function(e) {
        console.log("onmessage e.data: " + e.data);
        let jsonData = JSON.parse(e.data);
        if (e.data[0] === "[") {
            jsonData.forEach(element => {
                ctx.strokeStyle = element['color'];
                ctx.lineWidth = element['strokeWidth'];
                ctx.beginPath();
                let pts = element['points'];
                ctx.moveTo(pts[0]['x', pts[0]['y']]);
                pts.forEach(point => {
                    ctx.lineTo(point['x'], element['y']);
                });
                ctx.stroke();
            });
        } else {
            ctx.strokeStyle = jsonData['color'];
            ctx.lineWidth = jsonData['strokeWidth'];
            ctx.beginPath();
            let pts = jsonData['points'];
            ctx.moveTo(pts[0]['x'], pts[0]['y']);
            pts.forEach(element => {
                ctx.lineTo(element['x'], element['y']);
            });
            ctx.stroke();
        }
    }

    ws.onerror = function(e) {
        console.error(e);
    }

    var color;
    var strokeWidth;
    var mouseDown = false;
    var points = [];

    let canvas = document.getElementById("mainCanvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(255,255,255,0)";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousedown', function(e) {
        let type = document.getElementById("type-selector");
        if (type.value === "stroke") {
            points = [];
            mouseDown = true;
            ctx.beginPath();
        } else if (type.value === "fill") {
            applyFloodFill(mouseX, mouseY, color);
        }
    });
    document.addEventListener('mouseup', function(e) {
        mouseDown = false;
        if (points.length === 0) {
            return;
        }
        let jsonstr = JSON.stringify({color, strokeWidth, points});
        console.log("Object as json: " + jsonstr);
        ws.send(jsonstr);
    });
    canvas.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!mouseDown) {
            return;
        }

        let point = {x: mouseX - canvas.offsetLeft, y: mouseY - canvas.offsetTop};
        points.push(point);
        if (points.length === 1) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
        ctx.lineWidth = document.getElementById("line-width").value;
        strokeWidth = ctx.lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    });

    function applyFloodFill(x, y, color) {
        let shouldApply = function(x, y) {
            if (x < 0 || x >= canvas.clientWidth || y < 0 || y >= canvas.clientHeight) {
                return false;
            }
            let data = ctx.getImageData(x, y, 1, 1).data;

            return data[3] == 0;
        }

        let hexToRgb = function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        let spot = ctx.createImageData(1, 1);
        let rgb = hexToRgb(color);
        spot.data[0] = rgb.r;
        spot.data[1] = rgb.g;
        spot.data[2] = rgb.b;
        spot.data[3] = 255;

        let queue = [{x:x, y:y}];
        while (queue.length !== 0) {
            let point = queue.shift();
            ctx.putImageData(spot, point.x, point.y);

            x = point.x;
            y = point.y;
            console.log(x + " " + y);

            if (shouldApply(x+1, y)) queue.push({x:x+1, y:y});
            if (shouldApply(x, y-1)) queue.push({x:x, y:y-1});
            if (shouldApply(x-1, y)) queue.push({x:x-1, y:y});
            if (shouldApply(x, y+1)) queue.push({x:x, y:y+1});
        }
    }

    function applyColorPicker() {
        var app = {
            start: function() {
              this.output = $('#output');
              this.result = $('#result');
              var self    = this,
                initialColor = this.result.css('background');
              var colorPicker = $('#color-picker').spectrum({
                chooseText: 'ok',
                color:      initialColor,
                move:       function(col) { self.onMove(col.toHexString()); },
                change:     function(col) { self.onChange(col.toHexString()); },
                hide:       function(col) { self.onHide(col.toHexString()); }
              });
              this.broadcast(colorPicker.spectrum('get').toHexString());
            },
            broadcast: function(c) {
              color = c;
            },
            onMove: function(color) {
              this.result.css('background', color);
            },

            onChange: function(color) {
              this.result.css('background', color);
              this.broadcast(color);
            },

            onHide: function(color) {
              this.result.css('background', color);
              this.broadcast(color);
            }
          };

          $(function () {
            app.start();
          });
    }

    applyColorPicker();

});
