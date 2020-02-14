import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { FooterBarIconProps } from "./FooterBarIcon.types"

export const FooterBarIcon: React.FunctionComponent<FooterBarIconProps> = (props) => {
    const { color, route } = props

    const getIconName = () => {
        switch (route.name) {
            case "Home":
                return "home"
            case "Scan":
                return "barcode-scan"
            case "My List":
                return "format-list-bulleted"
            case "Add New":
                return "plus-circle-outline"
            case "Settings":
                return "settings"
        }
    }

    return (
        <MaterialCommunityIcons name={getIconName()} size={20} color={color} />
    )
}
