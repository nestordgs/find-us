function isNumeric (value) {
  let type = typeof value

  return (type === 'number' || type === 'string') && !Number.isNaN(value - Number.parseFloat(value))
}

export { isNumeric }