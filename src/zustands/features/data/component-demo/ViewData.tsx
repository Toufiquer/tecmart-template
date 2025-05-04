/*
|-----------------------------------------
| setting up ViewData for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: shreshtho-v3, April, 2025
|-----------------------------------------
*/

'use client'

import { useGetDataQuery } from '@/zustands/features/data/useData'
import SingleDataView from './SingleDataView'
import ErrorComponent from './components-others/ErrorComponent'
import NotFound from './components-others/NotFound'
import LoadingComponent from './components-others/LoadingComponent'

const ViewData = () => {
  const {
    data: getResponseAllData,
    isLoading,
    isError,
    error,
  } = useGetDataQuery()
  let renderData = <LoadingComponent />
  if (!isLoading && isError) {
    renderData = <ErrorComponent error={error || ''} />
  }
  if (!isLoading && getResponseAllData.length === 0) {
    renderData = <NotFound />
  }
  if (!isLoading && getResponseAllData.length > 0) {
    renderData = (
      <div>
        {getResponseAllData.map((curr, idx) => (
          <SingleDataView data={curr} key={curr.id + idx} />
        ))}
      </div>
    )
  }
  return renderData
}
export default ViewData
