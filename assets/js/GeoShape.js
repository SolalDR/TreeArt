

GeoShape = function(context, args){
	if( !context ){
		console.warn("Context cannot be null");
		return;
	} 
	this.ctx = context;
	args = (args) ? args : {};
	this.width = (args.width) ? args.width : "50%"; 
	this.height = (args.height) ? args.height : "50%"; 
	this.fill = (args.fill === false ) ? false : true; 
	this.position = (args.position && Array.isArray(args.position)) ? args.position : ["50%", "50%"]; 
	this.origin = (args.origin && Array.isArray(args.origin)) ? args.origin : ["50%", "50%"]; 
	this.rotate = (args.rotate && !isNaN(args.rotate)) ? args.rotate : 0;
	this.fillColor = (args.fillColor) ? args.fillColor : "#000";
	this.strokeColor = (args.strokeColor) ? args.strokeColor : "#000";
	this.coord = {
		shape: [], // Coords inside the shape 
		orthonormal: [], // Coords in an orthonormal context 
		canvas: [], // Coords of the shape in the convas context (y inversed)
		origin: [] // Coords calculated from the origin
	};

	this.ctxW = this.ctx.canvas.clientWidth;
	this.ctxH = this.ctx.canvas.clientHeight;
}

GeoShape.prototype = {
	homogenePercent:function(value, context, percent){
		regPercent = /\d+?\.?\d*?%/; 
		
		this.width = percentToPx(this.width, this.ctxW);
		this.height = percentToPx(this.height, this.ctxH);

		this.origin[0] = percentToPx(this.origin[0], this.width);
		this.origin[1] = percentToPx(this.origin[1], this.height);

		this.position[0] = percentToPx(this.position[0], this.ctxW);
		this.position[1] = percentToPx(this.position[1], this.ctxH);
	},

	//Calc coord in context to transform orthonormal; 
	calcCtxCoord: function(){
		for(i=0; i< this.coord.orthonormal.length; i++){
			this.coord.canvas[i] = [this.coord.orthonormal[i][0], this.ctxH - this.coord.orthonormal[i][1]]; 
		}
	},

	//Calc coord with rotation
	calcOriginCoord: function(){
		var coordOrigin = [];
		for(i=0; i<this.coord.shape.length; i++){
			coordOrigin[i] = [this.coord.shape[i][0] - this.origin[0], this.coord.shape[i][1] - this.origin[1]];
		}
		var rotates = [];
		for(i=0; i<coordOrigin.length; i++) {
			let x = coordOrigin[i][0]*Math.cos(Math.radians(this.rotate)) + coordOrigin[i][1]*Math.sin(Math.radians(this.rotate));
			let y = -1*coordOrigin[i][0]*Math.sin(Math.radians(this.rotate)) + coordOrigin[i][1]*Math.cos(Math.radians(this.rotate));
			this.coord.origin[i] = [Math.floor(x), Math.floor(y)];
		}
	},

	calcOrthonormalCoord: function(){
		if( this.coord.shape ){
			for(i=0; i<this.coord.shape.length; i++){
				this.coord.orthonormal[i] = [this.coord.origin[i][0]+this.position[0], this.coord.origin[i][1]+this.position[1]]; 
			}
		}
	},

	setStrokeStyle: function(){
		if(Array.isArray(this.strokeColor)) {
			var lineargradient = this.ctx.createLinearGradient(this.coord.canvas[0][0], this.coord.canvas[0][1], this.coord.canvas[1][0], this.coord.canvas[1][1]);
			for(i=0; i<this.strokeColor.length; i++) {
				lineargradient.addColorStop(i, this.strokeColor[i]);
			}
			this.ctx.strokeStyle = lineargradient;
		} else {
			this.ctx.strokeStyle = this.strokeColor; 
		}
		this.ctx.strokeStyle = this.strokeColor;
	},

	setFillStyle: function(){
		if(Array.isArray(this.fillColor)) {
			var lineargradient = this.ctx.createLinearGradient(this.coord.canvas[0][0], this.coord.canvas[0][1], this.coord.canvas[1][0], this.coord.canvas[1][1]);
			for(i=0; i<this.fillColor.length; i++) {
				lineargradient.addColorStop(i, this.fillColor[i]);
			}
			this.ctx.fillStyle = lineargradient;
		} else {
			this.ctx.fillStyle = this.fillColor; 
		}
	},

	// Calc orthonormal coord + Canvas coord
	calcCoord: function(){
		this.calcShapeCoord();
		this.calcOriginCoord();
		this.calcOrthonormalCoord();
		this.calcCtxCoord();
	}, 

}