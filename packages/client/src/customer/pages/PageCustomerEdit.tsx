import { useParams } from 'react-router-dom'
import FormCustomer from '../components/FormCustomer.tsx'
import type { CustomerEditPathParamsType } from '../path.config.ts'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'

const PageCustomerEdit = () => {
  const params = useParams<CustomerEditPathParamsType>()
  console.log(params.customerId)
  return (
    <SectionPage>
      <SectionBody>
        <FormCustomer />
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerEdit
