import _ from "lodash";
import bodyTheme from "./Body";
import leftTheme from "./Left";
import rightTheme from "./Right";
import headerTheme from "./Header";
import containerTheme from "./Container";
import contentTheme from "./Content";
import buttonTheme from "./Button";
import titleTheme from "./Title";
import badgeTheme from "./Badge";
import checkBoxTheme from "./CheckBox";
import h3Theme from "./H3";
import footerTheme from "./Footer";
import footerTabTheme from "./FooterTab";
import itemTheme from "./Item";
import textTheme from "./Text";
import iconTheme from "./Icon";
import listItemTheme from "./ListItem";
import formTheme from "./Form";
import variable from "./../variables/platform";
import cardTheme from "./Card";
import cardItemTheme from "./CardItem";

export default (variables = variable) => {
  const theme = {
    variables,

    "NativeBase.Card": {
      ...cardTheme(variables)
    },

    "NativeBase.CardItem": {
      ...cardItemTheme(variables)
    },
    "NativeBase.Left": {
      ...leftTheme(variables)
    },
    "NativeBase.Right": {
      ...rightTheme(variables)
    },
    "NativeBase.Body": {
      ...bodyTheme(variables)
    },

    "NativeBase.Header": {
      ...headerTheme(variables)
    },

    "NativeBase.Button": {
      ...buttonTheme(variables)
    },

    "NativeBase.Title": {
      ...titleTheme(variables)
    },

    "NativeBase.Badge": {
      ...badgeTheme(variables)
    },

    "NativeBase.CheckBox": {
      ...checkBoxTheme(variables)
    },

    "NativeBase.H3": {
      ...h3Theme(variables)
    },
    "NativeBase.Form": {
      ...formTheme(variables)
    },

    "NativeBase.Container": {
      ...containerTheme(variables)
    },
    "NativeBase.Content": {
      ...contentTheme(variables)
    },

    "NativeBase.Footer": {
      ...footerTheme(variables)
    },

    "NativeBase.Tabs": {
      flex: 1
    },

    "NativeBase.FooterTab": {
      ...footerTabTheme(variables)
    },

    "NativeBase.ListItem": {
      ...listItemTheme(variables)
    },

    "NativeBase.ListItem1": {
      ...listItemTheme(variables)
    },

    "NativeBase.Icon": {
      ...iconTheme(variables)
    },
    "NativeBase.IconNB": {
      ...iconTheme(variables)
    },
    "NativeBase.Text": {
      ...textTheme(variables)
    },

    "NativeBase.Item": {
      ...itemTheme(variables)
    },

    "NativeBase.PickerNB": {
      "NativeBase.Button": {
        "NativeBase.Text": {}
      }
    },

  };

  const cssifyTheme = (grandparent, parent, parentKey) => {
    _.forEach(parent, (style, styleName) => {
      // console.log('styleName', styleName);
      // console.log('parentKey', parentKey);
      if (
        styleName.indexOf(".") === 0 &&
        parentKey &&
        parentKey.indexOf(".") === 0
      ) {
        if (grandparent) {
          if (!grandparent[styleName]) {
            grandparent[styleName] = {};
          } else {
            grandparent[styleName][parentKey] = style;
          }
        }
      }
      if (style && typeof style === "object") {
        cssifyTheme(parent, style, styleName);
      }
    });
  };

  cssifyTheme(null, theme, null);

  return theme;
};
