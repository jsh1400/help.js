# Tour / Help

![help.js](https://raw.githubusercontent.com/jsh1400/help.js/master/docs/help.js.png)

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-size-image]][npm-url] [![NPM downloads][npm-downloads-image]][downloads-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

* [Installation](#installation)
* [Usage](#usage)
* [KeyDown Tools](#keydown)
* [Props](#props)
* [Demo](#demo)
* [License](#license)
* [Author](#author)

This Component is Tour (step by step) for help to learning ... :)



### Installation
```
npm i @jsh1400/help.js
```


### Usage

```javascript
import React from 'react'
import JHelp from '@jsh1400/help.js'

export default class App extends React.Component {
	state = {play: false}
	render() {
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
		  }
		]
		return(<div>
			<button onClick={()=> this.setState({play: !this.state.play})}>HELP</button>
			  <JHelp
				    play={this.state.play}
				    helpList={helpList}
				    onSkip={()=>this.setState({play: false})}
				    onClose={()=>this.setState({play: false})}
			    />
			    
			    <div id="iTest_7">iTest_7</div>
			    <div id="iTest_37">iTest_37</div>
			    <div id="iTest_57">iTest_57</div>
			    
			</div>)
	}
}


```


### KeyDown
> `Escape` == OnSkip Event  
> `ArrowRight` == OnPrev Event   
> `ArrowLeft` == OnNext Event



### Props
|props|type|default|
|-----|----|-------------|
|* play|boolean|false|
|* helpList|array[{ selector: string, img: string, title: string, description: string, position: string }]| []|
|startStep|number|0|
|endStep|number|0| 
|nextLabel|string|'next'|
|prevLabel|string|'prev'|
|skipLabel|string|'skip'|
|closeLabel|string|'close'|
|direction|string|'ltr'|
|onPrev|function|() => { step: string }|
|onNext|function|() => { step: string }|
|onSkip|function|() => { step: string }|
|onClose|function|() => { step: string }|
|prevClassName|string|undefined|
|nextClassName|string|undefined|
|skipClassName|string|undefined|
|closeClassName|string|undefined|
|style|object|{}|



### Demo
>help.js online [Demo](https://jsh1400.github.io/help.js/)


### License
MIT


### Author
>Javad Shariati <jsh1400@yahoo.com>


[license-image]: http://img.shields.io/npm/l/@jsh1400/help.js.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/@jsh1400/help.js
[npm-version-image]: http://img.shields.io/npm/v/@jsh1400/help.js.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/@jsh1400/help.js.svg?style=flat
[npm-downloads-size-image]: https://img.shields.io/bundlephobia/minzip/@jsh1400/help.js.svg?style=flat
[downloads-url]: https://npmcharts.com/compare/@jsh1400/help.js?minimal=true

[travis-url]: http://travis-ci.org/jsh1400/@jsh1400/help.js
[travis-image]: http://img.shields.io/travis/jsh1400/@jsh1400/help.js/develop.svg?style=flat

