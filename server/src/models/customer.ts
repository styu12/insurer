export interface Customer {
    id: number;
    name: string;
    product: string;
    startDate: string;  // YYYY-MM-DD
    renewalDate: string; // YYYY-MM-DD
    claimDate: string;   // YYYY-MM-DD
}