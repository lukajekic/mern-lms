import React from 'react'
import { LANGUAGES_VERSIONS } from '../constants'


const languages = Object.entries(LANGUAGES_VERSIONS)
const CodingLnaguageSelector = ({ language, onSelect }) => {
    
  return (
    <div>

      <p className='text-lg'>Language:</p>

      <details id='dropdowndetails'  className="dropdown">
        <summary className="btn m-1">{language}</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          {languages.map(([lang, version]) => (
            <li key={lang} onClick={() => [onSelect(lang)]}><a>{lang}</a></li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default CodingLnaguageSelector