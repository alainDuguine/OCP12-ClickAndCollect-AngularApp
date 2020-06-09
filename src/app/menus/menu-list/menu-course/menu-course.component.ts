import {Component, Input, OnInit} from '@angular/core';
import {CourseModel} from '../../../model/MenuModel';
import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-course',
  templateUrl: './menu-course.component.html',
  styleUrls: ['./menu-course.component.css']
})
export class MenuCourseComponent implements OnInit {
  @Input() menuId: number;
  @Input() course: CourseModel;
  dropped = false;
  faCollapse = faChevronRight;

  constructor() { }

  ngOnInit(): void {
  }

  swapIcon() {
    if (this.faCollapse === faChevronRight) {
      this.dropped = true;
      this.faCollapse = faChevronDown;
    } else {
      this.dropped = false;
      this.faCollapse = faChevronRight;
    }
  }
}
