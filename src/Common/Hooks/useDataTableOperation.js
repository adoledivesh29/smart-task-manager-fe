 
import { useCallback } from 'react'

export const useDataTableOperation = ({ setRequestParams, requestParams, columns, setColumns = null }) => {
  // HANDLE HEADER EVENT
  const handleHeaderEvent = useCallback(
    (name, value) => {
      switch (name) {
        case 'rows':
          setRequestParams({ ...requestParams, size: Number(value), pageNumber: 1 })
          // appendParams({ limit: Number(value), pageNumber: 1 })
          break
        case 'search':
          setRequestParams({ ...requestParams, search: value, pageNumber: 1 })
          // appendParams({ pageNumber: 1 })
          break
        default:
          break
      }
    },
    [requestParams, setRequestParams]
  )

  // SORT DATA
  function handleSort(field) {
    let selectedFilter
    const filter = columns?.map((data) => {
      if (data.internalName === field.internalName) {
        data.type = +data.type === 1 ? -1 : 1
        selectedFilter = data
      } else {
        data.type = 1
      }
      return data
    })
    if (setColumns) {
      setColumns(filter)
    }
    const params = {
      ...requestParams,
      page: 0,
      sort: selectedFilter?.internalName,
      orderBy: selectedFilter.type === 1 ? 'ASC' : 'DESC'
    }
    setRequestParams(params)
    // appendParams({
    //   sort: selectedFilter.type !== 0 ? selectedFilter.internalName : '',
    //   orderBy: selectedFilter.type
    // })
  }

  const handlePageEvent = useCallback(
    (page) => {
      setRequestParams({ ...requestParams, pageNumber: page, start: page - 1 })
      // appendParams({ pageNumber: page, start: page - 1 })
    },
    [requestParams, setRequestParams]
  )

  return { handleHeaderEvent, handleSort, handlePageEvent }
}
