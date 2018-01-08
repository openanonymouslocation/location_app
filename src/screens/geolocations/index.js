import React, { Component } from "react";
import { StyleSheet, View, Alert, Dimensions} from "react-native";
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

import styles from "./styles";



class Geolocations extends Component {



  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: false,
      deviceId:'test_openanomynouslocation_app',
      sessionId:'64845c2e-e134-12e7-80c1-9a214cf098ae',
      totalLocations:0
    };

    //this.goToSettings = this.goToSettings.bind(this);
    this.changeUUIID= this.changeUUIID.bind(this);
  }


  componentDidMount() {
      console.log('map did mount');

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
      url: 'http://openanonymouslocation.org/api/v1/insertlocations/',
      httpHeaders: {
        'X-FOO': 'bar'
      }
    });

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

        console.log('[DEBUG] BackgroundGeolocation has been started');
        this.setState({ isRunning: true });
        if(this.state && this.state.navigation && this.state.navigation.state && this.state.navigation.state.params.deviceId){
            this.setState({ deviceId: this.state.navigation.state.params.deviceId });
          //test_openanomynouslocation_app
        }else{
          console.info(this.state.deviceId);
        }
        //console.info(this.state.navigation.state.params.deviceId);
      // this.setState({ locations:[] });
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
        console.log("holaaaaa000");

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

            console.info("holaaaaa");
            console.info(this.state);
//console.info(this.state.navigation.state.params.deviceId);
          //  const deviceId=this.state.deviceId || this.changeUUIID();

  console.log(this.state.sessionId);
//  console.log(deviceId);

            }
            BackgroundGeolocation.endTask(taskKey);
          });
        });

        console.info("holaaaaa111");
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
          // calling start will also ask user for permission if needed
          // permission error will be handled in permisision_denied event
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
          <Badge info style={styles.mb} enable={this.state.isRunning}>
            <Text>Published geolocations: {this.state.totalLocations}</Text>
          </Badge>

  </Left>
          <Right>
          <Body>

            <Title>Default</Title>
            <Text>View your Geolocations</Text>
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
