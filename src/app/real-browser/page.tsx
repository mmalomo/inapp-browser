"use client"

import { isInAppBrowser } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function BrowserInstructionsPage() {
  const router = useRouter();
  
  useLayoutEffect(() => {
    if (isInAppBrowser()) {
      router.push('/')
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="text-center p-8">
          <div className="mx-auto mb-6 w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">¡Perfecto!</h1>
          <p className="text-lg text-green-600 dark:text-green-400 font-medium">Estas en el browser real</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Ahora podés disfrutar de la experiencia completa del sitio
          </p>
        </div>
      </div>
    </div>
  )
}
