// @flow

import React, {PureComponent, Children} from 'react'
import {If, Then} from 'react-if'
import {EVERY} from 'data/constants'
import head from 'lodash/head'
import {getValues} from 'utils'
import Select from '../Select'
import {DayOfWeek, DayOfMonth, Month} from './index'
import {Select as FSelect} from 'antd';
const {Option} = FSelect;

export default class DateComponent extends PureComponent {

    static defaultProps = {
        children: null
    };

    state = {
        activeComponent: DayOfWeek.className
    };


    handleChange = (value) => {
        console.log(value);
        this.setState({
            activeComponent: value
        })
    };


    onChange = (onChange) => {
        return (value) => {
            const values = getValues(value);
            const first = head(values);
            if(first === EVERY && values.length > 1) {
                onChange(values.filter((val) => val !== EVERY))
            } else {
                const everyIndex = values.indexOf(EVERY);
                if(everyIndex !== -1) {
                    onChange([EVERY])
                } else {
                    onChange(values)
                }
            }
        }
    };

    render() {
        const {children} = this.props;
        const {activeComponent} = this.state;
        return (
            <div
                style={{position: 'relative'}}
            >
                <label className="label">
                    On:
                </label>
                <div className="row row--items-end" >
                    {Children.map(children, (child) => {
                        const {value, onChange} = child.props;
                        const {getOptions} = child.type;
                        return (
                            <If condition={child.type.className === activeComponent} >
                                <Then>
                                    <div
                                        className="input"
                                    >
                                        <Select
                                            style={{minWidth: 120}}
                                            value={value}
                                            options={getOptions()}
                                            multi
                                            autosize
                                            onChange={this.onChange(onChange)}
                                        />

                                    </div>
                                </Then>
                            </If>
                        )
                    })}
                </div>
                <div
                    style={{position: 'absolute'}}
                    className="link"
                >
                    <FSelect defaultValue={DayOfWeek.className} style={{minWidth: 130}} onChange={this.handleChange} >
                        <Option value={DayOfWeek.className}>day of week</Option>
                        <Option value={DayOfMonth.className}>day of month</Option>
                        <Option value={Month.className}>month</Option>
                    </FSelect>
                </div>
            </div>
        )
    }
}
