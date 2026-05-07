import { useState } from 'react';
import {
    TextField, IconButton,
    FormControl,
    FormHelperText,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller } from 'react-hook-form';

const CommonInput = ({
    name,
    control,
    label,
    type = 'text',
    placeholder,
    rules = {},
    defaultValue = '',
    multiline = false,
    rows = 4,
    required,
    fullWidth = true,
    variant = 'outlined',
    inputType = 'text',
    inputMode,
    autoFocus = false,
    maxLength,
    max,
    onChange,
    disabled = false,
    autoComplete = 'off',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const isTextarea = type === 'textarea';

    return (
        <FormControl fullWidth={fullWidth} variant={variant} margin="normal" className='common-input-container'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <TextField
                            {...field}
                            label={required ? <span>{label} *</span> : label}
                            type={isPassword ? (showPassword ? 'text' : 'password') : inputType}
                            className={`common-input ${ rest.className || '' }`}
                            placeholder={placeholder}
                            error={!!error}
                            multiline={multiline || isTextarea}
                            rows={isTextarea ? rows : undefined}
                            fullWidth={fullWidth}
                            autoComplete={autoComplete}
                            disabled={disabled}
                            variant={variant}
                            inputMode={inputMode}
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={(e) => {
                                let value = e.target.value;
                                if (onChange) {
                                    const eventClone = { ...e, target: { ...e.target, value } };
                                    onChange(eventClone);
                                    value = eventClone.target.value;
                                }
                                field.onChange(value);
                            }}
                            inputProps={{ maxLength, max }}
                            InputProps={{
                                endAdornment: isPassword && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...rest}
                        />
                        {rest.info && <FormHelperText className='mx-1'>{rest.info}</FormHelperText>}
                        {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </>
                )}
            />
        </FormControl>
    );
};

export default CommonInput;
