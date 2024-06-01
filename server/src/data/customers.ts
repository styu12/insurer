import { Customer } from '../models/customer';

export const customers: Customer[] = [
    {
        id: 1,
        name: 'John Doe',
        product: 'Health Insurance',
        startDate: '2021-01-01',
        renewalDate: '2022-01-01',
        claimDate: '2021-12-01'
    },
    {
        id: 2,
        name: 'Jane Smith',
        product: 'Car Insurance',
        startDate: '2020-06-15',
        renewalDate: '2021-06-15',
        claimDate: '2021-05-20'
    },
];
