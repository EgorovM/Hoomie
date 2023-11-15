import {createContext} from "react";
import {PositionId} from "../layout/layout";

type ShippingCardContextType = {
  shippingCard: Record<PositionId, number>
  addToShippingCard: (id: PositionId, count?: number) => void
  removeFromShippingCard: (id: PositionId) => void
}

export const ShippingCardContext = createContext<ShippingCardContextType>({
  shippingCard: {},
  addToShippingCard: () => null,
  removeFromShippingCard: () => null,
})
