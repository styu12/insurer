import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { useCallback, useMemo, useState } from 'react'
import EllipsisPageNumber from './EllipsisPageNumber'
import ButtonPageNumber from './ButtonPageNumber'
import Button from '../button/Button'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPageNumber?: number
  onChangePage: (pageNumber: number) => void
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  initialPageNumber,
  onChangePage,
}: PaginationProps) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(
    initialPageNumber ?? 1
  )
  const lastPageNumber = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  const renderButtonPageNumber = useCallback(() => {
    const pageNumbers = []

    const addPageNumberButton = (pageNumber: number, key = pageNumber) => {
      pageNumbers.push(
        <ButtonPageNumber
          key={key}
          navigateTo={() => {
            setCurrentPageNumber(pageNumber)
            onChangePage(pageNumber)
          }}
          pageNumber={pageNumber}
          isCurrent={currentPageNumber === pageNumber}
        />
      )
    }

    if (lastPageNumber <= 6) {
      for (let i = 1; i <= lastPageNumber; i++) addPageNumberButton(i)
    } else {
      if (currentPageNumber <= 3) {
        for (let i = 1; i <= 5; i++) addPageNumberButton(i)
        pageNumbers.push(<EllipsisPageNumber key="ellipsis-right" />)
        addPageNumberButton(lastPageNumber)
      } else if (currentPageNumber >= lastPageNumber - 2) {
        addPageNumberButton(1)
        pageNumbers.push(<EllipsisPageNumber key="ellipsis-left" />)
        for (let i = lastPageNumber - 4; i <= lastPageNumber; i++)
          addPageNumberButton(i)
      } else {
        addPageNumberButton(1)
        pageNumbers.push(<EllipsisPageNumber key="ellipsis-left" />)
        for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++)
          addPageNumberButton(i)
        pageNumbers.push(<EllipsisPageNumber key="ellipsis-right" />)
        addPageNumberButton(lastPageNumber)
      }
    }

    return pageNumbers
  }, [currentPageNumber, lastPageNumber, onChangePage])

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <Button
          onClick={() => {
            setCurrentPageNumber(currentPageNumber - 1)
            onChangePage(currentPageNumber - 1)
          }}
          DANGEROUSLY_ovveride_style
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          disabled={currentPageNumber === 1}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </Button>
      </div>
      <div className="md:-mt-px md:flex">{renderButtonPageNumber()}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Button
          onClick={() => {
            setCurrentPageNumber(currentPageNumber + 1)
            onChangePage(currentPageNumber + 1)
          }}
          DANGEROUSLY_ovveride_style
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          disabled={currentPageNumber === lastPageNumber}
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Button>
      </div>
    </nav>
  )
}

export default Pagination
