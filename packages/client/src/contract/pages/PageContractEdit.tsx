import { useParams } from 'react-router-dom'
import FormContract from '../components/FormContract.tsx'
import { ContractEditPathParamsType } from '../path.config.ts'
import SectionPage from '../../_app/components/section-page/SectionPage.tsx'

const PageContractEdit = () => {
  const params = useParams<ContractEditPathParamsType>()
  console.log(params.contractId)
  return (
    <SectionPage>
      <FormContract />
    </SectionPage>
  )
}

export default PageContractEdit
