import { Entity } from "@/shared/domain/entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export type SortDirection = 'asc' | 'desc'

export type SerchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export type SerchResultProps<E extends Entity, Filter> = {
  items:  E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: string | null
  filter: Filter| null
}

export class SearchParams<Filter = string> {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: Filter  | null

  constructor(props: SerchProps<Filter> = {}){
    this.page = props.page
    this.perPage = props.perPage
    this.sort = props.sort
    this.sortDir = props.sortDir
    this.filter = props.filter
  }

  get page(){
    return this._page
  }

  private set page(value: number){
    let _page = +value
    if(Number.isNaN(_page) ||
    _page <= 0 || parseInt(_page as any) !== _page){
      _page = 1
    }
    this._page = _page
  }

  get perPage(){
    return this._perPage
  }

  private set perPage(value: number) {
    let _perPage = +value;
    if (
      typeof value === 'boolean' && value === true ||
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ){
      _perPage = 15
    }
    this._perPage = _perPage;
  }





  get sort() {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir(){
    return this._sortDir
  }

  private set sortDir(value: string | null) {
    if (!this.sort) {
        this._sortDir = null;
        return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDir = (dir === 'asc' || dir === 'desc') ? dir : 'desc';
}


  get filter(): Filter | null {
    return this._filter
  }

  private set filter(value: Filter | null){
    this._filter =
      value === null || value === undefined || value === '' ? null : (`${value}`) as any
  }


}

export class SerchResult<E extends Entity, Filter =  string>{
  readonly items:  E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly lastPage:number
  readonly sort: string | null
  readonly sortDir: string | null
  readonly filter: Filter| null

  constructor(props: SerchResultProps<E,Filter>){
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export interface SerchablsRepositoryInterface<
E extends Entity,
Filter = string,
SerchInput = SearchParams<Filter>,
SerchOutput = SerchResult<E ,Filter>
> extends RepositoryInterface <E>{
  sortableFields: string[]
  search(props: SerchInput): Promise<SerchOutput>

}


