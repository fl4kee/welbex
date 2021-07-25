const submitForm = document.querySelector('#eventForm')
const filterForm = document.querySelector('#filterForm')
let tbody = document.querySelector('tbody')

let state = {
    'page': 1,
    'rows': 8,
}

const pagination = (result, page, rows) => {
    let trimStart = (page - 1) * rows
    let trimEnd = trimStart + rows
    let trimmedData = result.slice(trimStart, trimEnd)
    let pages = Math.ceil(result.length / rows)
    return {
        "querySet": trimmedData,
        "pages": pages
    }
}

const pageButtons = (pages, data) => {
    const wrapper = document.querySelector('#pagination-wrapper')
    wrapper.innerHTML = ""

    for (let page = 1; page <= pages; page++) {
        wrapper.innerHTML += `<button value=${page} class="page">${page}</button>`
    }

    const page = document.querySelectorAll('.page')
    console.log(page)
    for(let button of page){
        button.addEventListener('click', () => {
            state.page = button.value
            buildTable(data)
        })
    }
}

const buildTable = (data) => {
    let result = pagination(data, state.page, state.rows)
    if (result.querySet.length == 0) {
        alert("Нет подходящих элементов")
    } else {
        tbody.innerHTML = ""
        for (let row of result.querySet) {
            let newRow = document.createElement('tr')
            for (let td in row) {
                let newTd = document.createElement('td')
                newTd.append(row[td])
                newRow.append(newTd)
            }
            tbody.append(newRow)
        }
        pageButtons(result.pages, data)
    }
}

const createInitialTable = async () => {
    result = await axios.get("http://localhost:3000/api/table")
    let data = result.data.rows
    buildTable(data)
}

createInitialTable()

submitForm.addEventListener('submit', (async (e) => {
    try {
        e.preventDefault()
        const date_ = submitForm.elements.date.value
        const title = submitForm.elements.title.value
        const qty = submitForm.elements.qty.value
        const distance = submitForm.elements.distance.value

        let result = await axios.post("http://localhost:3000/api/entry", {
            date_: date_,
            title: title,
            qty: qty,
            distance: distance
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = result.data.rows
        buildTable(data)
    }
    catch (e) {
        alert("Проверьте поля ввода")
    }
}));

filterForm.addEventListener('submit', (async (e) => {
    try {
        e.preventDefault()
        const column = filterForm.elements.column.value
        const condition = filterForm.elements.condition.value
        const value = filterForm.elements.value.value

        result = await axios.post("http://localhost:3000/api/filter", {
            column: column,
            condition: condition,
            value: value
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        let data = result.data.rows
        buildTable(data)
    }
    catch (e) {
        alert("Проверьте поля фильтра")
    }

}))


