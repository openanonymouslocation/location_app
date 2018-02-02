import React, { Component } from "react";
import { ImageBackground, View, StatusBar, ScrollView, AsyncStorage } from "react-native";
import { Container, Button, H3, Text, Card, CardItem, Body } from "native-base";
import store from "react-native-simple-store";
import RNFS from 'react-native-fs';

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-large-openanonimouslocation.png");

class Home extends Component {

  state = { disclaimer_read: false };


  async componentWillMount(){

    const isStorage = await RNFS.exists(RNFS.DocumentDirectoryPath + '/tempStorage.txt');
    this.setState({'disclaimer_read': isStorage});
    
  }

  //TODO arreglar BUG android
  async componentWillMount_(){  
    console.log('componentWillMount');

    try {
      const res = await store.get('disclaimer_read');      
      this.setState({'disclaimer_read': (res !== null)});
    } catch (e){
      console.error(e.message);
    }

  }


  _storeDisclaimerReaded(){    

    RNFS.writeFile(RNFS.DocumentDirectoryPath + '/tempStorage.txt', 'disclaimer_read', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });

    this.setState({'disclaimer_read': true});
  }

  _showStartButton(){
    return (
      <View style={styles.containerButton}>
        <Button
          style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Text>Start</Text>
        </Button>
        
      </View>        
    );    
  }

  _showDisclaimer(){

    if (this.state.disclaimer_read) {
      return this._showStartButton();
    }

    return (
      <View style={styles.disclaimerContainer}>
      <Card>

        <CardItem header bordered>
          <Text>NativeBase</Text>
        </CardItem> 

        <CardItem cardBody bordered>
          <Body style={styles.disclaimerBody}>
            <ScrollView>
              <Text>
                No es garanteixen la precisió, la integritat, la puntualitat, la presentació o l'aptitud de les dades facilitades en el posicionament per a qualsevol propòsit. Aquestes dades i materials podrien contenir imprecisions o errors dels quals no en som responsables segons la llei. I tampoc podem ser responsabilitzats per cap incidència, dany o perjudici indegut o per ingressos o beneficis perduts.
                En uilitzar aquesta aplicació i aquest lloc web accepteu que les exclusions i limitacions de responsabilitat establertes en aquesta declaració de responsabilitat són raonables. Si no creieu que siguin raonables, no heu d'utilitzar aquests serveis.
              </Text>
            </ScrollView>
          </Body>
        </CardItem>

        <CardItem footer bordered>
              <Text>GeekyAnts</Text>
        </CardItem>        

      </Card>

      <Button full Info onPress={this._storeDisclaimerReaded.bind(this)} >
            <Text>Ok</Text>
      </Button>  
    </View>      
    );

  }

  _showLogo(){
    return(
      <View style={styles.containerLogo}>
        <ImageBackground source={launchscreenLogo} style={styles.logo} />
      </View>
    );
  }

  _showSubtitle(){
    return(
      <View style={styles.containerSubtitle}>
        <H3 style={styles.text}>Publish your geolocations</H3>            
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>

        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>

          {this._showLogo()}
          {this._showSubtitle()}

          {this._showDisclaimer()}
        
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
