import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import type { Customer } from '../../__codegen__/__openapi__/insurer-server'
import { useCallback } from 'react'
import { useDeleteMutationCustomer } from '../stores/useMutationCustomer'

interface TableCustomerProps {
  customers: Customer[] | null
}

const TableCustomer: React.FC<TableCustomerProps> = ({ customers }) => {
  const navigate = useNavigate()
  const deleteCustomerMutation = useDeleteMutationCustomer()
  const onClickDeleteCustomer = useCallback(
    ({ id }: { id: number }) =>
      async () => {
        try {
          await deleteCustomerMutation.mutateAsync({ id: id })
        } catch (error) {
          console.error(error)
          alert('고객 삭제에 실패했습니다.')
        }
      },
    [deleteCustomerMutation]
  )

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  이름
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  연락처
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  주소
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email 알림
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  SMS 알림
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  카카오톡 알림
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">수정</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers?.map((customer) => (
                <tr key={customer.email}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        {/*TODO: 프로필 사진 추가??*/}
                        {/*<img*/}
                        {/*  alt=""*/}
                        {/*  src={customer.image}*/}
                        {/*  className="h-11 w-11 rounded-full"*/}
                        {/*/>*/}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        {/*<div className="mt-1 text-gray-500">*/}
                        {/*  {customer.email}*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {customer.phone}
                    </td>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {customer.address}
                    </td>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      className={classNames(
                        customer.emailNotification
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : 'bg-red-50 text-red-700 ring-red-600/20',
                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {customer.emailNotification ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      className={classNames(
                        customer.smsNotification
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : 'bg-red-50 text-red-700 ring-red-600/20',
                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {customer.smsNotification ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      className={classNames(
                        customer.kakaoNotification
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : 'bg-red-50 text-red-700 ring-red-600/20',
                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {customer.kakaoNotification ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      onClick={() => navigate(`/customer/edit/${customer.id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      수정<span className="sr-only">, {customer.name}</span>
                    </button>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      onClick={onClickDeleteCustomer({ id: customer.id })}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제<span className="sr-only">, {customer.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableCustomer
