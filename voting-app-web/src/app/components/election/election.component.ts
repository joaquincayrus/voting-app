import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  configUrl = 'http://localhost:3000/election';
  elections: any;
  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.elections = await this.getElections();
  }

  getElections() {
    return this.http.get(this.configUrl).toPromise();
  }
}
