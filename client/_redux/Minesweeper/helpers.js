// calls cb with all adjacent cells
export const callAdjacent = function(rowNum, colNum, height, width, cb) {
  for (var i = 0; i < 9; i++) {
    // compute the adjacent cell indexes
    const absRow = rowNum - 1 + parseInt(i / 3, 10)
    const absCol = colNum - 1 + (i % 3)

    // compute if within bounds
    const upperBound = absRow < height && absCol < width
    const lowerBound = absRow > -1 && absCol > -1 

    // get any args for the callback
    const args = [absRow, absCol].concat([].slice.call(arguments, 5))

    if(i !== 4 && upperBound && lowerBound){
      cb.apply(this, args)
    }
  }
}
