import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '../entities/subscription.entity';
import {NotFoundException} from "@nestjs/common";

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  const mockSubscriptionRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubscriptionRepository,
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSubscriptionsByContactId', () => {
    it('should return subscriptions for a contact', async () => {
      const contactId = 1;
      const subscriptions = [{ id: 1, contact: contactId, /* autres propriétés */ }];

      mockSubscriptionRepository.find.mockResolvedValue(subscriptions);

      const result = await service.getSubscriptionsByContactId(contactId);

      expect(result).toEqual(subscriptions);
    });
  });

  describe('subscribe', () => {
    it('should create a new subscription', async () => {
      const contactId = 1;
      const productId = 2;
      const startDate = new Date();
      const endDate = new Date();
      const newSubscription = { contact: contactId, product: productId, dateDebut: startDate, dateFin: endDate };

      mockSubscriptionRepository.create.mockReturnValue(newSubscription);
      mockSubscriptionRepository.save.mockResolvedValue(newSubscription);

      const result = await service.subscribe(contactId, productId, startDate, endDate);

      expect(result).toEqual(newSubscription);
    });
  });
  describe('updateSubscription', () => {
    it('should update an existing subscription', async () => {
      const subscriptionId = 1;
      const startDate = new Date();
      const endDate = new Date();
      const existingSubscription = { id: subscriptionId, dateDebut: startDate, dateFin: endDate };

      mockSubscriptionRepository.findOne.mockResolvedValue(existingSubscription);
      mockSubscriptionRepository.save.mockResolvedValue(existingSubscription);

      const updatedSubscription = await service.updateSubscription(subscriptionId, startDate, endDate);

      expect(updatedSubscription).toEqual(existingSubscription);
      expect(mockSubscriptionRepository.findOne).toHaveBeenCalledWith(subscriptionId);
      expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(existingSubscription);
    });

    it('should throw NotFoundException when subscription does not exist', async () => {
      const subscriptionId = 1;
      const startDate = new Date();
      const endDate = new Date();

      mockSubscriptionRepository.findOne.mockResolvedValue(null);

      await expect(service.updateSubscription(subscriptionId, startDate, endDate)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteSubscription', () => {
    it('should delete an existing subscription', async () => {
      const subscriptionId = 1;
      const existingSubscription = { id: subscriptionId, /* autres propriétés */ };

      mockSubscriptionRepository.findOne.mockResolvedValue(existingSubscription);
      mockSubscriptionRepository.remove.mockResolvedValue(existingSubscription);

      const result = await service.deleteSubscription(subscriptionId);

      expect(result).toBeTruthy();
      expect(mockSubscriptionRepository.findOne).toHaveBeenCalledWith(subscriptionId);
      expect(mockSubscriptionRepository.remove).toHaveBeenCalledWith(existingSubscription);
    });

    it('should return false when subscription does not exist', async () => {
      const subscriptionId = 1;

      mockSubscriptionRepository.findOne.mockResolvedValue(null);

      const result = await service.deleteSubscription(subscriptionId);

      expect(result).toBeFalsy();
    });
  });
});

