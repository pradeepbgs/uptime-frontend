'use client'

import { useTaskDetails } from '@/service/api'
import { useParams } from 'next/navigation'
import React from 'react'

function Monitor() {
  const params = useParams()
  const id = params.id

  const {data} = useTaskDetails(id as string)

  return (
    <div>{id} {JSON.stringify(data)}</div>
  )
}

export default Monitor