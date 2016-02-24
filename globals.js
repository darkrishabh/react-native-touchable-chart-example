"use strict";
var React = require('react-native')
var RNRF = require('react-native-router-flux')
module.exports = {
    load: function(){
        String.prototype.format = function() {
            var formatted = this;
            for (var i = 0; i < arguments.length; i++) {
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        };
        window.pallette = {
            background: "#ECEFF1",
            primary_gray: "#37474F",
            dark_gray: "#263238",
            light_gray: "#113742",
            white: "#FFFFFF",
            dark_green: "#00796B",
            primary_teal : "#009688",
            dark_teal: "#00695C",
            textinput_blue_gray: "rgba(38,50,56,0.5)",
            pop_color: "#1DE9B6",
            stroke: "#607D8B",
            text_underline: "#111E26",
            muted_text: "#546E7A",
            dark_orange: "#E65100",
        }
        window.React = React
        window._ = require('lodash')
        window.Svg = require('react-native-art-svg')
        window.Router = RNRF.Router;
        window.Route = RNRF.Route;
        window.Animations = RNRF.Animations;
        window.Actions = RNRF.Actions;
        window.Container = RNRF.Container;
        window.Schema = RNRF.Schema;
        window.DeviceHeight = require('Dimensions').get('window').height
        window.DeviceWidth = require('Dimensions').get('window').width
        window.AppRegistry = React.AppRegistry
        window.AppStateIOS = React.AppStateIOS
        window.AlertIOS = React.AlertIOS
        window.NativeModules = React.NativeModules
        window.Text = React.Text
        window.WebView = React.WebView
        window.View = React.View
        window.DeviceEventEmitter = React.DeviceEventEmitter
        window.SegmentedControlIOS = React.SegmentedControlIOS
        window.ListView = React.ListView
        window.StatusBarIOS = React.StatusBarIOS
        window.StyleSheet = React.StyleSheet
        window.LayoutAnimation = React.LayoutAnimation
        window.TouchableHighlight = React.TouchableHighlight
        window.TouchableOpacity = React.TouchableOpacity
        window.TextInput = React.TextInput
        window.PickerIOS = React.PickerIOS
        window.PickerItemIOS = React.PickerItemIOS
        window.PushNotificationIOS = React.PushNotificationIOS
        window.Navigator = React.Navigator
        window.NavigatorIOS = React.NavigatorIOS
        window.ScrollView = React.ScrollView
        window.SwitchIOS = React.SwitchIOS
        window.moment = require('moment')
        window.numeral = require('numeral')
        if(!React.ART) {
            React.ART = require('ReactNativeART');
        }
    }
}