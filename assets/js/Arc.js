function Arc(context, args) {
	GeoShape.call(this, context, args); 
	this.origin = [0,0];
	this.homogenePercent();

	this.maths = {}; 
	this.cubicR = {};

	this.maths.lengthPow = Math.pow(this.height, 2);
	this.maths.lengthSide = Math.sqrt(this.maths.lengthPow - this.maths.lengthPow/2); 

	//Si les rayons d'action des points du polygone de controle sont définis, on les met sino on les génère aléatoirement
	this.cubicR.rp1 = (args.params && args.params.cubicR) ? args.params.cubicR.rp1 : randBetween(TreeManager.params.branch.cubicR.min, TreeManager.params.branch.cubicR.max)/100*this.maths.lengthSide;
	this.cubicR.rp2 = (args.params && args.params.cubicR) ? args.params.cubicR.rp2 : randBetween(TreeManager.params.branch.cubicR.min, TreeManager.params.branch.cubicR.max)/100*this.maths.lengthSide;

	this.calcCoord();
}

Arc.prototype = Object.create(GeoShape.prototype); 
Arc.prototype.calcShapeCoord = function(){
	var limxp1 = this.height/2*(this.cubicR.rp1/this.maths.lengthSide);  // Limite de x1
	var limxp2 = this.height/2*(this.cubicR.rp2/this.maths.lengthSide);  // Limite de x2

	//Premier point de controle
	var xp1 = randBetween(-1*limxp1, limxp1);  //X aléatoire dans l'intervale des limite définis précédemment
	var yp1 = (xp1 ===0) ? this.cubicR.rp1 : Math.sqrt(Math.pow(this.cubicR.rp1, 2) - Math.pow(Math.abs(xp1), 2)); 
	
	//Idem second point de controle
	var xp2 = randBetween(-1*limxp2, limxp2); 
	var yp2 = (xp2 ===0) ? this.cubicR.rp2 : this.height - Math.sqrt(Math.pow(this.cubicR.rp2, 2) - Math.pow(Math.abs(xp2), 2)); 

	this.coord.shape = [ [0,0],  [xp1, yp1], [xp2, yp2], [0, this.height] ];
};

Arc.prototype.draw = function(){
	if(this.ctx){
		this.ctx.beginPath();
		this.ctx.moveTo(this.coord.canvas[0][0], this.coord.canvas[0][1]);
		this.ctx.lineWidth = this.width; 
		this.ctx.bezierCurveTo(this.coord.canvas[1][0],this.coord.canvas[1][1],this.coord.canvas[2][0],this.coord.canvas[2][1], this.coord.canvas[3][0],this.coord.canvas[3][1] );
		this.setStrokeStyle();
		this.ctx.stroke();
		return;
	} 
	console.warn("There is no context for this trianlge");
};
