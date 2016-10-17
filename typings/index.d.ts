
/// <reference path="../node_modules/mendix-client/mendix-client/mendix.d.ts" />
/// <reference path="../node_modules/mendix-client/mendix-client/mxui.d.ts" />
/// <reference path="../node_modules/mendix-client/mendix-client/mx.d.ts" />

declare module "TimeSeriesChart/lib/react-dom" {
	export = ReactDOM;
}

declare module "TimeSeriesChart/lib/react" {
	export = React;
}

declare module "TimeSeriesChart/lib/d3" {
	export = d3;
}

declare module "TimeSeriesChart/lib/nv.d3" {
	export = nv;
}
