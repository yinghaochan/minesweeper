import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import style from './css/Sweep.import.css';

export default class AdminApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div className={style.container}>
        <Helmet
          title="Minesweeper"
          meta={[
            { name: 'description', content: 'Play the game!' }
          ]}
        />
        <Link to="/">Back</Link>
        <h1>Minesweeper</h1>
        {this.props.children}
      </div>
    )
  }
}
