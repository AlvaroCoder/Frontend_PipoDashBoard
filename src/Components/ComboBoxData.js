import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';


const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
const Button = React.forwardRef(function Button(props, ref) {
    const { ownerState, ...other } = props;
    return (
      <button type="button" {...other} ref={ref}>
        {other.children}
          <ChevronUpDownIcon/>
      </button>
    );
  });


Button.propTypes = {
    children: PropTypes.node,
    ownerState: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      autoFocus: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      defaultListboxOpen: PropTypes.bool,
      defaultValue: PropTypes.any,
      disabled: PropTypes.bool.isRequired,
      focusVisible: PropTypes.bool.isRequired,
      getSerializedValue: PropTypes.func,
      listboxId: PropTypes.string,
      listboxOpen: PropTypes.bool,
      name: PropTypes.string,
      onChange: PropTypes.func,
      onListboxOpenChange: PropTypes.func,
      open: PropTypes.bool.isRequired,
      optionStringifier: PropTypes.func,
      renderValue: PropTypes.func,
      slotProps: PropTypes.shape({
        listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      }),
      slots: PropTypes.shape({
        listbox: PropTypes.elementType,
        popper: PropTypes.func,
        root: PropTypes.elementType,
      }),
      value: PropTypes.any,
    }).isRequired,
  };
  
const StyledButton = styled(Button, { shouldForwardProp: () => true })(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.8rem;
    box-sizing: border-box;
    width: 100%;
    padding: .7rem 15px;
    border-radius:5px;
    text-align: left;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    position: relative;
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
      }

    &.${selectUnstyledClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    & > svg {
      font-size: 1rem;
      width:20px;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `,
  );
  
const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.8rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0px;
    min-width: 220px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
  );

  
const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );
  
  const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
  `;

  const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const slots = {
      root: StyledButton,
      listbox: StyledListbox,
      popper: StyledPopper,
      ...props.slots,
    };
  
    return <SelectUnstyled {...props} ref={ref} slots={slots} />;
  });

  
CustomSelect.propTypes = {
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
      listbox: PropTypes.elementType,
      popper: PropTypes.func,
      root: PropTypes.elementType,
    }),
  };
  
  
export default function UnstyleListParams({data,setData}) {
    const copyData = [...data] 
    const onChangeData2Send = (evt)=>{
        evt.preventDefault();
        setData(evt.target.outerText.toUpperCase())
      }
    return(
        <CustomSelect
            defaultValue = {copyData[0].nombre}
            onChange = {onChangeData2Send}
        >
        {
            copyData.map((val)=>{
                return <StyledOption key={val.index} value={val.nombre}>{val.displayName || val.valor}</StyledOption>
            })
        }                    
        </CustomSelect>
    )
}
