var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "TimeSeries/lib/d3", "TimeSeries/lib/react", "TimeSeriesChart/lib/nv.d3"], function (require, exports, d3_1, react_1) {
    "use strict";
    function isPlainObject(object) {
        if (typeof object === "object" && object !== null) {
            if (typeof Object.getPrototypeOf === "function") {
                var proto = Object.getPrototypeOf(object);
                return proto === Object.prototype || proto === null;
            }
            return Object.prototype.toString.call(object) === "[object Object]";
        }
        return false;
    }
    function configureComponents(chart, options) {
        for (var optionName in options) {
            if (options.hasOwnProperty(optionName)) {
                var optionValue = options[optionName];
                if (chart) {
                    if (isPlainObject(optionValue)) {
                        configureComponents(chart[optionName], optionValue);
                    }
                    else if (typeof chart[optionName] === "function") {
                        chart[optionName](optionValue);
                    }
                }
            }
        }
    }
    var NVD3LineChart = (function (_super) {
        __extends(NVD3LineChart, _super);
        function NVD3LineChart() {
            _super.apply(this, arguments);
        }
        NVD3LineChart.prototype.componentDidMount = function () {
            nv.addGraph(this.renderChart.bind(this));
        };
        NVD3LineChart.prototype.componentDidUpdate = function () {
            this.renderChart();
        };
        NVD3LineChart.prototype.componentWillUnmount = function () {
            if (this.resizeHandler) {
                this.resizeHandler.clear();
            }
        };
        NVD3LineChart.prototype.render = function () {
            var _this = this;
            var style = {
                height: this.props.height,
                width: this.props.width
            };
            return (react_1.DOM.div({ className: "nv-chart", style: style }, react_1.DOM.svg({ ref: function (n) { return _this.svg = n; } })));
        };
        NVD3LineChart.prototype.renderChart = function () {
            var _this = this;
            this.chart = (this.chart && !this.rendering) ? this.chart : nv.models.lineChart();
            configureComponents(this.chart, this.props.chartProps);
            this.chart.showLegend(true)
                .showXAxis(true)
                .showYAxis(true)
                .useInteractiveGuideline(true)
                .duration(350);
            this.selection = d3_1.select(this.svg)
                .datum(this.props.datum)
                .call(this.chart);
            if (!this.resizeHandler) {
                this.resizeHandler = nv.utils.windowResize(function () {
                    _this.chart.update();
                });
            }
            this.rendering = true;
            return this.chart;
        };
        return NVD3LineChart;
    }(react_1.Component));
    exports.NVD3LineChart = NVD3LineChart;
});
//# sourceMappingURL=nvd3-linechart.js.map