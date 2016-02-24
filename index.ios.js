/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
const globals =require('./globals').load()
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

var Home = require('./ios/App/Home')
var LineChart = require('./ios/App/LineChart/LC')
var BlockChart = require('./ios/App/BlockGraph/BG')
class charts extends Component {
    render() {
        return (
                <Router>
                    <Schema name="modal"
                            sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default"
                            sceneConfig={Navigator.SceneConfigs.FlatFloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    <Schema name="tab"/>

                    <Route name="home" schema={"default"}
                           component={Home}
                           initial={true}
                           title="Home"/>
                    <Route name="Line" schema={"default"}
                           component={LineChart}
                           title="Line Chart"/>
                    <Route name="Block" schema={"default"}
                           component={BlockChart}
                           title="Block Chart"/>

                </Router>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('charts', () => charts);
