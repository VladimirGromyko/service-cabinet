export interface UniversalObject<T> {
    [key: string]: T;
}
export interface TableData extends UniversalObject<string> {
    name: string
    theme: string
    number: string
    creationDate: string
    changeDate: string
    term: string
    status: string
    waiting: string
    description: string
    solution: string
    service: string
    serviceComposition: string
}
export type SortedBlock = "ascend" | "descend" | null
export type SearchFieldType = "all" | "close" | "open" | "await" | null
export interface SearchGroup {
    field: SearchFieldType,
    value: string
}