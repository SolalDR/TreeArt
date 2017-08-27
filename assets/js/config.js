TreeManager.params = {
	tron: {
		weight: {
			min: 5, // Epaisseur minimum du tronc en %
			max: 6 // Epaisseur maximum du tronc en %
		},
		length: {
			min: 40,
			max: 40
		}, 
		rotate: {
			min: 0, //Rotation minimum en degré d'une branche par rapport à son parent
			max: 30 //Rotation maximum en degré d'une branche par rapport à son parent
		},
		count: [0, 0, 0, 0, 0, 100] // Tableau de probabilité du nombre de branches, ici autant de chance d'avoir 0, 1, 2, 3, 4 branches; 
	},
	branch : {
		alternate: 100, // Probabilité que les branches apparaissent alternativement d'un coté puis de l'autre d'une branche
		weight: {
			min: 1, //Epaisseur minimum en px
			max: 70 //Epaisseur maximum en px
		}, 
		rotate: {
			min: 10, //Rotation minimum en degré d'une branche par rapport à son parent
			max: 45 //Rotation maximum en degré d'une branche par rapport à son parent
		},
		relativeWeight : {
			min: 80, //Epaisseur minimum d'une branche par rapport à son parent exprimé en pourcent
			max: 85 //Epaisseur maximum d'une branche par rapport à son parent exprimé en pourcent
		}, 
		length: {
			min: 45, //Longueur minimum d'une branche par rapport à son parent exprimé en pourcent
			max: 60 //Longueur maximum d'une branche par rapport à son parent exprimé en pourcent
		},
		count: [20, 20, 20, 20, 20] // Tableau de probabilité du nombre de branches, ici autant de chance d'avoir 0, 1, 2, 3, 4 branches; 
	}, 
	general : {
		colors : ["#000000"], 
		constructor: SHAPE_TRIANGLE
	}
}