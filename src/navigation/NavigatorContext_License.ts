import React from "react"
export interface NavigatorContextState_License {
    setIsLicense: (value: boolean) => void,
}

export const DEFAULT_NAVIGATOR_CONTEXT_LICENSE: NavigatorContextState_License = {
    setIsLicense: () => null,
}

export const NavigatorContext_License = React.createContext<NavigatorContextState_License>(DEFAULT_NAVIGATOR_CONTEXT_LICENSE)