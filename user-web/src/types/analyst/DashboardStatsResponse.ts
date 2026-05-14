import { DashboardChartData } from "./DashboardChartData";
import { DashboardStatusData } from "./DashboardStatusData";

export interface DashboardStatsResponse {
	statusStructure: DashboardStatusData[];
	gmvFluctuation: DashboardChartData[];
	invoiceVolume: DashboardChartData[];
}
