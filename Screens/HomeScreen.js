import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity  } from 'react-native';
import dictionary from '../database'

export default function HomeScreen() {

    getWord=(word)=>{
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]


      var searchKeyword=word.toLowerCase()
      var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
      console.log(url);
      return fetch(url)
      .then((data)=>{
        if(data.status===200)
        {
          return data.json()
        }
        else{
          return null
        }
      })
      .then((response)=>{
        var responseObject = response

        if(responseObject)
        {
          var wordData = responseObject.definitions[0]
          var defintion=wordData.description
          var lexicalCategory=wordData.wordtype

          this.setState({
            "word" : word,
            "definition" :definition,
            "lexicalCategory" : lexicalCategory
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text,
            "defintion" : "Not Found"
          })
        }

      })
    }
        
   
    
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        
        <TextInput
        style={styles.inputBox}
        onChangeText={text => {
            this.setState({
                text: text,
                isSearchPressed: false,
                word : "Loading...",
                lexicalCategory : '',
                examples : [],
                defintion : ""
            })

            
        }}
        value={this.state.text}
        />
    <TouchableOpacity>
        style={styles.searchButton}
        onPress={() =>{
            this.setState({ isSearchPressed: true});
            this.getWord(this.state.text)
            this.getWord
        }}
    </TouchableOpacity>

        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Word:("")
            </Text>
            <Text style={{fontSize:18}}>
              {this.state.word}
            </Text>

        </View>
        
    
      </View>

    
    );
    
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputBox: {
        marginTop: 100,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
      },

      searchButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 50,
        width: 300,
        height: 50,
      },
      buttonText: {
        textAlign: 'center',
        color: 'black',
      },
  });
  