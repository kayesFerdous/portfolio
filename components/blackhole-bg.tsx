"use client"

import React from "react"
import { motion } from "framer-motion"

export function BlackholeBg() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Ambient Background Glow - Bottom focused like the reference */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-600/20 blur-[100px] rounded-[100%] mix-blend-screen" />

        {/* Faint Orbital Rings */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full border border-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Black Hole Structure */}
        <div className="relative z-10 scale-75 md:scale-100">
            {/* The "Eclipse" Glow - Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-orange-500/40 blur-[60px] rounded-full" />
            
            {/* The Event Horizon (Black Circle) */}
            <div className="relative w-[300px] h-[300px] bg-black rounded-full z-20">
                {/* Inner Shadow for depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,1)]" />
            </div>

            {/* The Photon Ring (Bright Rim) */}
            {/* We use a gradient border to simulate the uneven brightness (Doppler beaming) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[304px] h-[304px] rounded-full z-10 opacity-80">
                <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-orange-200/80 border-b-orange-500/50 border-l-orange-400/60 border-r-orange-400/60 blur-[1px]" />
            </div>

            {/* Bottom "Sunrise" Glow - The characteristic feature of the reference image */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[350px] h-[100px] bg-orange-500/30 blur-[40px] rounded-full z-10" />
            
            {/* Accretion Disk - Subtle Swirl */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full z-0 opacity-30"
                style={{
                    background: "conic-gradient(from 0deg, transparent 0%, #ea580c 20%, transparent 40%, #ea580c 60%, transparent 100%)",
                    filter: "blur(30px)"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </div>
      </div>
    </div>
  )
}
