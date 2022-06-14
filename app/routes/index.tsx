import type { LoaderFunction } from "@remix-run/node"
import type { Place } from "../types/types"
import { useLoaderData } from "@remix-run/react"
import { getLocalData } from "../utils/getLocalData.server"

export const loader: LoaderFunction = async () => {
  return getLocalData()
}

export default function Index() {
  const places: Place[] = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {places.map((element) => {
          return (
            <li key={element.name}>
              {element.name}
              <ul>
                {element.items?.map((item) => {
                  return <li key={item.name}>{item.name}</li>
                })}
              </ul>
            </li>
          )
        })}
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  )
}
