import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  selectedCountry: Country | null = null;
  countries: Country[] = [];  

  isLoading = false;
  errorMessage = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    
    this.countryService.getAllCountries().subscribe({
      next: (list) => {
        this.countries = list;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // F 
  onSvgClick(event: MouseEvent): void {
    const target = event.target as SVGElement | null;
    if (!target) return;

    const iso2 = target.id?.trim();
    if (!iso2 || iso2.length !== 2) { // G
     
      return;
    }

    this.fetchCountry(iso2);
  }

  // G
  private fetchCountry(iso2: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.selectedCountry = null;

    this.countryService.getCountryByCode(iso2).subscribe({
      next: (country) => {
        this.selectedCountry = country;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Unable to load country data.';
        this.isLoading = false;
      }
    });
  }
}
