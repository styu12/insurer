import { useParams } from 'react-router-dom'
import FormCustomer from '../components/FormCustomer.tsx'
import type { CustomerEditPathParamsType } from '../path.config.ts'
import SectionPage from '../../_app/components/section-page/SectionPage.tsx'

const PageCustomerEdit = () => {
  const params = useParams<CustomerEditPathParamsType>()
  console.log(params.customerId)
  return (
    <SectionPage>
      <FormCustomer />
    </SectionPage>
  )
}

export default PageCustomerEdit
