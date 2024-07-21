import { useParams } from 'react-router-dom'
import FormCustomer from '../components/FormCustomer.tsx'
import type { CustomerEditPathParamsType } from '../path.config.ts'

const PageCustomerEdit = () => {
  const params = useParams<CustomerEditPathParamsType>()
  console.log(params.customerId)
  return (
    <div>
      <FormCustomer />
    </div>
  )
}

export default PageCustomerEdit
