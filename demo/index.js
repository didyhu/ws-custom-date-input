import { CustomDatetimeInput, CustomYearInput, CustomMonthInput, CustomDateInput, CustomHourInput } from "../custom-datetime-input.js"
import moment from "moment"

customElements.define("custom-year-input", CustomYearInput)
customElements.define("custom-month-input", CustomMonthInput)
customElements.define("custom-date-input", CustomDateInput)
customElements.define("custom-hour-input", CustomHourInput)

const elems = {
    get yearIpt() {
        return document.querySelector("custom-year-input")
    },
    get monthIpt() {
        return document.querySelector("custom-month-input")
    },
    get dateIpt() {
        return document.querySelector("custom-date-input")
    },
    get hourIpt() {
        return document.querySelector("custom-hour-input")
    },
    get output() {
        return document.querySelector("[data-role=output]")
    }
}

const state = {
    _year: moment().get("year"),
    _month: moment().get("month"),
    _date: moment().get("date"),
    _hour: moment().get("hour"),
    output() {
        if (isNaN(this.year) || isNaN(this.month) || isNaN(this.date) || isNaN(this.hour)) {
            return
        }
        elems.output.innerHTML = moment(`${this.year}-${this.month + 1}-${this.date} ${this.hour}`, "YYYY-MM-DD HH")
    },
    set time({year,month,date}){
this._time={year}
    },
    set year(year) {
        this._year = year
        elems.yearIpt.value = year
        elems.dateIpt.state = { ...elems.dateIpt.state, year: this.year, month: this.month }
        this.output()
    },
    get year() {
        return this._year
    },
    set month(month) {
        this._month = month
        elems.monthIpt.value = month
        elems.dateIpt.state = { ...elems.dateIpt.state, year: this.year, month: this.month }
        this.output()
    },
    get month() {
        return this._month
    },
    set date(date) {
        this._date = date
        elems.dateIpt.value = date
        this.output()
    },
    get date() {
        return this._date
    },
    set hour(hour) {
        this._hour = hour
        elems.hourIpt.value = hour
        this.output()
    },
    get hour() {
        return this._hour
    }
}


elems.yearIpt.addEventListener("change", event => {
    state.year = elems.yearIpt.value
})
elems.monthIpt.addEventListener("change", event => {
    state.month = elems.monthIpt.value
})
elems.dateIpt.addEventListener("change", event => {
    state.date = elems.dateIpt.value
})
elems.hourIpt.addEventListener("change", event => {
    state.hour = elems.hourIpt.value
})