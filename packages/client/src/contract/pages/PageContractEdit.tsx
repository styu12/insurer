import { useParams } from 'react-router-dom'
import FormContract from '../components/FormContract.tsx'
import { ContractEditPathParamsType } from '../path.config.ts'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'

const PageContractEdit = () => {
  const params = useParams<ContractEditPathParamsType>()
  console.log(params.contractId)
  return (
    <SectionPage>
      <SectionBody>
        <FormContract />
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractEdit
