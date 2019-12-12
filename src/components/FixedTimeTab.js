// @flow

import React from 'react'
import {toOptions, addLeadingZeroToOption, defaultTo, ensureMultiple, rangeHoursToSingle} from 'utils'
import range from 'lodash/range'
import PresetTab from './PresetTab'
import TimeInput from './components/TimeInput'
import DateComponent, {DayOfWeek, DayOfMonth, Month} from './components/DateComponent'

const hoursOptions = toOptions(range(0, 24)).map(addLeadingZeroToOption);
const minutesOptions = toOptions(range(0, 60)).map(addLeadingZeroToOption);

export default class FixedTimeTab extends PresetTab {
    constructor(props, ctx) {
        super(props, ctx);
        let {hours, minutes} = this.state;
        hours = ensureMultiple(hours, false);
        hours = rangeHoursToSingle(hours);
        minutes = ensureMultiple(minutes, false);
        this.state.hours = defaultTo(String(hours), '8');
        this.state.minutes = defaultTo(String(minutes), '45');
        this.state.minutesMultiple = true;
        this.state.hoursMultiple = true;
    }

    render() {

        const {minutes, hours, dayOfWeek, dayOfMonth, month} = this.state;
        return (
            <div
                className="preset"
            >
                <div
                    className="row row--items-end"
                >
                    <div>
                        <div
                            className="label"
                        >
                            At:
                        </div>
                        <TimeInput
                            options={hoursOptions}
                            onChange={this.selectHours}

                            value={hours}
                        />
                    </div>
                    <div>
                        <TimeInput
                            options={minutesOptions}
                            onChange={this.selectMinutes}

                            value={minutes}
                        />
                    </div>
                </div>
                <div
                    style={{marginLeft: 35}}
                >
                    <DateComponent

                    >
                        <DayOfWeek
                            value={dayOfWeek}
                            onChange={this.selectDayOfWeek}
                        />
                        <DayOfMonth
                            value={dayOfMonth}
                            onChange={this.selectDayOfMonth}
                        />
                        <Month
                            value={month}
                            onChange={this.selectMonth}
                        />
                    </DateComponent>
                </div>
            </div>
        )
    }
}
