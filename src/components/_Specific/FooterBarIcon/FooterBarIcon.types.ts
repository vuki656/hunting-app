import { RouteProp } from "@react-navigation/core"

export type FooterBarIconProps = {
    color: string,
    focused: boolean,
    route: RouteProp<Record<string, object>, string>;
}
