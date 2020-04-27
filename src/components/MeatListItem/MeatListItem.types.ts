export type MeatListItemProps = {
    meatItem: MeatItemType,
    navigation?: any // TODO: set type
}

export type MeatItemType = {
    cut: string,
    huntDate: string,
    huntSpot: string,
    species: string,
    code: string,
    weight: string,
    consumed: boolean,
}
