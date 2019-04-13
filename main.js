var excel = document.getElementById('excel-input')
var wiki = document.getElementById('wiki-output')

excel.addEventListener('click', function f (e) {
  // For convenience, select all text on first click. Remove listener for
  // subsequent clicks since it gets annoying if you're trying to edit
  // stuff.
  e.target.select()
  excel.removeEventListener('click', f)
})

excel.addEventListener('blur', update)

function update (e) {
  console.log('Updating...')
  var text = excel.value

  var markup = ''

  text.split('\n').forEach(function (line, rowIndex) {
    let values = line.split('\t')
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
};

wiki.addEventListener('click', function (e) {
  e.target.select()
})
