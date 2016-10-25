// This type definition reflects the TimeSeries.xml modeler property configuration.
export default ModelProps;

export interface ModelProps {
    xAxisLabel?: string;
    xAxisFormat?: string;
    yAxisLabel?: string;
    yAxisFormat?: string;
    seriesConfig?: SeriesConfig[];
    width?: number;
    widthUnit?: WidthUnit;
    height?: number;
    heightUnit?: HeightUnit;
}

export interface SeriesConfig {
    seriesEntity?: string;
    seriesSource?: SeriesConfigSeriesSource;
    seriesXAttribute?: string;
    seriesYAttribute?: string;
    seriesKey?: string;
    entityConstraint?: string;
    dataSourceMicroflow?: string;
    seriesColor?: string;
    seriesFill?: boolean;
}

export type WidthUnit = "auto" | "pixels";

export type HeightUnit = "auto" | "pixels";

export type SeriesConfigSeriesSource = "xpath" | "microflow";
