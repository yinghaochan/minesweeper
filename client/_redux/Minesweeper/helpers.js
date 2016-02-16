export const callAdjacent = function(rowNum, colNum, height, width, cb) {
  for (var i = 0; i < 9; i++) {
    const absRow = rowNum - 1 + parseInt(i / 3, 10)
    const absCol = colNum - 1 + (i % 3)

    const upperBound = absRow < height && absCol < width
    const lowerBound = absRow > -1 && absCol > -1 

    const args = [absRow, absCol].concat([].slice.call(arguments, 5))

    if(i !== 4 && upperBound && lowerBound ){
      cb.apply(this, args)
    }
  }
}
