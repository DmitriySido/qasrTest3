'use client'

import './watan.scss'

import Image from 'next/image'
import ButtonBuy from '../../UI/buttonBuy/ButtonBuy'
import MainFoto from '../../../../../public/images/main-foto.jpg'
import { Playfair_Display } from "next/font/google";
import { useEffect, useRef, useState } from 'react';
const playfair = Playfair_Display({ subsets: ["latin"] })

const Watan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showControls, setShowControls] = useState(false);

  const handleVideoClick = () => {
    setShowControls((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return(
    <section className="watan">
      <div className="watan-content">
        <h2 className={playfair.className + " watan-title"}>QASR AL WATAN</h2>
        <ButtonBuy text="BUY TICKETS" path='/pages/selectDataTicket' moreClass='watan-button'/>
      </div>
      {/* <Image className="main-illustration" src={MainFoto} alt="QASR AL WATAN"/> */}
      <video
        className="main-illustration"
        ref={videoRef}
        muted
        loop
        controls={showControls}
        onClick={handleVideoClick}
        onMouseEnter={() => setShowControls(false)}
      >
        <source src="/images/QAW-brand-video.mp4" type="video/mp4" />
      </video>
    </section>
  )
}

export default Watan