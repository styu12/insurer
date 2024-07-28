import { customerService } from '../services/customerService.ts'
import { useCallback, useMemo, useState } from 'react'
import {
  ApiV1CustomersGetRequest,
  Customer,
} from '../../__codegen__/__openapi__/insurer-server'

const getCustomerService = () => {
  return customerService()
}

export const useListCustomers = () => {
  const [customers, setCustomers] = useState<Array<Customer> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getCustomerService(), [])

  const fetchAllCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await services.listCustomers()
      setCustomers(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [services])

  return {
    customers,
    loading,
    error,
    fetchAllCustomers,
  }
}

export const useGetCustomerById = () => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getCustomerService(), [])

  const fetchCustomerById = useCallback(
    async (id: number) => {
      setLoading(true)
      setError(null)

      try {
        const data = await services.getCustomerById({ id })
        setCustomer(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    customer,
    loading,
    error,
    fetchCustomerById,
  }
}

export const useCreateCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getCustomerService(), [])

  const createCustomer = useCallback(
    async (payload: ApiV1CustomersGetRequest) => {
      setLoading(true)
      setError(null)

      try {
        const data = await services.createCustomer({ payload })
        console.log('data', data)
        setCustomer(data)
      } catch (err) {
        console.log('err', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    customer,
    loading,
    error,
    createCustomer,
  }
}

export const useUpdateCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getCustomerService(), [])

  const updateCustomer = useCallback(
    async (id: number, payload: ApiV1CustomersGetRequest) => {
      setLoading(true)
      setError(null)

      try {
        const data = await services.updateCustomer({ id, payload })
        setCustomer(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    customer,
    loading,
    error,
    updateCustomer,
  }
}

export const useDeleteCustomer = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getCustomerService(), [])

  const deleteCustomer = useCallback(
    async (id: number) => {
      setLoading(true)
      setError(null)

      try {
        await services.deleteCustomer({ id })
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    loading,
    error,
    deleteCustomer,
  }
}
