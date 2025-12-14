import { Component, inject, resource } from '@angular/core';
import { HeaderLinkCardComponent } from '../../../shared/components/header-link-card/header-link-card';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card';
import { StatusDistributionComponent } from '../components/status-distribution/status-distribution';
import { TopCitiesComponent } from '../components/top-cities/top-cities';
import { LeadsService } from '../../leads/services/leads-service';
import { PropertiesService } from '../../properties/services/properties-service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DashboardMetrics } from '../types/metrics.interface';
import { DashboardService } from '../services/dashboard-service';
import { LeadsByStatusItem, LeadsByStatusItemUI } from '../types/leads-by-status.interface';
import { TopMunicipalityItem } from '../types/top-municipality.interface';
import { LEAD_STATUS_LABEL_MAP } from '../../leads/constants/status';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderLinkCardComponent,
    StatCardComponent,
    StatusDistributionComponent,
    TopCitiesComponent,
    PageHeaderComponent,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  leadsService = inject(LeadsService);
  propertiesService = inject(PropertiesService);
  dashboardService = inject(DashboardService);

  metrics = resource({
    loader: async (): Promise<DashboardMetrics> => this.dashboardService.getMetrics(),
    defaultValue: {} as DashboardMetrics,
  });

  leadsByStatus = resource({
    loader: async (): Promise<LeadsByStatusItemUI[]> => {
      const data = await this.dashboardService.getLeadsByStatus();
      return data.map((item: LeadsByStatusItem) => ({
        percentage: parseFloat(item.percentage.toFixed(2)),
        total: item.total,
        status: LEAD_STATUS_LABEL_MAP[item.status],
      }));
    },
    defaultValue: [] as LeadsByStatusItemUI[],
  });

  topCities = resource({
    loader: async (): Promise<TopMunicipalityItem[]> => this.dashboardService.getTopCities(),
    defaultValue: [] as TopMunicipalityItem[],
  });

  statCards = [
    {
      title: 'Total de Leads',
      subtitle: 'Leads cadastrados no sistema',
      icon: 'pi pi-users',
      value: () => this.metrics.value()?.totalLeads ?? 0,
    },
    {
      title: 'Leads Prioritários',
      subtitle: 'Propriedades > 100 hectares',
      icon: 'pi pi-star',
      value: () => this.metrics.value()?.totalLeadsWithPropertiesOver100Hectares ?? 0,
    },
    {
      title: 'Área Total',
      subtitle: 'Soma das propriedades',
      icon: 'pi pi-map-marker',
      value: () => `${this.metrics.value()?.totalArea ?? 0} ha`,
    },
    {
      title: 'Municípios',
      subtitle: 'Regiões de atuação',
      icon: 'pi pi-globe',
      value: () => this.metrics.value()?.totalMunicipalities ?? 0,
    },
  ];
}
