import React from 'react'
import Sidebar from './Sidebar'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

function Dashboard() {
  return (
    <div>
      <Sidebar/>
      <LeftPart />
      <RightPart/>
    </div>
  )
}

export default Dashboard
