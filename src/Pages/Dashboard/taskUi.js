import { formatDate } from '../../Utils/utils'

const DEFAULT_CATEGORY = 'General'
const FALLBACK_ACCENT = '#94a3b8'

const CATEGORY_FALLBACKS = {
  Work: '#2563eb',
  Personal: '#a855f7',
  Health: '#16a34a',
  Study: '#f59e0b',
  Finance: '#059669',
  Coding: '#7c3aed',
  Home: '#ef4444',
  General: FALLBACK_ACCENT
}

const CREATED_DATE_KEYS = [
  'createdAt',
  'dCreatedAt',
  'createdOn',
  'createdDate',
  'created_on',
  'dtCreated',
  'dCreated'
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const normalizeHexColor = (value) => {
  if (!value || typeof value !== 'string') return null

  const trimmed = value.trim()

  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed

  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
  }

  return null
}

const hexToRgb = (hex) => {
  const normalized = normalizeHexColor(hex)
  if (!normalized) return null

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16)
  }
}

const withAlpha = (hex, alpha) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return null

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

const getReadableText = (hex) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#475569'

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 160 ? '#0f172a' : '#f8fafc'
}

export const getCategoryLabel = (category) => {
  const value = typeof category === 'string' ? category.trim() : ''
  return value || DEFAULT_CATEGORY
}

export const getCategoryTheme = ({ category, color }) => {
  const label = getCategoryLabel(category)
  const accent = normalizeHexColor(color) || CATEGORY_FALLBACKS[label] || CATEGORY_FALLBACKS[DEFAULT_CATEGORY]

  return {
    label,
    accent,
    text: getReadableText(accent),
    badgeBg: withAlpha(accent, 0.14) || '#e2e8f0',
    iconBg: withAlpha(accent, 0.16) || '#e2e8f0',
    trackBg: withAlpha(accent, 0.16) || '#e2e8f0',
    borderSoft: withAlpha(accent, 0.24) || '#cbd5e1',
    glow: withAlpha(accent, 0.24) || 'rgba(148, 163, 184, 0.24)',
    panelWash: withAlpha(accent, 0.08) || 'rgba(148, 163, 184, 0.08)'
  }
}

export const getTaskCategoryTheme = (task) => {
  const meta = task?.oCategoryMeta || {}

  return getCategoryTheme({
    category: task?.sCategory || meta?.sName,
    color: task?.sCategoryColor || meta?.sColor
  })
}

export const getTaskCategoryIcon = (task) => {
  return task?.sCategoryIcon || task?.oCategoryMeta?.sIcon || ''
}

export const getDifficultyMeta = (score) => {
  const numericScore = Number.isFinite(Number(score)) ? Number(score) : 0
  const normalizedScore = clamp(numericScore, 0, 10)

  if (normalizedScore > 7) {
    return {
      score: normalizedScore,
      label: 'High focus',
      accent: '#dc2626',
      track: '#fecaca'
    }
  }

  if (normalizedScore > 4) {
    return {
      score: normalizedScore,
      label: 'Balanced',
      accent: '#d97706',
      track: '#fde68a'
    }
  }

  return {
    score: normalizedScore,
    label: 'Quick win',
    accent: '#0f766e',
    track: '#99f6e4'
  }
}

export const getDifficultyPercent = (score) => {
  const numericScore = Number.isFinite(Number(score)) ? Number(score) : 0
  return clamp(Math.round((numericScore / 10) * 100), 0, 100)
}

export const formatTaskCreatedDate = (task) => {
  const value = CREATED_DATE_KEYS.map((key) => task?.[key]).find(Boolean)

  if (!value) return 'Recently added'

  try {
    return formatDate(value)
  } catch {
    return 'Recently added'
  }
}
