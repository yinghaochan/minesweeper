import React from 'react'
import { connect } from 'react-redux'
import { setBoard, setSize } from 'client/_redux/Minesweeper/board'

const boardHeader = React.createClass({
  componentDidMount(){
    this.props.setBoard()
  },
  handleSubmit(e){
    e.preventDefault()

    this.props.setSize(e.target.rows.value, e.target.cols.value)
    this.props.setBoard()

  },
  render(){
    const { config, game } = this.props
    const inputStyle = {width: '20px'}
    return (
        <div>
          <table>
            <tbody>
              <tr className="form" onSubmit={this.handleSubmit}>
                <td>
                  <form>
                    <span>Change Board Size: </span>
                    <input name="rows"type="text" style={inputStyle} defaultValue={config.get('rows')}/>
                     <span> x </span> 
                    <input name="cols"type="text" style={inputStyle} defaultValue={config.get('cols')}/>
                    <input type="submit" />
                  </form>
                </td>
              </tr>
              <tr>
                <td onClick={this.props.setBoard}>Reset</td>
                <td>{ game.get('won') ? 'YOU WIN!': ''}</td>
                <td>{ game.get('lost') ? 'YOU LOSE!': ''}</td>
              </tr>
            </tbody>      
          </table>
        </div>
        )
  }
})


function mapStateToProps (state){
  return {
    game: state.minesweeper.get('game'),
    config: state.minesweeper.get('config'),
  }
}


export default connect(mapStateToProps, {setBoard, setSize})(boardHeader)
