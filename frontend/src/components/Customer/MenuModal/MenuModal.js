import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { AddOutlined, RemoveOutlined } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import default_sku from '../../../assets/icons/default_sku.svg';
import classes from './MenuModal.module.scss';

export const MenuModal = props => {
  const [item, setItem] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemAmount = operation => {
    if (operation === 'sum') {
      setItem(state => ({ ...state, amount: state.amount + 1 }));
    }

    if (operation === 'sub' && item.amount > 1) {
      setItem(state => ({ ...state, amount: state.amount - 1 }));
    }

    handleTotalValue();
  };

  const handleOptionAmount = (operation, index) => {
    const optionsCopy = [...item.options];

    if (
      operation === 'sum' &&
      optionsCopy[index].amount < optionsCopy[index].maxQuantity
    ) {
      optionsCopy[index].amount = optionsCopy[index].amount + 1;

      setItem(state => ({ ...state, options: [...optionsCopy] }));
    }

    if (
      operation === 'sub' &&
      optionsCopy[index].amount > optionsCopy[index].minQuantity
    ) {
      optionsCopy[index].amount = optionsCopy[index].amount - 1;

      setItem(state => ({ ...state, options: [...optionsCopy] }));
    }

    handleTotalValue();
  };

  const handleTotalValue = () => {
    setItem(state => ({
      ...state,
      totalPrice:
        state.options.reduce(
          (prevValue, nextValue) =>
            prevValue + nextValue.amount * nextValue.price,
          0,
        ) *
          state.amount +
        state.price * state.amount,
    }));
  };

  useEffect(() => {
    setItem({
      ...props.item,
      amount: 1,
      options: props.item.options.map(el => ({
        ...el,
        amount: el.minQuantity,
      })),
    });

    handleTotalValue();
  }, []);

  return (
    <Dialog
      maxWidth={'md'}
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.close}
    >
      {item && (
        <Fragment>
          <DialogTitle>{item.name}</DialogTitle>

          <DialogContent className={classes.modal}>
            <Grid container>
              <Grid item sm={12} md={6}>
                <img
                  className={classes.modal_logo}
                  src={item.image ? item.image : default_sku}
                  alt="restaurant logo"
                />
              </Grid>

              <Grid container direction="column" item sm={12} md={6}>
                <Grid item className={classes.modal_description}>
                  <span>{item.description}</span>
                </Grid>

                <Grid item className={classes.modal_price}>
                  <span>R${item.price?.toFixed(2).replace('.', ',')}</span>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.modal_extras__header}
                  >
                    <span>Escolha seus extras</span>
                  </Grid>

                  {item.options.map((option, index) => (
                    <Grid
                      container
                      className={classes.modal_extras__items}
                      key={option.id}
                    >
                      <Grid
                        item
                        xs
                        container
                        direction="column"
                        className={classes.modal_extras__items_info}
                      >
                        <span>{option.name}</span>
                        <span>
                          + R$ {option.price?.toFixed(2).replace('.', ',')}
                        </span>
                      </Grid>

                      <Grid
                        item
                        xs
                        container
                        justify="flex-end"
                        className={classes.modal_extras__items_buttons}
                      >
                        <IconButton
                          onClick={() => handleOptionAmount('sub', index)}
                        >
                          <RemoveOutlined color="primary" />
                        </IconButton>

                        <span>{option.amount}</span>

                        <IconButton
                          onClick={() => handleOptionAmount('sum', index)}
                        >
                          <AddOutlined color="primary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions style={{ alignItems: 'stretch' }}>
            <Grid className={classes.modal_actions__amount}>
              <IconButton onClick={() => handleItemAmount('sub')}>
                <RemoveOutlined color="primary" />
              </IconButton>

              <span>{item.amount}</span>

              <IconButton onClick={() => handleItemAmount('sum')}>
                <AddOutlined color="primary" />
              </IconButton>
            </Grid>

            <Button onClick={props.close} variant="contained" color="primary">
              <Grid className={classes.modal_actions__price}>
                <span>Adicionar</span>

                <span>
                  + R$ {item.totalPrice?.toFixed(2).replace('.', ',')}
                </span>
              </Grid>
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};
