"use strict";
const Home = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={Actions.Line}
                    style={styles.button}>
                <Text style={styles.button_text}>
                    Line Chart
                </Text>
            </TouchableOpacity>
                <TouchableOpacity
                    onPress={Actions.Block}
                    style={styles.button}>
                <Text style={styles.button_text}>
                    Block Graph
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
});
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
    button_text: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    button: {
        margin: 10,
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    }
});
module.exports = Home
