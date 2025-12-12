"use client"

export function CornerMarks() {
  return (
    <>
      {/* Top Left */}
      <div className="fixed top-4 left-4 z-50 pointer-events-none opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H15V1H1V15H0V0Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Top Right */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0H5V1H19V15H20V0Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20H15V19H1V5H0V20Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20H5V19H19V5H20V20Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
    </>
  )
}
