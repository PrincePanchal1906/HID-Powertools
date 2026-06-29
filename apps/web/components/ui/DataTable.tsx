import React from 'react'

export interface Column<T> {
  key: string
  title: string
  render?: (record: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (record: T) => string
  emptyMessage?: string
}

export function DataTable<T>({ data, columns, keyExtractor, emptyMessage = "No records found" }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th key={col.key} className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-gray-500 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map(record => (
              <tr key={keyExtractor(record)} className="hover:bg-gray-50 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="py-3 px-6 text-sm text-gray-900">
                    {col.render ? col.render(record) : (record as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
