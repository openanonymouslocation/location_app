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
const Item = Picker.Item;
const datas = [
  {
    route: "RegularActionSheet",
    text: "ID: 64833c2e-e197-11e7-80c1-9a214cf093ae"
  }
];

const datas1 = [

  {
    route: "IconActionSheet",
    text: "GPS data every (seconds):"
  }
];
const datas3 = [


  {
    route: "IconActionSheet",
    text: "Ofuscate coordinates (meters):"
  }
];

const datas2 = [


  {
    route: "IconActionSheet",
    text: "Publish only using wifi"
  }
];

import styles from "./styles";

class NHPicker extends Component {
  constructor(props) {
     super(props);
     this.state = {
       selected2: undefined,
         checkbox1: true
     };
   }
   toggleSwitch1() {
     this.setState({
       checkbox1: !this.state.checkbox1
     });
   }
   onValueChange2(value: string) {
     this.setState({
       selected2: value
     });
   }
  render() {
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
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="refresh" style={{fontSize:30, color: "#3E4967" }} />
                </Right>
              </ListItem>}
          />


          <List
            dataArray={datas2}
            renderRow={data =>
              <ListItem
               button onPress={() => this.toggleSwitch1()}

              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                <CheckBox  style={{borderColor:"#3E4967" }}
                checked={this.state.checkbox1}
                onPress={() => this.toggleSwitch1()}
                />
                </Right>
              </ListItem>}
          />

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
         selectedValue={this.state.selected2}
         onValueChange={this.onValueChange2.bind(this)}
        >
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
       selectedValue={this.state.selected2}
       onValueChange={this.onValueChange2.bind(this)}
      >
       <Item label="0m" value="0" />
       <Item label="10m" value="10" />
       <Item label="20m" value="20" />
     <Item label="30m" value="30" />

      </Picker>
      </Form>



        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
          <Button  style={styles.footer} active full   onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
