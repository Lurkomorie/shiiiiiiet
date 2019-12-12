// @flow

import {PureComponent} from 'react'
import pick from 'lodash/pick'
import {MINUTES, EVERY} from 'data/constants'
import {isMultiple, ensureMultiple, replaceEvery} from 'utils'

export const ensureEveryOn = (value, multiple) => {
    const process = (item) => {
        if(item === EVERY) {
            return item
        }
        if(item.includes('-')) {
            return item
        }
        if(multiple && item.includes('/')) {
            return replaceEvery(item)
        }
        if(!multiple && !item.includes('/')) {
            return `*/${item}`
        }
        return item
    };
    if(value instanceof Array) {
        return value.map(process)
    } else {
        return process(value)
    }
};

export function ensureValue(value) {
    if (Array.isArray(value) && !value.length) {
        return [EVERY]
    }
    if (!value) {
        return EVERY
    }
    return value
}

export function ensureArrayValue(value){
    if (value.length) {
        return value
    }
    return [EVERY]
}

export default class PresetTab extends PureComponent {
    constructor(props, ctx) {
        super(props, ctx);
        const {expression} = props;
        const {minutes, hours} = expression;
        const minutesMultiple = isMultiple(minutes),
            hoursMultiple = isMultiple(hours);
        this.state = {
            ...expression,
            activeTime: MINUTES,
            minutesMultiple,
            hoursMultiple,
            minutes,
            hours
        };
    }

    selectMinutes = (value) => {
        this.setState({
            minutes: ensureValue(value)
        })
    };

    selectHours = (value) => {
        this.setState({
            hours: ensureValue(value)
        })
    };

    selectDayOfWeek = (value) => {
        this.setState({
            dayOfWeek: ensureArrayValue(value)
        })
    };

    selectDayOfMonth = (value) => {
        this.setState({
            dayOfMonth: ensureArrayValue(value)
        })
    };

    selectMonth = (value) => {
        this.setState({
            month: ensureArrayValue(value)
        })
    };

    changeDateType = () => {
        const {state} = this;
        const {activeTime} = state;
        const field = activeTime.toLowerCase();
        const key = `${field}Multiple`;
        const value = !this.state[key];
        this.setState({
            [key]: value,
            [field]: ensureMultiple(state[field], value)
        })
    };

    getExpression() {
        const {state} = this;
        const {minutes, hours, minutesMultiple, hoursMultiple} = state;
        return {
            minutes: ensureEveryOn(minutes, minutesMultiple),
            hours: ensureEveryOn(hours, hoursMultiple),
            ...pick(state, ['dayOfMonth', 'month', 'dayOfWeek'])
        }
    }
}
