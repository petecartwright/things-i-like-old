import type { LoaderFunction } from "@remix-run/node"
import { getItem } from "app/utils/getLocalData.server"
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
      Name: {item.name} <br />
      CreatedAt: {item.createdAt} <br />
    </div>
  )
}
