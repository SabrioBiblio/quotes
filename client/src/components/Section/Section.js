import React from 'react'

export const Section = ({children, styleClass}) => {
  return (
    <section className={styleClass}>
      {children}
    </section>
  )
}
