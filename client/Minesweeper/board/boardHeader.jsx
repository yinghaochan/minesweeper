import React from 'react'
import { connect } from 'react-redux'
import { setBoard, setConfig } from 'client/_redux/Minesweeper/board'

const boardHeader = React.createClass({
  componentDidMount(){
    this.props.setBoard()
  },

  handleSubmit(e){
    e.preventDefault()
    const el = e.target

    this.props.setConfig(el.rows.value, el.cols.value, el.prob.value)

    this.props.setBoard()

  },

  renderConfig(){
    const { config } = this.props
    const inputStyle = {width: '30px'}

    return (
      <form>
        <span>Change Board Size: </span>
        <input name="rows" type="text" style={inputStyle} defaultValue={config.get('rows')}/>
         <span> x </span> 
        <input name="cols" type="text" style={inputStyle} defaultValue={config.get('cols')}/>
        <span>  Mine Probability: </span> 
        <input name="prob" type="text" style={inputStyle} defaultValue={config.get('mineProbability')}/>
        <input type="submit" />
      </form>
      )
  },

  render(){
    const { game } = this.props

    return (
        <div>
          <table>
            <tbody>
              <tr className="form" onSubmit={this.handleSubmit}>
                <td>
                  { this.renderConfig() }
                </td>
              </tr>
              <tr>
                <td><button onClick={this.props.setBoard}> Reset Game </button></td>
                <td>{ game.get('won') ? 'YOU WON!' : '' }</td>
                <td>{ game.get('lost') ? 'YOU LOST!' : '' }</td>
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

export default connect(mapStateToProps, {setBoard, setConfig})(boardHeader)
