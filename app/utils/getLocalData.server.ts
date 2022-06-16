import { readFileSync, writeFileSync } from "fs"
import type { Item, Place } from "../types/types"

const JSON_DATA_FILE_PATH = "./local_dev_data.json"

export const getPlaces = (): Place[] | undefined => {
  const fileContents = readFileSync(JSON_DATA_FILE_PATH, "utf-8")
  const places = JSON.parse(fileContents)
  return places.places
}

export const getPlace = (placeName: string): Place | undefined => {
  const places = getPlaces()

  const place = places?.filter((element: Place) => {
    return element.name === placeName
  })[0]

  return place
}

export const getItemsAtPlace = (placeName: string): Item[] | undefined => {
  const place = getPlace(placeName)

  return place?.items
}

export const getItem = (
  placeName: string,
  itemName: string
): Item | undefined => {
  const place = getPlace(placeName)

  const item = place?.items?.filter((element) => {
    return itemName === element.name
  })[0]

  return item
}

export const deletePlace = (placeName: string) => {
  const places = getPlaces()

  const newPlaces = places?.filter((element) => {
    return element.name !== placeName
  })

  const jsonData = { places: newPlaces }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData))
}

export const deleteItem = (placeName: string, itemName: string) => {
  const places = getPlaces()

  const newPlacesWithoutItem = places?.map((element) => {
    // if it's not the place we're looking for, stop
    if (element.name !== placeName) return element

    // make a list of all the items except the one we're looking for
    const newItemList = element.items?.filter((e) => {
      return e.name !== itemName
    })

    // make that the new item list
    // in the real world we'll set the deleted attrib,
    // but for the fake one who cares
    element.items = newItemList
    return element
  })

  const jsonData = { places: newPlacesWithoutItem }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData))
}

export const upsertPlace = (placeToUpsert: Place) => {
  // remove properties we want to manage ourselves first
  delete placeToUpsert.createdAt
  delete placeToUpsert.deleted
  delete placeToUpsert.deletedAt
  delete placeToUpsert.lastUpdatedAt

  // if the place already exists, edit that element
  // and return a new array
  const existingPlaces = getPlaces()
  const newPlaces = existingPlaces?.map((element: Place) => {
    if (element.name !== placeToUpsert.name) return element
    const newElement = { ...element, ...placeToUpsert }
    return newElement
  })

  if (existingPlaces === newPlaces) {
    // if we didn't find an existing element with a matching name above,
    // the starting and "new" arrays will match. so we should add a new element

    const newPlace: Place = {
      ...placeToUpsert,
      createdAt: new Date().toUTCString(),
      deleted: false,
      lastUpdatedAt: new Date().toUTCString(),
    }

    newPlaces?.push(newPlace)
  }

  const jsonData = { places: newPlaces }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData))
}
