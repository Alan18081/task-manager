import React from 'react';
import {NavLink} from 'react-router-dom';
import {withStyles,Button} from '@material-ui/core';
import {Icon} from 'react-icons-kit';
import { basic_todolist_pen } from "react-icons-kit/linea/basic_todolist_pen";

import styles from './styles';

const Logo = ({classes}) => (
  <NavLink to="/">
    <Button>
      <Icon
        icon={basic_todolist_pen}
        size={30}
      />
    </Button>
  </NavLink>
);

export default Logo;