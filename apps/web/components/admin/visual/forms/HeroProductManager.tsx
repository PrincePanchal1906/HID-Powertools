'use client'

import React from 'react'
import { useVisualCMS } from '../VisualCMSProvider'
import { ProductListManager } from './ProductListManager'

export function HeroProductManager({ forceRender = false }: { forceRender?: boolean }) {
  const cms = useVisualCMS()
  const activeDrawer = cms?.activeDrawer 

  if (!forceRender && activeDrawer !== 'hero_manager') return null;

  return (
    <ProductListManager 
      sectionKey="hero" 
      title="Manage Hero Products" 
    />
  )
}
