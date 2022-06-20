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
    return element.name.toLowerCase() === placeName.toLowerCase()
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
    return itemName.toLowerCase() === element.name.toLowerCase()
  })[0]

  return item
}

export const deletePlace = (placeName: string) => {
  const places = getPlaces()

  const newPlaces = places?.filter((element) => {
    return element.name.toLowerCase() !== placeName.toLowerCase()
  })

  const jsonData = { places: newPlaces }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData, null, 2))
}

export const deleteItem = (placeName: string, itemName: string) => {
  const places = getPlaces()

  const newPlacesWithoutItem = places?.map((element) => {
    // if it's not the place we're looking for, stop
    if (element.name.toLowerCase() !== placeName.toLowerCase()) return element

    // make a list of all the items except the one we're looking for
    const newItemList = element.items?.filter((e) => {
      return e.name.toLowerCase() !== itemName.toLowerCase()
    })

    // make that the new item list
    // in the real world we'll set the deleted attrib,
    // but for the fake one who cares
    element.items = newItemList
    return element
  })

  const jsonData = { places: newPlacesWithoutItem }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData, null, 2))
}

export const upsertPlace = (placeToUpsert: Place) => {
  // remove properties we want to manage ourselves first
  delete placeToUpsert.createdAt
  delete placeToUpsert.deleted
  delete placeToUpsert.deletedAt
  delete placeToUpsert.lastUpdatedAt

  let foundMatchingPlace = false

  if (!placeToUpsert.name) {
    // take the provided human name and lowercase it
    // and remove all non-alphanumeric characters
    placeToUpsert.name = placeToUpsert.humanName
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
  }

  // if the place already exists, edit that element
  // and return a new array
  const existingPlaces = getPlaces()
  const newPlaces = existingPlaces?.map((element: Place) => {
    if (element.name.toLowerCase() !== placeToUpsert.name.toLowerCase())
      return element
    foundMatchingPlace = true
    const newElement = { ...element, ...placeToUpsert }
    return newElement
  })

  if (!foundMatchingPlace) {
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
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData, null, 2))
}

export const upsertItem = (placeName: string, itemToUpsert: Item) => {
  // remove properties we want to manage ourselves first
  delete itemToUpsert.createdAt
  delete itemToUpsert.deleted
  delete itemToUpsert.deletedAt
  delete itemToUpsert.lastUpdatedAt

  if (!itemToUpsert.name) {
    // take the provided human name and lowercase it
    // and remove all non-alphanumeric characters
    itemToUpsert.name = itemToUpsert.humanName
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
  }

  // if the place already exists, edit that element
  // and return a new array
  const existingPlaces = getPlaces()
  const newPlaces = existingPlaces?.map((place: Place) => {
    if (place.name.toLowerCase() !== placeName.toLowerCase()) return place

    let foundMatchingItem = false
    const newItems = place.items?.map((item) => {
      if (item.name.toLowerCase() !== itemToUpsert.name.toLowerCase())
        return item
      foundMatchingItem = true
      const newItem = { ...item, ...itemToUpsert }
      return newItem
    })

    if (!foundMatchingItem) {
      // if we didn't find an existing item,
      // we should add a new one
      const newItem: Item = {
        ...itemToUpsert,
        createdAt: new Date().toUTCString(),
        deleted: false,
        lastUpdatedAt: new Date().toUTCString(),
      }
      newItems?.push(newItem)
    }
    place.items = newItems
    return place
  })

  const jsonData = { places: newPlaces }
  writeFileSync(JSON_DATA_FILE_PATH, JSON.stringify(jsonData, null, 2))
}
