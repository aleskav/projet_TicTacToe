const ZERO = 0; // Représente le "O"
const IXE = 1; // Représente le "X"
const RIEN = 2; // Représente une cellule vide
const SYMBOLES = [ "O", "X", "." ]; // Contient les symboles utilisés pour remplir les cellules de la grille

let auJeu = false; // Vrai si un jeu est en cours
let AQui = ZERO; // Contenu IXE ou ZERO
let Joueurs = [ "", "" ]; // Contenant pour le nom des joueurs
let hoverGo = true; // true permet la coloration sur passage de la souris

//pour colorer les cellules si les deux conditions sont remplies
function Hover(e) {
  const cellule = e.target;
  const contenu = cellule.textContent.trim();
  if (contenu === SYMBOLES[RIEN] && hoverGo) {
    cellule.style.backgroundColor = "#EEE";
  }
}
//function qui prend les noms de joueurs: demande de rentrer
function initJoueur(quel) {
  let nJoueur = prompt(`Entrez le nom du joueur ${SYMBOLES[quel]} :`, `Saisir le nom ici`);
  if ( (nJoueur != null) && (nJoueur != 'Saisir le nom ici') && (nJoueur != '') ){		
    Joueurs[quel] = nJoueur;
    return true;
  }
	return false;
}

//pour joueur entre deux 
function JeuADeux() {
  if ((initJoueur(IXE)) && (initJoueur(ZERO))){
    auJeu = true;
    JoueurSuivant();//appel la fonction pour donner la chance à l'autre personne
    
    const cellules = document.querySelectorAll("td");
    for (let i = 0; i < cellules.length; i++) {
      cellules[i].addEventListener("mouseenter", Hover); // ajouter un écouteur pour le survol de la souris
      cellules[i].addEventListener("mouseleave", function() {
          this.style.backgroundColor = "";
      }); // retirer la couleur en arrière-plan lorsque la souris quitte la cellule
      cellules[i].addEventListener("click", Clic); // ajouter un écouteur pour le clic sur la cellule
    }
  } else {
    PositionDeDepart();
  }
  
  }
//pour jeu contre l'ordi est affiche message
function JeuSolo() {
  alert('Pas prêt!');
}
//pour appliquer sur le boutton remise à zero
function PositionDeDepart() {
  // arrêter le jeu en cours
  window.location.reload();
}
//pour déterminer quel joueur doit jouer ensuite dans le jeu
function JoueurSuivant() {
  AQui = (AQui === ZERO) ? IXE : ZERO;
    // récupérer le nom et le symbole du joueur en cours
  const joueurNom = Joueurs[AQui];
  const joueurSymbole = SYMBOLES[AQui];
  
  // afficher un message informant à qui le tour de jouer
  const message = `C'est à ${joueurNom} (${joueurSymbole}) de jouer`;
  const zoneTexte = document.getElementById("message");
  zoneTexte.textContent = message;
  zoneTexte.style.backgroundColor = "#ccc";
}
//pour déterminer si une cellule dans le jeu est déjà occupée par un symbole ou non. Elle prend un événement en entrée
function celluleOccupee(e) {
  const cellule = e.target;
  const contenu = cellule.textContent.trim();
  if (contenu !== SYMBOLES[RIEN]) {
    return true;
  }
  return false;
}
// fonction  qui réagit au clic de l'utilisateur sur une cellule de la grille de jeu
function Clic(e) {
  if (!auJeu) {
    return;
  }
  if (celluleOccupee(e)) {
    return;
  }
  const cellule = e.target;
  const symbole = hoverGo ? SYMBOLES[IXE] : SYMBOLES[ZERO];
  cellule.textContent = symbole;
  cellule.style.backgroundColor = "";
  hoverGo = !hoverGo;
  if(testGagnant()){
    //fin du jeu par un gagnant ou match null
    auJeu = false;
  }else{
    //pas de gagnant ou match null
    JoueurSuivant();
  }
}

// Teste si une cellule est occupée
function celluleOccupee(e) {
  let cellule = e.target;
  let contenu = cellule.textContent.trim();
  return contenu !== SYMBOLES[RIEN];
}

// Retourne le contenu d'une cellule
function contenuCellule(rang, col) {
  let cellule = document.getElementById("cellule-" + rang + "-" + col);
  let contenu = cellule.textContent.trim();

  return SYMBOLES.indexOf(contenu);
}

// Colore un rang gagnant
function coloreRang(quelle) {
  for (let col = 0; col < 3; col++) {
    let cellule = document.getElementById("cellule-" + quelle + "-" + col);
    cellule.classList.add("gagnant");
  }
}

