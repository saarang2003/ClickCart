import React from 'react'

function ReadOnly({readOnly , children}) {

    const className = readOnly ? 'read-only-page' : '';

  return (
   <div className={className}>{children}</div>
  )
}

export default ReadOnly