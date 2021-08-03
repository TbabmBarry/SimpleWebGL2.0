function Triangle(
	gl,
	programIn 
) {
	//this.vertexData=vertexDataIn;
	this.vertexData = [
		3.0, 0.0, 0.0,
		0.0, 0.0, 0.0,
		0.0, 3.0, 0.0
	];
	this.vcount = this.vertexData.length / 3; 
	this.vertexBuffer = gl.createBuffer(); 
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW);

	this.colorsData = [
		1.0, 1.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 1.0, 0.0, 1.0
	];
	this.colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsData), gl.STATIC_DRAW);

	this.program = programIn;

	this.drawSelf = function(ms) 
	{
		gl.useProgram(this.program); 
		
		var uMVPMatrixHandle = gl.getUniformLocation(this.program, "uMVPMatrix");
		
		gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aPosition"), 3, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aColor"));
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aColor"), 4, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
	}
}
