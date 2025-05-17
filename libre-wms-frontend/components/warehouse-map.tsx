"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, Maximize, Package, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function WarehouseMap() {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => {
    if (zoom < 1.5) setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(zoom - 0.1)
  }

  const handleReset = () => {
    setZoom(1)
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="h-[600px] border rounded-md overflow-auto bg-gray-50 dark:bg-gray-900"
        style={{ padding: "20px" }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="grid grid-cols-6 gap-4">
            {/* Warehouse zones */}
            <div className="col-span-4 space-y-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                <h3 className="font-medium mb-2">Zone A - Electronics</h3>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-12 w-full rounded border ${
                              i % 5 === 0
                                ? "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700"
                                : i % 7 === 0
                                  ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                                  : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                            } flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500`}
                          >
                            <div className="text-xs font-medium">
                              A-{Math.floor(i / 8) + 1}-{(i % 8) + 1}
                            </div>
                            {i % 5 === 0 && <AlertTriangle className="h-3 w-3 text-amber-500 ml-1" />}
                            {i % 7 === 0 && <Package className="h-3 w-3 text-red-500 ml-1" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">
                              Location A-{Math.floor(i / 8) + 1}-{(i % 8) + 1}
                            </p>
                            <p>Items: {3 + (i % 5)}</p>
                            <p>Status: {i % 5 === 0 ? "Low Space" : i % 7 === 0 ? "Full" : "Available"}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
                <h3 className="font-medium mb-2">Zone B - Furniture</h3>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-12 w-full rounded border ${
                              i % 4 === 0
                                ? "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700"
                                : i % 6 === 0
                                  ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                                  : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                            } flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500`}
                          >
                            <div className="text-xs font-medium">
                              B-{Math.floor(i / 6) + 1}-{(i % 6) + 1}
                            </div>
                            {i % 4 === 0 && <AlertTriangle className="h-3 w-3 text-amber-500 ml-1" />}
                            {i % 6 === 0 && <Package className="h-3 w-3 text-red-500 ml-1" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">
                              Location B-{Math.floor(i / 6) + 1}-{(i % 6) + 1}
                            </p>
                            <p>Items: {2 + (i % 4)}</p>
                            <p>Status: {i % 4 === 0 ? "Low Space" : i % 6 === 0 ? "Full" : "Available"}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                <h3 className="font-medium mb-2">Zone C - High-Value Items</h3>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-12 w-full rounded border ${
                              i % 7 === 0
                                ? "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700"
                                : i % 9 === 0
                                  ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                                  : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                            } flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500`}
                          >
                            <div className="text-xs font-medium">
                              C-{Math.floor(i / 8) + 1}-{(i % 8) + 1}
                            </div>
                            {i % 7 === 0 && <AlertTriangle className="h-3 w-3 text-amber-500 ml-1" />}
                            {i % 9 === 0 && <Package className="h-3 w-3 text-red-500 ml-1" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">
                              Location C-{Math.floor(i / 8) + 1}-{(i % 8) + 1}
                            </p>
                            <p>Items: {1 + (i % 3)}</p>
                            <p>Status: {i % 7 === 0 ? "Low Space" : i % 9 === 0 ? "Full" : "Available"}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                <h3 className="font-medium mb-2">Zone D - Bulk Storage</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-12 w-full rounded border ${
                              i % 5 === 0
                                ? "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700"
                                : i % 8 === 0
                                  ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                                  : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                            } flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500`}
                          >
                            <div className="text-xs font-medium">
                              D-{Math.floor(i / 3) + 1}-{(i % 3) + 1}
                            </div>
                            {i % 5 === 0 && <AlertTriangle className="h-3 w-3 text-amber-500 ml-1" />}
                            {i % 8 === 0 && <Package className="h-3 w-3 text-red-500 ml-1" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">
                              Location D-{Math.floor(i / 3) + 1}-{(i % 3) + 1}
                            </p>
                            <p>Items: {5 + (i % 10)}</p>
                            <p>Status: {i % 5 === 0 ? "Low Space" : i % 8 === 0 ? "Full" : "Available"}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
                <h3 className="font-medium mb-2">Shipping & Receiving</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-20 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-xs font-medium">Receiving Dock 1</div>
                  </div>
                  <div className="h-20 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-xs font-medium">Receiving Dock 2</div>
                  </div>
                  <div className="h-20 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-xs font-medium">Shipping Dock 1</div>
                  </div>
                  <div className="h-20 w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-xs font-medium">Shipping Dock 2</div>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
                <h3 className="font-medium mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 mr-2"></div>
                    <span className="text-xs">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-amber-100 border border-amber-300 dark:bg-amber-900/30 dark:border-amber-700 mr-2"></div>
                    <span className="text-xs">Low Space</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded bg-red-100 border border-red-300 dark:bg-red-900/30 dark:border-red-700 mr-2"></div>
                    <span className="text-xs">Full</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
