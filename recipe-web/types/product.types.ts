export type Product = {
    id: number
    name: string
    fibers?: number
    fats?: number
    carbs?: number
    proteins?: number
  }

export type ProcutDto = {
  name: string
  id?: number
  fibers?: number
  fats?: number
  carbs?: number
  proteins?: number
}