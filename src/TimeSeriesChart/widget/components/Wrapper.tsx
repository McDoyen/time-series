
import * as React from "TimeSeriesChart/lib/react";

import { NVD3LineChart } from "./nvd3-linechart";
import * as d3 from "TimeSeriesChart/lib/d3";

// import * as NVD3Chart from "TimeSeriesChart/lib/react-nvd3";
import { ModelProps } from "../../TimeSeriesChart.d";

export interface Data {
    x: number;
    y: number;
}
export interface Serie {
    values?: Data[];
    key?: any;
    color?: string;
    area?: boolean;
}
export interface WidgetProps extends ModelProps {
    seriesData?: Serie[];
    dataLoaded?: boolean;
}
export class Wrapper extends React.Component<WidgetProps, {}> {

    public constructor(props: WidgetProps) {
        super(props);

        this.getDatum = this.getDatum.bind(this);
    }

    public componentWillMount() {
        this.checkConfig();
    }
    private checkConfig() {
        // TODO add validation on config if needed.
    }
    public render() {
        const props = this.props;
        if (props.dataLoaded) {
            const datum = this.getDatum();
            const xFormat = props.xAxisFormat ? props.xAxisFormat : "%d-%b-%y";
            const yFormat = props.yAxisFormat ? props.yAxisFormat : "";
            const xScale = d3.time.scale().range([ 0, this.props.width ]);
            const yScale = d3.scale.linear().range([ this.props.height, 0 ]);

            return React.createElement(NVD3LineChart, {
                chartProps: {
                    duration: 300,
                    showLegend: props.showLegend,
                    showXAxis: props.showXAxis,
                    showYAxis: props.showYAxis,
                    type: "lineChart",
                    useInteractiveGuideline: props.useInteractiveGuidelines,
                    xAxis: {
                        axisLabel: this.props.xAxisLabel,
                        scale: xScale,
                        showMaxMin: true,
                        tickFormat: (dataPoint: any) => {
                            return d3.time.format(xFormat)(new Date(dataPoint));
                        }
                    },
                    xDomain: d3.extent(datum[0].values, (d: any) => {
                        return d.x;
                        }),
                    xScale: d3.time.scale(),
                    yAxis: {
                        axisLabel: this.props.yAxisLabel,
                        scale: yScale,
                        tickFormat: (dataPoint: any) => {
                            if (yFormat) {
                                return d3.format(yFormat)(dataPoint);
                            } else {
                                return dataPoint;
                            }
                        }
                    },
                    yDomain: [ 0, d3.max(datum[0].values, (d: any) => {
                        return d.y;
                    }) ]
                },
                datum,
                height: this.props.height,
                width: this.props.width
            });
        } else {
            return <div>Loading ...</div>;
        }
    }
    private getDatum(): Serie[] {
        return this.props.seriesConfig.map(serieConfig => ({
            color: serieConfig.serieColor ? serieConfig.serieColor : undefined,
            isArea: true,
            key: serieConfig.serieKey,
            values: serieConfig.serieData
        }));
    }
}
