import { useMemo } from 'react'
import { useSuspenseQueryCustomerList } from '../stores/useQueryCustomer'
import Pagination from '../../_app/components/pagination/Pagination'
import TableCustomer from './TableCustomer'

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  emailNotification: boolean
  smsNotification: boolean
  kakaoNotification: boolean
}

const ContentCustomerList = () => {
  const payload = useSuspenseQueryCustomerList()
  const customers = useMemo(() => {
    return payload.data?.map((item) => {
      return {
        id: item.id ?? 0,
        name: item.name ?? '',
        email: item.email ?? '',
        phone: item.phone ?? '',
        address: item.address ?? '',
        emailNotification: item.emailNotification ?? false,
        smsNotification: item.smsNotification ?? false,
        kakaoNotification: item.kakaoNotification ?? false,
      }
    })
  }, [payload.data])

  return (
    <>
      <TableCustomer customers={customers} />

      <Pagination
        totalItems={1000}
        itemsPerPage={10}
        onChangePage={(number) => {
          console.log(number)
        }}
      />
    </>
  )
}
export default ContentCustomerList
