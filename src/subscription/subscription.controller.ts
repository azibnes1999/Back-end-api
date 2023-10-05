import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Get(':contactId')
    async getSubscriptionsByContactId(@Param('contactId') contactId: number) {
        return this.subscriptionService.getSubscriptionsByContactId(contactId);
    }

    @Post()
    async subscribe(
        @Body('contactId') contactId: number,
        @Body('productId') productId: number,
        @Body('startDate') startDate: Date,
        @Body('endDate') endDate: Date,
    ) {
        return this.subscriptionService.subscribe(contactId, productId, startDate, endDate);
    }

    @Put(':id')
    async updateSubscription(
        @Param('id') subscriptionId: number,
        @Body('startDate') startDate: Date,
        @Body('endDate') endDate: Date,
    ) {
        return this.subscriptionService.updateSubscription(subscriptionId, startDate, endDate);
    }

    @Delete(':id')
    async deleteSubscription(@Param('id') subscriptionId: number) {
        return this.subscriptionService.deleteSubscription(subscriptionId);
    }
}

