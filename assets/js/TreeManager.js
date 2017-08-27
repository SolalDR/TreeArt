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

TreeManager = {
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

	initOptions: function(){
		this.generate = document.getElementById("generate");
		this.clear = document.getElementById("clear");
		this.constructorRadios = document.querySelectorAll("input[name='general-constructor'");
		for(i=0; i<this.constructorRadios.length; i++ ){
			this.changeConstructor(this.constructorRadios[i]);
		}


		this.options = document.querySelectorAll("input");
		var self = this;

		this.generate.addEventListener("click", function(){
			self.createTron();
		}, false); 

		this.clear.addEventListener("click", function(){
			self.context.clearRect(0, 0, self.context.canvas.clientWidth, self.context.canvas.clientHeight);
		}, false); 

		for(i=0; i<this.options.length; i++){
			(function(){
				var option = self.options[i];
				var name = option.getAttribute('name');
				if( name === "general-constructor") {
					return; 
				}
				var path = option.getAttribute('name').split("-");
				var value = (path[2]) ? self.params[path[0]][path[1]][path[2]] : self.params[path[0]][path[1]];
				option.setAttribute("value", value);		
				option.addEventListener("change", function(){
					var n = this.getAttribute("name"); 
					for(i=0; i<path.length; i++){
						if(parseInt(path[i])){
							path[i] = parseInt(path[i]);
						}
					}
					var value = (parseInt(this.value)) ? parseInt(this.value) : this.value;
					if( path[2] ){
						self.params[path[0]][path[1]][path[2]] = value; 
					} else {
						self.params[path[0]][path[1]] = value; 
					}
				}, false)
			})(); 
		}
	},

	init:function(args){
		this.canvas = args.canvas;
		this.shape = args.shape; 
        if(!this.canvas) {
        	alert("Impossible de récupérer le canvas");
            return;
        }
    	this.context = this.canvas.getContext('2d');
        if(!this.context){
            alert("Impossible de récupérer le context du canvas");
            return;
        }
        this.switchConstructor();
        this.initOptions()
	}
}