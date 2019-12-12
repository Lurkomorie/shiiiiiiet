// @flow

import React from 'react'
import {If, Then, Else} from 'react-if'
import {MINUTES} from 'data/constants'
import {isMultiple, toggleDateType, toOptions, rangeHoursToSingle} from 'utils'
import range from 'lodash/range'
import MultipleSwitcher from './MultipleSwitcher'
import TimeInput from './components/TimeInput'
import DateComponent, {DayOfWeek, DayOfMonth, Month} from './components/DateComponent'
import PresetTab from './PresetTab'

const minutesOptions = toOptions(range(1, 60));
const hoursOptions = toOptions(range(0, 24));

const isMinutes = (activeTime) => activeTime === MINUTES;

const timeInputProps = {style: {minWidth: 75}};

export default class PeriodicallyTab extends PresetTab {
    constructor(props, ctx) {
        super(props, ctx);
        const {hours} = this.state;
        this.state.hours = rangeHoursToSingle(hours)
    }


    toggleActiveTime = () => {
        this.setState(({activeTime}) => ({
            activeTime: toggleDateType(activeTime)
        }))
    };

    isMultiple = () => {
        const {activeTime, minutesMultiple, hoursMultiple} = this.state;
        if(activeTime === MINUTES) {
            return minutesMultiple
        } else {
            return hoursMultiple
        }
    };

    render() {
        const {activeTime, minutes, hours, dayOfWeek, dayOfMonth, month} = this.state;
        return (
            <div className='preset' >
                <div>
                    <MultipleSwitcher
                        isMultiple={this.isMultiple()}
                        onChange={this.changeDateType}
                    />
                    <div
                        className="row row--main"
                    >
                        <If condition={isMinutes(activeTime)}>
                            <Then>
                                <TimeInput
                                    options={minutesOptions}
                                    value={minutes}

                                    onChange={this.selectMinutes}
                                    multi={isMultiple(minutes)}
                                    {...timeInputProps}
                                />
                            </Then>
                            <Else>
                                <TimeInput
                                    options={hoursOptions}
                                    value={hours}

                                    multi={isMultiple(hours)}
                                    onChange={this.selectHours}
                                    {...timeInputProps}
                                />
                            </Else>
                        </If>
                        <div
                            style={{width: 150}}
                        >
                            <MultipleSwitcher

                                isMultiple={!isMinutes(activeTime)}
                                onChange={this.toggleActiveTime}
                                single="minutes"
                                multiple="hours"
                            />
                        </div>
                    </div>
                </div>
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
        )
    }
}
