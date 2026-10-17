/** Paths of every string in `value` that is still a "TODO" placeholder. */
export function findTodos(value: unknown, path = ''): string[] {
  if (typeof value === 'string') return value.startsWith('TODO') ? [path] : []
  if (Array.isArray(value)) return value.flatMap((item, i) => findTodos(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      findTodos(item, path ? `${path}.${key}` : key),
    )
  }
  return []
}
