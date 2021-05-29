import React from 'react'
import PropTypes from 'prop-types'

const IconSvg = (props) => {
  return (
    <img src={props.src} alt={props.alt || ''} width={props.size || 24} {...props} />
  )
}

IconSvg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
}

export default IconSvg;