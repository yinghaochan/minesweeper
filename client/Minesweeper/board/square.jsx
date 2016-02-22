export default Square = (props, context) => {

  const handleClick = () => {
    const {rowNum, colNum, tile, game, tileClick} = props

    // disable the grid if you've lost / won
    return (game.get('lost') || game.get('won')) ? null : tileClick(rowNum, colNum, tile)
  }

  const renderTile = () => {
    const { tile, game } = props
    const flagged = tile.get('flagged')
    const revealed = tile.get('revealed')
    const lost = game.get('lost')
    const nearBy = tile.get('nearby')

    if(lost && tile.get('isBomb')){
      return <button>x</button>

    } else if(!flagged && !revealed){
      return <button onClick={handleClick}>&nbsp;</button> 

    } else if(flagged && !revealed){
      return <button onClick={handleClick}>!!</button>

    } else if(revealed){

      if(nearBy) return nearBy
      
      return ' '
    }
  }

  return <td className="tile">{ renderTile() }</td>
}
