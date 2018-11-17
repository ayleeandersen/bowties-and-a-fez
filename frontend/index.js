'use strict';
(function() {

    let ws = new WebSocket("ws://127.0.0.1:5005")
    ws.onopen = function() {
        ws.send('120');
    }

    ws.onmessage = function(e) {
        console.log(e);
    }

    ws.onerror = function(e) {
        console.error(e);
    }

    const CANVAS_WIDTH = 1000;
    const CANVAS_HEIGHT = 800;

    var mouseDown = false;
    var points = [];

    let canvas = document.getElementById("mainCanvas");
    let ctx = canvas.getContext("2d");

    document.addEventListener('mousedown', function(e) {
        points = [];
        mouseDown = true;
        ctx.beginPath();
    });
    document.addEventListener('mouseup', function(e) {
        mouseDown = false;
        if (points.length === 0) {
            return;
        }
        console.log(points);
    });
    canvas.addEventListener('mousemove', function(e) {
        if (!mouseDown) {
            return;
        }

        let point = {x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop};
        points.push(point);
        if (points.length === 1) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    });

})();