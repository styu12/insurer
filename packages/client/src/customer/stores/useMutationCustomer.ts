import { useMutation } from '@tanstack/react-query'
import {
  customerService,
  RequestParamsDeleteCustomer,
} from '../services/customerService'
import type { ApiV1CustomersGetRequest } from '../../__codegen__/__openapi__/insurer-server'
import { queryClient } from '../../_app/utils/queryClient'

export const useCreateMutationCustomer = () => {
  const service = customerService()
  return useMutation({
    mutationFn: (payload: ApiV1CustomersGetRequest) =>
      service.createCustomer({ ...payload }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get-customer-list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-customer-by-id'],
      })
    },
  })
}

export const useUpdateMutationCustomer = () => {
  const service = customerService()
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: ApiV1CustomersGetRequest
    }) => service.updateCustomer({ id, payload }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get-customer-list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-customer-by-id'],
      })
    },
  })
}

export const useDeleteMutationCustomer = () => {
  const service = customerService()
  return useMutation({
    mutationFn: (qeueryParams: RequestParamsDeleteCustomer) =>
      service.deleteCustomer({ id: qeueryParams.id }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get-customer-list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['get-customer-by-id'],
      })
    },
  })
}
