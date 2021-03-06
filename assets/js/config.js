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
		cubicR : {
			min: 0, 	// Rayon minimum des points du polygone de controle par rapport à la base et au sommet (pourcentage de hauteur)
			max: 0	// Rayon minimum des points du polygone de controle par rapport à la base et au sommet (pourcentage de hauteur)
		},
		rotate: {
			min: 0, //Rotation minimum en degré d'une branche par rapport à son parent
			max: 30 //Rotation maximum en degré d'une branche par rapport à son parent
		},
		count: [0, 0, 0, 0, 0, 100] // Tableau de probabilité du nombre de branches, ici autant de chance d'avoir 0, 1, 2, 3, 4 branches; 
	},
	branch : {
		alternate: 100, // Probabilité que les branches apparaissent alternativement d'un coté puis de l'autre d'une branche
		rotate : {
			min: 10, //Rotation minimum en degré d'une branche par rapport à son parent
			max: 45 //Rotation maximum en degré d'une branche par rapport à son parent
		},
		cubicR : {
			min: 0, 	// Rayon minimum des points du polygone de controle par rapport à la base et au sommet (pourcentage de hauteur)
			max: 30	// Rayon minimum des points du polygone de controle par rapport à la base et au sommet (pourcentage de hauteur)
		},
		relativeWeight : {
			min: 80, //Epaisseur minimum d'une branche par rapport à son parent exprimé en pourcent
			max: 85 //Epaisseur maximum d'une branche par rapport à son parent exprimé en pourcent
		}, 
		length : {
			min: 45, //Longueur minimum d'une branche par rapport à son parent exprimé en pourcent
			max: 60 //Longueur maximum d'une branche par rapport à son parent exprimé en pourcent
		},
		minWeight: 5, 
		count : [20, 20, 20, 20, 20] // Tableau de probabilité du nombre de branches, ici autant de chance d'avoir 0, 1, 2, 3, 4 branches; 
	}, 
	general : {
		colors : ["#28cc9e", "#ffdd83", "#0000FF"], 
		limitColor: 3, 
		constructor: SHAPE_TRIANGLE, 
		gradientDirection: "right", 
		gradientRepeat: false, 
		gradientLimit : 100
	}
}