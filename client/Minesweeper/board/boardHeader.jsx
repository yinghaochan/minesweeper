import React from 'react'

const inputStyle = {width: '30px'}
const formStyle = {height: '50px'}

const boardHeader = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    reset: React.PropTypes.func.isRequired,
  },

  handleSubmit(e){
    e.preventDefault()
    const el = e.target

    this.props.reset(el.rows.value, el.cols.value, el.prob.value)
  },

  renderConfig(){
    const { config } = this.props

    return (
      <form style={formStyle}>
        <span>Change Board Size: </span>
        <input name="rows" type="text" style={inputStyle} defaultValue={config.rows}/>
         <span> x </span> 
        <input name="cols" type="text" style={inputStyle} defaultValue={config.cols}/>
        <span>  Mine Probability: </span> 
        <input name="prob" type="text" style={inputStyle} defaultValue={config.mineProbability}/>
        <input type="submit" value="Reset"/>
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
                <td>{ game.won ? 'YOU WON!' : '' }{ game.lost ? 'YOU LOST!' : '' }</td>
              </tr>
            </tbody>      
          </table>
        </div>
        )
  }
})

export default boardHeader
