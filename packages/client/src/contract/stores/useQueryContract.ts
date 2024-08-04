import { useSuspenseQuery } from '@tanstack/react-query'
import { contractService } from '../services/contractService'
import type { RequestParamsGetContractById } from '../services/contractService'

/**
 * 계약 목록 조회
 */
export const useSuspenseQueryContractList = () => {
  const service = contractService()

  return useSuspenseQuery({
    queryKey: ['get-contract-list'],
    queryFn: () => {
      return service.listContracts()
    },
  })
}

/**
 * 계약 단건 조회
 */
export const useSuspenseQueryContractById = (
  queryParams: RequestParamsGetContractById
) => {
  const service = contractService()

  return useSuspenseQuery({
    queryKey: ['get-contract-by-id', queryParams.id],
    queryFn: () => {
      return service.getContractById({ id: queryParams.id })
    },
  })
}
