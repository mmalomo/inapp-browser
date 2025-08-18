"use client"

import { isInAppBrowser } from "@/utils";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [userAgent, setUserAgent] = useState("")
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  useLayoutEffect(() => {
    if (isInAppBrowser()) {
      router.push('/real-browser')
    }
  }, [])

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    setIsIOS(/iPad|iPhone|iPod/.test(ua))
    setIsAndroid(/Android/.test(ua))
  }, [])

  function openInExternalBrowser() {
    const ua = navigator.userAgent;
    const isAndroid = /Android/.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const url = window.location.href;

    try {
      if (isAndroid) {
        // Intent para Android
        const intentUrl = `intent://${url.replace(/https?:\/\//, '')}/#Intent;scheme=https;S.browser_fallback_url=${encodeURIComponent(url)};end`;
        window.location.href = intentUrl;
      } else if (isIOS) {
        const safariUrl = `x-web-search://?${encodeURIComponent(url)}`;
        window.location.href = safariUrl;
      }

      // Fallback si no funciona después de 2 segundos
      setTimeout(() => {
        if (document.hasFocus()) {
          // Si seguimos en la página, el intent falló
          showManualInstructions();
        }
      }, 1000);

    } catch (error) {
      console.warn('Intent failed:', error);
      showManualInstructions();
    }
  }

  function showManualInstructions() {
    setShowInstructions(true);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="text-center p-6 pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Abrir en Navegador</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Para una mejor experiencia, abre esta página en tu navegador principal
          </p>
        </div>

        <div className="p-6 pt-0 space-y-6">
          <button
            onClick={openInExternalBrowser}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Open Site in Browser
          </button>

          {
            showInstructions && (
              <>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    En caso de que no funcione, podés hacer esto:
                  </p>
                  {isIOS && (
                    <div className="border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">Para iOS (iPhone/iPad):</h4>
                          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                            <li>Tocá el ícono de compartir (cuadrado con flecha hacia arriba)</li>
                            <li>Seleccioná "Abrir en Safari"</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}

                  {isAndroid && (
                    <div className="border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2">
                          <h4 className="font-medium text-green-900 dark:text-green-100">Para Android:</h4>
                          <ol className="text-sm text-green-800 dark:text-green-200 space-y-1 list-decimal list-inside">
                            <li>Tocá los 3 puntitos (⋮) en la esquina superior derecha</li>
                            <li>Seleccioná "Abrir en Chrome" o "Abrir en navegador"</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isIOS && !isAndroid && (
                    <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Instrucciones generales:</h4>
                          <ol className="text-sm text-gray-800 dark:text-gray-200 space-y-1 list-decimal list-inside">
                            <li>Buscá el menú de opciones (generalmente 3 puntitos ⋮)</li>
                            <li>Seleccioná "Abrir en navegador" o "Abrir en navegador externo"</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
