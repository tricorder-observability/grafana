// This file is autogenerated. DO NOT EDIT.
//
// Generated by public/app/plugins/gen.go
//
// Derived from the Thema lineage declared in models.cue
//
// Run `make gen-cue` from repository root to regenerate.


import * as ui from '@grafana/schema';

export const PanelModelVersion = Object.freeze([0, 0]);


export enum PieChartType {
  Donut = 'donut',
  Pie = 'pie',
}

export enum PieChartLabels {
  Name = 'name',
  Percent = 'percent',
  Value = 'value',
}

export enum PieChartLegendValues {
  Percent = 'percent',
  Value = 'value',
}

export interface PieChartLegendOptions extends ui.VizLegendOptions {
  values: PieChartLegendValues[];
}

export const defaultPieChartLegendOptions: Partial<PieChartLegendOptions> = {
  values: [],
};

export interface PanelOptions extends ui.OptionsWithTooltip, ui.SingleStatBaseOptions {
  displayLabels: PieChartLabels[];
  legend: PieChartLegendOptions;
  pieType: PieChartType;
}

export const defaultPanelOptions: Partial<PanelOptions> = {
  displayLabels: [],
};

export interface PanelFieldConfig extends ui.HideableFieldConfig {}

