export interface PaginationProps {
  limit?: number
  sort?: any
  page?: number
}

export interface PaginationInfo {
  limit: number // 每页多少条
  currentPage: number // 当前页
  pageTotal: number // 总页数
  total: number // 总条数
}

export interface RestfulService<T> {
  saveNew?: (data: T) => Promise<T>
  list?: (
    where?: any,
    page?: PaginationProps
  ) => Promise<{
    list: T[]
    meta: PaginationInfo
  }>
  getById?: (id: string) => Promise<T>
  replaceData?: (id: string, data: T) => Promise<T>
  update?: (id: string, data: Partial<T>) => Promise<T>
  del?: (id: string) => Promise<void>
}

export interface Path2FetchInfoProps {
  name: string
  funcName: string
  props: any
}
export interface FetchInfo2ServiceInfoProps {
  url: string
  method: string
  params: object
  query: object
  body: object
}
