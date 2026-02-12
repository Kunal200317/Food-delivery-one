import React from 'react'

const dateforhuman = (string) => {
  return string.replace('T',' ').replace('.',' ').split(' ').slice(0,2).join(' ')   
}

export default dateforhuman
