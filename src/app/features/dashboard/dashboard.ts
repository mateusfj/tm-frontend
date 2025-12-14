import { Component, inject, resource } from '@angular/core';
import { HeaderLinkCardComponent } from '../../shared/components/header-link-card/header-link-card.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { StatusDistributionComponent } from './components/status-distribution/status-distribution.component';
import { TopCitiesComponent } from './components/top-cities/top-cities.component';
import { LeadsService } from '../leads/services/leads-service';
import { PropertiesService } from '../properties/services/properties-service';
import { ILeads, LeadStatusEnum } from '../leads/types/leads';
import { IProperty } from '../properties/types/properties';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

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

  leads = resource({
    loader: async (): Promise<ILeads[]> => this.leadsService.getLeads(),
    defaultValue: [],
  });

  properties = resource({
    loader: async (): Promise<IProperty[]> => this.propertiesService.getProperties(),
    defaultValue: [],
  });

  get totalLeads(): number {
    const data = this.leads.value();
    return data.length;
  }

  get totalArea(): number {
    const data = this.properties.value();
    return data.reduce((sum, p) => sum + (p.area ?? 0), 0);
  }

  get prioritizedLeads(): number {
    // Define priority as properties with area > 100 or leads with status NEGOTIATING
    const props = this.properties.value();
    const leads = this.leads.value();
    const byArea = props.filter((p) => p.area > 100).length;
    const byStatus = leads.filter((l) => l.status === LeadStatusEnum.NEGOTIATING).length;
    return byArea + byStatus;
  }

  get municipalitiesCount(): number {
    const cities = this.leads
      .value()
      .map((l) => l.city)
      .filter(Boolean) as string[];
    return new Set(cities).size;
  }

  get statusDistribution(): Array<{ label: string; count: number; percentage: number }> {
    const leads = this.leads.value();
    const total = leads.length || 1;
    const counts: Record<string, number> = {};
    for (const l of leads) {
      counts[l.status] = (counts[l.status] ?? 0) + 1;
    }
    const order: LeadStatusEnum[] = [
      LeadStatusEnum.NEW,
      LeadStatusEnum.INITIAL_CONTACT,
      LeadStatusEnum.NEGOTIATING,
      LeadStatusEnum.CONVERTED,
      LeadStatusEnum.LOST,
    ];
    const labelMap: Record<LeadStatusEnum, string> = {
      [LeadStatusEnum.NEW]: 'Novo',
      [LeadStatusEnum.INITIAL_CONTACT]: 'Contato Inicial',
      [LeadStatusEnum.NEGOTIATING]: 'Em Negociação',
      [LeadStatusEnum.CONVERTED]: 'Convertido',
      [LeadStatusEnum.LOST]: 'Perdido',
    };
    return order.map((status) => {
      const count = counts[status] ?? 0;
      const percentage = Math.round((count / total) * 100);
      return { label: labelMap[status], count, percentage };
    });
  }

  get topCities(): Array<{ city: string; count: number }> {
    const cities = this.leads
      .value()
      .map((l) => l.city)
      .filter(Boolean) as string[];
    const counts: Record<string, number> = {};
    for (const c of cities) counts[c] = (counts[c] ?? 0) + 1;
    return Object.entries(counts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}
