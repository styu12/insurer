import to from 'await-to-js'
import type { AxiosResponse } from 'axios'
import type { ApiV1ContractsGetRequest } from '../../__codegen__/__openapi__/insurer-server'
import {
  Configuration,
  Contract,
  ContractWithCustomer,
  ContractsApiFactory,
} from '../../__codegen__/__openapi__/insurer-server'
import { createRemote } from '../../utils/axios.ts'

export const contractService = () => {
  const remote = createRemote()
  const client = ContractsApiFactory(new Configuration(), '', remote)

  return {
    /**
     * 계약 목록 조회
     */
    listContracts: async () => {
      const [error, resp] = await to<
        AxiosResponse<Array<ContractWithCustomer>>
      >(client.apiV1ContractsGet())

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 계약 단건 조회
     */
    getContractById: async ({ id }: { id: number }) => {
      const [error, resp] = await to<AxiosResponse<ContractWithCustomer>>(
        client.apiV1ContractsIdGet(id)
      )

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 계약 생성
     */
    createContract: async ({
      payload,
    }: {
      payload: ApiV1ContractsGetRequest
    }) => {
      const [error, resp] = await to<AxiosResponse<Contract>>(
        client.apiV1ContractsPost(payload)
      )

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },
  }
}
