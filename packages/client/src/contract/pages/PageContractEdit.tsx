import { useParams } from 'react-router-dom'
import FormContract from '../components/FormContract.tsx'
import { ContractEditPathParamsType } from '../path.config.ts'

const PageContractEdit = () => {
  const params = useParams<ContractEditPathParamsType>()
  console.log(params.contractId)
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <FormContract />
    </div>
  )
}

export default PageContractEdit
