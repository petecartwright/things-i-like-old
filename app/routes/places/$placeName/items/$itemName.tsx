import type { LoaderFunction } from "@remix-run/node"
import { getItem } from "~/utils/dataHelpers.server"
import { useLoaderData } from "@remix-run/react"
import type { Item } from "app/types/types"
import invariant from "tiny-invariant"

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.placeName, "Expected params.placeName")
  invariant(params.itemName, "Expected params.itemName")
  const item = getItem(params.placeName, params.itemName)
  return item
}

export default function ItemTest() {
  const item: Item = useLoaderData()

  return (
    <div>
      <div>Name {item.humanName} </div>
      <div>Created At {item.createdAt} </div>
      <img src={item.imageUrl} alt="" />
    </div>
  )
}
