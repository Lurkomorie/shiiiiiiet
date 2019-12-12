// @flow

import React, {PureComponent} from 'react'
import {parseTimeValue, getValues, getValue} from 'utils'
import Select from './Select'


export default class TimeInput extends PureComponent {

    onChange = (onChange) => {
        return (value) => {
            if(value instanceof Array) {
                onChange(getValues(value))
            } else {
                onChange(getValue(value))
            }
        }
    };


    render() {
        const {value, onChange} = this.props;
        return (
            <Select
                {...this.props}
                className="input"
                value={parseTimeValue(value)}
                onChange={this.onChange(onChange)}
            />
        )
    }
}
