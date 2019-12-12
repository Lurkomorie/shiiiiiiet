// @flow

import React, {PureComponent} from 'react'
import Tab from './Tab'


export default class MultipleSwitcher extends PureComponent {
    static defaultProps = {
        single: 'Every:',
        multiple: 'On:'
    };

    render() {
        const { single, multiple, isMultiple, onChange} = this.props;
        return (
            <div>
                <div
                    className="row row--inline"
                    onClick={onChange}
                    data-multiple-switcher
                >
                    <Tab

                        isActive={!isMultiple}
                    >
                        {single}
                    </Tab>
                    <Tab
                        isActive={isMultiple}
                    >
                        {multiple}
                    </Tab>
                </div>
            </div>
        )
    }
}
