import React from 'react'
import PropTypes from 'prop-types'

export default class Demo extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
  }
  static defaultProps = {
    count: 2,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  _ch = (count = 2) => {
    let d = []
    let w = 300
    let h = 100
    for (let i = 1; i <= count; i++) {
      d.push(<div key={i} style={{
        width: Math.ceil(Math.random() * w) + 70,
        height: Math.ceil(Math.random() * h) + 30,
      }} className={`cTest cTest_${i}`} id={`iTest_${i}`}>Test {i}</div>)
    }
    return d
  }

  render () {
    return (
      <React.Fragment>
        <style>
          {`.my_test:after{content:'';display:block;clear:both}.cTest{float:left; margin:5px; display: flex;flex-direction: column;align-items: center;justify-content: center;background:#ccc; color:#333; text-align: center;}`}
        </style>
        <div className="my_test">{this._ch(this.props.count)}</div>
      </React.Fragment>
    )
  }
}
