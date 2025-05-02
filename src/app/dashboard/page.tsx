'use client'

import { authCheck } from '@/service/api'
import { useAuth } from '@/store/useAuth'
import React, { useEffect } from 'react'

function DashBoard() {

  const user = useAuth((state) => state.user)
  
  return (
    <div>loggig user { JSON.stringify(user) }</div>
  )
}

export default React.memo(DashBoard)