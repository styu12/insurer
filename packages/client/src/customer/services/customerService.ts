import type { AxiosResponse } from 'axios'
import type {
  ApiV1CustomersIdDelete200Response,
  ApiV1CustomersGetRequest,
  Customer,
} from '../../__codegen__/__openapi__/insurer-server'
import to from 'await-to-js'
import { createRemote } from '../../utils/axios.ts'
import {
  CustomersApiFactory,
  Configuration,
} from '../../__codegen__/__openapi__/insurer-server'

export interface RequestParamsGetCustomerById {
  id: number
}

export interface RequestParamsDeleteCustomer {
  id: number
}

export const customerService = () => {
  const remote = createRemote()
  const client = CustomersApiFactory(new Configuration(), '', remote)

  return {
    /**
     * 고객 목록 조회
     */
    listCustomers: async () => {
      const [error, resp] = await to<AxiosResponse<Array<Customer>>>(
        client.apiV1CustomersGet()
      )

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 단건 조회
     */

    getCustomerById: async (params: RequestParamsGetCustomerById) => {
      const [error, resp] = await to<AxiosResponse<Customer>>(
        client.apiV1CustomersIdGet(params.id)
      )

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 생성
     */
    createCustomer: async (payload: ApiV1CustomersGetRequest) => {
      const [error, resp] = await to<AxiosResponse<Customer>>(
        client.apiV1CustomersPost(payload)
      )

      console.log('payload : ', payload)
      console.log('resp : ', resp)

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 수정
     */
    updateCustomer: async ({
      id,
      payload,
    }: {
      id: number
      payload: ApiV1CustomersGetRequest
    }) => {
      const [error, resp] = await to<AxiosResponse<Customer>>(
        client.apiV1CustomersIdPut(id, payload)
      )

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 삭제
     */
    deleteCustomer: async (params: RequestParamsDeleteCustomer) => {
      const [error, resp] = await to<
        AxiosResponse<ApiV1CustomersIdDelete200Response>
      >(client.apiV1CustomersIdDelete(params.id))

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },
  }
}
