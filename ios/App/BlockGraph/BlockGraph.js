const Chart = React.createClass({
    _movex: 0,
    _movey: 0,
    current: null,
    graph: [],
    lines: [],
    x_axis: [],
    getInitialState: function () {
        return {
            start: false,
            graph: [],
            lines: [],
            x_axis: [],
            previous: {x: 0, y: this.props.height}
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
        me.current = me.x_axis.length + 1
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
            if (current === _.size(me.props.data)) {
                let on_going = Object.create(_.last(me.props.data).round)
                on_going.round_date = moment()
                me.props.onMove(on_going)
            }
            else {
                me.props.onMove(me.props.data[current].round)
            }
        }
        me.current = current

    },
    makeGraph: function () {
        const me = this
        /**
         * the props will have a data like this [{x: 23, y: 100}, {x:56, y:190}]
         * on hover detect the index and highlight the polygon on that index (_.map)
         * Also if there is a method to report the tracker then call that with the index
         */

        var {height, data} = this.props
        var previous = {x: 0, y: height}
        var graph_blocks = []
        var lines = []
        _.map(data, function (point) {
            let {x,y} = point
            graph_blocks.push('{0},{2} {0},{1} {3},{4} {3},{2}'
                .format(x, y, height, previous.x, previous.y))

            lines.push('M{2} {3} L{0} {1}'.format(x, y, previous.x, previous.y))
            lines.push('M{0} {1} L{0} {2}'.format(previous.x, previous.y, height))

            previous = {x: x, y: y}
        })
        me.graph = graph_blocks
        me.lines = lines
        me.setState({
            previous: previous
        })
    },
    render: function () {
        var me = this;
        var {height, width, highlightColor, fillColor, stroked, text_color} = me.props
        var previous = me.state.previous
        var graph_blocks = me.graph
        var lines = me.lines

        return (
            <View {...this._panResponder.panHandlers} style={{flex:1}}>
                <Svg.Svg height={height} width={width}>
                    {   /* Iterating through the blocks */
                        _.map(graph_blocks, function (l, i) {
                            return (
                                <Svg.Polygon
                                    key={i}
                                    points={l}
                                    fill={i === me.current ? pallette.pop_color : pallette.dark_teal}
                                    strokeWidth="0"/>
                            )
                        })
                    }
                    <Svg.Polygon
                        points={"{0},{1} {0},{3} {2},{3} {2},{1}".format(width, height, previous.x, previous.y)}
                        fill={me.current === me.x_axis.length ?  pallette.pop_color : pallette.dark_teal}
                        strokeWidth="0"/>

                    <Svg.G fill="none" stroke={text_color || "white"}
                           strokeWidth="1">
                        { /* Iterating through the lines */
                            _.map(lines, function (l, i) {
                                return (
                                    <Svg.Path
                                        key={i}
                                        strokeDasharray={stroked ? "2,2": "1"}
                                        stokeLineCap="round" d={l}/>
                                )
                            })
                        }

                        <Svg.Path strokeDasharray={stroked ? "2,2": "1"} stokeLineCap="round"
                                  d={'M{0} {1} L{2} {1}'.format(previous.x, previous.y, width)}/>

                        <Svg.Path strokeDasharray={stroked ? "2,2": "1"} stokeLineCap="round"
                                  d={'M{0} {1} L{0} {2}'.format(previous.x, previous.y, height)}/>
                    </Svg.G>

                    {
                        me.state.start ?
                            <Svg.G fill="none" stroke={text_color || "white"}
                                   strokeWidth="1">
                                <Svg.Path d={"M"+me._movex+" "+0+" L"+me._movex+" "+height}/>
                            </Svg.G> : <Svg.G />
                    }
                </Svg.Svg>
            </View>
        )
    }
});

module.exports = Chart