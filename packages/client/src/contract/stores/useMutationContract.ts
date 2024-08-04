import type { ApiV1ContractsGetRequest } from '../../__codegen__/__openapi__/insurer-server'

import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../_app/utils/queryClient'
import { contractService } from '../services/contractService'

export const useCreateMutationContract = () => {
  const service = contractService()
  return useMutation({
    mutationFn: (payload: ApiV1ContractsGetRequest) =>
      service.createContract({ ...payload }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get-contract-list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-contract-by-id'],
      })
    },
  })
}
