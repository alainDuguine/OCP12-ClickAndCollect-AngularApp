import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  faAdd = faPlusCircle;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onNewMenu() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
