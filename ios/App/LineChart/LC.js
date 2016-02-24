var LineChart = require('./LineChart')
var LC = React.createClass({
    getInitialState: function () {
        return {
            height: 0,
            data: [],
            loading: true,
            width: 0,
            current: null
        }
    },
    setLayout: function (event) {
        const me = this
        let layout = event.nativeEvent.layout
        if (me.state.height !== layout.height &&
            me.state.width !== layout.width) {
            let graph = []
            for (var i = 0; i < DeviceWidth; i+=10) {
                graph.push({
                    x: i,
                    y: _.random(layout.height, 100)
                })
            }
            this.setState({height: layout.height,  data: graph, loading: false, width: layout.width-40})
        }
    },
    onMove: function(data){
        this.setState({current: data})

    },
    render: function () {
        const me = this

        return (
            <View style={styles.container}>
                <View
                    onLayout={me.setLayout}
                    style={{flex:2,marginTop: 20,}}>

                    {me.state.loading ? null :
                        <LineChart height={me.state.height}
                                   width={me.state.width}
                                   onMove={me.onMove}
                                   text_color={pallette.white}
                                   data={me.state.data}/>
                    }

                </View>
                {
                    // Make use of this place to show some more data.
                }
                <View style={{flex:0.5, justifyContent: "center"}}>
                    <Text style={{alignSelf: "center", color: "white"}}>
                        { me.state.current ?
                        "X = "+me.state.current.x + " \nY = " + me.state.current.y:
                        "Data will be shown here"}
                    </Text>
                </View>
            </View>
        )
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: pallette.dark_gray,
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
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    }
});

module.exports = LC