export abstract class IPaymentGateway {
  abstract create(orderId: string): Promise<void>;
}