// Colore une colonne gagnante
function coloreCol(quelle) {
  for (let rang = 0; rang < 3; rang++) {
    let cellule = document.getElementById("cellule-" + rang + "-" + quelle);
    cellule.classList.add("gagnant");
  }
}

// Colore une diagonale gagnante
function coloreDiag(quelle) {
  if (quelle === 1) {
    for (let i = 0; i < 3; i++) {
      let cellule = document.getElementById("cellule-" + i + "-" + i);
      cellule.classList.add("gagnant");
    }
  } else {
    for (let i = 0; i < 3; i++) {
      let cellule = document.getElementById("cellule-" + i + "-" + (2 - i));
      cellule.classList.add("gagnant");
    }
  }
}

// Vérifie s'il y a un gagnant et retourne true si c'est le cas
function testGagnant() {
  
  // Test des rangées
  var cell1, cell2, cell3;
	for(let i = 0; i < 3; i++)
	{
    
		cell1 = document.getElementById("cellule-" + i + "-" + 0);
		cell2 = document.getElementById("cellule-" + i + "-" + 1);
		cell3 = document.getElementById("cellule-" + i + "-" + 2);
		if(( cell1.innerHTML == cell2.innerHTML)
			&& (cell1.innerHTML == cell3.innerHTML)
			&& (cell1.innerHTML != SYMBOLES[RIEN]))
		{
     		coloreRang(i);
        gagnant(Joueurs[AQui] + " a gagné!");
				return true;
		}		
	}
  
  // Test des colonnes
  for(let i = 0; i < 3; i++){
    cell1 = document.getElementById("cellule-" + 0 + "-" + i);
		cell2 = document.getElementById("cellule-" + 1 + "-" + i);
		cell3 = document.getElementById("cellule-" + 2 + "-" + i);
		if(( cell1.innerHTML == cell2.innerHTML)
			&& (cell1.innerHTML == cell3.innerHTML)
			&& (cell1.innerHTML != SYMBOLES[RIEN]))
		{
      coloreCol(i);
      gagnant(Joueurs[AQui] + " a gagné!");
      return true;
    }
  }
  
  // Test des diagonales
  cell1 = document.getElementById("cellule-" + 0 + "-" + 0);
	cell2 = document.getElementById("cellule-" + 1 + "-" + 1);
	cell3 = document.getElementById("cellule-" + 2 + "-" + 2);
  if(( cell1.innerHTML == cell2.innerHTML)
			&& (cell1.innerHTML == cell3.innerHTML)
			&& (cell1.innerHTML != SYMBOLES[RIEN])){
      coloreDiag(1);
      gagnant(Joueurs[AQui] + " a gagné!");
      return true;
  }

  cell1 = document.getElementById("cellule-" + 0 + "-" + 2);
	cell2 = document.getElementById("cellule-" + 1 + "-" + 1);
	cell3 = document.getElementById("cellule-" + 2 + "-" + 0);
  if(( cell1.innerHTML == cell2.innerHTML)
			&& (cell1.innerHTML == cell3.innerHTML)
			&& (cell1.innerHTML != SYMBOLES[RIEN])){
    coloreDiag(2);
    gagnant(Joueurs[AQui] + " a gagné!");
    return true;
  }
  
  // Test de match null
  let matchNull = true;
  for (let rang = 0; rang < 3; rang++) {
    for (let col = 0; col < 3; col++) {
      if (contenuCellule(rang, col) === RIEN) {
        matchNull = false;
      }
    }
  }
  if (matchNull) {
  gagnant(" -----Match Null----");
  return true;
  }
  
  return false;
  }
  
  function coloreRang(rang) {
  for (let col = 0; col < 3; col++) {
  let cellule = document.getElementById("cellule-" + rang + "-" + col);
  cellule.style.backgroundColor = "#ddd";
  }
  }
  
  function coloreCol(col) {
  for (let rang = 0; rang < 3; rang++) {
  let cellule = document.getElementById("cellule-" + rang + "-" + col);
  cellule.style.backgroundColor = "#ddd";
  }
  }
  
  function coloreDiag(diag) {
  if (diag === 1) {
  for (let i = 0; i < 3; i++) {
  let cellule = document.getElementById("cellule-" + i + "-" + i);
  cellule.style.backgroundColor = "#ddd";
  }
  } else {
  for (let i = 0; i < 3; i++) {
  let cellule = document.getElementById("cellule-" + i + "-" + (2 - i));
  cellule.style.backgroundColor = "#ddd";
  }
  }
  }
  function gagnant(msg) {
     document.getElementById("message").innerHTML = msg;
     hoverGo = false;
    auJeu = false;
  }