'use strict';
const LineChart = React.createClass({
    _movex: 0,
    _movey: 0,
    current: null,
    lines: [],
    x_axis: [],
    getInitialState: function () {
        return {
            start: false,
            lines: [],
            x_axis: [],
            previous: {
                x: 0,
                y: this.props.height
            }
        }
    },
    componentDidMount: function () {
        const me = this
        me.x_axis = me.props.data.map((point)=> { return point.x })
    },
    componentWillMount: function () {
        const me = this
        me.makeGraph()
        this._panResponder = React.PanResponder.create({
            onStartShouldSetPanResponder: (e, gs)=> {return true},
            onMoveShouldSetPanResponder: (e, gs)=> {return true},
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    },
    _handlePanResponderGrant: function (e:Object, gestureState:Object) {
        const me = this
        this._movex = e.nativeEvent.locationX
        this._movey = e.nativeEvent.locationY
        this.hover(e.nativeEvent.locationX)
        this.setState({
            start: true
        })
    },
    _handlePanResponderMove: function (e:Object, gestureState:Object) {
        this._movex = e.nativeEvent.locationX
        this._movey = e.nativeEvent.locationY
        this.hover(e.nativeEvent.locationX)
    },
    _handlePanResponderEnd: function (e:Object, gestureState:Object) {
        const me = this
        if (me.props.onMove) {
            me.props.onMove(null)
        }
        this.current = me.x_axis.length + 1
        this.setState({start: false})

    },
    hover: function (x) {
        const me = this
        let x_axis = me.x_axis
        var current = me.current
        if (x < x_axis[0]) {
            if (current !== 0) {
                current = 0
            }
        } else if (x >= x_axis[x_axis.length - 1]) {
            if (current !== x_axis.length) {
                current = x_axis.length
            }
        } else {
            for (let i = 0; i < x_axis.length - 1; i++) {
                if (x_axis[i + 1] > x && x_axis[i] < x) {
                    if (current !== i + 1) {
                        current = i + 1
                        break;
                    }
                }
            }
        }
        if (me.props.onMove) {
            if (current === 0) {
                me.props.onMove(null)
            }
            else {
                me.props.onMove(me.props.data[current - 1])
            }
        }
        me.current = current


    },
    makeGraph: function () {
        const me = this
        var {height, data} = this.props
        var previous = {x: 0, y: height}
        var lines = []
        _.map(data, function (point) {
            let {x,y} = point
            lines.push('M{2} {3} L{0} {1}'.format(x, y, previous.x, previous.y))
            //lines.push('M{0} {1} L{0} {2}'.format(previous.x, previous.y, height))

            previous = {x: x, y: y}
        })
        me.lines = lines
        me.setState({previous: previous})
    },
    render: function () {
        var me = this;
        var {height, width, stroked, text_color,} = me.props
        var previous = me.state.previous
        var lines = me.lines

        return (
            <View {...this._panResponder.panHandlers}
                style={{flex:1, alignSelf: "center",alignItems: "center"}}>
                <Svg.Svg key="graph" height={height}
                         width={width}>

                    <Svg.G fill="none" stroke={text_color || "white"}
                           strokeWidth="1">
                        {
                            _.map(lines, function (line, i) {
                                return (
                                    <Svg.Path
                                        key={i}
                                        strokeDasharray={stroked ? "2,2": "1"}
                                        stokeLineCap="round" d={line}/>
                                )
                            })
                        }
                        <Svg.Path strokeDasharray={stroked ? "2,2": "1"}
                                  stokeLineCap="round"
                                  d={"M{0} {1} L{2} {1}".format(previous.x, previous.y, width)}/>
                    </Svg.G>



                    <Svg.G fill="none" stroke={pallette.dark_orange}
                           strokeWidth="5">

                        <Svg.Path strokeDasharray={stroked ? "2,2": "1"}
                                  stokeLineCap="round"
                                  d={"M0 0 L0 {0}".format(height)}/>

                        <Svg.Path strokeDasharray={stroked ? "2,2": "1"}
                                  stokeLineCap="round"
                                  d={"M0 {0} L{1} {0}".format(height, width)}/>
                    </Svg.G>


                    {me.state.start ?
                        <Svg.G key={me._movex} fill="none" stroke={pallette.pop_color}
                               strokeWidth="3">
                            <Svg.Path
                                d={"M{0} 0 L{0} {1}".format(me._movex, height)}/>
                        </Svg.G> : <Svg.G /> }
                </Svg.Svg>
            </View>
        )
    }
});

module.exports = LineChart