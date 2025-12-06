// Déclaration des variables globales
const morpionGrid = document.getElementById('morpion-grid');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

let board = ['', '', '', '', '', '', '', '', '']; // Représente les 9 cases de la grille
let currentPlayer = 'X';
let gameActive = true; // Indique si le jeu est en cours
let scores = { X: 0, O: 0 };

// Les combinaisons gagnantes (indices des cases)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
    [0, 4, 8], [2, 4, 6]            // Diagonales
];

// --- Fonctions de Score (LocalStorage) ---

/**
 * Charge les scores depuis le stockage local (LocalStorage).
 * S'il n'y a pas de scores, initialise à zéro.
 */
function loadScores() {
    const storedScores = localStorage.getItem('morpionScores');
    if (storedScores) {
        scores = JSON.parse(storedScores);
    }
    updateScoreDisplay();
}

/**
 * Sauvegarde les scores actuels dans le stockage local.
 */
function saveScores() {
    localStorage.setItem('morpionScores', JSON.stringify(scores));
}

/**
 * Met à jour l'affichage des scores sur la page.
 */
function updateScoreDisplay() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

// --- Fonctions de Logique du Jeu ---

/**
 * Vérifie s'il y a un gagnant ou si c'est un match nul.
 */
function checkResult() {
    let roundWon = false;

    // 1. Vérification de la Victoire
    for (let i = 0; i < winningCombinations.length; i++) {
        const combo = winningCombinations[i];
        // Récupère les symboles dans les trois cases de la combinaison
        const a = board[combo[0]];
        const b = board[combo[1]];
        const c = board[combo[2]];

        // Si les trois cases sont identiques et non vides, il y a victoire
        if (a && a === b && a === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerHTML = `Le joueur **${currentPlayer}** a gagné ! 🥳`;
        gameActive = false; // Arrête le jeu
        scores[currentPlayer]++; // Incrémente le score du gagnant
        saveScores();
        updateScoreDisplay();
        return; // Fin de la vérification
    }

    // 2. Vérification du Match Nul
    // Si toutes les cases sont remplies et qu'il n'y a pas de gagnant
    if (!board.includes('')) {
        gameStatus.innerHTML = 'Match Nul ! Personne n\'a gagné. 🤝';
        gameActive = false;
        return;
    }

    // 3. Changement de Joueur
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerHTML = `Au tour du joueur **${currentPlayer}**`;
    }
}

/**
 * Gère le clic d'un joueur sur une case.
 * @param {HTMLElement} cell - L'élément HTML de la case cliquée.
 * @param {number} index - L'index (0 à 8) de la case dans le tableau.
 */
function handleCellClick(cell, index) {
    // Si le jeu n'est pas actif ou si la case est déjà occupée, on ne fait rien
    if (!gameActive || board[index] !== '') {
        return;
    }

    // Mise à jour de l'état du jeu (le tableau JavaScript)
    board[index] = currentPlayer;

    // Mise à jour de l'affichage (l'élément HTML)
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Ajoute la classe 'x' ou 'o' pour le style

    // Vérifie s'il y a un résultat (victoire ou match nul)
    checkResult();
}


/**
 * Réinitialise la partie (mais garde les scores).
 */
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.innerHTML = `Au tour du joueur **${currentPlayer}**`;

    // Supprime tous les éléments de la grille et les recrée
    morpionGrid.innerHTML = ''; 
    renderBoard();
}

/**
 * Crée et affiche la grille de jeu dans le HTML.
 */
function renderBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Ajoute un écouteur d'événement pour gérer le clic
        cell.addEventListener('click', () => handleCellClick(cell, i));
        
        morpionGrid.appendChild(cell);
    }
}

// --- Initialisation du Jeu ---

// 1. Charge les scores au démarrage
loadScores();

// 2. Affiche la grille vide
renderBoard();

// 3. Attache la fonction de réinitialisation au bouton
resetButton.addEventListener('click', resetGame);
