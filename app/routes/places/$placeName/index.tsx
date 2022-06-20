import type { LoaderFunction } from "@remix-run/node"
import { getPlace } from "~/utils/dataHelpers.server"
import { useLoaderData } from "@remix-run/react"
import type { Place } from "app/types/types"
import invariant from "tiny-invariant"

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.placeName, "Expected params.placeName")
  const place = getPlace(params.placeName)
  return place
}

export default function PlaceTest() {
  const place: Place = useLoaderData()

  return (
    <div>
      <ul>
        <li key={place.name}>
          {place.name + "     "}
          <ul>
            {place.items?.map((item) => {
              return (
                <li key={item.name}>
                  {item.name} - {item.notes}
                  <br /> Created at :{" "}
                  {item.createdAt &&
                    new Date(Date.parse(item.createdAt)).toLocaleString(
                      "en-US",
                      {}
                    )}
                  <br /> Updated at : {item.lastUpdatedAt}
                  <br /> Order Again? {item.orderAgain}
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </div>
  )
}
