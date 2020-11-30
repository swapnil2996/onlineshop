import { Order } from './../../models/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
    orders;
    subscription: Subscription;

    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.subscription = this.orderService.getOrders()
            .subscribe(x => this.orders = x);
            console.log(this.orders);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
