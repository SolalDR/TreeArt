function Branch(args){

	// Logic attributes
	this.parent = args.parent; 						// Parent branch
	this.status = args.status;						// (int) Tron | Branch
	this.shape = args.shape; 						// Type of shape (triangle / arc / rectangle)
	this.branches = []; 							// (Branch) list of ramifications
	this.additionnalDatas = {}; 					// Objet vide passé en argument du constructeur de forme (utile pour les arcs)
	this.deep; 										// Deep of branch value

	//Geométric settings
	this.length; 									// Length of the branch
	this.weight; 									// Weight of the branch
	this.rotate; 									// Rotation of the branch relative to parent's branch
	this.ctxRotate;									// Rotation absolute in context
	this.side = args.side; 							// 0 pour left, 1 pour right;  
	this.colors; 
	
	// Canvas settings
	this.canvasEl;									// Canvas
	this.context = args.context;					// Context du canvas
	this.constructor = args.constructor;			// (Object) Rectangle | Triangle | Arc
	this.ctxW = this.context.canvas.clientWidth;	// Canvas width
	this.ctxH = this.context.canvas.clientHeight;	// Canvas Height

	this.init();
	if(this.weight > TreeManager.params.branch.minWeight) {
		this.create();
	}

}

Branch.prototype = {

	init: function(){
		if(this.status === TYPE_TRON) {
			this.initTron();
		} else {
			this.initRamification();
		}
		this.manageColors();
	},

	initTron: function(){
		var c = TreeManager.params.tron; 
		this.parent = null;
		this.weight = this.ctxW/100*randBetween(c.weight.min, c.weight.max); 
		this.length = this.ctxH/100*randBetween(c.length.min, c.length.max); 
		this.rotate = 0;
		this.calcContextRotate();
		this.coord = {
			base: [this.ctxW/2, 0],
			top: [this.ctxW/2, this.length]
		}

		//Si c'est un objet Arc, les rayon d'action des point du polygone de controle de bézier sont nul pour garantir un tronc droit
		this.additionnalDatas.cubicR = ( this.shape == SHAPE_ARC) ? { rp1: 0,  rp2: 0 } : null;
	},

	initRamification: function(){
		var c = TreeManager.params.branch; 
		var rotate = ( this.parent.status === TYPE_TRON ) ? randBetween(TreeManager.params.tron.rotate.min, TreeManager.params.tron.rotate.max): randBetween(c.rotate.min, c.rotate.max); 

		this.weight = this.parent.weight*randBetween(c.relativeWeight.min, c.relativeWeight.max)/100; 
		this.length = this.parent.length*randBetween(c.length.min, c.length.max)/100;
		this.rotate = (this.side === 0)? -1*rotate : rotate;
		this.calcContextRotate();
		
		this.coord = {
			base: this.parent.coord.top, 
			top:[]
		}

		var dir = (this.ctxRotate > 0) ? 1 : -1; 
		this.coord.top[0] = this.coord.base[0] + Math.sin(Math.radians(Math.abs(this.ctxRotate))) * this.length * dir;
		this.coord.top[1] = this.coord.base[1] + Math.cos(Math.radians(this.ctxRotate)) * this.length;

	},

	manageColors: function(){
		var c = TreeManager.params.general;
		var colors = [];
		this.colors= [];
		for(i=0; i<c.limitColor; i++) {
			if(!c.colors[i]) {
				break;
			}
			colors.push(c.colors[i]);
		}
		if( c.gradientRepeat === true){
			this.colors = colors; 
		} else if(colors.length>1) {
			var a = this.coord.base;  var b = [this.ctxW/2, 0]; //Point de départ et d'arrivé
			var d = Math.sqrt( Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1] , 2) ); // Distance entre les deux points
			var r = this.ctxH*.5;  // rayon d'action du dégradé
			var rat0 = ((d/r) > 1) ? 1 : d/r; 		// Ratio de progression du dégradé
			var rat1 = ((d+this.length)/r>1) ? 1 : (d+this.length)/r ; 		// Ratio de progression du dégradé


			var slice0 = numSlice(rat0, colors.length, r);
			var slice1 = numSlice(rat0, colors.length, r);

			var newColors = []; 
			// if( slice0 != slice1 ){
			// 	var diff = slice1 - slice0; 
			// 	for(i=0; i<diff; i++){

			// 	}
			// } else {
				this.colors.push(colorBetween(rat0, colors[slice0], colors[slice0+1]));
				this.colors.push(colorBetween(rat1, colors[slice1], colors[slice1+1]));
			// }
		} else {
			this.colors = colors[0];
		}
	},

	calcContextRotate: function(){
		var parent = this.parent; 
		var rotate = this.rotate; 
		var j = 0; 
		while(parent){
			rotate += parent.rotate; 
			parent = parent.parent; 
			j++; 
		}
		this.deep = j; 
		this.ctxRotate = rotate;
	},

	createBranch: function(rank, side){
		this.branches.push(new Branch({
			id: rank,
			status: TYPE_BRANCH, 
			parent: this,
			context: this.context, 
			constructor: this.constructor, 
			shape: this.shape, 
			side: side
		})); 
	},

	generateBranches: function(){
		var self = this; 
		var matrice = (this.status === TYPE_TRON) ? TreeManager.params.tron.count : TreeManager.params.branch.count; 
		
		var side = Math.floor(Math.random()*2);
		for(let j=0; j<randomMatrice(matrice); j++){
			setTimeout(function(){
				self.createBranch(j, side);
			}, j*100)
			side = (side===0) ? 1 : 0;
		}

	},

	create: function(){
		this.canvasEl = new this.constructor(this.context, {
			width: this.weight,
			height: this.length, 
			position: this.coord.base, 
			rotate: this.ctxRotate,
			origin: ["50%", 0], 
			fillColor: this.colors,
			strokeColor: this.colors,
			params: this.additionnalDatas
		});
		
		this.canvasEl.draw();
		this.generateBranches();
	}
}