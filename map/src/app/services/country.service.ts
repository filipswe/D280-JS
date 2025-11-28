import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly baseUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  // G
  getCountryByCode(iso2: string): Observable<Country> {
    const url = `${this.baseUrl}/${iso2.toLowerCase()}?format=json`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const c = response[1][0];

          // C
        const country: Country = {
          code: c.id,
          iso2Code: c.iso2Code,
          name: c.name,
          capital: c.capitalCity,
          region: c.region?.value,
          incomeLevel: c.incomeLevel?.value,
          adminRegion: c.adminregion?.value,
          lendingType: c.lendingType?.value
        };

        return country;
      })
    );
  }

  
  getAllCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}?format=json&per_page=300`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const list = response[1] as any[];

        return list.map((c: any) => {
          const country: Country = {
            code: c.id,
            iso2Code: c.iso2Code,
            name: c.name,
            capital: c.capitalCity,
            region: c.region?.value,
            incomeLevel: c.incomeLevel?.value,
            adminRegion: c.adminregion?.value,
            lendingType: c.lendingType?.value
          };
          return country;
        });
      })
    );
  }
}
