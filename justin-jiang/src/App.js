import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import MDSpinner from "react-md-spinner";
import logo from './logo.svg';
import './App.css';

var screenHeight = Dimensions.get("window").height;
var screenWidth = Dimensions.get('window').width;
var parent;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: screenWidth,
    height: screenHeight,
  },

  bgOverlay: {
  	position: 'absolute',
  	backgroundColor: 'rgba(0,0,0,.35)',
  	height: screenHeight,
  	width: screenWidth,
  },

  nameHeader: {
  	marginTop: 150,
  	fontSize: 64,
  	alignSelf: 'center',
  },

  headerText: {
  	color: 'white',
  	fontFamily: 'Maven Pro',
  	letterSpacing: 18,
  },

  hoverHeaderText: {
  	color: 'rgba(128,128,128,0.8)',
  	fontFamily: 'Maven Pro',
  	letterSpacing: 18,
  },

  barStyle: {
  	fontSize: 24,
  	position: 'relative',
  	alignSelf: 'center',
  	flexDirection: 'row',
  	marginTop: 40,
  },

  barText: {
  	color: 'white',
  	fontFamily: 'Open Sans',
  	letterSpacing: 4,
  },

  barHoverText: {
  	color: 'rgba(1,1,1,0.2)',
  	fontFamily: 'Open Sans',
  	letterSpacing: 4, 
  },

  barDivider: {
  	width: 100,
  },

  loadStyle: {
  	position: 'absolute',
    height: screenHeight,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  removeLoad: {
  	height: 0,
  	width: 0,
  }
});

class LoadingScreen extends Component {

	render(){
	  return (
	  	<View style={styles.loadStyle}>
	  		<MDSpinner size={35}/>
	  	</View>
	  )

	}
}

class Bar extends Component {
constructor () {
  	super();
  	this.state = {
  		resumeHover: false,
  		projHover: false,
  	};
  	this.toggleHoverR = this.toggleHoverR.bind(this);
  	this.toggleHoverP = this.toggleHoverP.bind(this);
  }

  toggleHoverR (){
  	this.setState({resumeHover: !this.state.resumeHover});
  }

  toggleHoverP (){
  	this.setState({projHover: !this.state.projHover});
  }

  render() {
  	var rStyle, pStyle;
  	if(this.state.resumeHover){
  		rStyle = styles.barHoverText;
  	}else{
  		rStyle = styles.barText;
  	}

  	if(this.state.projHover){
  		pStyle = styles.barHoverText;
  	}else{
  		pStyle = styles.barText;
  	}

  	return (
		<View style={styles.barStyle} > 
		    <Text 
		    style={rStyle}
		    onMouseEnter={this.toggleHoverR}
		    onMouseLeave={this.toggleHoverR}> 
			resume</Text> 
			<Text style={styles.barDivider}></Text>
			<Text 
		    style={pStyle}
		    onMouseEnter={this.toggleHoverP}
		    onMouseLeave={this.toggleHoverP}> 
			projects</Text> 
		</View>
  	);
  }
}


class Logo extends Component {
  constructor () {
  	super();
  	this.state = {
  		isHovering: false,
  	};
  	this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover (){
  	this.setState({isHovering: !this.state.isHovering});
  }

  render() {
  	var logoStyle;
  	if(this.state.isHovering){
  		logoStyle = styles.hoverHeaderText;
  	}else{
  		logoStyle = styles.headerText;
  	}

  	return (
		<View style={styles.nameHeader}> 
		    <Text 
		    style={logoStyle}
		    onMouseEnter={this.toggleHover}
		    onMouseLeave={this.toggleHover}> 
			JUSTIN JIANG</Text> 
		</View>
  	);
  }
}

class Background extends Component {
  constructor (props){
  	super(props);
  	this.state = {
  		loaded: false,
  		url: props.url,
  		image: ' ',
  	};
    this.setLoaded = this.setLoaded.bind(this);	
    //this.getImage();
  }

  getImage(){
  	alert("start");
  	let s = this.state.url + screenWidth + 'x' + screenHeight;  	
  	var img = new Image();

    img.onload = function(){
      this.setState({
        image: img,
        loaded: true,
      });
      alert('loaded');
      alert(this.state.image);
    }.bind(this);   	

    img.onerror = function(){
    	alert('some error');
    };

  	img.src = s;    
    alert(img.src);
  	console.log(img);    
  	alert(img);
    alert(this.state.loaded);
  }

  setLoaded(){
  	alert('setLoadedFunction');
  	alert(this.state.loaded);
  	if(this.state.loaded==false){
  		alert('state changed');
	  	this.setState({loaded:true});
	}
  }


  render(){
  	return (
  		<View>
  		<View>
  			<LoadingScreen/>
  		</View>
  		<View>
	        	<View style={styles.bgOverlay}>
		        </View>  		
		    <Image
	          style={styles.backgroundImage}
	          source={{uri: 'https://source.unsplash.com/collection/328212/'+screenWidth+'x'+screenHeight}}
	          onLoad={this.setLoaded()}
	        >

		        <Logo/>
	        	<Bar/>
	        </Image>
	    </View>
	    </View>
  	);
  }
}

class App extends Component {
  constructor () {
  	super();
  	this.state = {
  		stillLoading: true,
  		inc: 0,
  	};
  	this.doneLoading = this.doneLoading.bind(this);
  	parent = this;
  }	

  doneLoading () {
  	this.setState({stillLoading: false});
  }

  render() {

    return (
      <div className="App">
      	<View>
      		<Background url="https://source.unsplash.com/collection/328212/"/>
		</View>
      </div>

    );
  }
}

export default App;