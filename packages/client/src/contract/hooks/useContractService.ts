import { contractService } from '../services/contractService.ts'
import { useCallback, useMemo, useState } from 'react'
import {
  ApiV1ContractsGet200ResponseInner,
  ApiV1ContractsGetRequest,
} from '../../__codegen__/__openapi__/insurer-server'

const getContractService = () => {
  return contractService()
}

export const useListContracts = () => {
  const [contracts, setContracts] = useState<ApiV1ContractsGet200ResponseInner[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), []);

  const fetchAllContracts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await services.listContracts()
      setContracts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [services]);

  return {
    contracts,
    loading,
    error,
    fetchAllContracts,
  }
}

export const useGetContractById = () => {
  const [contract, setContract] = useState<ApiV1ContractsGet200ResponseInner | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), []);

  const fetchContractById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await services.getContractById({ id })
      setContract(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [services]);

  return {
    contract,
    loading,
    error,
    fetchContractById,
  }
}

export const useCreateContract = () => {
  const [contract, setContract] = useState<ApiV1ContractsGet200ResponseInner | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const services = useMemo(() => getContractService(), []);

  const createContract = useCallback(async (payload: ApiV1ContractsGetRequest) => {
    setLoading(true);
    setError(null);

    try {
      const data = await services.createContract({ payload })
      setContract(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [services]);

  return {
    contract,
    loading,
    error,
    createContract,
  }
}
