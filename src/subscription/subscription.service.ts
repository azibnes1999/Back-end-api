import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
    ) {}

    async getSubscriptionsByContactId(contactId: number): Promise<Subscription[]> {
        return this.subscriptionRepository.find({
            where: { contact: contactId },
        });
    }




    async subscribe(contactId: number, productId: number, startDate: Date, endDate: Date): Promise<Subscription> {
        const subscription = this.subscriptionRepository.create({
            contact: contactId,
            product: productId,
            dateDebut: startDate,
            dateFin: endDate,
        });

        return this.subscriptionRepository.save(subscription);
    }

    async updateSubscription(
        subscriptionId: number,
        startDate: Date,
        endDate: Date,
    ): Promise<Subscription> {
        const subscription = await this.subscriptionRepository.findOneOrFail(subscriptionId);
        subscription.dateDebut = startDate;
        subscription.dateFin = endDate;

        return this.subscriptionRepository.save(subscription);
    }

    async deleteSubscription(subscriptionId: number): Promise<void> {
        await this.subscriptionRepository.delete(subscriptionId);
    }
}

