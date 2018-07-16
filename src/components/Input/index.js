import React, {Component} from 'react';
import {TextField,InputAdornment} from '@material-ui/core';
import MaskedInput from 'react-text-mask';

class Input extends Component {
    render() {
        const {input, meta: {touched, error}, Icon, label, textMask,className} = this.props;
        return <TextField
                    className={className}
                    fullWidth
                    placeholder={label}
                    helperText={touched && error}
                    error={error && touched}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon/>
                            </InputAdornment>
                        ),
                    }}
                    {...input}
                />
    }
};

export default Input;