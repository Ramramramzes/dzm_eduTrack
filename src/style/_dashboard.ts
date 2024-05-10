export const roundColor = (color:string) => {
  return {
    backgroundColor: `${color}`,
    boxShadow: `0 0 5px ${color},0 0 10px ${color},0 0 20px ${color},0 0 40px ${color}`,
  }
}

export const backStatus = (color:string) => {
  return {
    color: `${color}`,
  }
}