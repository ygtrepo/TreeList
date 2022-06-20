export interface ITreeListHandes {
  keyField: string
  parentField: string
  showField: string
  dataSource: any[]
  selectRow: (key: string, select: boolean) => void
  selectAll: (select: boolean) => void
  getSelectedRows: () => any[]
  enabled: boolean
}

export interface ITreeListProps { }

interface IDataSource {
  path: string[]
  leaf: boolean
  [key: string]: any
}

export interface ITreeListState {
  keyField: string
  parentField: string
  showField: string
  dataSource: IDataSource[]
  enabled: boolean
  path: any
  allParent: any
  checkBoxArr: HTMLInputElement[]
}