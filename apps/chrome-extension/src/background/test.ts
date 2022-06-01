function test2() {
  console.log('Test 2')
}

export const test = () => {
  console.log('Test')
  setTimeout(test2, 1000)
}
