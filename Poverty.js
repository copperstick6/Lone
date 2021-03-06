/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import API from './api.json'
export default class Poverty extends Component<{}> {
	constructor(props){
		super(props);
		this.state = {
			news: [],
			visible: true
		}
		this.goLink = this.goLink.bind(this)
	}
	goLink(link){
		console.log(link)
		Linking.openURL(link)
	}
	componentWillMount(){
		fetch("https://newsapi.org/v2/everything?sortedBy=publishedAt&q=poverty&apiKey=" + String(API.apiKey))
		 .then(response => response.json())
		 .then(responseJson => {
		   allArticles = responseJson['articles']
		   for(var i = 0; i < allArticles.length; i++)
		   {
			   arrElem = {"title": allArticles[i]['title'], "url": allArticles[i]['url']}
			   news_arr = this.state.news
			   news_arr.push(arrElem)
			   this.setState({news: news_arr})
		   }
		   this.setState({visible: false})
	   })
	}
  render() {
	  let scroll = null
	  if(!this.state.visible){
		  scroll = <ScrollView>
			   {
				  this.state.news.map((item, index) => (
					  <Button onPress={() =>this.goLink(item.url)} title= {item.title} />
				  ))
			   }
			</ScrollView>
	  }
	return (
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} />
		{scroll}
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  welcome: {
	fontSize: 20,
	textAlign: 'center',
	margin: 10,
	borderWidth: 1,
	borderColor: '#d6d7da',
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
