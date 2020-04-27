import { NavigationScreenProp } from 'react-navigation'

export type MeatListItemProps = {
    meatItem: MeatItemType,
    navigation?: NavigationScreenProp<string>
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
