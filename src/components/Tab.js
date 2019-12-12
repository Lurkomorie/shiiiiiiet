// @flow

import React, {PureComponent} from 'react';
import noop from 'lodash/noop';
import {Button} from 'antd';

export default class Tab extends PureComponent {
    static defaultProps = {
        children: null,
        onClick: noop
    };

    render() {
        const {isActive, children, onClick} = this.props;
        return (
            <Button
                type="button"
                className={isActive ? 'tab active' : 'tab'}

                onClick={onClick}
            >
                {children}
            </Button>
        )
    }
}
