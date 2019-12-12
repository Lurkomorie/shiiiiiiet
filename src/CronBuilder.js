// @flow

import React, {PureComponent} from 'react'
import BEMHelper from 'react-bem-helper'
import {If, Then} from 'react-if'
import {generateCronExpression, parseCronExpression} from 'utils'
import cronsTrue from 'cronstrue'
import noop from 'lodash/noop'
import Tab from './components/Tab'
import PeriodicallyTab from './components/PeriodicallyTab'
import PeriodicallyFrameTab from './components/PeriodicallyFrameTab'
import FixedTimeTab from './components/FixedTimeTab'
import {Button} from 'antd';

import './cron-builder.scss';


const components = [PeriodicallyTab, PeriodicallyFrameTab, FixedTimeTab];
const getActiveTabIndex = (props) => {
    const {cronExpression} = props;
    const parsedExpression = parseCronExpression(cronExpression);
    if(parsedExpression.hours.includes('-')) {
        return 1
    } else {
        return 0
    }
};

export default class CronBuilder extends PureComponent {
    static defaultProps = {
        cronExpression: '* * * * *',
        showResult: true,
        onChange: noop
    };

    constructor(props, ctx) {
        super(props, ctx);
        const activeIndex = getActiveTabIndex(props);
        this.state = {
            activeIndex,
            Component: components[activeIndex],
            generatedExpression: ''
        };
    }

    presetComponent: any;

    generateExpression = () => {
        const {onChange} = this.props;
        this.setState({
            generatedExpression: generateCronExpression(
                this.presetComponent.getExpression()
            )
        }, () => onChange(this.state.generatedExpression));
    };

    selectTab = (activeIndex) => {
        return () => {
            this.setState({
                activeIndex,
                Component: components[activeIndex]
            })
        }
    };

    render() {
        const {cronExpression, showResult} = this.props;
        const {activeIndex, Component, generatedExpression} = this.state;
        return (
            <div className="cron-builder">
                <fieldset className="fieldset">
                    <legend className="legend">
                        <Tab
                            isActive={activeIndex === 0}

                            onClick={this.selectTab(0)}
                        >
                            Periodically
                        </Tab>
                        <Tab
                            isActive={activeIndex === 1}

                            onClick={this.selectTab(1)}
                        >
                            Periodically within a time frame
                        </Tab>
                        <Tab
                            isActive={activeIndex === 2}
                            onClick={this.selectTab(2)}
                        >
                            At a recurring fixed time
                        </Tab>
                    </legend>
                    <Component

                        ref={(component) => this.presetComponent = component}
                        expression={parseCronExpression(cronExpression)}
                    />
                </fieldset>
                <div style={{textAlign: 'center'}} >
                    <Button
                        type="button"
                        className="action"
                        onClick={this.generateExpression}
                        data-action
                    >
                        Generate cron expression
                    </Button>
                </div>
                <If condition={!!generatedExpression && showResult}>
                    <Then>
                        <div data-result >
                            <hr/>
                            <PrettyExpression expression={generatedExpression} />
                            <div className="result"
                            >
                                {generatedExpression}
                            </div>
                        </div>
                    </Then>
                </If>
            </div>
        )
    }
}

function PrettyExpression(props) {
    const {expression} = props;
    return (
        <div
            className="pretty-expression"
        >
            {cronsTrue.toString(expression)}
        </div>
    )
}
