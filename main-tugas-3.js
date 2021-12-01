function main() {
	// Access the canvas through DOM: Document Object Model
	var canvas = document.getElementById('myCanvas');   // The paper
	var gl = canvas.getContext('webgl');                // The brush and the paints

	/**
	 * vertices_ and indices_ is in data-tugas-3.js
	 */

	

	// copying the first obj
	var vertices_left = new Float32Array(vertices_);

	// rotating phi/2 of the y axis , +x -> +z ; -x -> -z ; -z -> x+ ; +z -> x-
	const X_INDEX = 0;
	const Z_INDEX = 2;
	const X_INDEX_SURFACE = 6;
	const Z_INDEX_SURFACE = 8;
	for (var it = 0; it < vertices_left.length; it += 9) {
		var x_it = vertices_left[it + X_INDEX];
		var z_it = vertices_left[it + Z_INDEX];
		var x_surface = vertices_left[it + X_INDEX_SURFACE];
		var z_surface = vertices_left[it + Z_INDEX_SURFACE];
		
		vertices_left[ it + X_INDEX ] = -z_it;
		vertices_left[ it + Z_INDEX ] = x_it;

		vertices_left[ it + X_INDEX_SURFACE ] = -z_surface;
		vertices_left[ it + Z_INDEX_SURFACE ] = x_surface;
	}

	// translating 
	for (var it = 0; it < vertices_.length; it += 9) {
		vertices_[it] = vertices_[it] + 1.5; // move to right
	}

	// translating 
	for (var it = 0; it < vertices_left.length; it += 9) {
		vertices_left[it] = vertices_left[it] - 1.0; // move to left
	}

	var indices_left = new Uint16Array(indices_);
	for (var it = 0; it < indices_left.length; it++) {
		indices_left[it] = indices_left[it] + ( 24 * 7 ); //start the index on the end of the last index of the right obj
	}

	vertices_.push(...vertices_left);
	indices_.push(...indices_left);

	// create new box of light
	var box_center = [0.0, 0.0, 0.0];
	var box = [
		// cube A
		-0.1,  0.1, 0.1, ...white, ...zn, //0
		0.1,  0.1, 0.1, ...white, ...zn, //1
		0.1, -0.1, 0.1, ...white, ...zn, //2
		-0.1, -0.1, 0.1, ...white, ...zn, //3

		-0.1,  0.1, -0.1, ...white, ...zp, //4
		0.1,  0.1, -0.1, ...white, ...zp, //5
		0.1, -0.1, -0.1, ...white, ...zp, //6
		-0.1, -0.1, -0.1, ...white, ...zp, //7
  
		0.1,  0.1, 0.1, ...white, ...xn, //8
		0.1, -0.1, 0.1, ...white, ...xn, //9
		0.1, -0.1, -0.1, ...white, ...xn, //11
		0.1,  0.1, -0.1, ...white, ...xn, //10
		
		-0.1,  0.1, 0.1, ...white, ...xp, //12
		-0.1,  0.1, -0.1, ...white, ...xp, //13
		-0.1, -0.1, -0.1, ...white, ...xp, //14
		-0.1, -0.1, 0.1, ...white, ...xp, //15
		
		-0.1,  0.1, 0.1, ...white, ...yn, //16
		0.1,  0.1, 0.1, ...white, ...yn, //17
		0.1,  0.1, -0.1, ...white, ...yn, //18
		-0.1,  0.1, -0.1, ...white, ...yn, //19
		
		-0.1, -0.1, 0.1, ...white, ...yp, //20
		0.1, -0.1, 0.1, ...white, ...yp, //21
		0.1, -0.1, -0.1, ...white, ...yp, //22
		-0.1, -0.1, -0.1, ...white, ...yp, //23
	];
	
	for (var it = 0; it < box.length; it += 9) {
		box[it + 0] += box_center[0];
		box[it + 1] += box_center[1];
		box[it + 2] += box_center[2];
	}
	

	var cube_box = 24 * 14;
	var box_index = [
		// cube b1
		0 + cube_box, 1 + cube_box, 2 + cube_box,     0 + cube_box, 2 + cube_box, 3 + cube_box,     // Face A
		4 + cube_box, 5 + cube_box, 6 + cube_box,     4 + cube_box, 6 + cube_box, 7 + cube_box,     // Face B
		8 + cube_box, 9 + cube_box, 10 + cube_box,    8 + cube_box, 10 + cube_box, 11 + cube_box,   // Face C
		12 + cube_box, 13 + cube_box, 14 + cube_box,  12 + cube_box, 14 + cube_box, 15 + cube_box,  // Face D
		16 + cube_box, 17 + cube_box, 18 + cube_box,  16 + cube_box, 18 + cube_box, 19 + cube_box,  // Face E
		20 + cube_box, 21 + cube_box, 22 + cube_box,  20 + cube_box, 22 + cube_box, 23 + cube_box,  // Face F 
	];

	vertices_.push(...box);
	indices_.push(...box_index);

	// Create a linked-list for storing the vertices data
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_), gl.STATIC_DRAW);

	// Create a linked-list for storing the indices data
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_), gl.STATIC_DRAW);

	var vertexShaderSource = `
			attribute vec3 aPosition;
			attribute vec3 aColor;
			attribute vec3 aNormal;
			varying vec3 vPosition;
			varying vec3 vColor;
			varying vec3 vNormal;
			uniform mat4 uModel;
			uniform mat4 uView;
			uniform mat4 uProjection;
			void main() {
					vec4 originalPosition = vec4(aPosition, 1.);
					gl_Position = uProjection * uView * uModel * originalPosition;
					vPosition = (uModel * originalPosition).xyz;
					vColor = aColor;
					vNormal = aNormal;
			}
	`;

	var fragmentShaderSource = `
			precision mediump float;
			varying vec3 vPosition;
			varying vec3 vColor;
			varying vec3 vNormal;
			uniform vec3 uAmbientConstant;   // Represents the light color
			uniform float uAmbientIntensity;
			uniform vec3 uDiffuseConstant;  // Represents the light color
			uniform vec3 uLightPosition;
			uniform mat3 uNormalModel;
			uniform vec3 uSpecularConstant; // Represents the light color
			uniform vec3 uViewerPosition;
			void main() {
					
					// Calculate the ambient component
					vec3 ambient = uAmbientConstant * uAmbientIntensity;
					
					// Prepare the diffuse components
					vec3 normalizedNormal = normalize(uNormalModel * vNormal);
					vec3 vLight = uLightPosition - vPosition;
					vec3 normalizedLight = normalize(vLight);
					vec3 diffuse = vec3(0., 0., 0.);
					float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

					// Prepare the specular components
					vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
					// or using the following expression
					// vec3 vReflector = reflect(-vLight, vNormal);
					vec3 vViewer = uViewerPosition - vPosition;
					vec3 normalizedViewer = normalize(vViewer);
					vec3 normalizedReflector = normalize(vReflector);
					float shininessConstant = 100.0;
					vec3 specular = vec3(0., 0., 0.);
					float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
					
					// Calculate the phong reflection effect
					if (cosTheta > 0.) {
							diffuse = uDiffuseConstant * cosTheta;
					}
					if (cosPhi > 0.) {
							specular = uSpecularConstant * pow(cosPhi, shininessConstant);
					}
					vec3 phong = ambient + diffuse + specular;

					// Apply the shading
					gl_FragColor = vec4(phong * vColor, 1.);
					gl_FragColor.w = 0.5; //transparency
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
			3, 
			gl.FLOAT, 
			false, 
			9 * Float32Array.BYTES_PER_ELEMENT, 
			0
	);
	gl.enableVertexAttribArray(aPosition);
	var aColor = gl.getAttribLocation(shaderProgram, "aColor");
	gl.vertexAttribPointer(
			aColor,
			3,
			gl.FLOAT,
			false, 
			9 * Float32Array.BYTES_PER_ELEMENT,
			3 * Float32Array.BYTES_PER_ELEMENT
	);
	gl.enableVertexAttribArray(aColor);
	var aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
	gl.vertexAttribPointer(
			aNormal,
			3,
			gl.FLOAT,
			false, 
			9 * Float32Array.BYTES_PER_ELEMENT,
			6 * Float32Array.BYTES_PER_ELEMENT
	);
	gl.enableVertexAttribArray(aNormal);

	// Lighting and Shading
	// AMBIENT
	var uAmbientConstant = gl.getUniformLocation(shaderProgram, "uAmbientConstant");
	var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
	// gl.uniform3fv(uAmbientConstant, [1.0, 0.5, 0.0]);    // orange light
	gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);       // white light
	gl.uniform1f(uAmbientIntensity, 0.253); // 20% of light
	// DIFFUSE
	var uDiffuseConstant = gl.getUniformLocation(shaderProgram, "uDiffuseConstant");
	var uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
	var uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
	gl.uniform3fv(uDiffuseConstant, [1.0, 1.0, 1.0]);   // white light
	gl.uniform3fv(uLightPosition, box_center);    // light position

	// Perspective projection
	var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
	var perspectiveMatrix = glMatrix.mat4.create();
	glMatrix.mat4.perspective(perspectiveMatrix, Math.PI/3, 1.0, 0.5, 10.0);
	gl.uniformMatrix4fv(uProjection, false, perspectiveMatrix);

	var freeze = false;
	// Interactive graphics with mouse
	function onMouseClick(event) {
			freeze = !freeze;
	}
	document.addEventListener("click", onMouseClick);
	// Interactive graphics with keyboard
	var cameraX = 0.0;
	var cameraY = 2.0;
	var cameraZ = 5.0;
	var uView = gl.getUniformLocation(shaderProgram, "uView");
	var viewMatrix = glMatrix.mat4.create();
	glMatrix.mat4.lookAt(
			viewMatrix,
			[cameraX, cameraY, cameraZ],    // the location of the eye or the camera
			[cameraX, 0.0, -10],        // the point where the camera look at
			[0.0, 1.0, 0.0]
	);
	gl.uniformMatrix4fv(uView, false, viewMatrix);

	
  function changeBoxPos(xyz, mov) {
		var index_start = 9 * 24 * 14;
		for (var it = 0; it < box.length; it += 9) {
			vertices_[index_start + it + xyz] += mov;
		}
	}

	function lightController(event) {
		//w
		var index_start = 9 * 24 * 14;
		if (event.keyCode == 87) {
			box_center[1]+=0.1;
			changeBoxPos(1, 0.1);
		} 
		//a
		if (event.keyCode == 65) {
			box_center[0]-=0.1;
			changeBoxPos(0, -0.1);
		}
		//s
		if (event.keyCode == 83){
			box_center[1]-=0.1;
			changeBoxPos(1, -0.1);
		}
		//d
		if (event.keyCode == 68) {
			box_center[0]+=0.1;
			changeBoxPos(0, 0.1);
		} 
		//e
		if (event.keyCode == 69) {
			box_center[2]-=0.1;
			changeBoxPos(2, -0.1);
		}
		//q
		if (event.keyCode == 81) {
			box_center[2]+=0.1;
			changeBoxPos(2, 0.1);
		}
		gl.uniform3fv(uLightPosition, new Float32Array(box_center));
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_), gl.STATIC_DRAW);
	}

	function onKeydown(event) {
			if (event.keyCode == 32) freeze = true;
			if (event.keyCode == 37) cameraX -= 0.1; // Left
			if (event.keyCode == 38) cameraZ -= 0.1; // Up
			if (event.keyCode == 39) cameraX += 0.1; // Right
			if (event.keyCode == 40) cameraZ += 0.1; // Down
			if (event.keyCode == 33) cameraY += 0.1; // Right
			if (event.keyCode == 34) cameraY -= 0.1; // Down
			lightController(event);
			glMatrix.mat4.lookAt(
					viewMatrix,
					[cameraX, cameraY, cameraZ],    // the location of the eye or the camera
					[cameraX, 0.0, -10],        // the point where the camera look at
					[0.0, 1.0, 0.0]
			);
			gl.uniformMatrix4fv(uView, false, viewMatrix);
	}
	function onKeyup(event) {
			if (event.keyCode == 32) freeze = false;
	}
	

	document.addEventListener("keydown", onKeydown);
	document.addEventListener("keyup", onKeyup);
	
	// SPECULAR
	var uSpecularConstant = gl.getUniformLocation(shaderProgram, "uSpecularConstant");
	var uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");
	gl.uniform3fv(uSpecularConstant, [1.0, 1.0, 1.0]);  // white light
	gl.uniform3fv(uViewerPosition, [cameraX, cameraY, cameraZ]);

	var speedRaw = 1;
	var speedX = speedRaw / 600;
	var speedY = 2 * speedRaw / 600;
	var changeX = 0;
	var changeY = 0;
	var uModel = gl.getUniformLocation(shaderProgram, "uModel");
	function render() {
			if (!freeze) {  // If it is not freezing, then animate the rectangle
					if (changeX >= 0.5 || changeX <= -0.5) speedX = -speedX;
					// if (changeY >= 0.5 || changeY <= -0.5) speedY = -speedY;
					changeX = changeX + speedX;
					changeY = changeY + speedY;
					var modelMatrix = glMatrix.mat4.create();
					// glMatrix.mat4.scale(modelMatrix, modelMatrix, [changeY, changeY, changeY]);
					// glMatrix.mat4.rotate(modelMatrix, modelMatrix, changeX, [0.0, 0.0, 1.0]);   // Rotation about Z axis
					// glMatrix.mat4.rotate(modelMatrix, modelMatrix, changeY * 2.0, [0.0, 1.0, 0.0]);   // Rotation about Y axis
					// glMatrix.mat4.rotate(modelMatrix, modelMatrix, changeY * 10.0, [1.0, .0, .0]);   // Rotation about X axis
					// glMatrix.mat4.translate(modelMatrix, modelMatrix, [changeX, changeY, 0.0]);
					gl.uniformMatrix4fv(uModel, false, modelMatrix);
					var normalModelMatrix = glMatrix.mat3.create();
					glMatrix.mat3.normalFromMat4(normalModelMatrix, modelMatrix);
					gl.uniformMatrix3fv(uNormalModel, false, normalModelMatrix);
			}
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.enable(gl.DEPTH_TEST);
			//transparency func
			gl.depthFunc(gl.LEQUAL)
			gl.depthMask(false);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

			var primitive = gl.TRIANGLES;
			var offset = 0;
			var nVertex = indices_.length;
			// gl.drawArrays(primitive, offset, nVertex);
			gl.drawElements(primitive, nVertex, gl.UNSIGNED_SHORT, offset);
			requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
