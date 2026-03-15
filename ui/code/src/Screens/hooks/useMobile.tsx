import React, { useEffect, useState } from 'react'

function useMobile(): boolean {
    const [isMobile, setMobile] = useState(window.innerWidth < 641);
    const handleResize = () => setMobile(window.innerWidth < 641);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize",handleResize);
    }, []);
  return isMobile;
}

export default useMobile