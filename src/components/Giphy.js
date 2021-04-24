import React, {Component} from 'react';
import {View, Text, Image, Button,ScrollView} from 'react-native';

export default class Giph extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    getData(){
       
        let url=`http://api.giphy.com/v1/gifs/search?api_key=4kokZQhfxg7YLkwUjDzzylngUYjT9OtX&limit=10&q=${this.props.search}`;
        
        fetch(url, {method: 'GET'})
        .then(response => response.json() )
        

        
        .then(json => {
            console.log(json)
            let rand = Math.floor(Math.random() * 9);
            this.setState({pic:json.data[rand].images.downsized_medium.url });
        });
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{uri: this.state.pic}}
                style={{width: 250, height:250}} />
                <Text style={{color: '#fff'}}>Powered by GIPHY</Text>
                <Button
                    onPress ={() =>{
                        this.getData();
                    }}
                    title = "Refresh"
                    />
            </View>
        )
    }
}