import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Order } from '../models/order';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  orderDate;
  order$: Observable<any>;
  user;
  order;
  total;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService:UserService) { }

  ngOnInit() {
    this.total = 0;
    this.orderDate = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrderByDate(parseInt(this.orderDate, 10));
    this.order$.subscribe(orderlist => {
      this.order = orderlist[0];
      this.userService.get(this.order.userId).subscribe(user => {
        this.user = user;
      });
      this.order.shoppingCart.items.forEach(item => {
        this.addToTotal(item.price);
      });
    });
  }

  addToTotal(price) {
    this.total = this.total + price;
  }

}
