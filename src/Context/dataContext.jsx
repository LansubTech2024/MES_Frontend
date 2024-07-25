import { useState,createContext } from "react";

const DataContext = createContext({})

export const DataProvider = ({Children}) =>{
    const [settingOpen, setSettingOpen] = useState(false)

    const ToggleSetting = () =>{
        setSettingOpen(!settingOpen)
    }

    const CloseSetting = () =>{
        settingOpen(false)
    }

return(
    <DataContext.Provider
    value={{
        settingOpen,
        setSettingOpen,
        ToggleSetting,
        CloseSetting,
    }}
    >
    {Children}
    </DataContext.Provider>
)
}

export default DataContext;