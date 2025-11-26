import ReactCodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { useState } from 'react';



const CodeEditor = ({language, value, onChange}) => {

    
const LanguageMap = {
    javascript: javascript(),
    html: html(),
    css: css(),
    python: python()
}




  return (
    <div className='w-full h-full'>

        {language === "" ? ("Za ovaj zadatak nije traženo programiranje. Molimo Vas pratite instrukcije zadatka.") : (

            <div className="flex h-full w-full bg-white">


    <div className="w-[65%]  h-full">
        <ReactCodeMirror className='text-left'
        height='500px'
        extensions={[LanguageMap[language]]}
        value={value}
        onChange={(e)=>{onChange(e)}}
        ></ReactCodeMirror>
    </div>






    <div className="w-[35%]  h-full relative">
    
<div className="inset-0 w-full h-full bg-[url('/icons/mathpattern.jpg')] opacity-30 absolute"></div>
    <div className="flex flex-col gap-3 mt-40 z-50">
        
        <h1 className=' text-2xl text-black font-bold opacity-100'>Pokretanje koda još nije dostupno.</h1>
        <p>Trenutno možeš uneti svoj kod i poslati na pregled, ili kopirati u Compiler i pokrenuti.</p>
    </div>
    </div>
</div>

        )}





    </div>
  )
}

export default CodeEditor