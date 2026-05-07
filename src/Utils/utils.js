/* --- It contents all the utility functions, mostly for UI related logics --- */

import moment from 'moment'
import toast from 'react-hot-toast'

// Parse URL parameters into an object
export const parseParams = (params = '') => {
  const urlParams = new URLSearchParams(params)
  const array = [
    'size',
    'search',
    'pageNumber',
    'aFilters',
    'aStatusFiltersInput',
    'aStatus',
    'aCountryFilter',
    'aRoleFilter',
    'aCodeFilters',
    'eDesignationFilter',
    'aCategoryFilters',
    'aTagFilters',
    'aFilter',
    'eState',
    'aState',
    'aTeamTagFilters',
    'aVenueTagFilters',
    'aSeriesFilters',
    'aAuthorsFilters',
    'aType',
    'eGender',
    'eType',
    'eCategory',
    'userType'
  ]
  const value = Object.fromEntries(urlParams.entries())
  Object.keys(value).forEach((key) => {
    if (array.includes(key)) {
      value[key] = value[key].split(',')
    }
  })
  return value
}

// Append parameters to the URL
export const appendParams = (value) => {
  const params = parseParams(location.search)
  const data = { ...params, ...value }
  Object.keys(data).filter((e) => (data[e] === '' || !data[e].toString().length) && delete data[e])
  window.history.pushState({}, null, `${location.pathname}?${new URLSearchParams(data).toString()}`)
}

// IT WILL CONVERT CURRENCY VALUE INTO LAKH, CRORE, ETC.
export function formatCurrency(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + ' Arab'
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr'
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' Lakh'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' K'
  } else {
    return num
  }
}

// DEBOUNCE FUNCTION
export const debounce = (callBack, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...args)
    }, delay)
  }
}

// will display as 1st, 2nd, 3rd and so on, can be used for ranking
export const ordinalSuffix = (num) => {
  const lastDigit = num % 10
  if (lastDigit === 1) {
    return `st`
  } else if (lastDigit === 2) {
    return `nd`
  } else if (lastDigit === 3) {
    return `rd`
  } else {
    return `th`
  }
}

// GET DIRTY FORM VALUES
export function getDirtyFormValues(dirtyFields, allValues) {
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
  return Object.fromEntries(Object.keys(dirtyFields).map((key) => [key, getDirtyFormValues(dirtyFields[key], allValues[key])]))
}

// Format date to DD MMM YYYY, hh:mm A
export const formatDate = (date, showMilliSeconds = false) => {
  return moment(date).format(showMilliSeconds ? 'DD MMM YYYY, hh:mm:ss A' : 'DD MMM YYYY, hh:mm A')
}

// Custom Toast
export const CustomToast = (message, type = 'success') => {
  toast[type](message, {
    position: 'top-center',
    reverseOrder: true
  })
}

// Format number to 2 decimal places, can be used for currency or other numerical values
export function formatNumber({ num, isCurrency = false, isDollarSign = false, showFullNumber = false }) {
  if (num === null || num === undefined || isNaN(num)) return 'N/A'

  const absNum = Math.abs(num)
  const sign = num < 0 ? '- ' : ''
  // Format with commas for Indian numbering system
  const formatWithCommas = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  if (isCurrency && showFullNumber) { // isCurrency = true, showFullNumber = true
    const formattedNum = showFullNumber ? formatWithCommas(absNum) : Number(absNum.toFixed(2))
    return `${sign}${isDollarSign ? '$ ' : ''}${formattedNum}`
  }
  if (!showFullNumber && isCurrency) { // isCurrency = true, showFullNumber = false
    // Western scale
    if (absNum >= 1_000_000_000_000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 1_000_000_000_000).toFixed(2)} T`
    if (absNum >= 1_000_000_000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 1_000_000_000).toFixed(2)} B`
    // Indian scale and remaining western million
    if (absNum >= 10000000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 10000000).toFixed(2)} Cr`
    if (absNum >= 1_000_000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 1_000_000).toFixed(2)} M`
    if (absNum >= 100000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 100000).toFixed(2)} L`
    if (absNum >= 1000) return `${sign}${isDollarSign ? '$ ' : ''}${(absNum / 1000).toFixed(2)} K`
    return `${sign}${isDollarSign ? '$ ' : ''}${Number(absNum.toFixed(2))}`
  }
  // isCurrency = false, showFullNumber = true
  return `${sign}${isDollarSign ? '$ ' : ''}${formatWithCommas(absNum)}`
}

// Check form changes and create payload with only changed fields
export const getFormChanges = (currentValues, originalValues, fields) => {
  const payload = {}
  let hasChanges = false
  
  fields.forEach(field => {
    const currentValue = currentValues[field]
    const originalValue = originalValues[field]
    
    // Handle null/undefined values
    if (currentValue === null || currentValue === undefined || originalValue === null || originalValue === undefined) {
      if (currentValue !== originalValue) {
        payload[field] = currentValue
        hasChanges = true
      }
      return
    }
    
    // Check if the field should be treated as a number
    const isNumericField = !isNaN(Number(currentValue)) && !isNaN(Number(originalValue)) && 
                          (typeof currentValue === 'number' || typeof originalValue === 'number' ||
                           (typeof currentValue === 'string' && currentValue.trim() !== '' && !isNaN(currentValue)) ||
                           (typeof originalValue === 'string' && originalValue.trim() !== '' && !isNaN(originalValue)))
    
    if (isNumericField) {
      // Compare as numbers
      if (Number(currentValue) !== Number(originalValue)) {
        payload[field] = Number(currentValue)
        hasChanges = true
      }
    } else {
      // Compare as strings
      if (String(currentValue) !== String(originalValue)) {
        payload[field] = currentValue
        hasChanges = true
      }
    }
  })
  
  return { hasChanges, payload }
}
