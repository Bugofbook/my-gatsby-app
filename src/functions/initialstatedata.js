import { SquaresDeepCopy ,setChessToSquares} from "./gamebasics";

export const makeEmptyBoard = (row,column) => SquaresDeepCopy(Array(row).fill(Array(column).fill({value:"", owner:"", lock: false})))

export const makeGameHistoryObject = (board,objecta = {}) => Object.assign({	nowplayer: "player1"},{squares: board},objecta)
	
export const makeGameInfoObject = (gamename) => ({
	gamename,
	gamestate: "Game Begin",
	winner: "",
	loser: "",
	turns: 0,
	actionlists: [],
})

export const BoardProcessedChess = (chessarray, Board) => {
	chessarray.reduce((presquares,nowchess) => setChessToSquares(nowchess,presquares),Board)
	return Board
	}

//

const TicTacToeBoard = makeEmptyBoard(3,3)
const TicTacToeNeedKey = {showlists : []}

export const TicTacToeInitialData = {
	history: [makeGameHistoryObject(TicTacToeBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("TioTeoTic"),
}

export const TicTacToeSpecialInitialData = {
	history: [makeGameHistoryObject(TicTacToeBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("TioTeoTicSpecial"),
}

//
const GomokuBoard = makeEmptyBoard(15,15)
export const GomokuInitialData = {
	history: [makeGameHistoryObject(GomokuBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("Gomoku"),
}

//
	
let  OthelloStartArray = [
	{rowskey: 3, columnskey: 3, value: "BlackChess", owner: "player1", lock: true},
	 {rowskey: 3, columnskey: 4, value: "WhiteChess", owner: "player1", lock: true},
	 {rowskey: 4, columnskey: 3, value: "WhiteChess", owner: "player1", lock: true},
	 {rowskey: 4, columnskey: 4, value: "BlackChess", owner: "player1", lock: true}
]

let  OthelloStartBoard = makeEmptyBoard(8,8)

let OthelloBoard = BoardProcessedChess(OthelloStartArray,OthelloStartBoard)

const OthelloNeedKey = { player1chess:  2,	player2chess:  2 }

export const OthelloInitialData = {
	history: [makeGameHistoryObject(OthelloBoard,OthelloNeedKey)],
	gameinfo: makeGameInfoObject("Othello"),
}
