import React, { Component } from "react";
import { StyleSheet, View, Alert, Dimensions,Linking} from "react-native";
import axios from 'axios';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {
  Container,
  Header,
  Badge,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import DeviceInfo from 'react-native-device-info';
import styles from "./styles";



const _urlServer = 'http://openanonymouslocation.org/api/v1/insertlocations/';
const _urlMap='http://openanonymouslocation.org/map.html?device=';
class Geolocations extends Component {



  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: false,
      deviceId:DeviceInfo.getUniqueID() || 'app-openanonymouslocation-test' ,
      sessionId:'64845c2e-e134-12e7-80c1-9a214cf098ae',
      totalLocations:0,
      ofuscate:0,
      message:'',
      interval:10
    };

    //this.goToSettings = this.goToSettings.bind(this);
    this.changeUUIID = this.changeUUIID.bind(this);
  }


  componentDidMount() {
     
      BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      autoSync: true,
      url: _urlServer
    });


   
    if(this.props && 
      this.props.navigation && 
      this.props.navigation.state && 
      this.props.navigation.state.params &&
      this.props.navigation.state.params.deviceId){
      this.setState({ deviceId: this.props.navigation.state.params.deviceId });      
     
  }

  
  if(this.props && 
    this.props.navigation && 
    this.props.navigation.state && 
    this.props.navigation.state.params &&
    this.props.navigation.state.params.ofuscate){      
    this.setState({ ofuscate: this.props.navigation.state.params.ofuscate });        
  }



      function logError(msg) {
        console.log(`[ERROR] getLocations: ${msg}`);
      }

      const handleHistoricLocations = locations => {
        let region = null;
        const now = Date.now();
        const latitudeDelta = 0.01;
        const longitudeDelta = 0.01;
        const durationOfDayInMillis = 24 * 3600 * 1000;

        const locationsPast24Hours = locations.filter(location => {
          return now - location.time <= durationOfDayInMillis;
        });

        if (locationsPast24Hours.length > 0) {
          // asume locations are already sorted
          const lastLocation =
            locationsPast24Hours[locationsPast24Hours.length - 1];
          region = Object.assign({}, lastLocation, {
            latitudeDelta,
            longitudeDelta
          });
        }
        this.setState({ locations: locationsPast24Hours, region });
      };

      BackgroundGeolocation.getValidLocations(
        handleHistoricLocations.bind(this),
        logError
      );

      BackgroundGeolocation.on('start', () => {
        
        console.log('[DEBUG] BackgroundGeolocation has been started!!');
        this.setState({ isRunning: true });
        
        this.setState({ locations: []});      
      const _sessionId=this.changeUUIID();
         this.setState({ sessionId:_sessionId });
      });

      BackgroundGeolocation.on('stop', () => {
        console.log('[DEBUG] BackgroundGeolocation has been stopped');
        this.setState({ isRunning: false });
      });

      BackgroundGeolocation.on('authorization', status => {
        console.log(
          '[INFO] BackgroundGeolocation authorization status: ' + status
        );
        if (status !== BackgroundGeolocation.auth.AUTHORIZED) {
          Alert.alert(
            'Location services are disabled',
            'Would you like to open location settings?',
            [
              {
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showLocationSettings()
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel'
              }
            ]
          );
        }
      });

      BackgroundGeolocation.on('error', ({ message }) => {
        Alert.alert('BackgroundGeolocation error', message);
      });

      BackgroundGeolocation.on('location', location => {
        console.log('[DEBUG] BackgroundGeolocation locations', location);

        BackgroundGeolocation.startTask(taskKey => {
          requestAnimationFrame(() => {
            const longitudeDelta = 0.01;
            const latitudeDelta = 0.01;
            if (location.radius) {
              const region = Object.assign({}, location, {
                latitudeDelta,
                longitudeDelta
              });
              const stationaries = this.state.stationaries.slice(0);
              stationaries.push(location);
              this.setState({ stationaries, region });
            } else {
              const region = Object.assign({}, location, {
                latitudeDelta,
                longitudeDelta
              });
              const locations = this.state.locations.slice(0);
              locations.push(location);
              this.setState({ locations, region });

              this.setState({
              totalLocations:locations.length
            });

            //console.info(location);
            


            const _newLongitude=location.longitude;
            
            _newLongitude=_newLongitude + parseFloat(this.state.ofuscate * 0.00001);

           
            const that=this;
            axios.get(_urlServer+this.state.deviceId, {
                    params: {
                      session: this.state.sessionId,
                      lat:location.latitude,
                      lon:_newLongitude,
                      timestamp:location.time
                    }
                  })
                  .then(function (response) {
                    that.setState({ message: '' });
                  })
                  .catch(function (error) {
                  
                    that.setState({ message: error });
                  });



            }
            BackgroundGeolocation.endTask(taskKey);
          });
        });


      });


      BackgroundGeolocation.on('foreground', () => {
        console.log('[INFO] App is in foreground');
      });

      BackgroundGeolocation.on('background', () => {
        console.log('[INFO] App is in background');
      });

      BackgroundGeolocation.checkStatus(({ isRunning }) => {
        this.setState({ isRunning });
      });
    }

    componentWillUnmount() {
      BackgroundGeolocation.events.forEach(event =>
        BackgroundGeolocation.removeAllListeners(event)
      );
    }

    goToSettings() {
      this.props.navigation.navigate('Menu');
    }

    changeUUIID() {
      var s = [];
       var hexDigits = "0123456789abcdef";
       for (var i = 0; i < 36; i++) {
         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
       }
       s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
       s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
       s[8] = s[13] = s[18] = s[23] = "-";

       var uuid = s.join("");

      this.setState({
        sessionId: uuid
      })

      return uuid;
    }


    toggleTracking() {
      BackgroundGeolocation.checkStatus(({ isRunning, authorization }) => {
        if (isRunning) {
          BackgroundGeolocation.stop();
          return false;
        }
        if (authorization == BackgroundGeolocation.auth.AUTHORIZED) {
          BackgroundGeolocation.start();
        } else {
          // Location services are disabled
          Alert.alert(
            'Location services disabled',
            'Would you like to open location settings?',
            [
              {
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showLocationSettings()
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel'
              }
            ]
          );
        }
      });
    }

  render() {
    const { height, width } = Dimensions.get('window');
    const { locations, stationaries, region, isRunning,sessionId,deciceId,totalLocations } = this.state;


    //this.state.navigation.state.params.deviceId
    return (
      <Container style={styles.container}>
        <Header  style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
            <Right>
          <Body>
            <Title>Geolocations</Title>
          </Body>
          </Right>
        </Header>

        <Content padder>
          <Text></Text>
          <Left>
          <Button style={isRunning ? styles.button2 : styles.button1} onPress={this.toggleTracking}>
                        <Icon name={isRunning ? 'pause' : 'play'} style={isRunning ? styles.button2 : styles.button1} />
                        <Text>{isRunning ? 'Stop capture' : 'Start Capture'}</Text>
                      </Button>
          </Left>
          <Left>
          <Badge style={{ backgroundColor: '#aaaaaa',marginTop: 15 }} enable={this.state.isRunning}>
            <Text style={{ color: 'white' }} >Published geolocations: {this.state.totalLocations}</Text>
          </Badge>
          </Left>

          <Left>
         
            <Text style={{marginTop: 5, color: 'red' }} >{this.state.message}</Text>
          
          </Left>

          <Right>
          <Body style={{flex:1}}>
          <Button style={{marginTop:50,height: 25}} bordered info  onPress={ ()=>{ Linking.openURL(_urlMap + this.state.deviceId)}} >
            <Text>View your Geolocations</Text>
            </Button> 
          </Body>
          </Right>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <Button style={styles.footer} active full  onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Text>Menu</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Geolocations;
