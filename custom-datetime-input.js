import moment from "moment"

class BaseDateInput extends HTMLElement {
    constructor(initialState) {
        super()
        this._state = initialState
        this.attachShadow({ mode: "open" })
        this.shadowRoot.addEventListener("change", event => {
            this.value = Number.parseInt(event.target.value)
            this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: this.value } }))
        })
        this.render()
    }
    set state({ from, to, value }) {
        this._state.from = from
        this._state.to = to
        let changed = this._state.value != value
        this._state.value = value
        this.render()
        if (changed) {
            this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: this.value } }))
        }
    }
    get state() {
        return this._state
    }
    set value(value) {
        this.state = { ...this.state, value }
    }
    get value() {
        return this.state.value
    }
    render() {
        this.shadowRoot.innerHTML = this.layout
    }
}

class CustomYearInput extends BaseDateInput {
    constructor() {
        super({
            from: moment().get("year"), to: moment().get("year") - 10, value: moment().get("year")
        })
    }
    get layout() {
        let html = "<select>",
            dYear = 1
        if (this.state.from > this.state.to) {
            dYear = -1
        }
        for (let year = this.state.from; ; year += dYear) {
            html += `<option ${year == this.state.value ? "selected" : ""}>${year}年</option>`
            if (year == this.state.to) {
                break
            }
        }
        html += "</select>"
        return html
    }
}

class CustomMonthInput extends BaseDateInput {
    constructor() {
        super({
            from: 0, to: 11, value: moment().get("month") + 1
        })
    }
    get layout() {
        let html = "<select>"
        for (let month = this.state.from; month <= this.state.to; month += 1) {
            html += `<option value="${month}" ${month == this.state.value ? "selected" : ""}>${month + 1}月</option>`
        }
        html += "</select>"
        return html
    }
}

class CustomDateInput extends BaseDateInput {
    constructor() {
        super({
            from: 1, to: 31, value: moment().get("date"), daysInMonth: moment().daysInMonth(), year: moment().get("year"), month: moment().get("month")
        })
    }
    get layout() {
        let html = "<select>"
        for (let day = this.state.from; day <= this.state.to && day <= this.state.daysInMonth; day += 1) {
            const date = moment(`${this.state.year}-${this.state.month + 1}-${day}`, "YYYY-MM-DD").locale("zh-cn")
            html += `<option value="${day}" ${day == this.state.value ? "selected" : ""}>${date.format("DD日 dddd", "zh")}</option>`
        }
        html += "</select>"
        return html
    }
    set state({ from, to, value, year, month }) {
        const daysInMonth = moment().set("year", year).set("month", month).daysInMonth()
        this._state.year = year
        this._state.month = month
        this._state.daysInMonth = daysInMonth
        if (value > daysInMonth) {
            value = daysInMonth
        }
        super.state = { from, to, value, daysInMonth }
    }
    get state() {
        return this._state
    }
}

class CustomHourInput extends BaseDateInput {
    constructor() {
        super({
            from: 0, to: 23, value: moment().get("hour")
        })
    }
    get layout() {
        let html = "<select>"
        for (let hour = this.state.from; hour <= this.state.to && hour < 24; hour += 1) {
            html += `<option value="${hour}" ${hour == this.state.value ? "selected" : ""}>${hour < 10 ? "0" : ""}${hour} 时</option>`
        }
        html += "</select>"
        return html
    }
}

export { CustomYearInput, CustomMonthInput, CustomDateInput, CustomHourInput }