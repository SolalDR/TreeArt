function Branch(args){
	this.id = args.id;
	this.context = args.context; 
	this.parent = args.parent; //Parent branch
	this.status = args.status;
	this.shape = args.shape; //Type of shape (triangle / arc / rectangle)
	this.position = args.position; //Position sur l'axe de la branche
	this.side = args.side; // 0 pour left, 1 pour right;  
	this.constructor = args.constructor;
	this.branches = []; //childs

	this.length; //Length of the branch
	this.weight; //Weight of the branch
	this.rotate; //rotation of the branch from parent
	
	this.ctxW = this.context.canvas.clientWidth;
	this.ctxH = this.context.canvas.clientHeight;

	this.canvasEl;

	
	if(this.status === TYPE_TRON) {
		this.initTron();
	} else {
		this.calcFromParent();
	}
	if(this.weight > 5) {
		this.create();
	}
}

Branch.prototype = {
	initTron: function(){
		var widthPercent = randomBetween(TreeManager.params.tron.weight.min, TreeManager.params.tron.weight.max); 
		var heightPercent = randomBetween(TreeManager.params.tron.length.min, TreeManager.params.tron.length.max); 
		this.weight = this.ctxW/100*widthPercent; 
		this.length = this.ctxH/100*heightPercent; 
		this.rotate = 0;
		this.calcContextRotate();
		this.parent = null;
		this.coord = {
			base: [this.ctxW/2, 0],
			top: [this.ctxW/2, this.length]
		}
	},

	calcFromParent: function(){
		var parent = this.parent; 
		var rand = {
			weight : randomBetween(TreeManager.params.branch.relativeWeight.min, TreeManager.params.branch.relativeWeight.max)/100,
			length : randomBetween(TreeManager.params.branch.length.min, TreeManager.params.branch.length.max)/100,
			rotate : randomBetween(TreeManager.params.branch.rotate.min, TreeManager.params.branch.rotate.max)
		}
		if( this.parent.status = TYPE_TRON ) { rand.rotate = randomBetween(TreeManager.params.tron.rotate.min, TreeManager.params.tron.rotate.max); }
		this.weight = parent.weight*rand.weight;  
		this.length = parent.length*rand.length;
		this.rotate = (this.side === 0)? -1*rand.rotate : rand.rotate;
		this.calcContextRotate();
		this.coord = {
			base:[], top:[]
		}
		this.coord.base = this.parent.coord.top;
		var dir = (this.ctxRotate > 0) ? 1 : -1; 

		this.coord.top[0] = this.coord.base[0] + Math.sin(Math.radians(Math.abs(this.ctxRotate))) * this.length * dir;
		this.coord.top[1] = this.coord.base[1] + Math.cos(Math.radians(this.ctxRotate)) * this.length;

	},

	analyse: function(){
		console.log("***********************");
		console.log("ID : "+this.id);
		console.log("Deep : "+this.deep);
		console.log("Rotation relative : "+this.rotate);
		console.log("Rotation absolute : "+this.ctxRotate);
		console.log("Longueur : "+this.length);
		console.log("Epaisseur : "+this.weight);
		console.log("Coordonné de base : "+this.coord.base);
		console.log("Coordonné de top : "+this.coord.top);

		console.log("***********************");
	},

	calcContextRotate: function(){
		var parent = this.parent; 
		var rotate = this.rotate; 
		var j =0; 
		while(parent){
			rotate+=parent.rotate; 
			parent = parent.parent; 
			j++; 
		}
		this.deep = j; 
		this.ctxRotate = rotate;

	},

	createBranch: function(rank, position, side){
		this.branches.push(new Branch({
			id: rank,
			status: TYPE_BRANCH, 
			parent: this,
			context: this.context, 
			constructor: this.constructor, 
			shape: SHAPE_TRIANGLE, 
			position: position,
			side: side // A modifié en fonction de l'alternance
		})); 
	},

	generateBranches: function(){
		var matrice = (this.status === TYPE_TRON) ? TreeManager.params.tron.count : TreeManager.params.branch.count; 
		n = randomMatrice(matrice);
		var side = Math.floor(Math.random()*2);
		var self = this; 
		for(let j=0; j<n; j++){
			var position = 100; 
			(function(){
				setTimeout(function(){
					self.createBranch(j, position, side);
				}, j*100)
				side = (side===0) ? 1 : 0;
			})();
		}
	},

	create: function(){
		this.canvasEl = new this.constructor(this.context, {
			width: this.weight,
			height: this.length, 
			position: this.coord.base, 
			rotate: this.ctxRotate,
			origin: ["50%", 0]
		});
		this.canvasEl.draw();
		this.generateBranches();
	}
}