import type { RouteProp } from '@react-navigation/native';

export type FooterBarIconProps = {
    color: string
    focused: boolean
    route: RouteProp<Record<string, object>, string>
}
