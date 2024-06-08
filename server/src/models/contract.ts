export interface Contract {
    id: number;
    customerId: number;
    productId: number;
    startDate: string;  // YYYY-MM-DD
    renewalDate: string; // YYYY-MM-DD
    claimDate: string;   // YYYY-MM-DD
}