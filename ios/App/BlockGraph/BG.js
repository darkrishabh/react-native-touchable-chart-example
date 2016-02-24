var BlockGraph = require('./BlockGraph')
var BG = React.createClass({
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
        console.log(layout)
        if (me.state.height !==
            layout.height &&
            me.state.width !==
            layout.width) {
            this.setState({height: layout.height-60, loading: false, width: layout.width})
        }
    },
    make_coordinates: function () {
        const me = this
        let coordinates = []
        var {height, width} = me.state
        let my_data = my_valuation_data
        let first_round = _.first(my_data)
        let valuation = _.map(my_data, function (round) {
            return round.valuation
        })
        let max_valuation = Math.max.apply(Math, valuation)

        function getX(time) {
            let last_time = moment()
            let first_time = moment(first_round.round_date)
            //first_time.subtract(1, "years")
            let period = last_time - first_time
            let current_time = moment(time)
            let delta = current_time - first_time
            return (delta / period) * width
        }

        function getY(money) {
            let y_sub = (money / 300000) * height
            if (y_sub !== height) {
                y_sub = Math.abs(y_sub - height + 20)
            } else {
                y_sub = Math.abs(y_sub - height)
            }
            return y_sub
        }

        coordinates = _.map(my_data, function (round) {
            return {
                x: getX(round.round_date),
                y: getY(round.valuation),
                round: round,
            }
        })
        return coordinates

    },
    onMove: function (data) {
        this.setState({current: data})

    },
    render: function () {
        const me = this
        const current = me.state.current || _.first(my_valuation_data)
        console.log(current)
        return (
            <View style={{flex:1}}>
                <View
                    onLayout={me.setLayout}
                    style={{flex:2, paddingTop: 60, backgroundColor: pallette.dark_teal}}>

                    {me.state.loading ? null :
                        <BlockGraph height={me.state.height}
                                    width={me.state.width}
                                    onMove={me.onMove}
                                    highlightColor={pallette.pop_color}
                                    text_color={pallette.white}
                                    data={me.make_coordinates()}/>
                    }

                </View>
                {
                    // Make use of this place to show some more data.
                }
                <View style={{flex:1, paddingTop: 20, alignItems: "center",
                backgroundColor: pallette.primary_teal}}>
                    <Text style={{ color: "white", alignSelf: "center"}}>
                        Event : <Text style={{fontWeight: "bold"}}>
                            {current._type}
                        </Text>
                    </Text>
                    <Text style={{fontWeight: "bold", color: "white",fontSize: 38}}>
                        {numeral(current.valuation).format("$0,0")}
                    </Text>
                    <Text style={{ color: "white", alignSelf: "center"}}>
                        <Text style={{fontWeight: "bold"}}>
                        {current.stage}
                    </Text>
                    </Text>
                    <Text style={{ color: "white", alignSelf: "center"}}>
                        <Text style={{fontWeight: "bold"}}>
                            {current.round_date ?
                            moment(current.round_date).format('MMM DD, YYYY') :
                            "0.00"}
                    </Text>
                    </Text>
                </View>
            </View>
        )
    }
})

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
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    }
});


const my_valuation_data = [
    {
        _type: "Birth",
        round_date: "1991-01-31T00:00:00",
        valuation: 100,
        stage: "Just Born"
    },
    {
        _type: "First Birthday",
        round_date: "1992-01-31T00:00:00",
        valuation: 5000,
        stage: "Smartness Revealed"
    },
    {
        _type: "First School Dance Competition",
        round_date: "1995-05-02T00:00:00",
        valuation: 15000,
        stage: "First Place winner in 2nd grade"
    },
    {
        _type: "My Sibling",
        round_date: "1997-10-23T00:00:00",
        valuation: 5000,
        stage: "Just got promoted to CHILD #1"
    },
    {
        _type: "Great News",
        round_date: "2000-01-1T00:00:00",
        valuation: 20000,
        stage: "Millennium"
    },
    {
        _type: "Got into College",
        round_date: "2008-08-1T00:00:00",
        valuation: 100,
        stage: "No questions please."
    },
    {
        _type: "First Job",
        round_date: "2012-04-1T00:00:00",
        valuation: 100000,
        stage: "Yay"
    },
    {
        _type: "few more years",
        round_date: "2014-02-1T00:00:00",
        valuation: 200000,
        stage: "Progressive"
    },
]

module.exports = BG