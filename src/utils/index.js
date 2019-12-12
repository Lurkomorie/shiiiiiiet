// @flow


import head from 'lodash/head'
import values from 'lodash/values'
import get from 'lodash/get'
import {MINUTES, HOURS, EVERY} from 'data/constants'

export const toggleMultiple = (value) => {
    if(value instanceof Array) {
        return head(value)
    } else {
        return [value]
    }
};

export const toOptions = (_values) => {
    return _values.map(String).map(value => ({
        value,
        label: value
    }))
};

export const toggleDateType = (value) => {
    return value === MINUTES ? HOURS : MINUTES
};

export const parseTimeValue = (value) => {
    if(value instanceof Array) {
        return value.map(parseTimeValue)
    }
    switch (value) {
        case '*':
            return '1';
        default:
            return value;
    }
};

export const isMultiple = value => value instanceof Array;

export const ensureMultiple = (value, multiple) => {
    if(multiple && !isMultiple(value)) {
        return toggleMultiple(value)
    }
    if(!multiple && isMultiple(value)) {
        return toggleMultiple(value)
    }
    return value
};

export const getValues = value => value.map(option => option.value);

export const getValue = (value) => {
    return get(value, 'value') || value
};

export const generateCronExpression = (expression) => {
    return values(expression).join(' ')
};

export const splitMultiple = (value, field) => {
    if(value.includes(',')) {
        return value.split(',')
    }
    if(value.includes('/')) {
        return value
    }
    if(value.includes('-') && field === HOURS) {
        return value
    }
    if(value === EVERY) {
        return value
    }
    return [value]
};

export const replaceEvery = (value) => {
    if(typeof value === 'string') {
        return value.replace('*/', '')
    }
    return value
};

export const parseCronExpression = (expression) => {
    const [minutes, hours, dayOfMonth, month, dayOfWeek] = expression.split(' ');
    const defaultExpression = {
        minutes: EVERY,
        hours: EVERY,
        dayOfMonth: EVERY,
        month: EVERY,
        dayOfWeek: EVERY
    };
    return Object.assign(defaultExpression, {
        minutes: replaceEvery(splitMultiple(minutes)),
        hours: replaceEvery(splitMultiple(hours, HOURS)),
        dayOfMonth: splitMultiple(dayOfMonth),
        month: splitMultiple(month),
        dayOfWeek: splitMultiple(dayOfWeek)
    })
};

export const addLeadingZero = el => `0${el}`.slice(-2);

export const addLeadingZeroToOption = (option) => {
    const {value, label} = option;
    return {
        label: addLeadingZero(label),
        value
    }
};

export const defaultTo = (item, defaultItem) => {
    return (item === EVERY || !item) ? defaultItem : item
};

export const rangeHoursToSingle = (hours) => {
    if(hours instanceof Array) {
        return hours
    }
    return hours.split('-')[0]
};

