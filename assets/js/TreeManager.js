function findRadio(name){
	var inputs = document.querySelectorAll("input[name='"+name+"']");
	for(i=0; i<inputs.length; i++){
		if( inputs[i].checked ){
			return inputs[i].value; 
		}
	}
} 

const TYPE_TRON = 0; 
const TYPE_BRANCH = 1; 
const SHAPE_TRIANGLE = 0;
const SHAPE_RECTANGLE = 1;
const SHAPE_ARC = 2;

TreeManager = {
	optionDisplayed: false,
	createTron: function(){
		this.tron = new Branch({
			status: TYPE_TRON, 
			parent: null,
			context: this.context, 
			shape: this.shape, 
			constructor: this.constructor,
			side: 0
		});
	},

	switchConstructor: function(){
        switch(this.shape) {
        	case SHAPE_RECTANGLE : 
        	this.constructor = Rectangle; break;
        	case SHAPE_TRIANGLE : 
        	this.constructor = Triangle; break;
        	case SHAPE_ARC : 
        	this.constructor = Arc; break;
        	default : 
        	this.constructor = Triangle; 
        	this.params.general.constructor = SHAPE_TRIANGLE;
        	this.shape = SHAPE_TRIANGLE; 
        }

	},

	changeConstructor:function(el){
		var self = this;
		el.addEventListener("change", function(){
			self.shape = parseInt(findRadio(this.name)); 
			self.switchConstructor();
		})
	},

	formatPath: function(array){
		for(i=0; i<array.length; i++){
			if( !isNaN( parseInt(array[i]) ) ){
				array[i] = parseInt(array[i]); 
			}
		}
		return array;
	},

	initOption: function(option){
		var self = this;
		var name = option.getAttribute('name');
		if( name === "general-constructor") { return; } // Si il s'agit du constructeur on quitte 
		var path = this.formatPath(option.getAttribute('name').split("-")); 
		var value = (path[2]) ? self.params[path[0]][path[1]][path[2]] : self.params[path[0]][path[1]];
		option.setAttribute("value", value);

		option.addEventListener("change", function(){
			var n = this.getAttribute("name"); 
			for(i=0; i<path.length; i++){
				if(!isNaN(parseInt(path[i]))){
					path[i] = parseInt(path[i]);
				}
			}
			var value = (!isNaN(parseInt(this.value))) ? parseInt(this.value) : this.value;
			console.log(value);
			if( path[2] || path[2] === 0 ){
				self.params[path[0]][path[1]][path[2]] = value; 
				console.log(self.params, path[0], path[1], path[2], self.params[path[0]][path[1]][path[2]]);
			} else {
				self.params[path[0]][path[1]] = value; 
			}
		}, false)
	},

	initEvents: function(){
		var self = this;
		
		var constructorRadios = document.querySelectorAll("input[name='general-constructor'");
		for( i=0; i < constructorRadios.length; i++ ){
			this.changeConstructor(constructorRadios[i]);
		}

		// Affiche / Cache le panneau d'option
		this.btnToggle.addEventListener("click", function(e){
			e.preventDefault();
			if(self.optionDisplayed) {
				self.optionPanel.className =  self.optionPanel.className.replace("open", "closed");
				self.optionDisplayed = false; 
			} else {
				self.optionPanel.className =  self.optionPanel.className.replace("closed", "open");
				self.optionDisplayed = true;
			}
			return false;
		})

		this.generate.addEventListener("click", function(){
			self.createTron();
		}, false); 

		this.clear.addEventListener("click", function(){
			self.context.clearRect(0, 0, self.context.canvas.clientWidth, self.context.canvas.clientHeight);
		}, false); 

		for(var i =0; i< this.options.length; i++ ){
			this.initOption(this.options[i]);
		}

	},

	init:function(args){
		this.canvas = args.canvas;
		this.shape = args.shape; 

		this.generate = document.getElementById("generate"); 				// Bouton qui génère l'arbre
		this.clear = document.getElementById("clear"); 						// Néttoie l'arbre
		this.btnToggle = document.getElementById("toggle-settings");		// Affiche / Cache les options
		this.optionPanel = document.querySelector(".tree-controller");		// Paneau d'option
 		this.options = document.querySelectorAll("input");					// Tableau d'option

        if(!this.canvas) { console.warn("Canvas don't exist"); return; }	// Erreur canvas
    	this.context = this.canvas.getContext('2d');						//Récupère le contexte du canvas
        if(!this.context) { console.warn("Context don't exist"); return; }	// Erreur context

        this.switchConstructor();											// Selon this.shape détermine le constructeur de forme (Triangle, Rectangle)
        this.initEvents();													// Initialise les évenements
	}
}