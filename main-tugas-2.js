function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    // Define vertices data for three points
    /**
     * A (-0.5, -0.5), Red   (1.0, 0.0, 0.0)
     * B ( 0.5, -0.5), Green (0.0, 1.0, 0.0)
     * C (-0.5,  0.5), Blue  (0.0, 0.0, 1.0)
     * D ( 0.5,  0.5), White (1.0, 1.0, 1.0)
     */
     /*
    var vertices = [
        0.5, -0.5, 0.0, 1.0, 0.0,    // Point B
        -0.5,  0.5, 0.0, 0.0, 1.0,     // Point C
        -0.5, -0.5, 1.0, 0.0, 0.0,    // Point A
        0.5, -0.5, 0.0, 1.0, 0.0,    // Point B
        -0.5,  0.5, 0.0, 0.0, 1.0,    // Point C
        0.5,  0.5, 1.0, 1.0, 1.0,    // Point D
    ];*/

    const my_obj_l = {
    head_color : [0.68, 0.93, 0.48],
    head_a : [-0.13, -0.05],
    head_b : [-0.13, 0.05],
    head_c : [-0.82, -0.05],
    head_d : [-0.82, 0.05],

    leg_color : [0.48, 0.68, 0.93],
    // left leg
    leg_la : [-0.72, -0.30],
    leg_lb : [-0.72, -0.05],
    leg_lc : [-0.63, -0.30],
    leg_ld : [-0.63, -0.05],

    // right leg
    leg_ra : [-0.32, -0.30],
    leg_rb : [-0.32, -0.05],
    leg_rc : [-0.23, -0.30],
    leg_rd : [-0.23, -0.05],
  };

  const my_obj_r = {
    head_color : [0.68, 0.93, 0.48],
    head_a : [0.13, -0.05],
    head_b : [0.13, 0.05],
    head_c : [0.82, -0.05],
    head_d : [0.82, 0.05],

    leg_color : [0.48, 0.68, 0.93],
    // left
    leg_la : [0.23, -0.30],
    leg_lb : [0.42, -0.30],
    leg_lc : [0.23, -0.05],
    leg_ld : [0.42, -0.05],

    // mid
    leg_ma : [0.42, -0.13],
    leg_mb : [0.53, -0.13],
    leg_mc : [0.42, -0.05],
    leg_md : [0.53, -0.05],

    // right
    leg_ra : [0.53, -0.30],
    leg_rb : [0.72, -0.30],
    leg_rc : [0.53, -0.05],
    leg_rd : [0.72, -0.05],
  };

  const vertices = [
    // left chair
    ...my_obj_l.head_a, ...my_obj_l.head_color,
    ...my_obj_l.head_b, ...my_obj_l.head_color,
    ...my_obj_l.head_c, ...my_obj_l.head_color,
    ...my_obj_l.head_c, ...my_obj_l.head_color,
    ...my_obj_l.head_b, ...my_obj_l.head_color,
    ...my_obj_l.head_d, ...my_obj_l.head_color, // 30

    ...my_obj_l.leg_la, ...my_obj_l.leg_color,
    ...my_obj_l.leg_lb, ...my_obj_l.leg_color,
    ...my_obj_l.leg_lc, ...my_obj_l.leg_color,
    ...my_obj_l.leg_lc, ...my_obj_l.leg_color,
    ...my_obj_l.leg_lb, ...my_obj_l.leg_color,
    ...my_obj_l.leg_ld, ...my_obj_l.leg_color, // 60

    ...my_obj_l.leg_ra, ...my_obj_l.leg_color,
    ...my_obj_l.leg_rb, ...my_obj_l.leg_color,
    ...my_obj_l.leg_rc, ...my_obj_l.leg_color,
    ...my_obj_l.leg_rc, ...my_obj_l.leg_color,
    ...my_obj_l.leg_rb, ...my_obj_l.leg_color,
    ...my_obj_l.leg_rd, ...my_obj_l.leg_color, // 90


    // right chair
    ...my_obj_r.head_a, ...my_obj_r.head_color,
    ...my_obj_r.head_b, ...my_obj_r.head_color,
    ...my_obj_r.head_c, ...my_obj_r.head_color,
    ...my_obj_r.head_c, ...my_obj_r.head_color,
    ...my_obj_r.head_b, ...my_obj_r.head_color,
    ...my_obj_r.head_d, ...my_obj_r.head_color, // 120

    ...my_obj_r.leg_la, ...my_obj_r.leg_color,
    ...my_obj_r.leg_lb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_lc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_lc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_lb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_ld, ...my_obj_r.leg_color, // 150

    ...my_obj_r.leg_ma, ...my_obj_r.leg_color,
    ...my_obj_r.leg_mb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_mc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_mc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_mb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_md, ...my_obj_r.leg_color, // 180

    ...my_obj_r.leg_ra, ...my_obj_r.leg_color,
    ...my_obj_r.leg_rb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_rc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_rc, ...my_obj_r.leg_color,
    ...my_obj_r.leg_rb, ...my_obj_r.leg_color,
    ...my_obj_r.leg_rd, ...my_obj_r.leg_color,
  ];

    // Create a linked-list for storing the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    /**
    aPosition = (x: float, y: float)
    aPosition = aPosition + uChange => (x: float, y: float) + uChange => x + uChange, y + uChange


    vec4(aPosition.x + uChange, aPosition.y + uChange, 1.0, 1.0);
    vec4(aPosition + uChange, 1.0, 1.0);
    */

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }
    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    var speedRaw = 1;
    var speed = 0.0053;
    var change = 0;
    var counter = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices () {
        
        if (vertices[181] < -1.0 || vertices[96] > 1.0) {
            speed = speed * -1;
        }
        
        for (let i = 91; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }


    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // if (change >= 0.5 || change <= -0.5) speed = -speed;
        change = change + speed;
        gl.uniform1f(uChange, change);
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 42;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}