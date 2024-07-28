import { createRemote } from '../../utils/axios.ts'
import {
  CustomersApiFactory,
  Configuration,
  ApiV1CustomersGet200ResponseInner,
  ApiV1CustomersGetRequest,
} from '../../__codegen__/__openapi__/insurer-server'
import to from 'await-to-js'
import { AxiosResponse } from 'axios'

export const customerService = () => {
  const remote = createRemote()
  const client = CustomersApiFactory(new Configuration(), '', remote)

  return {
    /**
     * 고객 목록 조회
     */
    listCustomers: async () => {
      const [error, resp] = await to<
        AxiosResponse<Array<ApiV1CustomersGet200ResponseInner>>
      >(client.apiV1CustomersGet())

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 단건 조회
     */
    getCustomerById: async ({ id }: { id: number }) => {
      const [error, resp] = await to<
        AxiosResponse<ApiV1CustomersGet200ResponseInner>
      >(client.apiV1CustomersIdGet(id))

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },

    /**
     * 고객 생성
     */
    createCustomer: async ({
      payload,
    }: {
      payload: ApiV1CustomersGetRequest
    }) => {
      const [error, resp] = await to<
        AxiosResponse<ApiV1CustomersGet200ResponseInner>
      >(client.apiV1CustomersPost(payload))

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
      const [error, resp] = await to<
        AxiosResponse<ApiV1CustomersGet200ResponseInner>
      >(client.apiV1CustomersIdPut(id, payload))

      if (error) {
        throw error
      }

      return resp?.data ?? null
    },
  }
}
