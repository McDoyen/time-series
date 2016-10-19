
/// <reference path="../node_modules/mendix-client/mendix-client/mendix.d.ts" />
/// <reference path="../node_modules/mendix-client/mendix-client/mxui.d.ts" />
/// <reference path="../node_modules/mendix-client/mendix-client/mx.d.ts" />

declare module "TimeSeries/lib/react-dom" {
	export = ReactDOM;
}

declare module "TimeSeries/lib/react" {
	export = React;
}

declare module "TimeSeries/lib/d3" {
	export = d3;
}

declare module "TimeSeries/lib/nv.d3" {
	export = nv;
}
