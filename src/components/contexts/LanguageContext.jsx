import { createContext, useContext, useState} from "react";
import langSpanish from '../../lang_spanish.json'
import langEnglish from '../../lang_english.json'

const LanguageContext = createContext()

export const LanguageProvider = ({children}) =>{
    const storedLang = localStorage.getItem('language') || 'es'
    const [language, setLanguage] = useState(storedLang)
    const texts = language === 'es' ? langSpanish : langEnglish

    const changeLanguage = (lang) =>{
        setLanguage(lang)
        localStorage.setItem('language',lang)
    }

    return(
        <LanguageContext.Provider value = {{language, changeLanguage, texts}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)