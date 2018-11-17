'use strict';
$(document).ready(function() {

    // var app = {
    //     start: function() {
    //       this.output = $('#output');
    //       this.result = $('#result');
    //       var self    = this,
    //         initialColor = this.result.css('background');
    //       var colorPicker = $('#color-picker').spectrum({
    //         chooseText: 'ok',
    //         color:      initialColor,
    //         move:       function(col) { self.onMove(col.toHexString()); },
    //         change:     function(col) { self.onChange(col.toHexString()); },
    //         hide:       function(col) { self.onHide(col.toHexString()); }
    //       });
    //       this.broadcast(colorPicker.spectrum('get').toHexString());
    //     }
    //   };
    
    // $(function () {
    // app.start();
    // });

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
        ctx.lineWidth=document.getElementById("lineWidth").value;
        ctx.stroke();
    });

});