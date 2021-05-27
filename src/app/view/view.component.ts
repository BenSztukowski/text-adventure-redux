import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  backgroundImage = "../assets/forestbackground.png";
  charImage = "../assets/scruffylean.png";
  adversaryImage = "../assets/wolfattack.gif";


  constructor() { }

  ngOnInit(): void {
    
  }

  

  showNew(): void {
    this.charImage= "../assets/billy_defend_barehands.gif";
  }

}
