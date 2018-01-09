import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  CheckBox,
  Right,
  Item as FormItem,
  Picker,
  Form,
  Input,
  Label,
  Body,
  Left,
  List,
  Footer,
  FooterTab,
  ListItem
} from "native-base";

import DeviceInfo from 'react-native-device-info';

const Item = Picker.Item;


import styles from "./styles";

class NHPicker extends Component {

  static defaultProps = {
      interval: 10,
      fastestInterval: 0,
      activitiesInterval: 0,
      startOnBoot: false,
      deviceId:DeviceInfo.getUniqueID(),
      ofuscate:0
    };


  constructor(props) {
     super(props);

     this.state = {
      ofuscate: 0,
      interval:10,
      syncmode:true,
      deviceId:DeviceInfo.getUniqueID()
     };

    this.onPress = this.onPress.bind(this);
   this.onChange = this.onChange.bind(this);
   this.changeDeviceID();


   }


    onPress(key) {
       this.props.onEdit(key);
     }


     onChange(val, key) {
       this.props.onChange(key, val);
     }

     changeDeviceID() {
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
         deviceId: uuid
       });

     }

   toggleSwitch1() {
     this.setState({
       syncmode: !this.state.syncmode
     });
   }
   onValueChangeOfuscate(value) {

     this.setState({
       ofuscate: value
     });
   }


   onValueChangeInterval(value) {
     this.setState({
       interval: value
     });
   }

  render() {

    const {
          interval,
          fastestInterval,
          activitiesInterval,
          locationProvider,
          startOnBoot,
          deviceId,
          syncmode,
          message,
          ofuscate
        } = this.props;




    return (
      <Container style={styles.container}>
        <Header  style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{backgroundColor:'#fff'}}>
          <List>
          <ListItem itemDivider>
          <Left>
            <Text>{'Device id:'}</Text>
          </Left>
          </ListItem>
              <ListItem>
                <Left>
                  <Text>
                    {this.state.deviceId}
                  </Text>
                </Left>
                <Right>
                  <Icon  onPress={() => this.changeDeviceID()} name="refresh" style={{fontSize:30, color: "#3E4967" }} />
                </Right>
              </ListItem>
          </List>
          <List>
          <ListItem itemDivider>
          <Left>
            <Text>{'Send locations:'}</Text>
          </Left>
          </ListItem>
              <ListItem
               button onPress={() => this.toggleSwitch1()}>
                <Left>
                  <Text>
                    {'Syncronized'}
                  </Text>
                </Left>
                <Right>
                <CheckBox  style={{borderColor:"#3E4967" }}
                checked={this.state.syncmode}
                onPress={() => this.toggleSwitch1()}
                />
                </Right>
              </ListItem>
          </List>

          <Form style={{paddingLeft:25, paddingTop:15,borderBottomColor: '#f7f7f7',backgroundColor:'#fff'}}>
          <Text>
            {'GPS data every (seconds):'}
          </Text>
          <Picker
         mode="dropdown"
         mode="dropdown"
        headerStyle={{ backgroundColor: "#b95dd3" }}
        headerBackButtonTextStyle={{ color: "#fff" }}
        headerTitleStyle={{ color: "#fff" }}
         placeholder="Select One"
         selectedValue={this.state.interval}
         onValueChange={this.onValueChangeInterval.bind(this)}>
         <Item label="10s" value="10" />
         <Item label="20s" value="20" />
         <Item label="40s" value="40" />
        <Item label="60s" value="60" />
        <Item label="100s" value="100" />
        <Item label="120s" value="120" />
        </Picker>
        </Form>
        <Form style={{paddingLeft:25, paddingTop:15,backgroundColor:'#fff'}}>
        <Text>
          {'Ofuscate coordinates (meters)'}
        </Text>
        <Picker
       mode="dropdown"
       mode="dropdown"
      headerStyle={{ backgroundColor: "#b95dd3" }}
      headerBackButtonTextStyle={{ color: "#fff" }}
      headerTitleStyle={{ color: "#fff" }}
       placeholder="Select One"
       selectedValue={this.state.ofuscate}
       onValueChange={this.onValueChangeOfuscate.bind(this)}>
       <Item label="0m" value="0" />
       <Item label="10m" value="10" />
       <Item label="20m" value="20" />
     <Item label="30m" value="30" />
      </Picker>
      </Form>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
          <Button  style={styles.footer} active full   onPress={() => this.props.navigation.navigate("Geolocations",{
            deviceId:this.state.deviceId,
            interval:this.state.interval,
            ofuscate:this.state.ofuscate
          })}>
            <Icon name='ios-checkmark-circle' />
            <Text>Done</Text>
          </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default NHPicker;
