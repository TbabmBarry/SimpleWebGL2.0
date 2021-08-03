// Initialize WebGL
function initWebGLCanvas(canvasName) {
	canvas = document.getElementById(canvasName); // Obtain Canvas Object
	// antialias：Boolean, indicating if anti aliasing。
	var context = canvas.getContext('webgl2', {
		antialias: true
	});
	return context;
}

// Load the single shader
function loadSingleShader(ctx, shaderScript) {
	if(shaderScript.type == "vertex") { // vertex case
		var shaderType = ctx.VERTEX_SHADER; // type of vertex shader
	} else if(shaderScript.type == "fragment") { // fragment case
		var shaderType = ctx.FRAGMENT_SHADER; // type of fragment shader
	} else { // error case
		console.log("*** Error: shader script of undefined type '" + shaderScript.type + "'");
		return null;
	}
	// Create shader prog
	var shader = ctx.createShader(shaderType);
	// Load shader script
	ctx.shaderSource(shader, shaderScript.text);
	// Compile shader prog
	ctx.compileShader(shader);
	// Check shader status
	var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
	if(!compiled && !ctx.isContextLost()) {
		var error = ctx.getShaderInfoLog(shader); // Get error info
		console.log("*** Error compiling shader :" + error); // Out error info
		ctx.deleteShader(shader); // Delete shader prog
		return null;
	}
	return shader; // Return shader prog
}

function loadShaderSerial(gl, vshader, fshader) {
	
	var vertexShader = loadSingleShader(gl, vshader);
	var fragmentShader = loadSingleShader(gl, fshader);
	var program = gl.createProgram();
	
	gl.attachShader(program, vertexShader); 
	gl.attachShader(program, fragmentShader); 
	gl.linkProgram(program);
	
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(!linked && !gl.isContextLost()) {   
		
		var error = gl.getProgramInfoLog(program); 
		console.log("Error in program linking:" + error); 
		gl.deleteProgram(program); 
		gl.deleteProgram(fragmentShader); 
		gl.deleteProgram(vertexShader); 
		return null;
	}
	gl.useProgram(program);
	gl.enable(gl.DEPTH_TEST);
	return program;
}
