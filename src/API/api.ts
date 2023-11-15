import axios, {AxiosInstance} from "axios";
import {Category, Position} from "./types";

export const request = axios.create({
  baseURL: 'https://hoomie.guess-word.com/api'
})

const menuConfig = (instance: AxiosInstance) => ({
  getPositions: () => {
    return instance.get<Array<Position>>('/positions/')
  },
  getCategories: () => {
    return instance.get<Array<Category>>('/categories/')
  },
  getPositionsByCategory: (category: number) => {
    return instance.get<Array<Position>>(`/positions/?category=${category}`)
  },
  getPositionsById: (id: number) => {
    return instance.get<Position>(`/positions/${id}`)
  }
})

export const menuRequest = menuConfig(request)
