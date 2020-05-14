import React from 'react';
import ReactDOM from 'react-dom';
// import JHelp from './Component/Help'
import JHelp from '@jsh1400/help.js'
import Demo from './Demo'


const helpList= [
  {
    selector: '#iTest_7',
    title: 'help test 7',
    description: 'help test 7'
  },
  {
    selector: '#iTest_37',
    description: 'help test 37',
    position: 'bottom'
  },
  {
    selector: '#iTest_57',
    description: 'help test 57'
  },
  {
    selector: '#iTest_11',
    description: 'help test 11'
  },
  {
    selector: '#iTest_22',
    description: 'help test 22'
  },
  {
    selector: '#iTest_67',
    description: 'help test 67'
  }
]


class App extends React.Component {
  state = { play: false, }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <button
            style={{
              position:'fixed', top: 0, left: 0, zIndex:2,
              padding: '10px 20px'
            }}
            onClick={()=> this.setState({play: !this.state.play})}>HELP</button>
          <JHelp
            play={this.state.play}
            helpList={helpList}
            onSkip={()=>this.setState({play: false})}
            onClose={()=>this.setState({play: false})}
          />
          <Demo count={70}/>
        </header>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))
