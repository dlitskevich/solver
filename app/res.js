export default {
  top: {
    title: 'TicTacToe',
    sitemap: [
      { id: 'main', name: 'Info', icon2: 'home' },
      { id: 'tictactoe', name: 'TicTacToe', icon: 'work' },
      { id: 'ulttictactoe', name: 'UltimateTicTacToe', icon: 'work' }
    ]
  },
  gameStates: {
    gameWinner: ['Red won', 'White won', 'Draw'],
    gameTurn: ['Red turn', 'White turn']
  },
  players: [
    { id: 0, name: 'Person' },
    { id: 1, name: 'MCTS' },
    { id: 2, name: 'Random' }
  ]
}
