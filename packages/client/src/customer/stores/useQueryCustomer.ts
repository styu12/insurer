import { useSuspenseQuery } from '@tanstack/react-query'
import { customerService } from '../services/customerService'
import type { RequestParamsGetCustomerById } from '../services/customerService'

/**
 * 고객 목록 조회
 */
export const useSuspenseQueryCustomerList = () => {
  const service = customerService()

  return useSuspenseQuery({
    queryKey: ['get-customer-list'],
    queryFn: () => {
      return service.listCustomers()
    },
  })
}

/**
 * 고객 단건 조회
 */
export const useSuspenseQueryCustomerById = (
  queryParams: RequestParamsGetCustomerById
) => {
  const service = customerService()

  return useSuspenseQuery({
    queryKey: ['get-customer-by-id', queryParams.id],
    queryFn: () => {
      return service.getCustomerById({ id: queryParams.id })
    },
  })
}
