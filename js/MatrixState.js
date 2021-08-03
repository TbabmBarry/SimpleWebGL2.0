function MatrixState() {
	this.mProjMatrix = new Array(16); // Projection matrix
	this.mVMatrix = new Array(16); // Vlog matrix
	this.currMatrix = new Array(16); // transform matrix
	this.mStack = new Array(100); // matrix stack

	// Initialize matrix function
	this.setInitStack = function() {
		this.currMatrix = new Array(16);
		setIdentityM(this.currMatrix, 0);
	}

	// Push current matrix into stack
	this.pushMatrix = function() {
		this.mStack.push(this.currMatrix.slice(0));
	}

	// Pop current matrix
	this.popMatrix = function() {
		this.currMatrix = this.mStack.pop();
	}

	// Perform translation on matrix
	this.translate = function(x, y, z)
	{
		translateM(this.currMatrix, 0, x, y, z);
	}

	this.rotate = function(angle, x, y, z)
	{
		rotateM(this.currMatrix, 0, angle, x, y, z);
	}

	// Perform scaling transformation
	this.scale = function(x, y, z)
	{
		scaleM(this.currMatrix, 0, x, y, z)
	}

	// Setup vlog
	this.setCamera = function(
		cx, 
		cy, 
		cz, 
		tx, 
		ty, 
		tz, 
		upx, 
		upy, 
		upz 
	) {
		setLookAtM
			(
				this.mVMatrix, 0,
				cx, cy, cz,
				tx, ty, tz,
				upx, upy, upz
			);
	}

	this.setProjectFrustum = function(
		left, 
		right, 
		bottom, 
		top, 
		near, 
		far 
	) {
		frustumM(this.mProjMatrix, 0, left, right, bottom, top, near, far);
	}

	
	this.setProjectOrtho = function(
		left, 
		right, 
		bottom, 
		top, 
		near, 
		far 
	) {
		orthoM(this.mProjMatrix, 0, left, right, bottom, top, near, far);
	}

	
	this.getFinalMatrix = function() {
		var mMVPMatrix = new Array(16);
		multiplyMM(mMVPMatrix, 0, this.mVMatrix, 0, this.currMatrix, 0);
		multiplyMM(mMVPMatrix, 0, this.mProjMatrix, 0, mMVPMatrix, 0);
		return mMVPMatrix;
	}

	
	this.getMMatrix = function() {
		return this.currMatrix;
	}
}
