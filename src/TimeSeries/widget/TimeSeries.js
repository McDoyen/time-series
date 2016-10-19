var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "dojo/_base/declare", "mendix/lang", "mxui/widget/_WidgetBase", "TimeSeries/lib/react", "TimeSeries/lib/react-dom", "./components/TimeSeries"], function (require, exports, dojoDeclare, mxLang, _WidgetBase, React, ReactDOM, TimeSeries_1) {
    "use strict";
    var TimeSeriesWrapper = (function (_super) {
        __extends(TimeSeriesWrapper, _super);
        function TimeSeriesWrapper() {
            _super.apply(this, arguments);
        }
        TimeSeriesWrapper.prototype.createProps = function () {
            return {
                dataLoaded: this.dataLoaded,
                dataStore: this.dataStore,
                height: this.height,
                heightUnits: this.heightUnits,
                seriesConfig: this.seriesConfig,
                widgetId: this.id + "_Wrapper",
                width: this.width,
                widthUnits: this.widthUnits,
                xAxisFormat: this.xAxisFormat,
                xAxisLabel: this.xAxisLabel,
                yAxisFormat: this.yAxisFormat,
                yAxisLabel: this.yAxisLabel
            };
        };
        TimeSeriesWrapper.prototype.postCreate = function () {
            this.updateRendering();
        };
        TimeSeriesWrapper.prototype.update = function (object, callback) {
            var _this = this;
            this.contextObject = object;
            this.updateData(function () {
                _this.dataLoaded = true;
                _this.updateRendering(callback);
            });
            this.resetSubscriptions();
        };
        TimeSeriesWrapper.prototype.uninitialize = function () {
            ReactDOM.unmountComponentAtNode(this.domNode);
            return true;
        };
        TimeSeriesWrapper.prototype.updateData = function (callback) {
            var _this = this;
            logger.debug(this.id + ".updateData");
            var series = this.seriesConfig[0];
            if (series.seriesSource === "xpath" && series.seriesEntity) {
                this.fetchDataFromXpath(series, function (data) {
                    _this.setDataFromObjects(data, series);
                    callback();
                });
            }
            else if (series.seriesSource === "microflow" && series.dataSourceMicroflow) {
                this.fetchDataFromMicroflow(series, function (data) {
                    _this.setDataFromObjects(data, series);
                    callback();
                });
            }
            else {
                logger.error(this.id + ".updateData unknown source or error in widget configuration");
                callback();
            }
        };
        TimeSeriesWrapper.prototype.updateRendering = function (callback) {
            ReactDOM.render(React.createElement(TimeSeries_1.TimeSeries, __assign({}, this.createProps())), this.domNode);
            mxLang.nullExec(callback);
        };
        TimeSeriesWrapper.prototype.resetSubscriptions = function () {
            var _this = this;
            if (this.contextObject) {
                this.subscribe({
                    callback: function (guid) {
                        _this.updateRendering();
                    },
                    guid: this.contextObject.getGuid()
                });
            }
        };
        TimeSeriesWrapper.prototype.fetchDataFromXpath = function (seriesConfig, callback) {
            var _this = this;
            if (this.contextObject) {
                var guid = this.contextObject ? this.contextObject.getGuid() : "";
                var constraint = seriesConfig.entityConstraint.replace("[%CurrentObject%]", guid);
                var xpathString = "//" + seriesConfig.seriesEntity + constraint;
                mx.data.get({
                    callback: callback.bind(this),
                    error: function (error) {
                        logger.error(_this.id + ": An error occurred while retrieving items: " + error);
                    },
                    filter: {
                        sort: [[seriesConfig.seriesXAttribute, "asc"]]
                    },
                    xpath: xpathString
                });
            }
            else {
                callback([]);
            }
        };
        TimeSeriesWrapper.prototype.setDataFromObjects = function (objects, seriesConfig) {
            logger.debug(objects);
            this.dataStore[seriesConfig.seriesKey] = objects.map(function (itemObject) { return ({
                x: itemObject.get(seriesConfig.seriesXAttribute),
                y: parseFloat(itemObject.get(seriesConfig.seriesYAttribute))
            }); });
        };
        TimeSeriesWrapper.prototype.fetchDataFromMicroflow = function (seriesConfig, callback) {
            var _this = this;
            if (seriesConfig.dataSourceMicroflow) {
                mx.data.action({
                    callback: callback.bind(this),
                    error: function (error) {
                        logger.error(_this.id + ": An error occurred while executing microflow: " + error);
                    },
                    params: {
                        actionname: seriesConfig.dataSourceMicroflow,
                        applyto: "selection",
                        guids: [this.contextObject.getGuid()]
                    }
                });
            }
            else {
                callback([]);
            }
        };
        return TimeSeriesWrapper;
    }(_WidgetBase));
    exports.TimeSeriesWrapper = TimeSeriesWrapper;
    dojoDeclare("TimeSeries.widget.TimeSeries", [_WidgetBase], (function (Source) {
        var result = {};
        for (var i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(TimeSeriesWrapper)));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TimeSeriesWrapper;
});
//# sourceMappingURL=TimeSeries.js.map