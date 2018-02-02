import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";





class HeaderNB extends Component {
  // eslint-disable-line

  render() {
    return (
      <Container >
        <Header style={{ backgroundColor: "#3E4967"}} >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>About</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Left>

          <Text style={{fontSize:18,padding:10}}>
{'OpenAnonymousLocation  is a collaborative Open Source project to publish and visualize geolocations!'}
          </Text>
          <Text style={{fontSize:18,padding:10}}>
            {'More Info:'}
          </Text>

          <Text style={{fontSize:18,padding:10}}>
            {'http://openanonymouslocation.org'}
          </Text>
          </Left>
        </Content>
      </Container>
    );
  }
}

export default HeaderNB;
