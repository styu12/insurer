import { contractService } from '../services/contractService'
import { useCallback, useMemo, useState } from 'react'
import {
  ApiV1ContractsGetRequest,
  Contract,
  ContractWithCustomer,
} from '../../__codegen__/__openapi__/insurer-server'

const getContractService = () => {
  return contractService()
}

export const useListContracts = () => {
  const [contractsWithCustomer, setContractsWithCustomer] = useState<
    ContractWithCustomer[] | null
  >(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), [])

  const fetchAllContracts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await services.listContracts()
      setContractsWithCustomer(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [services])

  return {
    contractsWithCustomer,
    loading,
    error,
    fetchAllContracts,
  }
}

export const useGetContractById = () => {
  const [contractWithCustomer, setContractWithCustomer] =
    useState<ContractWithCustomer | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), [])

  const fetchContractById = useCallback(
    async (id: number) => {
      setLoading(true)
      setError(null)

      try {
        const data = await services.getContractById({ id })
        setContractWithCustomer(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    contractWithCustomer,
    loading,
    error,
    fetchContractById,
  }
}

export const useCreateContract = () => {
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), [])

  const createContract = useCallback(
    async (payload: ApiV1ContractsGetRequest) => {
      setLoading(true)
      setError(null)

      try {
        const data = await services.createContract({ payload })
        setContract(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    },
    [services]
  )

  return {
    contract,
    loading,
    error,
    createContract,
  }
}
