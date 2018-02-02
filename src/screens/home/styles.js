const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 1,
    padding: 20
  },
  containerLogo: {
    paddingTop: 15,
    flex: 1,
    alignItems: "center",
  },
  logo: {

    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5,
    lineHeight: 25,
  },
  containerSubtitle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  containerButton: {
    flex: 1
  },
  disclaimerContainer: {
    flex: 3,

  },
  disclaimerBody: {
    padding: 5
  }
};
