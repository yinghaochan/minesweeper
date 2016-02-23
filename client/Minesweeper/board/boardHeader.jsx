import React from 'react'

import style from '../css/Sweep.import.css'


const boardHeader = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    reset: React.PropTypes.func.isRequired,
  },

  handleSubmit(e){
    e.preventDefault()
    const el = e.target
    const newRows = parseInt(el.rows.value, 10)
    const newCols = parseInt(el.cols.value, 10)
    const newProb = parseFloat(el.prob.value)

    if(newRows && newCols && newProb){
      this.props.reset(newRows, newCols, newProb)
    }
  },

  renderConfig(){
    const { config } = this.props

    return (
      <form className={style.config}>
        <span>Board Size: </span>
        <input name="rows" type="text" defaultValue={config.rows}/>
        <span> x </span> 
        <input name="cols" type="text" defaultValue={config.cols}/>
        <span>  Mine Probability: </span> 
        <input name="prob" type="text" defaultValue={config.mineProbability}/>
        <input type="submit" value="Reset"/>
      </form>
      )
  },

  renderStatus(){
    const { game } = this.props
    if(game.won){
      return 'YOU WIN'
    } else if(game.lost){
      return 'YOU LOSE'
    } else {
      return 'Click once to flag, twice to reveal.'
    }
  },

  render(){
    return (
        <div>
          <table>
            <tbody>
              <tr className="form" onSubmit={this.handleSubmit}>
                <td>{ this.renderConfig() }</td>
              </tr>
              <tr>
                <td>{ this.renderStatus() }</td>
              </tr>
            </tbody>      
          </table>
        </div>
        )
  }
})

export default boardHeader
