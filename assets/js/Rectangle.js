function Rectangle(context, args) {
	GeoShape.call(this, context, args); 
	this.homogenePercent();
	this.calcCoord();
}
Rectangle.prototype = Object.create(GeoShape.prototype); 
Rectangle.prototype.calcShapeCoord = function(){
	this.coord.shape = [ [0,0], [0, this.height], [this.width, this.height], [this.width, 0] ];
};
Rectangle.prototype.draw = function(){
	if(this.ctx){
		this.ctx.beginPath();
		this.ctx.moveTo(this.coord.canvas[0][0], this.coord.canvas[0][1]);
		this.ctx.lineTo(this.coord.canvas[1][0], this.coord.canvas[1][1]);
		this.ctx.lineTo(this.coord.canvas[2][0], this.coord.canvas[2][1]);
		this.ctx.lineTo(this.coord.canvas[3][0], this.coord.canvas[3][1]);
		if(this.fill){
			this.setFillStyle();
			this.ctx.fill();
			return; 
		}
		this.ctx.closePath();
		this.setStrokeStyle();
		this.ctx.stroke();
		this.ctx.stroke();
		return;
	} 
	console.warn("There is no context for this trianlge");
};
