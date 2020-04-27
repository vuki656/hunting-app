export type MeatListItemProps = {
    meatItem: MeatItemType
}

export type MeatItemType = {
    cut: string,
    huntDate: string,
    huntSpot: string,
    species: string,
    code: string,
    weight: number,
    consumed: boolean,
}
