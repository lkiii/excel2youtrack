var excel = document.getElementById('excel-input')
var wiki = document.getElementById('wiki-output')

excel.addEventListener('focus', function (e) {
  e.target.select()
})
wiki.addEventListener('focus', function (e) {
  e.target.select()
})
excel.addEventListener('paste', function (e) {
  setTimeout(() => {
    excel.blur()
  }, 200)
})

excel.addEventListener('blur', update, true)

function isEmptyLine (values) {
  return (values.length === 1 && values[0].length === 0)
}

function update (e) {
  console.log('Updating...')
  var text = excel.value

  var markup = ''

  text.split('\n').forEach(function (line, rowIndex) {
    let values = line.split('\t')
    if (isEmptyLine(values)) {
      return
    }
    if (rowIndex === 1) {
      for (let i = 0; i < values.length; i++) {
        markup += '|---'
      }
      markup += '|\n'
    }
    values.forEach(function (content, colIndex) {
      markup += `|${content}`
    })
    markup += '|\n'
  })
  wiki.innerHTML = markup
}
