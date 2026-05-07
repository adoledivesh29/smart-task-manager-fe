/* eslint-disable react-hooks/exhaustive-deps */
 
import { useRef, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { parseParams } from '../../Utils/utils'

// Custom hook to create stable query keys from requestParams, to avoid re-fetching the data when the requestParams are the same
export const useStableQueryKey = (baseKey, requestParams, additionalKeys = []) => {
  return useMemo(() => [
    baseKey,
    ...additionalKeys,
    requestParams?.pageNumber,
    requestParams?.size,
    requestParams?.search,
    requestParams?.sort,
    requestParams?.orderBy,
  ], [
    baseKey,
    ...additionalKeys,
    requestParams?.pageNumber,
    requestParams?.size,
    requestParams?.search,
    requestParams?.sort,
    requestParams?.orderBy,
  ])
}

export const useRequestParams = (extraParams = {}) => {
  const location = useLocation()
  const params = useRef(parseParams(location.search))

  const getRequestParams = (e) => {
    const data = e ? parseParams(e) : params.current

    const baseParams = {
      pageNumber: +data?.pageNumber?.[0] || 1,
      start: +data?.pageNumber?.[0] - 1 || 0,
      search: data?.search || '',
      size: data?.size || 10,
      sort: data.sort || '',
      orderBy: +data.orderBy === 1 ? 'ASC' : 'DESC',
    }

    const extraParamsWithDefaults = Object.entries(extraParams).reduce((acc, [key, defaultValue]) => {
      acc[key] = data?.[key] || defaultValue
      return acc
    }, {})

    return {
      ...baseParams,
      ...extraParamsWithDefaults
    }
  }

  const [requestParams, setRequestParams] = useState(getRequestParams())

  return {
    requestParams,
    setRequestParams,
    getRequestParams
  }
}
